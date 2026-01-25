// debate_app.js - Updated with auto-assign, auto-points, and modifier toggle
(() => {
  'use strict';

  // =====================================================
  // PACK SYSTEM
  // =====================================================
  const DATA = window.ANIME_DEBATE_DATA || {};
  const PACKS = DATA.packs || {};
  let currentPackKey = 'anime';
  let currentPack = PACKS[currentPackKey] || {};

  // Active pools
  let ALL_PROMPTS = [];
  let ALL_CHARS = [];
  let ALL_MODS = [];

  function loadPack(key) {
    currentPackKey = key;
    currentPack = PACKS[key] || PACKS.anime || {};
    ALL_PROMPTS = Array.isArray(currentPack.prompts) ? currentPack.prompts.slice() : [];
    ALL_CHARS = Array.isArray(currentPack.characters) ? currentPack.characters.slice() : [];
    ALL_MODS = Array.isArray(currentPack.modifiers) ? currentPack.modifiers.slice() : [];
  }

  // Initialize pack data
  loadPack('anime');

  // =====================================================
  // DOM ELEMENTS
  // =====================================================
  const phasePill = document.getElementById("phasePill");
  const roundNowEl = document.getElementById("roundNow");
  const roundMaxEl = document.getElementById("roundMax");
  const promptsLeftEl = document.getElementById("promptsLeft");
  const charsLeftEl = document.getElementById("charsLeft");
  const modsLeftEl = document.getElementById("modsLeft");
  const roundTypePill = document.getElementById("roundTypePill");

  const promptTextEl = document.getElementById("promptText");
  const promptSourceEl = document.getElementById("promptSource");
  const promptExplEl = document.getElementById("promptExpl");

  const modifierBox = document.getElementById("modifierBox");
  const modifierTextEl = document.getElementById("modifierText");

  const optionsGrid = document.getElementById("optionsGrid");

  const playersWrap = document.getElementById("playersWrap");
  const usedPromptsEl = document.getElementById("usedPrompts");
  const usedCharsEl = document.getElementById("usedChars");
  const usedModsEl = document.getElementById("usedMods");
  const hintBox = document.getElementById("hintBox");

  // Buttons
  const btnLobby = document.getElementById("btnLobby");
  const btnNewRound = document.getElementById("btnNewRound");
  const btnLock = document.getElementById("btnLock");
  const btnReveal = document.getElementById("btnReveal");
  const btnVoting = document.getElementById("btnVoting");
  const btnNext = document.getElementById("btnNext");
  const btnCheckWinner = document.getElementById("btnCheckWinner");
  const btnRestart = document.getElementById("btnRestart");
  const btnClearUsed = document.getElementById("btnClearUsed");
  const btnClearBoard = document.getElementById("btnClearBoard");

  // Lobby modal
  const lobbyBackdrop = document.getElementById("lobbyBackdrop");
  const btnCloseLobby = document.getElementById("btnCloseLobby");
  const lobbyPackSelect = document.getElementById("lobbyPackSelect");
  const lobbyPlayerCount = document.getElementById("lobbyPlayerCount");
  const lobbyRounds = document.getElementById("lobbyRounds");
  const lobbyModToggle = document.getElementById("lobbyModToggle");
  const lobbyNames = document.getElementById("lobbyNames");
  const btnStartGame = document.getElementById("btnStartGame");

  // Vote modal
  const voteBackdrop = document.getElementById("voteBackdrop");
  const btnCloseVote = document.getElementById("btnCloseVote");
  const voteBody = document.getElementById("voteBody");
  const btnAwardPoint = document.getElementById("btnAwardPoint");

  // =====================================================
  // STATE
  // =====================================================
  const state = {
    phase: "Lobby",
    roundNow: 0,
    roundMax: Number(DATA.maxRounds || 10),
    modifiersEnabled: true,  // Toggle instead of frequency
    inTiebreaker: false,
    lobbyConfigured: false,

    // Pools
    promptsAvailable: [],
    charsAvailable: [],
    modsAvailable: [],
    usedPromptIds: new Set(),
    usedCharKeys: new Set(),
    usedModIdx: new Set(),

    // Players
    players: Array.from({length: 8}, (_, i) => ({ name: i < 4 ? `Player ${i+1}` : "", score: 0, enabled: i < 4 })),

    // Current round
    currentPrompt: null,
    currentOptions: [],  // Now includes assignedPlayerIndex automatically
    currentModifier: null,
    modifierRevealed: false,

    voteSelectedIndexes: [],
  };

  // =====================================================
  // HELPERS
  // =====================================================
  const charKey = (c) => `${(c?.name||"").trim()}|${(c?.anime||"").trim()}`;

  function activePlayers() {
    return state.players
      .map((p, idx) => ({...p, idx}))
      .filter(p => p.enabled && p.name.trim().length > 0);
  }

  function setPhase(p) {
    state.phase = p;
    phasePill.textContent = p;
    syncButtons();
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickRandomFromAvailable(list) {
    if (!list.length) return null;
    const idx = Math.floor(Math.random() * list.length);
    return list.splice(idx, 1)[0];
  }

  function updateCounters() {
    roundNowEl.textContent = String(state.roundNow);
    roundMaxEl.textContent = String(state.roundMax);
    promptsLeftEl.textContent = String(state.promptsAvailable.length);
    charsLeftEl.textContent = String(state.charsAvailable.length);
    modsLeftEl.textContent = String(state.modsAvailable.length);

    usedPromptsEl.textContent = String(state.usedPromptIds.size);
    usedCharsEl.textContent = String(state.usedCharKeys.size);
    usedModsEl.textContent = String(state.usedModIdx.size);
  }

  // =====================================================
  // RENDER FUNCTIONS
  // =====================================================
  function renderPlayers() {
    playersWrap.innerHTML = "";
    state.players.forEach((p, idx) => {
      if (!p.enabled) return;

      const card = document.createElement("div");
      card.className = "player" + ((p.name.trim() === "") ? " disabled" : "");

      const top = document.createElement("div");
      top.className = "player-top";

      const input = document.createElement("input");
      input.className = "player-name";
      input.type = "text";
      input.value = p.name;
      input.placeholder = `Player ${idx + 1}`;

      input.addEventListener("input", () => {
        state.players[idx].name = input.value;
        state.players[idx].enabled = input.value.trim().length > 0;
        if (!state.players[idx].enabled) {
          state.players[idx].score = 0;
          state.currentOptions.forEach(opt => {
            if (opt.assignedPlayerIndex === idx) opt.assignedPlayerIndex = null;
          });
        }
        renderOptions();
        updateCounters();
      });

      top.appendChild(input);
      card.appendChild(top);

      // Manual point controls (host can still adjust)
      const pts = document.createElement("div");
      pts.className = "points";

      const minus = document.createElement("button");
      minus.textContent = "−";
      const plus = document.createElement("button");
      plus.textContent = "+";

      const num = document.createElement("div");
      num.className = "num";
      num.textContent = String(p.score);

      const enabled = p.name.trim().length > 0;
      minus.disabled = !enabled;
      plus.disabled = !enabled;

      minus.addEventListener("click", () => {
        if (!enabled) return;
        state.players[idx].score = Math.max(0, state.players[idx].score - 1);
        num.textContent = String(state.players[idx].score);
      });
      plus.addEventListener("click", () => {
        if (!enabled) return;
        state.players[idx].score = state.players[idx].score + 1;
        num.textContent = String(state.players[idx].score);
      });

      pts.appendChild(minus);
      pts.appendChild(num);
      pts.appendChild(plus);

      card.appendChild(pts);
      playersWrap.appendChild(card);
    });
  }

  function renderPrompt() {
    if (!state.currentPrompt) {
      promptTextEl.innerHTML = "—";
      promptSourceEl.textContent = "—";
      promptExplEl.textContent = "—";
      return;
    }
    promptTextEl.textContent = state.currentPrompt.prompt;
    promptSourceEl.textContent = `Source: ${state.currentPrompt.source}`;
    promptExplEl.textContent = state.currentPrompt.explanation;
  }

  function renderModifier() {
    // Update pill to show if modifiers are enabled
    if (state.modifiersEnabled) {
      roundTypePill.textContent = state.modifierRevealed ? "Modifier Active" : "Modifier Ready";
      roundTypePill.style.borderColor = state.modifierRevealed ? "rgba(245,158,11,.55)" : "rgba(34,197,94,.35)";
    } else {
      roundTypePill.textContent = "Modifiers Off";
      roundTypePill.style.borderColor = "rgba(31,41,55,.75)";
    }

    if (!state.modifiersEnabled || !state.modifierRevealed) {
      modifierBox.classList.add("hide");
      modifierTextEl.textContent = "—";
      return;
    }
    modifierBox.classList.remove("hide");
    modifierTextEl.textContent = state.currentModifier || "—";
  }

  function renderOptions() {
    optionsGrid.innerHTML = "";

    state.currentOptions.forEach((opt, idx) => {
      const card = document.createElement("div");
      card.className = "option";

      const tag = document.createElement("div");
      tag.className = "tag";
      tag.textContent = opt.tag;

      const name = document.createElement("div");
      name.className = "name";
      name.textContent = opt.char.name;

      const sub = document.createElement("div");
      sub.className = "sub";
      sub.textContent = `Anime: ${opt.char.anime || "—"}`;

      // Show assigned player name (auto-assigned)
      const assign = document.createElement("div");
      assign.className = "assign";
      
      const assignLabel = document.createElement("div");
      assignLabel.className = "assign-label";
      
      const player = opt.assignedPlayerIndex !== null ? state.players[opt.assignedPlayerIndex] : null;
      if (player && player.name) {
        assignLabel.innerHTML = `<span class="assign-to">Assigned to:</span> <span class="assign-name">${player.name}</span>`;
      } else {
        assignLabel.innerHTML = `<span class="assign-to">Assigned to:</span> <span class="assign-name muted">Unassigned</span>`;
      }
      
      assign.appendChild(assignLabel);

      card.appendChild(tag);
      card.appendChild(name);
      card.appendChild(sub);
      card.appendChild(assign);

      optionsGrid.appendChild(card);
    });
  }

  function syncButtons() {
    const gameNotStarted = state.phase === "Lobby" && state.roundNow === 0 && !state.lobbyConfigured;
    const hasRound = state.roundNow > 0;

    btnNewRound.disabled = gameNotStarted || state.phase === "Finished";
    btnLock.disabled = !hasRound || !(state.phase === "RoundSetup");
    
    // Reveal modifier: enabled if modifiers are on, round active, not already revealed
    btnReveal.disabled = !hasRound || !state.modifiersEnabled || state.modifierRevealed || state.phase === "Lobby" || state.phase === "Finished";
    
    btnVoting.disabled = !hasRound || !(state.phase === "Locked" || state.phase === "Modifier" || state.phase === "RoundSetup");
    btnNext.disabled = !hasRound || !(state.phase === "Voting" || state.phase === "ReadyNext");
  }

  // =====================================================
  // GAME LOGIC
  // =====================================================
  function clearBoardOnly() {
    state.currentPrompt = null;
    state.currentOptions = [];
    state.currentModifier = null;
    state.modifierRevealed = false;
    renderPrompt();
    renderModifier();
    renderOptions();
  }

  function resetPools() {
    state.promptsAvailable = ALL_PROMPTS.slice();
    state.charsAvailable = ALL_CHARS.slice();
    state.modsAvailable = ALL_MODS.slice();
    state.usedPromptIds = new Set();
    state.usedCharKeys = new Set();
    state.usedModIdx = new Set();
  }

  function startRound() {
    const actives = activePlayers();
    if (actives.length < 2) {
      hintBox.innerHTML = "Need at least 2 active players. Check <b>Lobby Setup</b>.";
      return;
    }

    // Pick prompt
    const prompt = pickRandomFromAvailable(state.promptsAvailable);
    if (!prompt) {
      hintBox.innerHTML = "No prompts left. Click <b>Clear Used Pools</b> or <b>Restart Game</b>.";
      return;
    }
    state.currentPrompt = prompt;
    state.usedPromptIds.add(prompt.id);

    // Pick characters - ONE per player (not always 4)
    const numPlayers = actives.length;
    const picks = [];
    const shuffled = shuffle(state.charsAvailable.slice());
    for (const c of shuffled) {
      if (picks.length >= numPlayers) break;  // Only pick as many as players
      const k = charKey(c);
      if (state.usedCharKeys.has(k)) continue;
      picks.push(c);
    }
    if (picks.length < numPlayers) {
      hintBox.innerHTML = "Not enough unused characters left. Click <b>Clear Used Pools</b> or <b>Restart Game</b>.";
      return;
    }

    picks.forEach(c => {
      const k = charKey(c);
      state.usedCharKeys.add(k);
      const idx = state.charsAvailable.findIndex(x => charKey(x) === k);
      if (idx >= 0) state.charsAvailable.splice(idx, 1);
    });

    // AUTO-ASSIGN: Shuffle players and assign exactly 1 character per player
    const shuffledPlayers = shuffle(actives.slice());
    const tags = ["Option A", "Option B", "Option C", "Option D", "Option E", "Option F", "Option G", "Option H"];
    
    state.currentOptions = picks.map((char, i) => ({
      tag: tags[i] || `Option ${i + 1}`,
      char: char,
      // Each player gets exactly 1 character
      assignedPlayerIndex: shuffledPlayers[i].idx
    }));

    // Reset modifier state for new round
    state.currentModifier = null;
    state.modifierRevealed = false;

    state.roundNow += 1;
    setPhase("RoundSetup");

    hintBox.innerHTML = "Each player has 1 character! Debate, then <b>Start Voting</b>. Host can <b>Reveal Modifier</b> anytime.";
    renderPrompt();
    renderModifier();
    renderOptions();
    updateCounters();
  }

  function revealModifier() {
    if (!state.modifiersEnabled) {
      hintBox.innerHTML = "Modifiers are disabled for this game.";
      return;
    }
    if (state.modifierRevealed) {
      hintBox.innerHTML = "Modifier already revealed this round.";
      return;
    }

    const mod = pickRandomFromAvailable(state.modsAvailable);
    if (!mod) {
      hintBox.innerHTML = "No modifiers left. Click <b>Clear Used Pools</b> to reset.";
      return;
    }
    state.currentModifier = mod;
    state.modifierRevealed = true;
    state.usedModIdx.add(mod);

    setPhase("Modifier");
    hintBox.innerHTML = "🎲 <b>Modifier revealed!</b> Factor this into your debate!";
    renderModifier();
    updateCounters();
    syncButtons();
  }

  // =====================================================
  // LOBBY
  // =====================================================
  function openLobby() {
    lobbyBackdrop.classList.remove("hidden");
  }

  function closeLobby() {
    lobbyBackdrop.classList.add("hidden");
  }

  function renderLobbyNames(count) {
    if (!lobbyNames) return;
    lobbyNames.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const wrap = document.createElement("div");
      wrap.className = "field";
      const label = document.createElement("label");
      label.textContent = `Player ${i + 1} name`;
      const input = document.createElement("input");
      input.className = "input";
      input.type = "text";
      input.value = state.players[i]?.name || `Player ${i + 1}`;
      input.addEventListener("input", () => {
        state.players[i].name = input.value;
      });
      wrap.appendChild(label);
      wrap.appendChild(input);
      lobbyNames.appendChild(wrap);
    }
  }

  function applyLobbyAndStart() {
    // Load selected pack
    loadPack(lobbyPackSelect.value);
    resetPools();

    const count = Number(lobbyPlayerCount.value);
    state.roundMax = Math.max(1, Number(lobbyRounds.value || 10));
    state.modifiersEnabled = lobbyModToggle.value === "on";

    // Enable first N players
    state.players.forEach((p, idx) => {
      if (idx < count) {
        p.enabled = true;
        if (!p.name || p.name.trim() === "") p.name = `Player ${idx + 1}`;
      } else {
        p.enabled = false;
        p.name = "";
        p.score = 0;
      }
    });

    // Reset game state
    state.roundNow = 0;
    state.inTiebreaker = false;
    state.lobbyConfigured = true;
    state.players.forEach(p => p.score = 0);

    clearBoardOnly();
    renderPlayers();
    updateCounters();

    // Close lobby and AUTO-START first round
    closeLobby();
    startRound();
  }

  // =====================================================
  // VOTING (with auto-award points)
  // =====================================================
  function openVote() {
    const actives = activePlayers();
    if (!actives.length) {
      hintBox.innerHTML = "No active players. Open <b>Lobby Setup</b>.";
      return;
    }

    state.voteSelectedIndexes = [];

    voteBody.innerHTML = "";
    
    // Header
    const header = document.createElement("div");
    header.className = "vote-header";
    header.innerHTML = "<p class='muted small'>Select all players whose character choices can succeed with the prompt. Points will be awarded automatically.</p>";
    voteBody.appendChild(header);

    const list = document.createElement("div");
    list.className = "players";

    actives.forEach(p => {
      // Find which character this player has
      const playerOption = state.currentOptions.find(opt => opt.assignedPlayerIndex === p.idx);
      
      const row = document.createElement("label");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "12px";
      row.style.padding = "12px 14px";
      row.style.border = "1px solid rgba(31,41,55,.75)";
      row.style.borderRadius = "14px";
      row.style.background = "rgba(17,24,39,.45)";
      row.style.cursor = "pointer";
      row.style.marginBottom = "10px";
      row.style.transition = "border-color .15s ease, background .15s ease";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = String(p.idx);
      checkbox.style.width = "20px";
      checkbox.style.height = "20px";
      checkbox.style.accentColor = "#22c55e";
      
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          state.voteSelectedIndexes.push(Number(checkbox.value));
          row.style.borderColor = "rgba(34,197,94,.55)";
          row.style.background = "rgba(34,197,94,.08)";
        } else {
          state.voteSelectedIndexes = state.voteSelectedIndexes.filter(i => i !== Number(checkbox.value));
          row.style.borderColor = "rgba(31,41,55,.75)";
          row.style.background = "rgba(17,24,39,.45)";
        }
      });

      const info = document.createElement("div");
      info.style.flex = "1";
      
      const playerName = document.createElement("div");
      playerName.style.fontWeight = "950";
      playerName.style.fontSize = "16px";
      playerName.textContent = p.name;
      
      const charInfo = document.createElement("div");
      charInfo.style.fontSize = "13px";
      charInfo.style.color = "rgba(229,231,235,.7)";
      charInfo.style.marginTop = "4px";
      if (playerOption) {
        charInfo.textContent = `${playerOption.tag}: ${playerOption.char.name} (${playerOption.char.anime})`;
      } else {
        charInfo.textContent = "No character assigned";
      }
      
      info.appendChild(playerName);
      info.appendChild(charInfo);

      row.appendChild(checkbox);
      row.appendChild(info);
      list.appendChild(row);
    });

    voteBody.appendChild(list);
    voteBackdrop.classList.remove("hidden");
  }

  function closeVote() {
    voteBackdrop.classList.add("hidden");
  }

  function awardPoints() {
    if (!state.voteSelectedIndexes || state.voteSelectedIndexes.length === 0) {
      hintBox.innerHTML = "No players selected. Select at least one winner or close voting.";
      return false;
    }

    const winners = [];
    state.voteSelectedIndexes.forEach(idx => {
      const p = state.players[idx];
      if (p && p.enabled && p.name.trim() !== "") {
        p.score += 1;  // AUTO-AWARD point
        winners.push(p.name);
      }
    });

    renderPlayers();
    
    if (winners.length === 1) {
      hintBox.innerHTML = `🎉 <b>${winners[0]}</b> wins the round! (+1 point) Click <b>Next Round</b>.`;
    } else {
      hintBox.innerHTML = `🎉 <b>${winners.join(", ")}</b> all win! (+1 point each) Click <b>Next Round</b>.`;
    }
    setPhase("ReadyNext");
    return true;
  }

  // =====================================================
  // WINNER CHECK
  // =====================================================
  function checkWinner() {
    const actives = activePlayers();
    if (!actives.length) {
      hintBox.innerHTML = "No active players.";
      return;
    }
    const max = Math.max(...actives.map(p => p.score));
    const leaders = actives.filter(p => p.score === max);

    if (state.roundNow < state.roundMax && !state.inTiebreaker) {
      hintBox.innerHTML = `Current leader: <b>${leaders.map(x => x.name).join(", ")}</b> (${max} pts).`;
      return;
    }

    if (leaders.length === 1) {
      hintBox.innerHTML = `🏆 <b>WINNER: ${leaders[0].name}</b> with <b>${max}</b> point(s)!`;
      setPhase("Finished");
      return;
    }

    // Tie -> tiebreaker
    state.inTiebreaker = true;
    state.roundMax = state.roundNow + 1;
    hintBox.innerHTML = `⚔️ Tie at <b>${max}</b> between: <b>${leaders.map(x => x.name).join(", ")}</b>. Tiebreaker round!`;
  }

  // =====================================================
  // EVENT HANDLERS
  // =====================================================
  btnLobby.addEventListener("click", openLobby);
  btnCloseLobby.addEventListener("click", closeLobby);
  lobbyBackdrop.addEventListener("click", (e) => { if (e.target === lobbyBackdrop) closeLobby(); });

  btnStartGame.addEventListener("click", () => {
    applyLobbyAndStart();
  });

  btnNewRound.addEventListener("click", () => {
    if (state.phase === "Lobby" && state.roundNow === 0 && !state.lobbyConfigured) {
      hintBox.innerHTML = "Open <b>Lobby Setup</b> first.";
      return;
    }
    if (state.phase === "Finished") {
      hintBox.innerHTML = "Game finished. Click <b>Restart Game</b> to play again.";
      return;
    }
    if (!state.inTiebreaker && state.roundNow >= state.roundMax) {
      hintBox.innerHTML = "Reached final round. Click <b>Check Winner</b>.";
      return;
    }
    startRound();
  });

  // Lock is now optional - can go straight to voting
  btnLock.addEventListener("click", () => {
    if (state.phase !== "RoundSetup") return;
    setPhase("Locked");
    hintBox.innerHTML = "Picks locked. Debate! Host can <b>Reveal Modifier</b> or <b>Start Voting</b>.";
    renderOptions();
    renderModifier();
  });

  btnReveal.addEventListener("click", () => revealModifier());

  btnVoting.addEventListener("click", () => {
    openVote();
    setPhase("Voting");
  });

  btnCloseVote.addEventListener("click", closeVote);
  voteBackdrop.addEventListener("click", (e) => { if (e.target === voteBackdrop) closeVote(); });

  btnAwardPoint.addEventListener("click", () => {
    if (awardPoints()) {
      closeVote();
    }
  });

  btnNext.addEventListener("click", () => {
    if (!(state.phase === "Voting" || state.phase === "ReadyNext")) return;

    if (!state.inTiebreaker && state.roundNow >= state.roundMax) {
      checkWinner();
      if (state.phase === "Finished") return;
    } else if (state.inTiebreaker) {
      checkWinner();
      if (state.phase === "Finished") return;
    }

    // Auto-start next round
    clearBoardOnly();
    startRound();
  });

  btnCheckWinner.addEventListener("click", checkWinner);

  // Restart opens Lobby
  btnRestart.addEventListener("click", () => {
    resetPools();
    state.players.forEach(p => { p.score = 0; });
    state.roundNow = 0;
    state.roundMax = Number(lobbyRounds.value || DATA.maxRounds || 10);
    state.inTiebreaker = false;
    state.lobbyConfigured = false;
    state.modifierRevealed = false;
    clearBoardOnly();
    setPhase("Lobby");
    renderPlayers();
    updateCounters();
    hintBox.innerHTML = "Restarted. Configure <b>Lobby Setup</b> to play again.";
    openLobby();
  });

  btnClearUsed.addEventListener("click", () => {
    resetPools();
    updateCounters();
    hintBox.innerHTML = "Used pools cleared. All prompts, characters, and modifiers available again.";
  });

  btnClearBoard.addEventListener("click", () => {
    clearBoardOnly();
    hintBox.innerHTML = "Board cleared.";
  });

  // =====================================================
  // INIT
  // =====================================================
  function init() {
    // Populate pack select dropdown
    if (lobbyPackSelect) {
      lobbyPackSelect.innerHTML = "";
      Object.keys(PACKS).forEach(k => {
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = PACKS[k].label || k;
        lobbyPackSelect.appendChild(opt);
      });
      lobbyPackSelect.value = currentPackKey;
    }

    // Populate player count dropdown
    if (lobbyPlayerCount) {
      lobbyPlayerCount.innerHTML = "";
      for (let i = 2; i <= 8; i++) {
        const o = document.createElement("option");
        o.value = String(i);
        o.textContent = String(i);
        if (i === 4) o.selected = true;
        lobbyPlayerCount.appendChild(o);
      }
      lobbyPlayerCount.addEventListener("change", () => renderLobbyNames(Number(lobbyPlayerCount.value)));
    }

    // Initialize player names in lobby
    renderLobbyNames(4);
    
    // Reset pools and counters
    resetPools();
    updateCounters();
    renderPlayers();
    setPhase("Lobby");

    // AUTO-OPEN LOBBY on page load
    openLobby();
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
