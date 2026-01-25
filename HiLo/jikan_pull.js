/**
 * HiLo/jikan_pull.js
 *
 * Builds Hi/Lo entry pool using Jikan (MyAnimeList mirror).
 * - Pulls unique anime labels from your Draft character pool (draft_data.js)
 * - Finds best MAL entry per label
 * - Expands to connected seasons/entries using relations (prequel/sequel graph crawl)
 * - Outputs: HiLo/hilo_data.json
 *
 * Requirements: Node 18+ (you have Node 24 ✅)
 * Run: node HiLo/jikan_pull.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------
// CONFIG
// ----------------------------

// Where to output the dataset:
// - JSON file is useful for inspecting / debugging
// - JS wrapper is what the browser page can load directly (sets window.HILO_DATA)
const OUT_JSON_PATH = path.join(__dirname, "hilo_data.json");
const OUT_JS_PATH = path.join(__dirname, "hilo_data.js");

// Try to auto-locate your draft_data.js.
// Adjust/add paths here if your folders differ.
const DRAFT_DATA_CANDIDATE_PATHS = [
  path.join(__dirname, "..", "Draft", "draft_data.js"),
];

// Jikan settings
const JIKAN_BASE = "https://api.jikan.moe/v4";
const SEARCH_LIMIT = 10;

// Rate limiting / retries (Jikan has limits; be conservative)
const BASE_DELAY_MS = 450;   // between requests
const MAX_RETRIES = 5;

// Relation types we will traverse to build “seasons/entries”
const RELATION_ALLOWLIST = new Set([
  "Prequel",
  "Sequel",
  // Optional: uncomment if you want deeper linkage (can pull movies/specials too)
  // "Side story",
  // "Summary",
  // "Alternative version",
  // "Alternative setting",
]);

// Entry types to keep (you can expand later if you want movies/OVAs in Hi/Lo)
const TYPE_ALLOWLIST = new Set([
  "TV",
  "ONA",
  // Optional:
  // "Movie",
  // "OVA",
  // "Special",
]);

// If true, only keep entries with score > 0 (recommended)
const REQUIRE_SCORED = true;

// ----------------------------
// HELPERS
// ----------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url, attempt = 1) {
  const res = await fetch(url);
  if (res.status === 429) {
    if (attempt > MAX_RETRIES) {
      throw new Error(`Rate limited too many times: ${url}`);
    }
    const backoff = BASE_DELAY_MS * attempt * 2;
    await sleep(backoff);
    return fetchJson(url, attempt + 1);
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} for ${url}\n${text}`);
  }
  return res.json();
}

function norm(s) {
  return (s ?? "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Score how well a Jikan search result matches the label.
 * We bias toward “TV” and exact-ish title matching.
 */
function scoreMatch(label, item) {
  const L = norm(label);

  const t = norm(item.title);
  const te = norm(item.title_english);
  const tj = norm(item.title_japanese);

  let score = 0;

  // exact
  if (t === L || te === L || tj === L) score += 200;

  // contains / token overlap
  const tokens = L.split(" ").filter(Boolean);
  const hay = `${t} ${te} ${tj}`;

  for (const tok of tokens) {
    if (hay.includes(tok)) score += 8;
  }

  // prefer TV/ONA
  const type = (item.type || "").toUpperCase();
  if (type === "TV") score += 10;
  if (type === "ONA") score += 6;

  // prefer “known” franchises from your naming
  if (label.toLowerCase().includes("shippuden") && hay.includes("shippuden")) score += 20;
  if (label.toLowerCase().includes("gt") && hay.includes("gt")) score += 20;
  if (label.toLowerCase().includes("super") && hay.includes("super")) score += 20;

  // penalize obvious non-anime matches if any appear (rare)
  if ((item.rating || "").toLowerCase().includes("rx")) score -= 50;

  return score;
}

async function jikanSearchAnime(query) {
  const url = `${JIKAN_BASE}/anime?q=${encodeURIComponent(query)}&limit=${SEARCH_LIMIT}`;
  const json = await fetchJson(url);
  return Array.isArray(json.data) ? json.data : [];
}

async function jikanGetAnimeById(malId) {
  const url = `${JIKAN_BASE}/anime/${malId}/full`;
  const json = await fetchJson(url);
  return json.data || null;
}

