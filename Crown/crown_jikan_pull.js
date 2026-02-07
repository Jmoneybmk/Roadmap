/**
 * Crown/crown_jikan_pull.js
 *
 * Fetches character portraits and anime posters for Crown the King.
 * 
 * PRIORITY:
 * 1. First checks local Images/Anime/Characters/ or Images/Anime/Series/ folder
 * 2. Only fetches from Jikan (MAL) if local image doesn't exist
 *
 * LOCAL IMAGE STRUCTURE:
 *   Images/
 *   └── Anime/
 *       ├── Characters/
 *       │   ├── Goku.jpg
 *       │   ├── Naruto Uzumaki.jpg
 *       │   └── ...
 *       └── Series/
 *           ├── Dragon Ball.jpg
 *           ├── Dragon Ball Z.jpg
 *           └── ...
 *
 * Requirements: Node 18+
 * Run from MAIN directory: node Crown/crown_jikan_pull.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------
// CONFIG
// ----------------------------
// Script is in Crown/ folder, but runs from main directory
const MAIN_DIR = path.join(__dirname, "..");
const CROWN_DIR = __dirname;

const DATA_PATH = path.join(CROWN_DIR, "crown_data.js");
const OUT_PATH = path.join(CROWN_DIR, "crown_data.js");

// Local images folders (relative to main directory)
const IMAGES_BASE = path.join(MAIN_DIR, "Images", "Anime");
const CHARACTERS_DIR = path.join(IMAGES_BASE, "Characters");
const SERIES_DIR = path.join(IMAGES_BASE, "Series");
const IMAGE_EXTENSION = ".jpg";

// For the browser, we need relative paths from Crown/ folder
const BROWSER_CHARACTERS_PATH = "../Images/Anime/Characters/";
const BROWSER_SERIES_PATH = "../Images/Anime/Series/";

const JIKAN_BASE = "https://api.jikan.moe/v4";
const SEARCH_LIMIT = 10;

// Rate limiting (Jikan has strict limits)
const BASE_DELAY_MS = 350;
const MAX_RETRIES = 5;

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
    console.log(`  Rate limited, waiting ${backoff}ms...`);
    await sleep(backoff);
    return fetchJson(url, attempt + 1);
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} for ${url}\n${text}`);
  }
  return res.json();
}

function normalize(s) {
  return (s ?? "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Check if a local image exists for the given name
 * @param {string} name - Character or series name
 * @param {string} type - "characters" or "series"
 * @returns {string|null} - Browser-relative path if exists, null otherwise
 */
function checkLocalImage(name, type) {
  const dir = type === "characters" ? CHARACTERS_DIR : SERIES_DIR;
  const browserPath = type === "characters" ? BROWSER_CHARACTERS_PATH : BROWSER_SERIES_PATH;
  
  // Try exact name match
  const filename = name + IMAGE_EXTENSION;
  const fullPath = path.join(dir, filename);
  
  if (fs.existsSync(fullPath)) {
    return browserPath + encodeURIComponent(filename);
  }
  
  // Try some common variations
  const variations = [
    name,
    name.replace(/[:.]/g, ""),           // Remove colons and periods
    name.replace(/['']/g, "'"),          // Normalize quotes
    name.replace(/\s+/g, " ").trim(),    // Normalize spaces
  ];
  
  for (const variant of variations) {
    const varFilename = variant + IMAGE_EXTENSION;
    const varPath = path.join(dir, varFilename);
    if (fs.existsSync(varPath)) {
      return browserPath + encodeURIComponent(varFilename);
    }
  }
  
  return null;
}

/**
 * Score how well a character search result matches
 */
function scoreCharacterMatch(name, animeName, item) {
  const searchName = normalize(name);
  const itemName = normalize(item.name);
  
  let score = 0;

  // Exact name match
  if (itemName === searchName) score += 100;
  
  // Name contains search term
  if (itemName.includes(searchName)) score += 50;
  if (searchName.includes(itemName)) score += 30;

  // Check if character appears in the target anime
  if (item.anime && Array.isArray(item.anime)) {
    for (const a of item.anime) {
      const animeTitle = normalize(a.anime?.title || "");
      const targetAnime = normalize(animeName);
      if (animeTitle.includes(targetAnime) || targetAnime.includes(animeTitle)) {
        score += 80;
        break;
      }
    }
  }

  // Penalize if no image
  if (!item.images?.jpg?.image_url) score -= 50;

  return score;
}

