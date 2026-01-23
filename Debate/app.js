// debate_v2_app.js
(() => {
  const DATA = window.ANIME_DEBATE_DATA || {};
  
  // Data is stored in packs - combine all active packs
  // For now, use the anime pack as the primary source
  const animePack = DATA.packs?.anime || {};
  const ALL_PROMPTS = Array.isArray(animePack.prompts) ? animePack.prompts.slice() : [];
  const ALL_CHARS = Array.isArray(animePack.characters) ? animePack.characters.slice() : [];
  const ALL_MODS = Array.isArray(animePack.modifiers) ? animePack.modifiers.slice() : [];

  // -----------------------------
  // DOM
  // -----------------------------
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

  // buttons
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

  // lobby modal
  const lobbyBackdrop = document.getElementById("lobbyBackdrop");
  const btnCloseLobby = document.getElementById("btnCloseLobby");
  const lobbyPlayerCount = document.getElementById("lobbyPlayerCount");
  const lobbyRounds = document.getElementById("lobbyRounds");
  const lobbyModEvery = document.getElementById("lobbyModEvery");
  const lobbyNames = document.getElementById("lobbyNames");
  const btnStartGame = document.getElementById("btnStartGame");

  // vote modal
  const voteBackdrop = document.getElementById("voteBackdrop");
  const btnCloseVote = document.getElementById("btnCloseVote");
  const voteBody = document.getElementById("voteBody");
  const btnAwardPoint = document.getElementById("btnAwardPoint");

  // -----------------------------
  // STATE
  // -----------------------------
  const state = {
    phase: "Lobby",         // Lobby | RoundSetup | Locked | Modifier | Voting | ReadyNext | Finished
    roundNow: 0,
    roundMax: Number(DATA.maxRounds || 10),
    modEvery: 3,            // 0 = off
    inTiebreaker: false,
    lobbyConfigured: false, // tracks if lobby setup has been completed

    // pools
    promptsAvailable: ALL_PROMPTS.slice(),
    charsAvailable: ALL_CHARS.slice(),
    modsAvailable: ALL_MODS.slice(),
    usedPromptIds: new Set(),
    usedCharKeys: new Set(),
    usedModIdx: new Set(),

    // players
    players: Array.from({length: 8}, (_, i) => ({ name: i < 4 ? `Player ${i+1}` : "", score: 0, enabled: i < 4 })),

    // current round picks
    currentPrompt: null,
    currentOptions: [],  // [{tag, char:{name,anime}, assignedIndex, locked}]
    currentModifier: null,
    modifierRevealed: false,

    voteSelectedIndexes: [],  // Array of player indexes who won the round
  };

  // -----------------------------
  // HELPERS
  // -----------------------------
  const charKey = (c) => `${(c?.name||"").trim()}|${(c?.anime||"").trim()}`;

  function activePlayers(){
    return state.players
      .map((p, idx) => ({...p, idx}))
      .filter(p => p.enabled && p.name.trim().length > 0);
  }

  function setPhase(p){
    state.phase = p;
    phasePill.textContent = p;
    syncButtons();
  }

  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }

  function pickRandomFromAvailable(list){
    if(!list.length) return null;
    const idx = Math.floor(Math.random() * list.length);
    return list.splice(idx,1)[0];
  }

  function updateCounters(){
    roundNowEl.textContent = String(state.roundNow);
    roundMaxEl.textContent = String(state.roundMax);
    promptsLeftEl.textContent = String(state.promptsAvailable.length);
    charsLeftEl.textContent = String(state.charsAvailable.length);
    modsLeftEl.textContent = String(state.modsAvailable.length);

    usedPromptsEl.textContent = String(state.usedPromptIds.size);
    usedCharsEl.textContent = String(state.usedCharKeys.size);
    usedModsEl.textContent = String(state.usedModIdx.size);
  }

  function renderPlayers(){
    playersWrap.innerHTML = "";
    // Only show enabled players (those configured in lobby)
    state.players.forEach((p, idx) => {
      // Skip players that aren't enabled
      if(!p.enabled) return;
      
      const card = document.createElement("div");
      card.className = "player" + ((p.name.trim()==="") ? " disabled" : "");

      const top = document.createElement("div");
      top.className = "player-top";

      const input = document.createElement("input");
      input.className = "player-name";
      input.type = "text";
      input.value = p.name;
      input.placeholder = `Player ${idx+1}`;

      // IMPORTANT: do not rerender whole UI on each keystroke
      input.addEventListener("input", () => {
        state.players[idx].name = input.value;
        state.players[idx].enabled = input.value.trim().length > 0;
        if(!state.players[idx].enabled){
          state.players[idx].score = 0;
          // clear any assignments pointing to this player
          state.currentOptions.forEach(opt => {
            if(opt.assignedIndex === idx) opt.assignedIndex = null;
          });
        }
        // update only dependent parts
        renderPlayersLight();
        renderOptions(); // refresh dropdown list (removes disabled)
        updateCounters();
      });

      top.appendChild(input);
      card.appendChild(top);

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
        if(!enabled) return;
        state.players[idx].score = Math.max(0, state.players[idx].score - 1);
        num.textContent = String(state.players[idx].score);
      });
      plus.addEventListener("click", () => {
        if(!enabled) return;
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

  function renderPlayersLight(){
    // update score buttons disable state + placeholders without rebuilding inputs focus issues
    // simplest: re-render fully but ONLY when not typing? We'll keep it minimal:
    // For now, we won't touch DOM here—renderOptions handles dropdown.
    // (Kept for future expansions.)
  }

  function renderPrompt(){
    if(!state.currentPrompt){
      promptTextEl.innerHTML = "—";
      promptSourceEl.textContent = "—";
      promptExplEl.textContent = "—";
      return;
    }
    promptTextEl.textContent = state.currentPrompt.prompt;
    promptSourceEl.textContent = `Source: ${state.currentPrompt.source}`;
    promptExplEl.textContent = state.currentPrompt.explanation;
  }

  function renderModifier(){
    const isModRound = state.modEvery > 0 && state.roundNow > 0 && (state.roundNow % state.modEvery === 0);
    roundTypePill.textContent = isModRound ? "Modifier Round" : "Normal Round";

    if(!isModRound || !state.modifierRevealed){
      modifierBox.classList.add("hide");
      modifierTextEl.textContent = "—";
      return;
    }
    modifierBox.classList.remove("hide");
    modifierTextEl.textContent = state.currentModifier || "—";
  }

  function renderOptions(){
    optionsGrid.innerHTML = "";
    const actives = activePlayers();
    const buildSelect = (optIdx) => {
      const sel = document.createElement("select");
      sel.className = "select";
      // unassigned option
      const o0 = document.createElement("option");
      o0.value = "";
      o0.textContent = "Unassigned";
      sel.appendChild(o0);

      actives.forEach(p => {
        const o = document.createElement("option");
        o.value = String(p.idx);
        o.textContent = p.name;
        sel.appendChild(o);
      });

      // set value
      const assigned = state.currentOptions[optIdx]?.assignedIndex;
      sel.value = (assigned === null || assigned === undefined) ? "" : String(assigned);

      sel.disabled = state.phase === "Locked" || state.phase === "Modifier" || state.phase === "Voting" || state.phase === "ReadyNext";

      sel.addEventListener("change", () => {
        const v = sel.value;
        state.currentOptions[optIdx].assignedIndex = v === "" ? null : Number(v);
      });

      return sel;
    };

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

      const assign = document.createElement("div");
      assign.className = "assign";

      const label = document.createElement("label");
      label.textContent = "Assigned to:";

      const sel = buildSelect(idx);

      assign.appendChild(label);
      assign.appendChild(sel);

      card.appendChild(tag);
      card.appendChild(name);
      card.appendChild(sub);
      card.appendChild(assign);

      optionsGrid.appendChild(card);
    });
  }

  function syncButtons(){
    const gameNotStarted = state.phase === "Lobby" && state.roundNow === 0 && !state.lobbyConfigured;
    const hasRound = state.roundNow > 0;

    // New Round: disabled only if lobby hasn't been configured yet, or game is finished
    btnNewRound.disabled = gameNotStarted || state.phase === "Finished";
    btnLock.disabled = !hasRound || !(state.phase === "RoundSetup");
    btnReveal.disabled = !hasRound || !(state.phase === "Locked") || !(state.modEvery > 0 && state.roundNow % state.modEvery === 0) || state.modifierRevealed;
    btnVoting.disabled = !hasRound || !(state.phase === "Locked" || state.phase === "Modifier");
    btnNext.disabled = !hasRound || !(state.phase === "Voting" || state.phase === "ReadyNext");
  }

  function clearBoardOnly(){
    state.currentPrompt = null;
    state.currentOptions = [];
    state.currentModifier = null;
    state.modifierRevealed = false;
    renderPrompt();
    renderModifier();
    renderOptions();
  }

  function resetPools(){
    state.promptsAvailable = ALL_PROMPTS.slice();
    state.charsAvailable = ALL_CHARS.slice();
    state.modsAvailable = ALL_MODS.slice();
    state.usedPromptIds = new Set();
    state.usedCharKeys = new Set();
    state.usedModIdx = new Set();
  }

  function startRound(){
    // pick prompt
    const prompt = pickRandomFromAvailable(state.promptsAvailable);
    if(!prompt){
      hintBox.innerHTML = "No prompts left. Click <b>Clear Used Pools</b> or <b>Restart Game</b>.";
      return;
    }
    state.currentPrompt = prompt;
    state.usedPromptIds.add(prompt.id);

    // pick 4 unique chars (not used before)
    const picks = [];
    const temp = [];
    // take a shuffled copy of available and find first 4 not used
    const shuffled = shuffle(state.charsAvailable.slice());
    for(const c of shuffled){
      if(picks.length >= 4) break;
      const k = charKey(c);
      if(state.usedCharKeys.has(k)) continue;
      picks.push(c);
    }
    if(picks.length < 4){
      hintBox.innerHTML = "Not enough unused characters left. Click <b>Clear Used Pools</b> or <b>Restart Game</b>.";
      return;
    }
    // remove picked chars from available
    picks.forEach(c => {
      const k = charKey(c);
      state.usedCharKeys.add(k);
      const idx = state.charsAvailable.findIndex(x => charKey(x) === k);
      if(idx >= 0) state.charsAvailable.splice(idx,1);
    });

    state.currentOptions = [
      { tag: "Option A", char: picks[0], assignedIndex: null },
      { tag: "Option B", char: picks[1], assignedIndex: null },
      { tag: "Option C", char: picks[2], assignedIndex: null },
      { tag: "Option D", char: picks[3], assignedIndex: null },
    ];

    // reset modifier state
    state.currentModifier = null;
    state.modifierRevealed = false;

    state.roundNow += 1;
    setPhase("RoundSetup");

    hintBox.innerHTML = "Assign options to players, then <b>Lock Picks</b>.";
    renderPrompt();
    renderModifier();
    renderOptions();
    updateCounters();
  }

  function revealModifier(){
    const isModRound = state.modEvery > 0 && state.roundNow > 0 && (state.roundNow % state.modEvery === 0);
    if(!isModRound) return;

    const mod = pickRandomFromAvailable(state.modsAvailable);
    if(!mod){
      hintBox.innerHTML = "No modifiers left. Click <b>Clear Used Pools</b> or <b>Restart Game</b>.";
      return;
    }
    state.currentModifier = mod;
    state.modifierRevealed = true;
    state.usedModIdx.add(mod);

    setPhase("Modifier");
    hintBox.innerHTML = "Modifier revealed. Debate, then <b>Start Voting</b>.";
    renderModifier();
    updateCounters();
  }

  // -----------------------------
  // LOBBY
  // -----------------------------
  function openLobby(){
    lobbyBackdrop.classList.remove("hidden");
  }
  function closeLobby(){
    lobbyBackdrop.classList.add("hidden");
  }

  function renderLobbyNames(count){
    lobbyNames.innerHTML = "";
    for(let i=0;i<count;i++){
      const wrap = document.createElement("div");
      wrap.className = "field";
      const label = document.createElement("label");
      label.textContent = `Player ${i+1} name`;
      const input = document.createElement("input");
      input.className = "input";
      input.type = "text";
      input.value = state.players[i].name || `Player ${i+1}`;
      input.addEventListener("input", () => {
        state.players[i].name = input.value;
      });
      wrap.appendChild(label);
      wrap.appendChild(input);
      lobbyNames.appendChild(wrap);
    }
  }

  function applyLobby(){
    const count = Number(lobbyPlayerCount.value);
    state.roundMax = Math.max(1, Number(lobbyRounds.value || 10));
    state.modEvery = Math.max(0, Number(lobbyModEvery.value || 3));

    // enable first N
    state.players.forEach((p, idx) => {
      if(idx < count){
        p.enabled = true;
        if(!p.name || p.name.trim()==="") p.name = `Player ${idx+1}`;
      }else{
        p.enabled = false;
        p.name = "";
        p.score = 0;
      }
    });

    // start game at round 0
    state.roundNow = 0;
    state.inTiebreaker = false;
    state.lobbyConfigured = true; // Mark lobby as configured so New Round becomes enabled
    clearBoardOnly();
    setPhase("Lobby");

    renderPlayers();
    updateCounters();
    hintBox.innerHTML = "Ready. Click <b>New Round</b> to generate a prompt + 4 random options.";
  }

  // -----------------------------
  // VOTING
  // -----------------------------
  function openVote(){
    const actives = activePlayers();
    if(!actives.length){
      hintBox.innerHTML = "No active players. Open <b>Lobby Setup</b>.";
      return;
    }
    // Reset selected winners (now an array for multiple selections)
    state.voteSelectedIndexes = [];

    voteBody.innerHTML = "";
    const list = document.createElement("div");
    list.className = "players";

    actives.forEach(p => {
      const row = document.createElement("label");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "10px";
      row.style.padding = "10px 12px";
      row.style.border = "1px solid rgba(31,41,55,.75)";
      row.style.borderRadius = "14px";
      row.style.background = "rgba(17,24,39,.45)";
      row.style.cursor = "pointer";
      row.style.marginBottom = "8px";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = String(p.idx);
      checkbox.style.width = "18px";
      checkbox.style.height = "18px";
      checkbox.addEventListener("change", () => {
        if(checkbox.checked){
          state.voteSelectedIndexes.push(Number(checkbox.value));
        } else {
          state.voteSelectedIndexes = state.voteSelectedIndexes.filter(i => i !== Number(checkbox.value));
        }
      });

      const txt = document.createElement("div");
      txt.style.fontWeight = "950";
      txt.textContent = p.name;

      row.appendChild(checkbox);
      row.appendChild(txt);
      list.appendChild(row);
    });

    voteBody.appendChild(list);

    voteBackdrop.classList.remove("hidden");
  }
  function closeVote(){
    voteBackdrop.classList.add("hidden");
  }

  function awardPoints(){
    // Award 1 point to each selected player
    if(!state.voteSelectedIndexes || state.voteSelectedIndexes.length === 0){
      hintBox.innerHTML = "No players selected. Select at least one winner or close voting.";
      return false;
    }
    
    const winners = [];
    state.voteSelectedIndexes.forEach(idx => {
      const p = state.players[idx];
      if(p && p.enabled && p.name.trim() !== ""){
        p.score += 1;
        winners.push(p.name);
      }
    });
    
    renderPlayers();
    if(winners.length === 1){
      hintBox.innerHTML = `Point awarded to <b>${winners[0]}</b>. Click <b>Next Round</b> to continue.`;
    } else {
      hintBox.innerHTML = `Points awarded to <b>${winners.join(", ")}</b>. Click <b>Next Round</b> to continue.`;
    }
    setPhase("ReadyNext");
    return true;
  }

  // -----------------------------
  // WINNER
  // -----------------------------
  function checkWinner(){
    const actives = activePlayers();
    if(!actives.length){
      hintBox.innerHTML = "No active players.";
      return;
    }
    const max = Math.max(...actives.map(p => p.score));
    const leaders = actives.filter(p => p.score === max);

    // if not done with main rounds, just show leaders
    if(state.roundNow < state.roundMax && !state.inTiebreaker){
      hintBox.innerHTML = `Current leader: <b>${leaders.map(x=>x.name).join(", ")}</b> (${max} pts).`;
      return;
    }

    if(leaders.length === 1){
      hintBox.innerHTML = `🏆 Winner: <b>${leaders[0].name}</b> with <b>${max}</b> point(s)!`;
      setPhase("Finished");
      return;
    }

    // tie -> tiebreaker
    state.inTiebreaker = true;
    state.roundMax = state.roundNow + 1; // extend one round at a time
    hintBox.innerHTML = `Tie at <b>${max}</b> between: <b>${leaders.map(x=>x.name).join(", ")}</b>. Tiebreaker round begins!`;
  }

  // -----------------------------
  // EVENTS
  // -----------------------------
  btnLobby.addEventListener("click", openLobby);
  btnCloseLobby.addEventListener("click", closeLobby);
  lobbyBackdrop.addEventListener("click", (e) => { if(e.target === lobbyBackdrop) closeLobby(); });

  btnStartGame.addEventListener("click", () => {
    applyLobby();
    closeLobby();
  });

  btnNewRound.addEventListener("click", () => {
    if(state.phase === "Lobby" && state.roundNow === 0 && !state.lobbyConfigured){
      // must configure lobby first
      hintBox.innerHTML = "Open <b>Lobby Setup</b> first.";
      return;
    }
    if(state.phase === "Finished"){
      hintBox.innerHTML = "Game finished. Click <b>Restart Game</b> to play again.";
      return;
    }
    if(!state.inTiebreaker && state.roundNow >= state.roundMax){
      hintBox.innerHTML = "Reached final round. Click <b>Check Winner</b> or start tiebreaker by voting.";
      return;
    }
    startRound();
  });

  btnLock.addEventListener("click", () => {
    if(state.phase !== "RoundSetup") return;
    setPhase("Locked");
    hintBox.innerHTML = (state.modEvery > 0 && state.roundNow % state.modEvery === 0)
      ? "Picks locked. Now <b>Reveal Modifier</b>."
      : "Picks locked. Debate, then <b>Start Voting</b>.";
    renderOptions();
    renderModifier();
  });

  btnReveal.addEventListener("click", () => revealModifier());

  btnVoting.addEventListener("click", () => {
    openVote();
    setPhase("Voting");
  });

  btnCloseVote.addEventListener("click", closeVote);
  voteBackdrop.addEventListener("click", (e) => { if(e.target === voteBackdrop) closeVote(); });

  btnAwardPoint.addEventListener("click", () => {
    if(awardPoints()){
      closeVote();
    }
  });

  btnNext.addEventListener("click", () => {
    if(!(state.phase === "Voting" || state.phase === "ReadyNext")) return;

    // If main rounds finished, check winner automatically
    if(!state.inTiebreaker && state.roundNow >= state.roundMax){
      checkWinner();
      if(state.phase === "Finished") return;
      // tie -> allow continuing to tiebreaker
    } else if(state.inTiebreaker){
      // after a tiebreaker vote, check winner
      checkWinner();
      if(state.phase === "Finished") return;
    }

    // Automatically start the next round instead of just clearing board
    clearBoardOnly();
    startRound();
  });

  btnCheckWinner.addEventListener("click", checkWinner);

  btnRestart.addEventListener("click", () => {
    resetPools();
    state.players.forEach(p => { p.score = 0; });
    state.roundNow = 0;
    state.roundMax = Number(lobbyRounds.value || DATA.maxRounds || 10);
    state.inTiebreaker = false;
    state.lobbyConfigured = false; // Reset so user must go through lobby again
    clearBoardOnly();
    setPhase("Lobby");
    renderPlayers();
    updateCounters();
    hintBox.innerHTML = "Restarted. Open <b>Lobby Setup</b> to configure players.";
  });

  btnClearUsed.addEventListener("click", () => {
    resetPools();
    updateCounters();
    hintBox.innerHTML = "Used pools cleared.";
  });

  btnClearBoard.addEventListener("click", () => {
    clearBoardOnly();
    hintBox.innerHTML = "Board cleared.";
  });

  // -----------------------------
  // INIT
  // -----------------------------
  // populate lobby player count
  for(let i=2;i<=8;i++){
    const o=document.createElement("option");
    o.value=String(i);
    o.textContent=String(i);
    lobbyPlayerCount.appendChild(o);
  }
  lobbyPlayerCount.value="4";
  lobbyPlayerCount.addEventListener("change", () => renderLobbyNames(Number(lobbyPlayerCount.value)));
  renderLobbyNames(4);

  // set initial counts
  resetPools();
  updateCounters();
  renderPlayers();
  setPhase("Lobby");

})();