async function jikanGetRelations(malId) {
  const url = `${JIKAN_BASE}/anime/${malId}/relations`;
  const json = await fetchJson(url);
  return Array.isArray(json.data) ? json.data : [];
}

function pickDisplayTitles(full) {
  const english = full.title_english ?? null;
  const main = full.title ?? null;

  // This implements your rule for display later:
  // - Use English if available
  // - Only show parentheses in UI when English is missing
  return {
    displayTitle: english || main || "Unknown Title",
    englishMissing: !english,
    // keep alts for UI later if you want parentheses only when englishMissing
    altTitle: english ? null : (main || full.title_japanese || null),
    japaneseTitle: full.title_japanese ?? null,
  };
}

function simplifyEntry(full, seedLabel) {
  const t = pickDisplayTitles(full);

  return {
    malId: full.mal_id,
    seed: seedLabel, // the label that led to this chain
    type: full.type ?? null,
    year: full.year ?? null,
    season: full.season ?? null,
    episodes: full.episodes ?? null,
    score: full.score ?? 0,
    scoredBy: full.scored_by ?? null,

    // Title fields for your UI rules later:
    displayTitle: t.displayTitle,
    englishMissing: t.englishMissing,
    altTitle: t.altTitle,
    japaneseTitle: t.japaneseTitle,
    rawTitle: full.title ?? null,
    rawEnglishTitle: full.title_english ?? null,


    imageUrl: full?.images?.jpg?.large_image_url ?? full?.images?.jpg?.image_url ?? null,

    url: full.url ?? null,
  };
}

function passesFilters(entry) {
  const type = (entry.type || "").toUpperCase();

  if (TYPE_ALLOWLIST.size && !TYPE_ALLOWLIST.has(type)) return false;
  if (REQUIRE_SCORED && (!entry.score || entry.score <= 0)) return false;

  return true;
}

/**
 * Extract unique anime labels from draft_data.js (your character pool).
 * Expected: window.DRAFT_TEAM_DATA.characters = [{ anime: "...", name: "..." }, ...]
 */
function loadAnimeLabelsFromDraftData(draftPath) {
  const raw = fs.readFileSync(draftPath, "utf-8");

  // naive but effective extraction of anime:"..."
  // (works even if file is not valid JSON)
  const re = /anime\s*:\s*["']([^"']+)["']/g;

  const set = new Set();
  let m;
  while ((m = re.exec(raw)) !== null) {
    const label = (m[1] || "").trim();
    if (label) set.add(label);
  }

  return [...set].sort((a, b) => a.localeCompare(b));
}

