// crown_app.js - Crown the King Tournament Game
(() => {
  'use strict';

  const DATA = window.CROWN_DATA || { packs: {} };
  const PACKS = DATA.packs || {};

  // =====================================================
  // STATE
  // =====================================================
  const state = {
    phase: "Lobby",
    packKey: "anime",
    tournamentType: "characters",
    bracketSize: 16,
    categoryId: "strongest",
    newCategoryEveryRound: false,
    selectionMode: "random",
    players: [],
    bracket: [],
    currentRound: 0,
    currentMatchup: 0,
    competitors: [],
    matchA: null,
    matchB: null,
    votes: {},
    matchWinner: null,
    categories: [],
    currentCategory: null,
    hostPicks: [],
  };

  // =====================================================
  // DOM ELEMENTS
  // =====================================================
  const $ = (id) => document.getElementById(id);
  const phasePill = $("phasePill");
  const roundPill = $("roundPill");
  const matchupPill = $("matchupPill");
  const categoryPill = $("categoryPill");
  const mainPanelTitle = $("mainPanelTitle");
  const mainPanelSub = $("mainPanelSub");
  const bracketView = $("bracketView");
  const bracketContainer = $("bracketContainer");
  const matchupView = $("matchupView");
  const championView = $("championView");
  const categoryQuestion = $("categoryQuestion");
  const cardA = $("cardA");
  const cardB = $("cardB");
  const imageA = $("imageA");
  const imageB = $("imageB");
  const nameA = $("nameA");
  const nameB = $("nameB");
  const subA = $("subA");
  const subB = $("subB");
  const votesA = $("votesA");
  const votesB = $("votesB");
  const winnerBanner = $("winnerBanner");
  const matchWinnerName = $("matchWinnerName");
  const championImage = $("championImage");
  const championName = $("championName");
  const championSub = $("championSub");
  const championCategory = $("championCategory");
  const btnLobby = $("btnLobby");
  const btnShowBracket = $("btnShowBracket");
  const btnStartMatchup = $("btnStartMatchup");
  const btnStartVote = $("btnStartVote");
  const btnRevealWinner = $("btnRevealWinner");
  const btnNextMatchup = $("btnNextMatchup");
  const btnRestart = $("btnRestart");
  const hintBox = $("hintBox");
  const categorySelect = $("categorySelect");
  const btnRandomCategory = $("btnRandomCategory");
  const voteGrid = $("voteGrid");
  const infoType = $("infoType");
  const infoBracketSize = $("infoBracketSize");
  const infoRemaining = $("infoRemaining");
  const lobbyBackdrop = $("lobbyBackdrop");
  const btnCloseLobby = $("btnCloseLobby");
  const lobbyPack = $("lobbyPack");
  const lobbyType = $("lobbyType");
  const lobbyBracketSize = $("lobbyBracketSize");
  const lobbyCategory = $("lobbyCategory");
  const lobbyNewCategory = $("lobbyNewCategory");
  const lobbySelectionMode = $("lobbySelectionMode");
  const lobbyPlayerCount = $("lobbyPlayerCount");
  const lobbyNames = $("lobbyNames");
  const btnStartTournament = $("btnStartTournament");
  const picksBackdrop = $("picksBackdrop");
  const btnClosePicks = $("btnClosePicks");
  const picksNeeded = $("picksNeeded");
  const picksSearch = $("picksSearch");
  const picksCount = $("picksCount");
  const picksGrid = $("picksGrid");
  const btnClearPicks = $("btnClearPicks");
  const btnConfirmPicks = $("btnConfirmPicks");

  // =====================================================
  // HELPERS
  // =====================================================
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function setPhase(p) {
    state.phase = p;
    phasePill.textContent = p;
    syncButtons();
  }

  function getPack() {
    return PACKS[state.packKey] || {};
  }

  function getTypeData() {
    const pack = getPack();
    return pack[state.tournamentType] || { categories: [], entries: [] };
  }

  function getEntryDisplay(entry) {
    if (!entry) return { name: "TBD", sub: "", image: "" };
    if (state.tournamentType === "characters") {
      return { name: entry.name, sub: entry.anime || "", image: entry.imageUrl || "" };
    } else {
      return { name: entry.name, sub: "Anime Series", image: entry.imageUrl || "" };
    }
  }

  function getRoundName(roundIndex, totalRounds) {
    const remaining = totalRounds - roundIndex;
    if (remaining === 1) return "Finals";
    if (remaining === 2) return "Semifinals";
    if (remaining === 3) return "Quarterfinals";
    return `Round ${roundIndex + 1}`;
  }

  function getCategory(id) {
    return state.categories.find(c => c.id === id) || null;
  }

  function pickRandomCategory() {
    const nonRandom = state.categories.filter(c => c.id !== "random");
    if (!nonRandom.length) return null;
    return nonRandom[Math.floor(Math.random() * nonRandom.length)];
  }

  // =====================================================
  // RENDER FUNCTIONS
  // =====================================================
  function renderPills() {
    const totalRounds = state.bracket.length;
    roundPill.textContent = totalRounds > 0 ? getRoundName(state.currentRound, totalRounds) : "—";
    const currentRoundMatchups = state.bracket[state.currentRound] || [];
    matchupPill.textContent = currentRoundMatchups.length > 0 
      ? `${state.currentMatchup + 1} / ${currentRoundMatchups.length}` : "—";
    categoryPill.textContent = state.currentCategory 
      ? `Category: ${state.currentCategory.label}` : "Category: —";
  }

  function renderInfo() {
    infoType.textContent = state.tournamentType === "characters" ? "Characters" : "Series";
    infoBracketSize.textContent = state.bracketSize;
    let remaining = 0;
    for (let r = state.currentRound; r < state.bracket.length; r++) {
      for (const m of state.bracket[r]) {
        if (!m.winner) remaining += (r === state.currentRound && state.bracket[r].indexOf(m) < state.currentMatchup) ? 0 : 2;
      }
    }
    infoRemaining.textContent = Math.max(2, remaining);
  }

  function renderCategories() {
    const typeData = getTypeData();
    state.categories = typeData.categories || [];
    categorySelect.innerHTML = "";
    lobbyCategory.innerHTML = "";
    for (const cat of state.categories) {
      const opt1 = document.createElement("option");
      opt1.value = cat.id;
      opt1.textContent = cat.label;
      categorySelect.appendChild(opt1);
      const opt2 = document.createElement("option");
      opt2.value = cat.id;
      opt2.textContent = cat.label;
      lobbyCategory.appendChild(opt2);
    }
    categorySelect.value = state.categoryId;
    lobbyCategory.value = state.categoryId;
  }

  function renderPlayers(count) {
    lobbyNames.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const field = document.createElement("div");
      field.className = "field";
      const label = document.createElement("label");
      label.textContent = `Player ${i + 1}`;
      const input = document.createElement("input");
      input.type = "text";
      input.className = "input";
      input.value = state.players[i]?.name || `Player ${i + 1}`;
      input.dataset.index = i;
      field.appendChild(label);
      field.appendChild(input);
      lobbyNames.appendChild(field);
    }
  }

  function renderVoteGrid() {
    voteGrid.innerHTML = "";
    if (!state.matchA || !state.matchB) return;
    const dispA = getEntryDisplay(state.matchA);
    const dispB = getEntryDisplay(state.matchB);
    for (const p of state.players) {
      const row = document.createElement("div");
      row.className = "vote-row";
      const nameSpan = document.createElement("span");
      nameSpan.className = "player-name";
      nameSpan.textContent = p.name;
      const btns = document.createElement("div");
      btns.className = "vote-btns";
      const btnA = document.createElement("button");
      btnA.className = "vote-btn" + (state.votes[p.id] === "A" ? " selected" : "");
      btnA.textContent = dispA.name.length > 12 ? dispA.name.substring(0,12) + "…" : dispA.name;
      btnA.disabled = state.phase !== "Voting";
      btnA.addEventListener("click", () => { state.votes[p.id] = "A"; renderVoteGrid(); });
      const btnB = document.createElement("button");
      btnB.className = "vote-btn" + (state.votes[p.id] === "B" ? " selected" : "");
      btnB.textContent = dispB.name.length > 12 ? dispB.name.substring(0,12) + "…" : dispB.name;
      btnB.disabled = state.phase !== "Voting";
      btnB.addEventListener("click", () => { state.votes[p.id] = "B"; renderVoteGrid(); });
      btns.appendChild(btnA);
      btns.appendChild(btnB);
      row.appendChild(nameSpan);
      row.appendChild(btns);
      voteGrid.appendChild(row);
    }
  }

  function renderBracket() {
    bracketContainer.innerHTML = "";
    if (!state.bracket.length) {
      bracketContainer.innerHTML = '<div class="muted">No bracket yet. Start a tournament.</div>';
      return;
    }
    for (let r = 0; r < state.bracket.length; r++) {
      const roundDiv = document.createElement("div");
      roundDiv.className = "bracket-round";
      const title = document.createElement("div");
      title.className = "bracket-round-title";
      title.textContent = getRoundName(r, state.bracket.length);
      roundDiv.appendChild(title);
      for (let m = 0; m < state.bracket[r].length; m++) {
        const matchup = state.bracket[r][m];
        const matchDiv = document.createElement("div");
        matchDiv.className = "bracket-matchup";
        const entryA = createBracketEntry(matchup.a, matchup.winner, r, m, "a");
        const entryB = createBracketEntry(matchup.b, matchup.winner, r, m, "b");
        matchDiv.appendChild(entryA);
        matchDiv.appendChild(entryB);
        roundDiv.appendChild(matchDiv);
      }
      bracketContainer.appendChild(roundDiv);
    }
  }

  function createBracketEntry(entry, winner, roundIdx, matchIdx, side) {
    const div = document.createElement("div");
    div.className = "bracket-entry";
    const isCurrent = roundIdx === state.currentRound && matchIdx === state.currentMatchup;
    const isWinner = winner && winner === entry;
    const isLoser = winner && winner !== entry;
    if (!entry) {
      div.classList.add("tbd");
      div.textContent = "TBD";
    } else {
      const disp = getEntryDisplay(entry);
      if (disp.image) {
        const img = document.createElement("img");
        img.src = disp.image;
        img.alt = disp.name;
        div.appendChild(img);
      }
      const nameSpan = document.createElement("span");
      nameSpan.textContent = disp.name;
      div.appendChild(nameSpan);
      if (isWinner) div.classList.add("winner");
      if (isLoser) div.classList.add("loser");
      if (isCurrent && !winner) div.classList.add("current");
    }
    return div;
  }

  function renderMatchup() {
    if (!state.matchA || !state.matchB) return;
    const dispA = getEntryDisplay(state.matchA);
    const dispB = getEntryDisplay(state.matchB);
    imageA.src = dispA.image || "";
    imageB.src = dispB.image || "";
    nameA.textContent = dispA.name;
    nameB.textContent = dispB.name;
    subA.textContent = dispA.sub;
    subB.textContent = dispB.sub;
    categoryQuestion.textContent = state.currentCategory?.question || "Who wins?";
    cardA.classList.remove("winner", "loser", "selected");
    cardB.classList.remove("winner", "loser", "selected");
    votesA.classList.add("hidden");
    votesB.classList.add("hidden");
    winnerBanner.classList.add("hidden");
  }

  function showView(view) {
    bracketView.classList.add("hidden");
    matchupView.classList.add("hidden");
    championView.classList.add("hidden");
    if (view === "bracket") {
      bracketView.classList.remove("hidden");
      mainPanelTitle.textContent = "Tournament Bracket";
      mainPanelSub.textContent = "View all matchups and progress";
    } else if (view === "matchup") {
      matchupView.classList.remove("hidden");
      mainPanelTitle.textContent = "Current Matchup";
      mainPanelSub.textContent = "Vote for the winner";
    } else if (view === "champion") {
      championView.classList.remove("hidden");
      mainPanelTitle.textContent = "Tournament Complete";
      mainPanelSub.textContent = "We have a champion!";
    }
  }

  function syncButtons() {
    const inLobby = state.phase === "Lobby";
    const hasBracket = state.bracket.length > 0;
    const hasMatchup = state.matchA && state.matchB;
    btnShowBracket.disabled = !hasBracket;
    btnStartMatchup.disabled = inLobby || !hasBracket || state.phase === "Champion";
    btnStartVote.disabled = state.phase !== "Matchup";
    btnRevealWinner.disabled = state.phase !== "Voting";
    btnNextMatchup.disabled = state.phase !== "Winner" && state.phase !== "BracketReveal";
  }

  // =====================================================
  // BRACKET GENERATION
  // =====================================================
  function generateBracket(entries) {
    state.competitors = entries;
    const size = entries.length;
    const rounds = Math.log2(size);
    state.bracket = [];
    let currentEntries = [...entries];
    for (let r = 0; r < rounds; r++) {
      const round = [];
      const matchCount = currentEntries.length / 2;
      for (let m = 0; m < matchCount; m++) {
        round.push({
          a: currentEntries[m * 2],
          b: currentEntries[m * 2 + 1],
          winner: null
        });
      }
      state.bracket.push(round);
      currentEntries = round.map(() => null);
    }
    state.currentRound = 0;
    state.currentMatchup = 0;
  }

  function advanceWinner(winner) {
    const matchup = state.bracket[state.currentRound][state.currentMatchup];
    matchup.winner = winner;
    if (state.currentRound < state.bracket.length - 1) {
      const nextRound = state.bracket[state.currentRound + 1];
      const nextMatchupIdx = Math.floor(state.currentMatchup / 2);
      const slot = state.currentMatchup % 2 === 0 ? "a" : "b";
      nextRound[nextMatchupIdx][slot] = winner;
    }
  }

  function nextMatchup() {
    const currentRound = state.bracket[state.currentRound];
    if (state.currentMatchup < currentRound.length - 1) {
      state.currentMatchup++;
    } else if (state.currentRound < state.bracket.length - 1) {
      state.currentRound++;
      state.currentMatchup = 0;
      if (state.newCategoryEveryRound) {
        const newCat = pickRandomCategory();
        if (newCat) {
          state.currentCategory = newCat;
          state.categoryId = newCat.id;
          categorySelect.value = newCat.id;
          hintBox.innerHTML = `🎲 New category: <b>${newCat.label}</b>`;
        }
      }
    } else {
      return false;
    }
    return true;
  }

  function loadCurrentMatchup() {
    const matchup = state.bracket[state.currentRound]?.[state.currentMatchup];
    if (!matchup) return;
    state.matchA = matchup.a;
    state.matchB = matchup.b;
    state.votes = {};
    state.matchWinner = null;
  }

  // =====================================================
  // GAME FLOW
  // =====================================================
  function startTournament() {
    state.packKey = lobbyPack.value;
    state.tournamentType = lobbyType.value;
    state.bracketSize = parseInt(lobbyBracketSize.value);
    state.categoryId = lobbyCategory.value;
    state.newCategoryEveryRound = lobbyNewCategory.value === "yes";
    state.selectionMode = lobbySelectionMode.value;
    const playerCount = parseInt(lobbyPlayerCount.value);
    state.players = [];
    const inputs = lobbyNames.querySelectorAll("input");
    inputs.forEach((inp, i) => {
      if (i < playerCount) {
        state.players.push({ id: i, name: inp.value || `Player ${i + 1}` });
      }
    });
    renderCategories();
    if (state.categoryId === "random") {
      const cat = pickRandomCategory();
      state.currentCategory = cat;
      state.categoryId = cat?.id || "strongest";
    } else {
      state.currentCategory = getCategory(state.categoryId);
    }
    categorySelect.value = state.categoryId;
    if (state.selectionMode === "host") {
      openPicksModal();
    } else {
      const typeData = getTypeData();
      const entries = typeData.entries || [];
      if (entries.length < state.bracketSize) {
        hintBox.innerHTML = `Not enough entries. Need ${state.bracketSize}, have ${entries.length}.`;
        return;
      }
      const selected = shuffle(entries).slice(0, state.bracketSize);
      generateBracket(shuffle(selected));
      closeLobby();
      showView("bracket");
      setPhase("BracketReveal");
      renderBracket();
      renderPills();
      renderInfo();
      renderVoteGrid();
      hintBox.innerHTML = "Bracket revealed! Click <b>Start Matchup</b> to begin.";
    }
  }

  function startMatchup() {
    loadCurrentMatchup();
    showView("matchup");
    setPhase("Matchup");
    renderMatchup();
    renderVoteGrid();
    renderPills();
    hintBox.innerHTML = "Discuss! When ready, click <b>Start Vote</b>.";
  }

  function startVote() {
    setPhase("Voting");
    renderVoteGrid();
    hintBox.innerHTML = "Players: cast your votes!";
  }

  function revealWinner() {
    let countA = 0, countB = 0;
    for (const v of Object.values(state.votes)) {
      if (v === "A") countA++;
      else if (v === "B") countB++;
    }
    votesA.textContent = `${countA} vote${countA !== 1 ? "s" : ""}`;
    votesB.textContent = `${countB} vote${countB !== 1 ? "s" : ""}`;
    votesA.classList.remove("hidden");
    votesB.classList.remove("hidden");
    let winner;
    if (countA > countB) {
      winner = state.matchA;
      cardA.classList.add("winner");
      cardB.classList.add("loser");
    } else if (countB > countA) {
      winner = state.matchB;
      cardB.classList.add("winner");
      cardA.classList.add("loser");
    } else {
      winner = Math.random() < 0.5 ? state.matchA : state.matchB;
      if (winner === state.matchA) {
        cardA.classList.add("winner");
        cardB.classList.add("loser");
      } else {
        cardB.classList.add("winner");
        cardA.classList.add("loser");
      }
      hintBox.innerHTML = "Tie! Random selection made.";
    }
    state.matchWinner = winner;
    advanceWinner(winner);
    const dispWinner = getEntryDisplay(winner);
    matchWinnerName.textContent = dispWinner.name;
    winnerBanner.classList.remove("hidden");
    setPhase("Winner");
    renderBracket();
    
    // Auto-show bracket after short delay so players see the result
    setTimeout(() => {
      showView("bracket");
      renderBracket();
      
      // Check if round is complete or tournament is over
      const currentRound = state.bracket[state.currentRound];
      const allMatchupsComplete = currentRound.every(m => m.winner !== null);
      const isLastRound = state.currentRound === state.bracket.length - 1;
      const isTournamentOver = isLastRound && allMatchupsComplete;
      
      if (isTournamentOver) {
        hintBox.innerHTML = `🏆 <b>${dispWinner.name}</b> wins the tournament! Click <b>Next Matchup</b> to crown the champion.`;
      } else if (allMatchupsComplete) {
        hintBox.innerHTML = `<b>${dispWinner.name}</b> advances! Round complete. Click <b>Next Matchup</b> for next round.`;
      } else {
        hintBox.innerHTML = `<b>${dispWinner.name}</b> advances! Click <b>Next Matchup</b> to continue.`;
      }
    }, 1500);
  }

  function goNextMatchup() {
    const prevRound = state.currentRound;
    
    if (!nextMatchup()) {
      showChampion();
      return;
    }
    
    // If new round started, show bracket with updated info
    if (state.currentRound !== prevRound) {
      showView("bracket");
      renderBracket();
      renderPills();
      renderInfo();
      const roundName = getRoundName(state.currentRound, state.bracket.length);
      hintBox.innerHTML = `<b>${roundName}</b> begins! Click <b>Start Matchup</b> when ready.`;
      return;
    }
    
    loadCurrentMatchup();
    showView("matchup");
    setPhase("Matchup");
    renderMatchup();
    renderVoteGrid();
    renderPills();
    renderInfo();
    hintBox.innerHTML = "New matchup! Discuss, then <b>Start Vote</b>.";
  }

  function showChampion() {
    const finalMatchup = state.bracket[state.bracket.length - 1]?.[0];
    const champion = finalMatchup?.winner;
    if (!champion) return;
    const disp = getEntryDisplay(champion);
    championImage.src = disp.image || "";
    championName.textContent = disp.name;
    championSub.textContent = disp.sub;
    championCategory.textContent = state.currentCategory 
      ? `${state.currentCategory.label} Champion` : "Champion";
    showView("champion");
    setPhase("Champion");
    renderPills();
    hintBox.innerHTML = "🏆 Tournament complete!";
  }

  // =====================================================
  // HOST PICKS MODAL
  // =====================================================
  function openPicksModal() {
    state.hostPicks = [];
    picksNeeded.textContent = state.bracketSize;
    renderPicksGrid();
    picksBackdrop.classList.remove("hidden");
  }

  function closePicksModal() {
    picksBackdrop.classList.add("hidden");
  }

  function renderPicksGrid(filter = "") {
    picksGrid.innerHTML = "";
    const typeData = getTypeData();
    const entries = typeData.entries || [];
    const filtered = filter 
      ? entries.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
      : entries;
    for (const entry of filtered) {
      const div = document.createElement("div");
      div.className = "picks-entry" + (state.hostPicks.includes(entry) ? " selected" : "");
      const disp = getEntryDisplay(entry);
      if (disp.image) {
        const img = document.createElement("img");
        img.src = disp.image;
        div.appendChild(img);
      }
      const nameDiv = document.createElement("div");
      nameDiv.className = "name";
      nameDiv.textContent = disp.name;
      div.appendChild(nameDiv);
      div.addEventListener("click", () => togglePick(entry));
      picksGrid.appendChild(div);
    }
    picksCount.textContent = `${state.hostPicks.length} / ${state.bracketSize} selected`;
  }

  function togglePick(entry) {
    const idx = state.hostPicks.indexOf(entry);
    if (idx >= 0) {
      state.hostPicks.splice(idx, 1);
    } else if (state.hostPicks.length < state.bracketSize) {
      state.hostPicks.push(entry);
    }
    renderPicksGrid(picksSearch.value);
  }

  function confirmPicks() {
    if (state.hostPicks.length !== state.bracketSize) {
      hintBox.innerHTML = `Select exactly ${state.bracketSize} entries.`;
      return;
    }
    generateBracket(shuffle(state.hostPicks));
    closePicksModal();
    closeLobby();
    showView("bracket");
    setPhase("BracketReveal");
    renderBracket();
    renderPills();
    renderInfo();
    renderVoteGrid();
    hintBox.innerHTML = "Bracket revealed! Click <b>Start Matchup</b> to begin.";
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

  // =====================================================
  // EVENT LISTENERS
  // =====================================================
  btnLobby.addEventListener("click", openLobby);
  btnCloseLobby.addEventListener("click", closeLobby);
  lobbyBackdrop.addEventListener("click", (e) => { if (e.target === lobbyBackdrop) closeLobby(); });
  btnStartTournament.addEventListener("click", startTournament);
  btnShowBracket.addEventListener("click", () => { showView("bracket"); renderBracket(); });
  btnStartMatchup.addEventListener("click", startMatchup);
  btnStartVote.addEventListener("click", startVote);
  btnRevealWinner.addEventListener("click", revealWinner);
  btnNextMatchup.addEventListener("click", goNextMatchup);
  btnRestart.addEventListener("click", () => {
    state.bracket = [];
    state.currentRound = 0;
    state.currentMatchup = 0;
    state.matchA = null;
    state.matchB = null;
    state.votes = {};
    showView("bracket");
    setPhase("Lobby");
    renderBracket();
    renderPills();
    renderInfo();
    hintBox.innerHTML = "Restarted. Open <b>Lobby Setup</b> to begin.";
    openLobby();
  });
  categorySelect.addEventListener("change", () => {
    state.categoryId = categorySelect.value;
    if (state.categoryId === "random") {
      const cat = pickRandomCategory();
      state.currentCategory = cat;
      state.categoryId = cat?.id || "strongest";
      categorySelect.value = state.categoryId;
    } else {
      state.currentCategory = getCategory(state.categoryId);
    }
    renderPills();
    if (state.phase === "Matchup" || state.phase === "Voting") {
      categoryQuestion.textContent = state.currentCategory?.question || "Who wins?";
    }
  });
  btnRandomCategory.addEventListener("click", () => {
    const cat = pickRandomCategory();
    if (cat) {
      state.currentCategory = cat;
      state.categoryId = cat.id;
      categorySelect.value = cat.id;
      renderPills();
      if (state.phase === "Matchup" || state.phase === "Voting") {
        categoryQuestion.textContent = cat.question || "Who wins?";
      }
      hintBox.innerHTML = `🎲 Random category: <b>${cat.label}</b>`;
    }
  });
  lobbyType.addEventListener("change", renderCategories);
  lobbyPlayerCount.addEventListener("change", () => renderPlayers(parseInt(lobbyPlayerCount.value)));
  btnClosePicks.addEventListener("click", closePicksModal);
  picksBackdrop.addEventListener("click", (e) => { if (e.target === picksBackdrop) closePicksModal(); });
  picksSearch.addEventListener("input", () => renderPicksGrid(picksSearch.value));
  btnClearPicks.addEventListener("click", () => { state.hostPicks = []; renderPicksGrid(picksSearch.value); });
  btnConfirmPicks.addEventListener("click", confirmPicks);

  // =====================================================
  // INIT
  // =====================================================
  function init() {
    lobbyPack.innerHTML = "";
    for (const key of Object.keys(PACKS)) {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = PACKS[key].label || key;
      lobbyPack.appendChild(opt);
    }
    renderCategories();
    renderPlayers(4);
    showView("bracket");
    setPhase("Lobby");
    renderPills();
    renderInfo();
    openLobby();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