/**
 * Score how well an anime search result matches
 */
function scoreAnimeMatch(name, item) {
  const searchName = normalize(name);
  const itemTitle = normalize(item.title || "");
  const itemTitleEng = normalize(item.title_english || "");

  let score = 0;

  // Exact match
  if (itemTitle === searchName || itemTitleEng === searchName) score += 100;

  // Contains
  if (itemTitle.includes(searchName) || searchName.includes(itemTitle)) score += 50;
  if (itemTitleEng.includes(searchName) || searchName.includes(itemTitleEng)) score += 40;

  // Prefer TV series
  if (item.type === "TV") score += 20;
  if (item.type === "ONA") score += 10;

  // Prefer higher scored/popular entries
  if (item.score && item.score > 7) score += 10;
  if (item.members && item.members > 100000) score += 10;

  // Penalize if no image
  if (!item.images?.jpg?.large_image_url && !item.images?.jpg?.image_url) score -= 50;

  return score;
}

async function searchCharacter(name, animeName) {
  const query = name
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const url = `${JIKAN_BASE}/characters?q=${encodeURIComponent(query)}&limit=${SEARCH_LIMIT}`;
  
  try {
    const json = await fetchJson(url);
    const results = Array.isArray(json.data) ? json.data : [];

    if (!results.length) return null;

    let best = results[0];
    let bestScore = -Infinity;

    for (const item of results) {
      const s = scoreCharacterMatch(name, animeName, item);
      if (s > bestScore) {
        bestScore = s;
        best = item;
      }
    }

    if (!best?.mal_id) return null;

    return {
      malId: best.mal_id,
      imageUrl: best.images?.jpg?.image_url || null
    };
  } catch (e) {
    console.error(`  Error searching character "${name}": ${e.message}`);
    return null;
  }
}

async function searchAnime(name) {
  const query = name
    .replace(/[☆★]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const url = `${JIKAN_BASE}/anime?q=${encodeURIComponent(query)}&limit=${SEARCH_LIMIT}`;

  try {
    const json = await fetchJson(url);
    const results = Array.isArray(json.data) ? json.data : [];

    if (!results.length) return null;

    let best = results[0];
    let bestScore = -Infinity;

    for (const item of results) {
      const s = scoreAnimeMatch(name, item);
      if (s > bestScore) {
        bestScore = s;
        best = item;
      }
    }

    if (!best?.mal_id) return null;

    return {
      malId: best.mal_id,
      imageUrl: best.images?.jpg?.large_image_url || best.images?.jpg?.image_url || null
    };
  } catch (e) {
    console.error(`  Error searching anime "${name}": ${e.message}`);
    return null;
  }
}

/**
 * Load crown_data.js and extract the data object
 */
function loadCrownData() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  
  const match = raw.match(/window\.CROWN_DATA\s*=\s*(\{[\s\S]*\});?\s*$/);
  if (!match) {
    throw new Error("Could not parse crown_data.js - expected window.CROWN_DATA = {...}");
  }
  
  const data = eval(`(${match[1]})`);
  return data;
}

/**
 * Save updated data back to crown_data.js
 */
function saveCrownData(data) {
  const js = `// crown_data.js
// Crown the King - Tournament bracket game data
// Auto-populated by crown_jikan_pull.js on ${new Date().toISOString()}

window.CROWN_DATA = ${JSON.stringify(data, null, 2)};
`;
  fs.writeFileSync(OUT_PATH, js, "utf-8");
}