function findExistingDraftFile() {
  for (const p of DRAFT_DATA_CANDIDATE_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/**
 * Crawl relations graph (prequel/sequel chain) starting from one MAL ID.
 * Returns a set of MAL IDs discovered (including start).
 */
async function crawlSeasonGraph(startId) {
  const seen = new Set();
  const queue = [startId];

  while (queue.length) {
    const id = queue.shift();
    if (seen.has(id)) continue;
    seen.add(id);

    await sleep(BASE_DELAY_MS);

    let relations;
    try {
      relations = await jikanGetRelations(id);
    } catch (e) {
      // If one node fails, continue
      console.warn(`WARN: relations failed for ${id}: ${e.message}`);
      continue;
    }

    for (const rel of relations) {
      const relType = rel.relation ?? "";
      if (!RELATION_ALLOWLIST.has(relType)) continue;

      const entries = Array.isArray(rel.entry) ? rel.entry : [];
      for (const en of entries) {
        if (en.type !== "anime") continue;
        const nextId = en.mal_id;
        if (typeof nextId === "number" && !seen.has(nextId)) {
          queue.push(nextId);
        }
      }
    }
  }

  return seen;
}

async function main() {
  // 1) Locate & load anime labels from draft_data.js
  const draftPath = findExistingDraftFile();
  if (!draftPath) {
    console.error("ERROR: Could not find draft_data.js. Update DRAFT_DATA_CANDIDATE_PATHS in jikan_pull.js.");
    process.exit(1);
  }

  console.log(`Using draft data: ${draftPath}`);
  const animeLabels = loadAnimeLabelsFromDraftData(draftPath);

  if (!animeLabels.length) {
    console.error("ERROR: No anime labels found in draft_data.js (couldn't find anime: '...').");
    process.exit(1);
  }

  console.log(`Found ${animeLabels.length} unique anime labels in character pool.`);

  // 2) For each label, find best MAL entry, then crawl its season/entry graph
  const globalEntryMap = new Map(); // malId -> entry obj
  const seedToMalId = {};           // label -> chosen base malId
  const seedErrors = {};            // label -> error

  for (const label of animeLabels) {
    await sleep(BASE_DELAY_MS);

    // Small query cleanup for common naming quirks:
    const query =
      label === "Yu-Gi-Oh! (Original)" ? "Yu Gi Oh" :
      label === "Naruto (Part 1)" ? "Naruto" :
      label;

    let results;
    try {
      results = await jikanSearchAnime(query);
    } catch (e) {
      seedErrors[label] = `Search failed: ${e.message}`;
      continue;
    }

    if (!results.length) {
      seedErrors[label] = "No search results";
      continue;
    }

    // pick best match
    let best = results[0];
    let bestScore = -Infinity;
    for (const item of results) {
      const s = scoreMatch(label, item);
      if (s > bestScore) {
        bestScore = s;
        best = item;
      }
    }

    if (!best?.mal_id) {
      seedErrors[label] = "No mal_id found for best match";
      continue;
    }

    seedToMalId[label] = best.mal_id;

    // crawl season graph
    let idSet;
    try {
      idSet = await crawlSeasonGraph(best.mal_id);
    } catch (e) {
      seedErrors[label] = `Relations crawl failed: ${e.message}`;
      continue;
    }

    // 3) Fetch full details for every discovered entry, apply filters, and add to pool
    for (const id of idSet) {
      if (globalEntryMap.has(id)) continue;

      await sleep(BASE_DELAY_MS);

      let full;
      try {
        full = await jikanGetAnimeById(id);
      } catch (e) {
        console.warn(`WARN: full fetch failed for ${id}: ${e.message}`);
        continue;
      }
      if (!full) continue;

      const entry = simplifyEntry(full, label);
      if (!passesFilters(entry)) {
        globalEntryMap.set(id, null); // mark visited but excluded
        continue;
      }

      globalEntryMap.set(id, entry);
    }
  }

  const entries = [...globalEntryMap.values()].filter(Boolean);

  // 4) Create final dataset
  const dataset = {
    packId: "anime_hilo_seasons",
    title: "Anime Hi/Lo (Seasons/Entries)",
    generatedAt: new Date().toISOString(),
    source: "Jikan (MyAnimeList mirror)",
    notes: {
      displayRule: "Use English title if available; only show alt title in parentheses if English is missing.",
      typeAllowlist: [...TYPE_ALLOWLIST],
      relationAllowlist: [...RELATION_ALLOWLIST],
      requireScored: REQUIRE_SCORED,
    },
    seeds: {
      draftDataPath: draftPath,
      labelCount: animeLabels.length,
      chosenBaseIds: seedToMalId,
      errors: seedErrors,
    },
    entries,
  };

  // 1) Write JSON
  fs.writeFileSync(OUT_JSON_PATH, JSON.stringify(dataset, null, 2), "utf-8");
  console.log(`✅ Wrote ${entries.length} entries to ${OUT_JSON_PATH}`);

  // 2) Write JS wrapper for browser usage
  //    The Hi/Lo page can include <script src="hilo_data.js"></script>
  //    and read window.HILO_DATA without needing fetch() (works even via file://)
  const jsPayload = `/* Auto-generated by jikan_pull_with_images.js */\n` +
    `(function(){\n` +
    `  window.HILO_DATA = ${JSON.stringify(dataset)};\n` +
    `})();\n`;
  fs.writeFileSync(OUT_JS_PATH, jsPayload, "utf-8");
  console.log(`✅ Wrote JS wrapper to ${OUT_JS_PATH}`);

  // helpful summary
  const excludedCount = [...globalEntryMap.values()].filter(v => v === null).length;
  const errorCount = Object.keys(seedErrors).length;
  console.log(`Excluded entries by filter: ${excludedCount}`);
  console.log(`Seeds with errors: ${errorCount}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});