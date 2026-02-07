// versus_app.js
// Versus Mode: Singles, Duos, Teams
(() => {
  'use strict';

  const DATA = window.VERSUS_DATA || {};
  
  // Flatten activities into single array
  const ALL_ACTIVITIES = [
    ...DATA.activities.combat,
    ...DATA.activities.meta,
    ...DATA.activities.skills,
    ...DATA.activities.fun
  ];

  // ========================================
  // DOM ELEMENTS
  // ========================================
  const el = id => document.getElementById(id);

  // Topbar
  const phasePill = el('phasePill');
  const roundNum = el('roundNum');
  const modePill = el('modePill');
  const subtitleText = el('subtitleText');

  // Panels
  const welcomePanel = el('welcomePanel');
  const gamePanel = el('gamePanel');

  // Welcome
  const modeBtns = document.querySelectorAll('.mode-btn');
  const btnNext = el('btnNext');
  
  // Settings Panel
  const settingsPanel = el('settingsPanel');
  const settingsPlayerCount = el('settingsPlayerCount');
  const settingsTargetScore = el('settingsTargetScore');
  const settingsNames = el('settingsNames');
  const btnBackToMode = el('btnBackToMode');
  const btnStartGame = el('btnStartGame');

  // Sidebar
  const playersList = el('playersList');
  const targetScoreDisplay = el('targetScoreDisplay');
  const btnEndGame = el('btnEndGame');

  // Draft Phase
  const draftPhase = el('draftPhase');
  const draftPool = el('draftPool');
  const draftOrderText = el('draftOrderText');
  const btnConfirmDraft = el('btnConfirmDraft');

  // Battle Phase
  const battlePhase = el('battlePhase');
  const activityText = el('activityText');
  const matchupsContainer = el('matchupsContainer');
  const btnRevealResults = el('btnRevealResults');

  // Voting Phase
  const votingPhase = el('votingPhase');
  const votingMatchups = el('votingMatchups');
  const btnConfirmVotes = el('btnConfirmVotes');

  // Results Phase
  const resultsPhase = el('resultsPhase');
  const resultsSummary = el('resultsSummary');
  const btnNextRound = el('btnNextRound');
  const btnRedraft = el('btnRedraft');

  // Game Over
  const gameoverPhase = el('gameoverPhase');
  const winnerName = el('winnerName');
  const winnerScore = el('winnerScore');
  const btnPlayAgain = el('btnPlayAgain');
  const btnBackToMenu = el('btnBackToMenu');

  // ========================================
  // STATE
  // ========================================
  const state = {
    phase: 'welcome', // welcome, draft, battle, voting, results, gameover
    mode: 'singles',  // singles, duos, teams
    targetScore: 10,
    round: 0,

    players: [], // { id, name, score, fighter, eliminated }
    
    // Draft
    draftPool: [],        // 10 random fighters to choose from
    draftOrder: [],       // Order of player IDs for drafting
    currentDraftIndex: 0, // Who's currently drafting
    selectedDraftCard: null,

    // Battle
    currentOpponent: null,
    currentActivity: null,
    matchups: [], // { playerId, playerFighter, opponent, result: null }

    // Voting
    votes: {}, // { playerId: 'win' | 'lose' }

    // Pool management (to avoid repeats)
    usedFighters: new Set(),
    usedActivities: new Set(),
  };

  // ========================================
  // HELPERS
  // ========================================
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getPool() {
    switch (state.mode) {
      case 'duos': return DATA.duos || [];
      case 'teams': return DATA.teams || [];
      default: return DATA.singles || [];
    }
  }

  function getModeLabel() {
    switch (state.mode) {
      case 'duos': return 'Duos';
      case 'teams': return 'Teams';
      default: return 'Singles';
    }
  }

  function fighterKey(f) {
    return `${f.name}|${f.anime}`;
  }

  function getRandomFighters(count) {
    const pool = getPool();
    const available = pool.filter(f => !state.usedFighters.has(fighterKey(f)));
    
    if (available.length < count) {
      // Reset pool if not enough
      state.usedFighters.clear();
      return shuffle(pool).slice(0, count);
    }
    
    return shuffle(available).slice(0, count);
  }

  function getRandomActivity() {
    const available = ALL_ACTIVITIES.filter(a => !state.usedActivities.has(a));
    
    if (available.length === 0) {
      state.usedActivities.clear();
      return ALL_ACTIVITIES[Math.floor(Math.random() * ALL_ACTIVITIES.length)];
    }
    
    const activity = available[Math.floor(Math.random() * available.length)];
    state.usedActivities.add(activity);
    return activity;
  }

  function getRandomOpponent() {
    const pool = getPool();
    // Exclude current player fighters
    const playerFighterKeys = new Set(
      state.players
        .filter(p => p.fighter && !p.eliminated)
        .map(p => fighterKey(p.fighter))
    );
    
    const available = pool.filter(f => !playerFighterKeys.has(fighterKey(f)));
    
    if (available.length === 0) {
      return pool[Math.floor(Math.random() * pool.length)];
    }
    
    return available[Math.floor(Math.random() * available.length)];
  }

  function getActivePlayers() {
    return state.players.filter(p => !p.eliminated);
  }

  function getDraftOrder() {
    // Sort by score (lowest first), then randomize ties
    const sorted = [...state.players].sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score;
      return Math.random() - 0.5;
    });
    return sorted.map(p => p.id);
  }

  function checkWinner() {
    // Find all players who reached target score
    const winners = state.players.filter(p => p.score >= state.targetScore && !p.eliminated);
    
    if (winners.length === 0) return null;
    if (winners.length === 1) return winners[0];
    
    // Multiple winners = tie, need tiebreaker
    return 'tie';
  }

  function allEliminated() {
    return state.players.every(p => p.eliminated);
  }

  // ========================================
  // RENDER FUNCTIONS
  // ========================================
  function setPhase(phase) {
    state.phase = phase;
    phasePill.textContent = phase.charAt(0).toUpperCase() + phase.slice(1);
    
    // Hide all phases
    draftPhase.classList.add('hidden');
    battlePhase.classList.add('hidden');
    votingPhase.classList.add('hidden');
    resultsPhase.classList.add('hidden');
    gameoverPhase.classList.add('hidden');
    
    // Show current phase
    switch (phase) {
      case 'draft': draftPhase.classList.remove('hidden'); break;
      case 'battle': battlePhase.classList.remove('hidden'); break;
      case 'voting': votingPhase.classList.remove('hidden'); break;
      case 'results': resultsPhase.classList.remove('hidden'); break;
      case 'gameover': gameoverPhase.classList.remove('hidden'); break;
    }
  }

  function renderPlayers() {
    playersList.innerHTML = '';
    
    state.players.forEach(p => {
      const card = document.createElement('div');
      card.className = 'player-card';
      if (p.eliminated) card.classList.add('eliminated');
      if (p.score >= state.targetScore) card.classList.add('winner');
      
      const fighterText = p.fighter ? p.fighter.name : 'No fighter';
      const statusText = p.eliminated ? 'ELIMINATED' : 'ALIVE';
      const statusClass = p.eliminated ? 'eliminated' : 'alive';
      
      card.innerHTML = `
        <div class="player-info">
          <div class="player-name-display">${escapeHtml(p.name)}</div>
          <div class="player-fighter">${escapeHtml(fighterText)}</div>
          <div class="player-status ${statusClass}">${statusText}</div>
        </div>
        <div class="player-score">${p.score}</div>
      `;
      
      playersList.appendChild(card);
    });
  }

  function renderDraftPool() {
    draftPool.innerHTML = '';
    
    const currentDrafter = state.players.find(p => p.id === state.draftOrder[state.currentDraftIndex]);
    draftOrderText.textContent = currentDrafter ? `${currentDrafter.name}'s turn to pick` : '';
    
    state.draftPool.forEach((fighter, idx) => {
      const card = document.createElement('div');
      card.className = 'draft-card';
      card.dataset.index = idx;
      
      // Check if taken
      const owner = state.players.find(p => p.fighter && fighterKey(p.fighter) === fighterKey(fighter));
      if (owner) {
        card.classList.add('taken');
        card.innerHTML = `
          <div class="draft-card-name">${escapeHtml(fighter.name)}</div>
          <div class="draft-card-anime">${escapeHtml(fighter.anime)}</div>
          <div class="draft-card-owner">Picked by ${escapeHtml(owner.name)}</div>
        `;
      } else {
        if (state.selectedDraftCard === idx) {
          card.classList.add('selected');
        }
        card.innerHTML = `
          <div class="draft-card-name">${escapeHtml(fighter.name)}</div>
          <div class="draft-card-anime">${escapeHtml(fighter.anime)}</div>
        `;
        card.addEventListener('click', () => selectDraftCard(idx));
      }
      
      draftPool.appendChild(card);
    });
    
    btnConfirmDraft.disabled = state.selectedDraftCard === null;
  }

  function renderMatchups() {
    matchupsContainer.innerHTML = '';
    
    state.matchups.forEach((m, idx) => {
      const player = state.players.find(p => p.id === m.playerId);
      const card = document.createElement('div');
      card.className = 'matchup-card';
      if (player.eliminated) card.classList.add('eliminated');
      
      card.innerHTML = `
        <div class="matchup-header">${escapeHtml(player.name)}'s Matchup</div>
        <div class="matchup-fighters">
          <div class="fighter player-fighter-card">
            <div class="fighter-label">Player</div>
            <div class="fighter-name">${escapeHtml(m.playerFighter.name)}</div>
            <div class="fighter-anime">${escapeHtml(m.playerFighter.anime)}</div>
          </div>
          <div class="vs-badge">VS</div>
          <div class="fighter opponent-fighter-card">
            <div class="fighter-label">Opponent</div>
            <div class="fighter-name">${escapeHtml(state.currentOpponent.name)}</div>
            <div class="fighter-anime">${escapeHtml(state.currentOpponent.anime)}</div>
          </div>
        </div>
      `;
      
      matchupsContainer.appendChild(card);
    });
  }

  function renderVoting() {
    votingMatchups.innerHTML = '';
    
    state.matchups.forEach((m, idx) => {
      const player = state.players.find(p => p.id === m.playerId);
      if (player.eliminated) return; // Skip eliminated players
      
      const card = document.createElement('div');
      card.className = 'voting-card';
      
      const currentVote = state.votes[m.playerId];
      
      card.innerHTML = `
        <div class="voting-question">
          Does <strong>${escapeHtml(m.playerFighter.name)}</strong> beat 
          <strong>${escapeHtml(state.currentOpponent.name)}</strong> 
          at "${escapeHtml(state.currentActivity)}"?
        </div>
        <div class="voting-options">
          <button class="vote-btn win ${currentVote === 'win' ? 'selected' : ''}" data-player="${m.playerId}" data-vote="win">
            ✓ WIN
          </button>
          <button class="vote-btn lose ${currentVote === 'lose' ? 'selected' : ''}" data-player="${m.playerId}" data-vote="lose">
            ✗ LOSE
          </button>
        </div>
      `;
      
      votingMatchups.appendChild(card);
    });
    
    // Add vote button listeners
    votingMatchups.querySelectorAll('.vote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const playerId = btn.dataset.player;
        const vote = btn.dataset.vote;
        state.votes[playerId] = vote;
        renderVoting();
      });
    });
    
    // Check if all votes are in
    const activePlayers = getActivePlayers();
    const allVoted = activePlayers.every(p => state.votes[p.id]);
    btnConfirmVotes.disabled = !allVoted;
  }

  function renderResults() {
    resultsSummary.innerHTML = '';
    
    let anyAlive = false;
    
    state.matchups.forEach(m => {
      const player = state.players.find(p => p.id === m.playerId);
      if (player.eliminated && m.result === null) return; // Was already eliminated
      
      const won = m.result === 'win';
      if (won) anyAlive = true;
      
      const item = document.createElement('div');
      item.className = `result-item ${won ? 'won' : 'lost'}`;
      
      item.innerHTML = `
        <div>
          <div class="result-player">${escapeHtml(player.name)}</div>
          <div class="result-matchup">${escapeHtml(m.playerFighter.name)} vs ${escapeHtml(state.currentOpponent.name)}</div>
        </div>
        <div class="result-outcome ${won ? 'won' : 'lost'}">
          ${won ? '+1 Point!' : 'Eliminated'}
        </div>
      `;
      
      resultsSummary.appendChild(item);
    });
    
    // Show appropriate button
    const winResult = checkWinner();
    if (winResult && winResult !== 'tie') {
      // Single winner - hide buttons, will transition to gameover
      btnNextRound.classList.add('hidden');
      btnRedraft.classList.add('hidden');
    } else if (allEliminated()) {
      btnNextRound.classList.add('hidden');
      btnRedraft.classList.remove('hidden');
    } else {
      // No winner yet or tie - show next round button
      btnNextRound.classList.remove('hidden');
      btnRedraft.classList.add('hidden');
      
      // Update button text for tiebreaker
      if (winResult === 'tie') {
        btnNextRound.textContent = 'Next Round (Tiebreaker)';
      } else {
        btnNextRound.textContent = 'Next Round';
      }
    }
  }

  function renderGameOver() {
    const winner = checkWinner();
    if (winner) {
      winnerName.textContent = winner.name;
      winnerScore.textContent = `reached ${winner.score} points!`;
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ========================================
  // GAME ACTIONS
  // ========================================
  function selectDraftCard(idx) {
    state.selectedDraftCard = idx;
    renderDraftPool();
  }

  function confirmDraft() {
    if (state.selectedDraftCard === null) return;
    
    const currentPlayerId = state.draftOrder[state.currentDraftIndex];
    const player = state.players.find(p => p.id === currentPlayerId);
    const fighter = state.draftPool[state.selectedDraftCard];
    
    player.fighter = fighter;
    player.eliminated = false;
    state.usedFighters.add(fighterKey(fighter));
    
    state.selectedDraftCard = null;
    state.currentDraftIndex++;
    
    // Check if draft is complete
    if (state.currentDraftIndex >= state.draftOrder.length) {
      startBattle();
    } else {
      renderDraftPool();
      renderPlayers();
    }
  }

  function startDraft() {
    state.round++;
    roundNum.textContent = state.round;
    
    // Reset eliminations for redraft
    state.players.forEach(p => {
      p.fighter = null;
      p.eliminated = false;
    });
    
    // Generate draft pool (10 fighters)
    state.draftPool = getRandomFighters(10);
    state.draftOrder = getDraftOrder();
    state.currentDraftIndex = 0;
    state.selectedDraftCard = null;
    
    setPhase('draft');
    renderPlayers();
    renderDraftPool();
  }

  function startBattle() {
    // Generate opponent and activity
    state.currentOpponent = getRandomOpponent();
    state.currentActivity = getRandomActivity();
    activityText.textContent = state.currentActivity;
    
    // Create matchups for all non-eliminated players
    state.matchups = getActivePlayers().map(p => ({
      playerId: p.id,
      playerFighter: p.fighter,
      opponent: state.currentOpponent,
      result: null
    }));
    
    state.votes = {};
    
    setPhase('battle');
    renderPlayers();
    renderMatchups();
  }

  function startVoting() {
    setPhase('voting');
    renderVoting();
  }

  function confirmVotes() {
    // Apply votes to matchups
    state.matchups.forEach(m => {
      const player = state.players.find(p => p.id === m.playerId);
      if (player.eliminated) return;
      
      m.result = state.votes[m.playerId];
      
      if (m.result === 'win') {
        player.score++;
      } else {
        player.eliminated = true;
      }
    });
    
    setPhase('results');
    renderPlayers();
    renderResults();
    
    // Check for winner or tie
    const winResult = checkWinner();
    if (winResult === 'tie') {
      // Multiple players reached target score - continue to tiebreaker
      console.log('TIE: Multiple players reached target score, continuing...');
      // Don't end game, button will say "Next Round (Tiebreaker)"
    } else if (winResult) {
      // Single winner
      setTimeout(() => {
        setPhase('gameover');
        renderGameOver();
      }, 1500);
    }
  }

  function nextRound() {
    state.round++;
    roundNum.textContent = state.round;
    startBattle();
  }

  function redraft() {
    startDraft();
  }

  // ========================================
  // SETTINGS PANEL
  // ========================================
  function showSettings() {
    welcomePanel.classList.add('hidden');
    settingsPanel.classList.remove('hidden');
    renderSettingsNames(Number(settingsPlayerCount.value));
  }

  function hideSettings() {
    settingsPanel.classList.add('hidden');
    welcomePanel.classList.remove('hidden');
  }

  function renderSettingsNames(count) {
    settingsNames.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const field = document.createElement('div');
      field.className = 'field';
      field.innerHTML = `
        <label>Player ${i + 1}</label>
        <input type="text" class="input player-name-input" value="Player ${i + 1}" data-index="${i}" />
      `;
      settingsNames.appendChild(field);
    }
  }

  function startGame() {
    const count = Number(settingsPlayerCount.value);
    const names = Array.from(settingsNames.querySelectorAll('.player-name-input'))
      .map(input => input.value.trim() || `Player ${Number(input.dataset.index) + 1}`);
    
    state.targetScore = Math.max(5, Number(settingsTargetScore.value) || 10);
    state.round = 0;
    state.usedFighters.clear();
    state.usedActivities.clear();
    
    state.players = names.slice(0, count).map((name, i) => ({
      id: `P${i + 1}`,
      name,
      score: 0,
      fighter: null,
      eliminated: false
    }));
    
    // Update UI
    modePill.textContent = getModeLabel();
    targetScoreDisplay.textContent = state.targetScore;
    roundNum.textContent = '0';
    
    // Switch panels
    settingsPanel.classList.add('hidden');
    gamePanel.classList.remove('hidden');
    
    // Start draft
    startDraft();
  }

  function endGame() {
    // Reset and go back to welcome
    welcomePanel.classList.remove('hidden');
    gamePanel.classList.add('hidden');
    state.phase = 'welcome';
    phasePill.textContent = 'Lobby';
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================
  // Welcome screen - mode selection
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.mode = btn.dataset.mode;
      // Show Next button when mode is selected
      btnNext.classList.remove('hidden');
    });
  });

  btnNext.addEventListener('click', showSettings);

  // Settings panel
  btnBackToMode.addEventListener('click', hideSettings);
  settingsPlayerCount.addEventListener('change', () => {
    renderSettingsNames(Number(settingsPlayerCount.value));
  });
  btnStartGame.addEventListener('click', startGame);

  // Draft
  btnConfirmDraft.addEventListener('click', confirmDraft);

  // Battle
  btnRevealResults.addEventListener('click', startVoting);

  // Voting
  btnConfirmVotes.addEventListener('click', confirmVotes);

  // Results
  btnNextRound.addEventListener('click', nextRound);
  btnRedraft.addEventListener('click', redraft);

  // Game Over
  btnPlayAgain.addEventListener('click', () => {
    state.players.forEach(p => {
      p.score = 0;
      p.fighter = null;
      p.eliminated = false;
    });
    state.round = 0;
    state.usedFighters.clear();
    state.usedActivities.clear();
    startDraft();
  });
  btnBackToMenu.addEventListener('click', endGame);

  // Sidebar
  btnEndGame.addEventListener('click', endGame);

  // ========================================
  // INIT
  // ========================================
  function init() {
    // Populate player count dropdown
    for (let i = 2; i <= 8; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i;
      settingsPlayerCount.appendChild(opt);
    }
    settingsPlayerCount.value = '4';
    
    // Set default mode (but don't auto-select, user must choose)
    // Removed auto-selection so Next button stays hidden until user picks
  }

  init();
})();