// ----------------------------
// MAIN
// ----------------------------
async function main() {
  console.log("Crown the King - Image Fetcher");
  console.log("==============================\n");
  
  // Check if Images directories exist
  console.log("Checking local image directories...");
  console.log(`  Characters: ${CHARACTERS_DIR}`);
  console.log(`  Series: ${SERIES_DIR}`);
  
  if (!fs.existsSync(CHARACTERS_DIR)) {
    console.log("  ⚠ Characters directory not found - will fetch all from MAL");
  } else {
    const charFiles = fs.readdirSync(CHARACTERS_DIR).filter(f => f.endsWith(IMAGE_EXTENSION));
    console.log(`  ✓ Found ${charFiles.length} local character images`);
  }
  
  if (!fs.existsSync(SERIES_DIR)) {
    console.log("  ⚠ Series directory not found - will fetch all from MAL");
  } else {
    const seriesFiles = fs.readdirSync(SERIES_DIR).filter(f => f.endsWith(IMAGE_EXTENSION));
    console.log(`  ✓ Found ${seriesFiles.length} local series images`);
  }
  
  console.log("\nLoading crown_data.js...");
  const data = loadCrownData();

  const packs = data.packs || {};
  let totalCharacters = 0;
  let totalSeries = 0;
  let localCharacters = 0;
  let localSeries = 0;
  let fetchedCharacters = 0;
  let fetchedSeries = 0;
  let failedCharacters = 0;
  let failedSeries = 0;

  for (const [packKey, pack] of Object.entries(packs)) {
    console.log(`\n=== Processing pack: ${pack.label || packKey} ===`);

    // Process characters
    if (pack.characters?.entries?.length) {
      console.log(`\nProcessing ${pack.characters.entries.length} characters...`);
      
      for (const char of pack.characters.entries) {
        totalCharacters++;
        
        // First, check for local image
        const localPath = checkLocalImage(char.name, "characters");
        
        if (localPath) {
          char.imageUrl = localPath;
          console.log(`  ✓ ${char.name} (local)`);
          localCharacters++;
          continue;
        }
        
        // No local image, fetch from MAL
        await sleep(BASE_DELAY_MS);
        
        const result = await searchCharacter(char.name, char.anime || "");
        
        if (result) {
          char.malId = result.malId;
          char.imageUrl = result.imageUrl;
          console.log(`  ↓ ${char.name} (MAL ID ${result.malId})`);
          fetchedCharacters++;
        } else {
          console.log(`  ✗ ${char.name} (not found)`);
          failedCharacters++;
        }
      }
    }

    // Process series
    if (pack.series?.entries?.length) {
      console.log(`\nProcessing ${pack.series.entries.length} series...`);
      
      for (const series of pack.series.entries) {
        totalSeries++;
        
        // First, check for local image
        const localPath = checkLocalImage(series.name, "series");
        
        if (localPath) {
          series.imageUrl = localPath;
          console.log(`  ✓ ${series.name} (local)`);
          localSeries++;
          continue;
        }
        
        // No local image, fetch from MAL
        await sleep(BASE_DELAY_MS);
        
        const result = await searchAnime(series.name);
        
        if (result) {
          series.malId = result.malId;
          series.imageUrl = result.imageUrl;
          console.log(`  ↓ ${series.name} (MAL ID ${result.malId})`);
          fetchedSeries++;
        } else {
          console.log(`  ✗ ${series.name} (not found)`);
          failedSeries++;
        }
      }
    }
  }

  // Save updated data
  console.log("\nSaving updated crown_data.js...");
  saveCrownData(data);

  // Summary
  console.log("\n==============================");
  console.log("SUMMARY");
  console.log("==============================");
  console.log(`\nCharacters (${totalCharacters} total):`);
  console.log(`  ✓ Local:   ${localCharacters}`);
  console.log(`  ↓ Fetched: ${fetchedCharacters}`);
  console.log(`  ✗ Failed:  ${failedCharacters}`);
  console.log(`\nSeries (${totalSeries} total):`);
  console.log(`  ✓ Local:   ${localSeries}`);
  console.log(`  ↓ Fetched: ${fetchedSeries}`);
  console.log(`  ✗ Failed:  ${failedSeries}`);
  console.log(`\n✅ Done! Check Crown/crown_data.js for results.`);
  
  if (failedCharacters > 0 || failedSeries > 0) {
    console.log(`\n💡 Tip: Add missing images to Images/Anime/Characters/ or Images/Anime/Series/`);
    console.log(`   and run this script again.`);
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
