// app.js
(() => {
  const DATA = window.ANIME_DEBATE_DATA;

  // --- DOM ---
  const roundNowEl = document.getElementById("roundNow");
  const roundMaxEl = document.getElementById("roundMax");
  const promptsLeftEl = document.getElementById("promptsLeft");
  const charsLeftEl = document.getElementById("charsLeft");
  const modsLeftEl = document.getElementById("modsLeft");

  const usedPromptsCountEl = document.getElementById("usedPromptsCount");
  const usedCharsCountEl = document.getElementById("usedCharsCount");
  const usedModsCountEl = document.getElementById("usedModsCount");

  const promptTextEl = document.getElementById("promptText");
  const promptSourceEl = document.getElementById("promptSource");
  const promptExplEl = document.getElementById("promptExpl");
  const boardMetaEl = document.getElementById("boardMeta");

  const modifierTextEl = document.getElementById("modifierText");
  const modifierBoxEl = document.getElementById("modifierBox");

  const optionsGridEl = document.getElementById("optionsGrid");
  const hintBoxEl = document.getElementById("hintBox");
  const playersEl = document.getElementById("players");

  const btnGenerate = document.getElementById("btnGenerate");
  const btnLock = document.getElementById("btnLock");
  const btnRevealMod = document.getElementById("btnRevealMod");
  const btnNext = document.getElementById("btnNext");
  const btnRestart = document.getElementById("btnRestart");
  const btnClearUsed = document.getElementById("btnClearUsed");
  const btnResetScores = document.getElementById("btnResetScores");
  const btnClearBoard = document.getElementById("btnClearBoard");

  const STORAGE_KEY = "anime_debate_state_v1";

  // --- Helpers ---
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function setHint(msg) {
    hintBoxEl.textContent = msg || "";
  }

  // --- State ---
  function freshState() {
    return {
      round: 1,
      maxRounds: DATA.maxRounds || 10,

      packId: "anime",
      packLabel: "Anime",

      availablePrompts: (getPacks().anime?.prompts || []).slice(),
      usedPrompts: [],

      availableCharacters: (getPacks().anime?.characters || []).slice(),
      usedCharacters: [],

      availableModifiers: (getPacks().anime?.modifiers || []).slice(),
      usedModifiers: [],

      // board
      currentPrompt: null,
      currentOptions: [],
      currentAssignments: { A: null, B: null, C: null, D: null }, // option -> playerIndex
      assignmentsLocked: false,
      picksLocked: false,
      currentModifier: null,
      modifierRevealed: false,
      gameOver: false,
      tiebreakMode: false,
      winners: [], // array of player indexes

      players: [
        { name: "Player 1", points: 0 },
        { name: "Player 2", points: 0 },
        { name: "Player 3", points: 0 },
        { name: "Player 4", points: 0 }
      ]
    };
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
  }

  function saveStateNoRender() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return freshState();
      const parsed = JSON.parse(raw);

      // Basic validation / fallback
      if (!parsed || typeof parsed.round !== "number") return freshState();
      return parsed;
    } catch {
      return freshState();
    }
  }

  // --- UI: Players ---
  function renderPlayers() {
    playersEl.innerHTML = "";
    state.players.forEach((p, idx) => {
      const wrap = document.createElement("div");
      wrap.className = "player";

      const top = document.createElement("div");
      top.className = "player-top";

      const input = document.createElement("input");
      input.value = p.name || "";
      input.placeholder = `Player ${idx + 1}`;
      input.addEventListener("input", (e) => {
        state.players[idx].name = e.target.value;
        saveStateNoRender(); // prevents rerender + focus loss
      });

      top.appendChild(input);
      wrap.appendChild(top);

      const points = document.createElement("div");
      points.className = "points";

      const btnMinus = document.createElement("button");
      btnMinus.textContent = "−";
      btnMinus.addEventListener("click", () => {
        state.players[idx].points = Math.max(0, (state.players[idx].points || 0) - 1);
        saveState();
      });

      const num = document.createElement("div");
      num.className = "num";
      num.textContent = String(p.points ?? 0);

      const btnPlus = document.createElement("button");
      btnPlus.textContent = "+";
      btnPlus.addEventListener("click", () => {
        state.players[idx].points = (state.players[idx].points || 0) + 1;
        saveState();
      });

      points.appendChild(btnMinus);
      points.appendChild(num);
      points.appendChild(btnPlus);

      wrap.appendChild(points);
      playersEl.appendChild(wrap);
    });
  }

  // --- UI: Board ---
  function renderBoard() {
    const r = state.round;
    roundNowEl.textContent = String(r);
    roundMaxEl.textContent = String(state.maxRounds);

    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) pageTitle.textContent = `${state.packLabel} Debate — Game Board`;
    document.title = `${state.packLabel} Debate — Game Board`;

    promptsLeftEl.textContent = String(state.availablePrompts.length);
    charsLeftEl.textContent = String(state.availableCharacters.length);
    modsLeftEl.textContent = String(state.availableModifiers.length);

    usedPromptsCountEl.textContent = String(state.usedPrompts.length);
    usedCharsCountEl.textContent = String(state.usedCharacters.length);
    usedModsCountEl.textContent = String(state.usedModifiers.length);

    const needsMod = [3, 6, 9].includes(r);
    boardMetaEl.textContent = needsMod ? "Modifier Round" : "Normal Round";

    if (!state.currentPrompt) {
      promptTextEl.innerHTML = "Click <b>Generate Round</b> to start.";
      promptSourceEl.textContent = "";
      promptExplEl.textContent = "";
    } else {
      promptTextEl.textContent = state.currentPrompt.prompt;
      promptSourceEl.textContent = `Source: ${state.currentPrompt.source}`;
      promptExplEl.textContent = state.currentPrompt.explanation;
    }

    // Modifier box
    const showModLabel = needsMod;
    modifierBoxEl.style.display = showModLabel ? "block" : "none";
    if (showModLabel) {
      if (state.modifierRevealed && state.currentModifier) {
        modifierTextEl.textContent = state.currentModifier;
      } else {
        modifierTextEl.textContent = "No modifier revealed.";
      }
    }

    // Options
    optionsGridEl.innerHTML = "";
    const labels = ["A", "B", "C", "D"];

    // Build player dropdown options (use current names)
    const activePlayers = state.players
      .map((p, idx) => ({ idx, name: (p.name || `Player ${idx + 1}`).trim() }))
      .filter(p => p.name.length > 0);

    state.currentOptions.forEach((opt, i) => {
      const label = labels[i];

      const card = document.createElement("div");
      card.className = "option";

      const tag = document.createElement("div");
      tag.className = "tag";
      tag.textContent = `Option ${label}`;

      const nm = document.createElement("div");
      nm.className = "name";
      nm.textContent = opt.name;

      const note = document.createElement("div");
      note.className = "note";
      note.textContent = `${state.packLabel}: ${opt.anime}`;

      // Assignment UI
      const assignWrap = document.createElement("div");
      assignWrap.className = "note";
      assignWrap.style.marginTop = "10px";

      const assignLabel = document.createElement("div");
      assignLabel.style.color = "var(--muted)";
      assignLabel.style.fontSize = "12px";
      assignLabel.style.marginBottom = "6px";
      assignLabel.textContent = "Assigned to:";

      const select = document.createElement("select");
      select.style.width = "100%";
      select.style.padding = "8px 10px";
      select.style.borderRadius = "10px";
      select.style.border = "1px solid rgba(148,163,184,.25)";
      select.style.background = "rgba(2,6,23,.5)";
      select.style.color = "var(--text)";
      select.disabled = state.assignmentsLocked;

      // Default option
      const optNone = document.createElement("option");
      optNone.value = "";
      optNone.textContent = "Unassigned";
      select.appendChild(optNone);

      // Player options
      activePlayers.forEach(p => {
        const o = document.createElement("option");
        o.value = String(p.idx);
        o.textContent = p.name;
        select.appendChild(o);
      });

      // Set current selection
      const current = state.currentAssignments?.[label];
      select.value = (current === null || current === undefined) ? "" : String(current);

      select.addEventListener("change", (e) => {
        if (state.assignmentsLocked) return;
        const v = e.target.value;
        state.currentAssignments[label] = (v === "") ? null : Number(v);
        saveState(); // re-render is OK here; dropdown focus not critical like typing
      });

      assignWrap.appendChild(assignLabel);
      assignWrap.appendChild(select);

      card.appendChild(tag);
      card.appendChild(nm);
      card.appendChild(note);
      card.appendChild(assignWrap);

      optionsGridEl.appendChild(card);
    });

    // Buttons / flow control
    const boardReady = !!state.currentPrompt && state.currentOptions.length === 4;
    btnGenerate.disabled = boardReady; // prevent double-generation
    btnLock.disabled = !boardReady || state.assignmentsLocked;

    btnCheckWinner.disabled = !(state.round >= state.maxRounds || state.tiebreakMode);

    // Reveal modifier only when:
    // - Round 3/6/9
    // - boardReady
    // - picks locked
    // - not already revealed
    // - modifiers available
    btnRevealMod.disabled = !(needsMod && boardReady && state.assignmentsLocked && !state.modifierRevealed && state.availableModifiers.length > 0);

    btnNext.disabled = !boardReady; // allow next once board exists
  }

  function render() {
    renderPlayers();
    renderBoard();
  }

  // --- Game actions ---
  function clearBoardOnly() {
    state.currentPrompt = null;
    state.currentOptions = [];
    state.picksLocked = false;
    state.currentModifier = null;
    state.modifierRevealed = false;
    setHint("Board cleared.");
    saveState();
  }

  function generateRound() {
    if (state.currentPrompt || state.currentOptions.length) {
      setHint("Finish or clear the current round first.");
      return;
    }

    if (state.availablePrompts.length < 1) {
      setHint("No prompts left. Use Restart Game or Clear Used Pools.");
      return;
    }
    if (state.availableCharacters.length < 4) {
      setHint("Not enough characters left to generate 4 options. Use Restart Game or Clear Used Pools.");
      return;
    }

    // Pick prompt
    const p = pickOne(state.availablePrompts);
    state.availablePrompts = state.availablePrompts.filter(x => x.id !== p.id);
    state.usedPrompts.push(p);
    state.currentPrompt = p;

    // Pick 4 unique characters (objects: { name, anime })
    const shuffledChars = shuffle(state.availableCharacters);
    const options = shuffledChars.slice(0, 4);

    // Create stable keys so object comparison is reliable
    const key = (c) => `${c.name}@@${c.anime}`;
    const optionKeys = new Set(options.map(key));

    // remove from available, add to used
    state.availableCharacters = state.availableCharacters.filter(c => !optionKeys.has(key(c)));
    state.usedCharacters.push(...options);
    state.currentOptions = options;
    state.currentAssignments = { A: null, B: null, C: null, D: null };
    state.assignmentsLocked = false;

    // reset modifier state
    state.picksLocked = false;
    state.currentModifier = null;
    state.modifierRevealed = false;

    const needsMod = [3, 6, 9].includes(state.round);
    setHint(needsMod
      ? "Modifier Round: Players pick their characters, then click Lock Picks, then Reveal Modifier."
      : "Round generated. Players pick characters and debate."
    );

    saveState();
  }

  function lockPicks() {
    if (!state.currentPrompt || state.currentOptions.length !== 4) {
      setHint("Generate a round first.");
      return;
    }

    // Validate assignments (optional but recommended)
    const entries = Object.entries(state.currentAssignments || {});
    const picked = entries.filter(([_, v]) => v !== null && v !== undefined);

    // Check: no two options assigned to the same player
    const seenPlayers = new Set();
    for (const [label, pIdx] of picked) {
      if (seenPlayers.has(pIdx)) {
        setHint("One player is assigned to more than one option. Fix assignments first.");
        return;
      }
      seenPlayers.add(pIdx);
    }

    // Check: a single option can't be double-assigned (already impossible by design)
    // Check: at least 2 players assigned (optional)
    // if (picked.length < 2) { setHint("Assign at least 2 players for multiplayer rounds."); return; }

    state.picksLocked = true;
    state.assignmentsLocked = true;

    setHint("Picks locked. If this is Round 3/6/9, you can now reveal the modifier.");
    saveState();
  }

  function revealModifier() {
    const needsMod = [3, 6, 9].includes(state.round);
    if (!needsMod) {
      setHint("This round has no modifier.");
      return;
    }
    if (!state.assignmentsLocked) {
      setHint("Lock Picks first (modifier reveals after players choose).");
      return;
    }
    if (state.modifierRevealed) {
      setHint("Modifier already revealed.");
      return;
    }
    if (state.availableModifiers.length < 1) {
      setHint("No modifiers left. Restart Game or Clear Used Pools.");
      return;
    }

    const m = pickOne(state.availableModifiers);
    state.availableModifiers = state.availableModifiers.filter(x => x !== m);
    state.usedModifiers.push(m);

    state.currentModifier = m;
    state.modifierRevealed = true;
    setHint("Modifier revealed. Debate continues with the new rule applied.");
    saveState();
  }

  function nextRound() {
    if (!state.currentPrompt || state.currentOptions.length !== 4) {
      setHint("Generate a round first.");
      return;
    }

    if (state.gameOver) {
      setHint("Game is over. Press Restart Game to play again.");
      return;
    }

    // Advance round
    if (state.round >= state.maxRounds) {
      setHint("You’re at the final round. Use Restart Game for a fresh run, or keep playing in tiebreakers by increasing maxRounds in data.js.");
    } else {
      state.round += 1;
      setHint("Next round ready. Generate Round.");
    }

    // Clear board for new round
    state.currentPrompt = null;
    state.currentOptions = [];
    state.picksLocked = false;
    state.currentModifier = null;
    state.modifierRevealed = false;

    state.currentAssignments = { A: null, B: null, C: null, D: null };
    state.assignmentsLocked = false;

    // If we just finished Round 10 (or later), check for winner/tie
    if (state.round >= state.maxRounds) {
      checkWinnerAndMaybeTiebreak();
    }

    saveState();
  }

  function restartGame() {
    const keepNames = state.players.map(p => p.name);
    state = freshState();
    state.gameOver = false;
    state.tiebreakMode = false;
    state.winners = [];
    // keep custom names if you want
    state.players.forEach((p, i) => p.name = keepNames[i] || p.name);
    setHint("Game restarted. Pools reset, round set to 1.");
    saveState();
  }

  function clearUsedPools() {
    // Return used back to available, keep current round/scores/board
    state.availablePrompts = state.availablePrompts.concat(state.usedPrompts);
    state.usedPrompts = [];

    state.availableCharacters = state.availableCharacters.concat(state.usedCharacters);
    state.usedCharacters = [];

    state.availableModifiers = state.availableModifiers.concat(state.usedModifiers);
    state.usedModifiers = [];

    setHint("Used pools cleared back into available pools.");
    saveState();
  }

  function resetScores() {
    state.players.forEach(p => p.points = 0);
    setHint("Scores reset.");
    saveState();
  }

  function activePlayerIndexes() {
    return state.players
      .map((p, idx) => ({ p, idx }))
      .filter(x => (x.p.name || "").trim().length > 0)
      .map(x => x.idx);
  }

  function computeLeaders() {
    const active = activePlayerIndexes();
    let best = -Infinity;
    let leaders = [];

    for (const idx of active) {
      const p = state.players[idx];
      const pts = Number(
        (p.points ?? p.score ?? p.pts ?? p.value ?? 0)
      );
      if (pts > best) {
        best = pts;
        leaders = [idx];
      } else if (pts === best) {
        leaders.push(idx);
      }
    }

    return { best, leaders };
  }

  function checkWinnerAndMaybeTiebreak() {
    const active = activePlayerIndexes();
    if (active.length < 1) {
      setHint("No active players.");
      return;
    }

    const { best, leaders } = computeLeaders();

    // If we're before round 10 and not in tiebreak, do nothing
    if (!state.tiebreakMode && state.round < state.maxRounds) {
      setHint(`Round ${state.round}/${state.maxRounds}. Winner check happens after Round ${state.maxRounds}.`);
      return;
    }

    if (leaders.length === 1) {
      state.gameOver = true;
      state.winners = leaders;
      state.tiebreakMode = false;

      const name = (state.players[leaders[0]].name || `Player ${leaders[0] + 1}`).trim();
      setHint(`🏆 Winner: ${name} with ${best} point(s)!`);
      saveState();
      return;
    }

    // Tie: enter / continue tiebreak mode
    state.gameOver = false;
    state.winners = leaders;
    state.tiebreakMode = true;

    const tiedNames = leaders.map(i => (state.players[i].name || `Player ${i + 1}`).trim()).join(", ");
    setHint(`⚔️ Tie at ${best} point(s) between: ${tiedNames}. Tiebreak rounds begin!`);
    saveState();
  }

  function getPacks() {
    const d = window.ANIME_DEBATE_DATA || {};
    return d.packs || {
      anime: {
        label: "Anime",
        prompts: d.prompts || [],
        characters: d.characters || [],
        modifiers: d.modifiers || []
      }
    };
  }

  function applyPack(packId) {
    const packs = getPacks();
    const pack = packs[packId];
    if (!pack) return;

    state.packId = packId;
    state.packLabel = pack.label || packId;

    // Reset pools for chosen pack
    state.availablePrompts = [...pack.prompts];
    state.availableCharacters = [...pack.characters];
    state.availableModifiers = [...pack.modifiers];

    state.usedPrompts = [];
    state.usedCharacters = [];
    state.usedModifiers = [];

    // Clear board but keep names/scores
    clearBoardOnly();

    // Reset rounds + endgame flags
    state.round = 1;
    state.gameOver = false;
    state.tiebreakMode = false;
    state.winners = [];

    saveState();
  }

  // --- Pack init (run once on load) ---
  const packSelect = document.getElementById("packSelect");
  const packs = getPacks();

  if (packSelect) {
    // Fill dropdown
    packSelect.innerHTML = "";
    Object.entries(packs).forEach(([id, p]) => {
      const o = document.createElement("option");
      o.value = id;
      o.textContent = p.label || id;
      packSelect.appendChild(o);
    });

    // Ensure state has a packId
    if (!state.packId) state.packId = "anime";

    // Set UI selected value
    packSelect.value = state.packId;

    // IMPORTANT:
    // Only applyPack if current state pools don't match the pack structure (first run),
    // otherwise you'd wipe progress every refresh.
    if (window.ANIME_DEBATE_DATA?.packs) {
      // If this save came from an older version or pools are missing, rehydrate from pack
      const needsRehydrate =
        !Array.isArray(state.availablePrompts) ||
        !Array.isArray(state.availableCharacters) ||
        !Array.isArray(state.availableModifiers);

      if (needsRehydrate) {
        applyPack(state.packId);
      } else {
        // keep label in sync
        const p = packs[state.packId];
        state.packLabel = p?.label || state.packId;
      }
    }

    // On change, switch pack (this WILL reset pools/round)
    packSelect.addEventListener("change", (e) => {
      applyPack(e.target.value);
    });
  }

  // --- Bind events ---
  btnGenerate.addEventListener("click", generateRound);
  btnLock.addEventListener("click", lockPicks);
  btnRevealMod.addEventListener("click", revealModifier);
  btnNext.addEventListener("click", nextRound);
  btnRestart.addEventListener("click", restartGame);
  btnClearUsed.addEventListener("click", clearUsedPools);
  btnResetScores.addEventListener("click", resetScores);
  btnClearBoard.addEventListener("click", clearBoardOnly);

  document.getElementById("btnCheckWinner").addEventListener("click", () => {
    checkWinnerAndMaybeTiebreak();
  });

  // Initial render
  render();
  setHint("Ready. Click Generate Round.");
})();
