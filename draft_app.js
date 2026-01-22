(() => {
  'use strict';

  const DATA = window.DRAFT_TEAM_DATA;
  if (!DATA) {
    console.error('DRAFT_TEAM_DATA missing');
    return;
  }

  // -------------------------
  // DOM
  // -------------------------
  const el = (id) => document.getElementById(id);

  const lobbyModal = el('lobbyModal');
  const playerCountSel = el('playerCount');
  const nameFields = el('nameFields');
  const modEveryInput = el('modEvery');
  const totalRoundsInput = el('totalRounds');
  const btnStart = el('btnStart');

  const pillPhase = el('pillPhase');
  const pillRound = el('pillRound');
  const pillTurn = el('pillTurn');
  const pillPick = el('pillPick');
  const pillMatch = el('pillMatch');

  const hint = el('hint');
  const modifierBox = el('modifierBox');
  const modifierText = el('modifierText');

  // Draft elements
  const draftGrid = el('draftGrid');
  const cardGrid = el('cardGrid');
  const btnReroll4 = el('btnReroll4');
  const pickedSummary = el('pickedSummary');
  const roleButtons = el('roleButtons');
  const btnConfirmPick = el('btnConfirmPick');
  const btnNextTurn = el('btnNextTurn');
  const btnNewRound = el('btnNewRound');
  const btnRestart = el('btnRestart');

  const btnSwap = el('btnSwap');
  const swapBox = el('swapBox');
  const swapRoleA = el('swapRoleA');
  const swapRoleB = el('swapRoleB');
  const btnDoSwap = el('btnDoSwap');
  const btnCancelSwap = el('btnCancelSwap');

  const teamsGrid = el('teamsGrid');
  const btnLockAll = el('btnLockAll');
  const btnRevealModifier = el('btnRevealModifier');
  const btnStartTournament = el('btnStartTournament');

  // Tournament elements
  const tournamentZone = el('tournamentZone');
  const tournamentHint = el('tournamentHint');
  const currentMatch = el('currentMatch');
  const matchLabel = el('matchLabel');
  const matchTeamA = el('matchTeamA');
  const matchTeamB = el('matchTeamB');
  const matchTeamAName = el('matchTeamAName');
  const matchTeamBName = el('matchTeamBName');
  const matchTeamARoster = el('matchTeamARoster');
  const matchTeamBRoster = el('matchTeamBRoster');
  const matchTeamAVotes = el('matchTeamAVotes');
  const matchTeamBVotes = el('matchTeamBVotes');
  const btnConfirmMatch = el('btnConfirmMatch');
  const btnClearMatchVotes = el('btnClearMatchVotes');

  const byeNotice = el('byeNotice');
  const byePlayerName = el('byePlayerName');
  const btnAcknowledgeBye = el('btnAcknowledgeBye');

  const bracketVisual = el('bracketVisual');
  const bracketRounds = el('bracketRounds');

  const tournamentComplete = el('tournamentComplete');
  const championName = el('championName');
  const championSub = el('championSub');
  const btnNextRoundFromTournament = el('btnNextRoundFromTournament');

  // -------------------------
  // State
  // -------------------------
  const PHASE = {
    LOBBY: 'Lobby',
    DRAFT: 'Drafting',
    LOCK: 'Locking',
    TOURNAMENT: 'Tournament',
    END: 'Match End'
  };

  const state = {
    phase: PHASE.LOBBY,
    round: 0,
    totalRounds: DATA.defaultRounds || 5,
    modEvery: 3,
    modifier: null,
    modifierRevealed: false,

    players: [], // {id, name, points, swapUsedThisRound, locked}

    // draft
    pickIndex: 0,
    pickOrder: [], // sequence of player indexes for this round
    current4: [],
    selectedChar: null,
    selectedRoleId: null,

    // round team rosters
    teams: new Map(), // playerId => {captain, vice, tank, assassin, support}
    inRoundDrafted: new Set(),

    // swap target (used in LOCK phase)
    swapTargetPlayerId: null,

    // Tournament bracket state
    tournament: {
      bracket: [],           // Array of bracket rounds, each containing matchups
      currentRoundIndex: 0,  // Which bracket round we're in
      currentMatchIndex: 0,  // Which match within the round
      remainingTeams: [],    // Player IDs still in the bracket
      eliminatedTeams: [],   // Player IDs knocked out
      matchVotesA: 0,        // Votes for team A in current match
      matchVotesB: 0,        // Votes for team B in current match
      currentMatchup: null,  // {teamA: playerId, teamB: playerId} or {bye: playerId}
      bracketHistory: [],    // Record of all matches for visualization
      roundChampion: null,   // Player who won the bracket
    },
  };

  const roles = DATA.roles.map(r => r.id);

  // -------------------------
  // Utilities
  // -------------------------
  const clampInt = (v, min, max, fallback) => {
    const n = parseInt(v, 10);
    if (Number.isNaN(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  };

  function sampleN(arr, n, excludeSet) {
    const picks = [];
    const usedIdx = new Set();
    const maxTries = 10000;
    let tries = 0;
    while (picks.length < n && tries < maxTries) {
      tries++;
      const idx = Math.floor(Math.random() * arr.length);
      if (usedIdx.has(idx)) continue;
      const item = arr[idx];
      const key = itemKey(item);
      if (excludeSet && excludeSet.has(key)) continue;
      usedIdx.add(idx);
      picks.push(item);
    }
    return picks;
  }

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function itemKey(ch) {
    return `${String(ch.name).trim()}@@${String(ch.anime).trim()}`;
  }

  function assignedKeysSet() {
    const s = new Set();
    for (const p of state.players) {
      const t = state.teams.get(p.id);
      if (!t) continue;
      for (const r of roles) {
        const ch = t[r];
        if (ch) s.add(itemKey(ch));
      }
    }
    return s;
  }

  function isModifierRound() {
    if (!state.modEvery || state.modEvery <= 0) return false;
    return state.round % state.modEvery === 0;
  }

  function randomModifier() {
    const mods = DATA.modifiers || [];
    if (!mods.length) return null;
    return mods[Math.floor(Math.random() * mods.length)];
  }

  function computeSnakePickOrder(numPlayers, picksPerPlayer) {
    const total = numPlayers * picksPerPlayer;
    const order = [];
    for (let i = 0; i < total; i++) {
      const cycle = Math.floor(i / numPlayers);
      const pos = i % numPlayers;
      const playerIdx = (cycle % 2 === 0) ? pos : (numPlayers - 1 - pos);
      order.push(playerIdx);
    }
    return order;
  }

  function currentPlayerIndex() {
    return state.pickOrder[state.pickIndex] ?? null;
  }

  function currentPlayer() {
    const idx = currentPlayerIndex();
    if (idx === null) return null;
    return state.players[idx] || null;
  }

  function getTeam(playerId) {
    return state.teams.get(playerId);
  }

  function getPlayerById(id) {
    return state.players.find(p => p.id === id);
  }

  function allTeamsFilled() {
    for (const p of state.players) {
      const t = getTeam(p.id);
      if (!t) return false;
      for (const r of roles) {
        if (!t[r]) return false;
      }
    }
    return true;
  }

  function allLocked() {
    return state.players.every(p => p.locked);
  }

  // -------------------------
  // Tournament Bracket Logic
  // -------------------------
  function initTournamentBracket() {
    const t = state.tournament;
    t.bracket = [];
    t.currentRoundIndex = 0;
    t.currentMatchIndex = 0;
    t.remainingTeams = state.players.map(p => p.id);
    t.eliminatedTeams = [];
    t.matchVotesA = 0;
    t.matchVotesB = 0;
    t.currentMatchup = null;
    t.bracketHistory = [];
    t.roundChampion = null;

    // Shuffle for random matchups
    t.remainingTeams = shuffleArray(t.remainingTeams);

    // Generate first round matchups
    generateBracketRound();
  }

  function generateBracketRound() {
    const t = state.tournament;
    const teams = [...t.remainingTeams];
    const matchups = [];

    // If odd number, one team gets a bye
    if (teams.length % 2 === 1) {
      // Last team in shuffled array gets bye
      const byeTeam = teams.pop();
      matchups.push({ bye: byeTeam });
    }

    // Pair remaining teams
    while (teams.length >= 2) {
      const teamA = teams.shift();
      const teamB = teams.shift();
      matchups.push({ teamA, teamB });
    }

    t.bracket.push({
      roundNumber: t.bracket.length + 1,
      matchups: matchups,
      completed: false
    });

    t.currentMatchIndex = 0;
    loadNextMatchup();
  }

  function loadNextMatchup() {
    const t = state.tournament;
    const currentRound = t.bracket[t.currentRoundIndex];
    
    if (!currentRound || t.currentMatchIndex >= currentRound.matchups.length) {
      // Round complete, check if tournament is over
      if (t.remainingTeams.length === 1) {
        // Tournament complete!
        t.roundChampion = t.remainingTeams[0];
        render();
        return;
      }
      
      // Start next bracket round
      t.currentRoundIndex++;
      generateBracketRound();
      return;
    }

    const matchup = currentRound.matchups[t.currentMatchIndex];
    t.currentMatchup = matchup;
    t.matchVotesA = 0;
    t.matchVotesB = 0;

    render();
  }

  function processMatchWinner(winnerId, loserId) {
    const t = state.tournament;
    
    // Award point to winner
    const winner = getPlayerById(winnerId);
    if (winner) winner.points += 1;

    // Record match result
    t.bracketHistory.push({
      round: t.currentRoundIndex + 1,
      match: t.currentMatchIndex + 1,
      winner: winnerId,
      loser: loserId,
      votesA: t.matchVotesA,
      votesB: t.matchVotesB
    });

    // Remove loser from remaining teams
    t.remainingTeams = t.remainingTeams.filter(id => id !== loserId);
    t.eliminatedTeams.push(loserId);

    // Move to next match
    t.currentMatchIndex++;
    loadNextMatchup();
  }

  function processByeAdvance(byeTeamId) {
    const t = state.tournament;

    // Record bye
    t.bracketHistory.push({
      round: t.currentRoundIndex + 1,
      match: t.currentMatchIndex + 1,
      bye: byeTeamId
    });

    // Move to next match (bye team stays in remainingTeams)
    t.currentMatchIndex++;
    loadNextMatchup();
  }

  // -------------------------
  // Render
  // -------------------------
  function setPhase(phase) {
    state.phase = phase;
    render();
  }

  function renderPills() {
    pillPhase.textContent = `Phase: ${state.phase}`;
    pillRound.textContent = `Round: ${state.round}/${state.totalRounds}`;

    const p = currentPlayer();
    const swapP = getSwapPlayer();
    
    if (state.phase === PHASE.LOCK && swapP) {
      pillTurn.textContent = `Swap Target: ${swapP.name}`;
    } else if (state.phase === PHASE.TOURNAMENT) {
      pillTurn.textContent = `Turn: —`;
    } else {
      pillTurn.textContent = p ? `Turn: ${p.name}` : 'Turn: —';
    }
    
    pillPick.textContent = state.phase === PHASE.DRAFT
      ? `Pick: ${state.pickIndex + 1}/${state.pickOrder.length}`
      : 'Pick: —';

    if (state.phase === PHASE.TOURNAMENT) {
      const t = state.tournament;
      const totalMatches = t.bracket.reduce((sum, r) => sum + r.matchups.length, 0);
      const completedMatches = t.bracketHistory.length;
      pillMatch.textContent = `Match: ${completedMatches + 1}/${totalMatches}`;
    } else {
      pillMatch.textContent = 'Match: —';
    }
  }

  function renderModifier() {
    const show = isModifierRound() && (state.phase === PHASE.LOCK || state.phase === PHASE.TOURNAMENT);
    modifierBox.style.display = show ? 'block' : 'none';
    
    if (!show) {
      modifierText.textContent = '—';
      return;
    }

    if (!state.modifier) {
      modifierText.textContent = '—';
      return;
    }

    modifierText.textContent = state.modifierRevealed ? state.modifier : 'Hidden (reveal after teams are locked)';
  }

  function renderCards() {
    cardGrid.innerHTML = '';
    state.current4.forEach((ch) => {
      const btn = document.createElement('button');
      btn.className = 'card' + (state.selectedChar && itemKey(state.selectedChar) === itemKey(ch) ? ' selected' : '');
      btn.type = 'button';
      btn.innerHTML = `
        <div class="card-title">${escapeHtml(ch.name)}</div>
        <div class="card-sub">${escapeHtml(ch.anime)}</div>
      `;
      btn.addEventListener('click', () => {
        if (state.phase !== PHASE.DRAFT) return;
        state.selectedChar = ch;
        state.selectedRoleId = null;
        render();
      });
      cardGrid.appendChild(btn);
    });
  }

  function renderRoleButtons() {
    roleButtons.innerHTML = '';
    const p = currentPlayer();
    const enabled = state.phase === PHASE.DRAFT && !!state.selectedChar && !!p;
    const t = p ? getTeam(p.id) : null;

    DATA.roles.forEach((r) => {
      const b = document.createElement('button');
      b.className = 'rolebtn' + (state.selectedRoleId === r.id ? ' selected' : '');
      b.type = 'button';
      const filled = t && !!t[r.id];
      b.disabled = !enabled || filled;
      b.textContent = filled ? `${r.name} (filled)` : r.name;
      b.title = r.blurb;
      b.addEventListener('click', () => {
        if (!enabled) return;
        if (filled) return;
        state.selectedRoleId = r.id;
        render();
      });
      roleButtons.appendChild(b);
    });

    if (!state.selectedChar) {
      pickedSummary.textContent = 'Draft a character to continue.';
    } else {
      pickedSummary.textContent = `Selected: ${state.selectedChar.name} (${state.selectedChar.anime})` + (state.selectedRoleId ? ` → ${roleName(state.selectedRoleId)}` : ' (choose a role)');
    }

    btnConfirmPick.disabled = !(state.phase === PHASE.DRAFT && state.selectedChar && state.selectedRoleId);
  }

  function roleName(roleId) {
    const r = DATA.roles.find(x => x.id === roleId);
    return r ? r.name : roleId;
  }

  function renderTeams() {
    teamsGrid.innerHTML = '';

    const currentIdx = currentPlayerIndex();
    const t = state.tournament;

    state.players.forEach((p, idx) => {
      const team = getTeam(p.id);
      const card = document.createElement('div');
      const isActiveDraft = (state.phase === PHASE.DRAFT && idx === currentIdx);
      const isActiveSwap = (state.phase === PHASE.LOCK && state.swapTargetPlayerId === p.id);
      const isEliminated = t.eliminatedTeams.includes(p.id);
      const isChampion = t.roundChampion === p.id;
      
      let classes = 'team';
      if (isActiveDraft || isActiveSwap) classes += ' active';
      if (state.phase === PHASE.TOURNAMENT && isEliminated) classes += ' eliminated';
      if (state.phase === PHASE.TOURNAMENT && isChampion) classes += ' champion';
      card.className = classes;

      let statusHtml = '';
      if (state.phase === PHASE.TOURNAMENT) {
        if (isChampion) {
          statusHtml = '<div class="team-status winner-status">👑 Round Champion</div>';
        } else if (isEliminated) {
          statusHtml = '<div class="team-status eliminated-status">Eliminated</div>';
        } else {
          statusHtml = '<div class="team-status in-bracket">In Bracket</div>';
        }
      }

      card.innerHTML = `
        <div class="team-head">
          <div class="team-name">
            <input class="name-edit" data-player-id="${p.id}" value="${escapeAttr(p.name)}" />
            <span class="badge points">${p.points} pts</span>
          </div>
          <div class="team-tools">
            <button class="btn small" data-lock="${p.id}">${p.locked ? 'Locked' : 'Lock'}</button>
          </div>
        </div>
        <div class="slots">
          ${roles.map(r => slotRowHtml(r, team?.[r])).join('')}
        </div>
        ${statusHtml}
        <div class="team-foot">
          <span class="muted">Swap used: ${p.swapUsedThisRound ? 'Yes' : 'No'}</span>
        </div>
      `;

      teamsGrid.appendChild(card);
    });

    // Choose swap target by clicking a team card (LOCK phase)
    teamsGrid.querySelectorAll('.team').forEach((teamEl, idx) => {
      teamEl.addEventListener('click', (e) => {
        const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
        if (tag === 'input' || tag === 'button' || tag === 'select' || tag === 'option') return;
        if (state.phase !== PHASE.LOCK) return;
        const p = state.players[idx];
        if (!p) return;
        state.swapTargetPlayerId = p.id;
        render();
      });
    });

    // Name editing
    teamsGrid.querySelectorAll('.name-edit').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        const id = e.target.getAttribute('data-player-id');
        const pl = state.players.find(x => x.id === id);
        if (pl) pl.name = e.target.value;
        renderPills();
      }, { passive: true });
    });

    // Lock buttons
    teamsGrid.querySelectorAll('button[data-lock]').forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-lock');
        const pl = state.players.find(x => x.id === id);
        if (!pl) return;
        if (state.phase === PHASE.DRAFT) return;
        pl.locked = !pl.locked;
        if (state.phase === PHASE.LOCK && allLocked()) {
          // Don't auto-transition, wait for Start Tournament button
        }
        render();
      });
    });

    function slotRowHtml(roleId, ch) {
      const label = roleName(roleId);
      const sub = DATA.roles.find(x => x.id === roleId)?.blurb || '';
      const value = ch ? `${escapeHtml(ch.name)} <span class="sub">(${escapeHtml(ch.anime)})</span>` : '<span class="empty">Empty</span>';
      return `
        <div class="slot">
          <div class="slot-left">
            <div class="slot-label">${escapeHtml(label)}</div>
            <div class="slot-sub">${escapeHtml(sub)}</div>
          </div>
          <div class="slot-right">${value}</div>
        </div>
      `;
    }
  }

  function renderTournament() {
    const inTournament = state.phase === PHASE.TOURNAMENT;
    
    // Show/hide zones
    draftGrid.style.display = inTournament ? 'none' : 'grid';
    tournamentZone.classList.toggle('show', inTournament);

    if (!inTournament) {
      currentMatch.classList.remove('show');
      byeNotice.classList.remove('show');
      tournamentComplete.classList.remove('show');
      return;
    }

    const t = state.tournament;

    // Check if tournament is complete
    if (t.roundChampion) {
      currentMatch.classList.remove('show');
      byeNotice.classList.remove('show');
      tournamentComplete.classList.add('show');

      const champ = getPlayerById(t.roundChampion);
      championName.textContent = champ ? champ.name : 'Unknown';
      championSub.textContent = `Won the bracket and earned ${t.bracketHistory.filter(m => m.winner === t.roundChampion).length} points this round!`;
      
      renderBracketVisualization();
      return;
    }

    tournamentComplete.classList.remove('show');

    // Check current matchup
    const matchup = t.currentMatchup;

    if (!matchup) {
      currentMatch.classList.remove('show');
      byeNotice.classList.remove('show');
      return;
    }

    // Handle BYE
    if (matchup.bye) {
      currentMatch.classList.remove('show');
      byeNotice.classList.add('show');
      
      const byePlayer = getPlayerById(matchup.bye);
      byePlayerName.textContent = byePlayer ? byePlayer.name : 'Unknown';
      
      renderBracketVisualization();
      return;
    }

    // Regular match
    byeNotice.classList.remove('show');
    currentMatch.classList.add('show');

    const playerA = getPlayerById(matchup.teamA);
    const playerB = getPlayerById(matchup.teamB);
    const teamAData = getTeam(matchup.teamA);
    const teamBData = getTeam(matchup.teamB);

    matchLabel.textContent = `Round ${t.currentRoundIndex + 1} — Match ${t.currentMatchIndex + 1}`;
    
    matchTeamAName.textContent = playerA ? playerA.name : 'Team A';
    matchTeamBName.textContent = playerB ? playerB.name : 'Team B';

    matchTeamARoster.innerHTML = teamAData ? formatRosterMini(teamAData) : '';
    matchTeamBRoster.innerHTML = teamBData ? formatRosterMini(teamBData) : '';

    matchTeamAVotes.textContent = `${t.matchVotesA} vote${t.matchVotesA !== 1 ? 's' : ''}`;
    matchTeamBVotes.textContent = `${t.matchVotesB} vote${t.matchVotesB !== 1 ? 's' : ''}`;

    // Update voted state
    matchTeamA.classList.toggle('voted', t.matchVotesA > t.matchVotesB);
    matchTeamB.classList.toggle('voted', t.matchVotesB > t.matchVotesA);

    renderBracketVisualization();
  }

  function formatRosterMini(team) {
    return roles.map(r => {
      const ch = team[r];
      if (!ch) return '';
      const roleLabel = roleName(r).charAt(0); // C, V, T, A, S
      return `<div>${roleLabel}: ${escapeHtml(ch.name)}</div>`;
    }).join('');
  }

  function renderBracketVisualization() {
    const t = state.tournament;
    bracketRounds.innerHTML = '';

    t.bracket.forEach((round, roundIdx) => {
      const div = document.createElement('div');
      const isCurrent = roundIdx === t.currentRoundIndex && !t.roundChampion;
      const isCompleted = roundIdx < t.currentRoundIndex || t.roundChampion;
      
      div.className = 'bracket-round' + (isCurrent ? ' current' : '') + (isCompleted ? ' completed' : '');

      let roundLabel = `Round ${round.roundNumber}`;
      if (round.matchups.length === 1 && !round.matchups[0].bye) {
        roundLabel = 'Finals';
      } else if (round.matchups.length === 2 || (round.matchups.length === 1 && round.matchups[0].bye && t.bracket.length > 1)) {
        if (roundIdx === t.bracket.length - 1 || round.matchups.filter(m => !m.bye).length <= 2) {
          roundLabel = round.matchups.length === 1 ? 'Finals' : 'Semifinals';
        }
      }

      let matchupsHtml = round.matchups.map((m, mIdx) => {
        const historyEntry = t.bracketHistory.find(h => h.round === roundIdx + 1 && h.match === mIdx + 1);
        
        if (m.bye) {
          const byePlayer = getPlayerById(m.bye);
          return `<span class="bracket-matchup bye">${byePlayer?.name || '?'} (BYE)</span>`;
        }

        const pA = getPlayerById(m.teamA);
        const pB = getPlayerById(m.teamB);
        
        if (historyEntry && historyEntry.winner) {
          const winnerName = getPlayerById(historyEntry.winner)?.name || '?';
          return `<span class="bracket-matchup winner">${winnerName} ✓</span>`;
        }

        return `<span class="bracket-matchup">${pA?.name || '?'} vs ${pB?.name || '?'}</span>`;
      }).join('');

      div.innerHTML = `
        <span class="bracket-round-label">${roundLabel}</span>
        <div class="bracket-round-matchups">${matchupsHtml}</div>
      `;

      bracketRounds.appendChild(div);
    });

    // Show champion if complete
    if (t.roundChampion) {
      const champDiv = document.createElement('div');
      champDiv.className = 'bracket-round completed';
      const champ = getPlayerById(t.roundChampion);
      champDiv.innerHTML = `
        <span class="bracket-round-label">Champion</span>
        <div class="bracket-round-matchups">
          <span class="bracket-matchup winner">👑 ${champ?.name || '?'}</span>
        </div>
      `;
      bracketRounds.appendChild(champDiv);
    }
  }

  function renderButtons() {
    const inLobby = state.phase === PHASE.LOBBY;
    btnNewRound.disabled = inLobby || state.phase === PHASE.TOURNAMENT;
    btnNextTurn.disabled = !(state.phase === PHASE.DRAFT);

    btnReroll4.disabled = !(state.phase === PHASE.DRAFT);

    const swapP = getSwapPlayer();
    const swapTeam = swapP ? getTeam(swapP.id) : null;
    const filledCount = swapTeam ? roles.filter(r => !!swapTeam[r]).length : 0;
    btnSwap.disabled = !(state.phase === PHASE.LOCK && !!swapP && !swapP.swapUsedThisRound && filledCount >= 2);

    btnLockAll.disabled = !(state.phase === PHASE.LOCK);
    btnRevealModifier.disabled = !(state.phase === PHASE.LOCK && isModifierRound() && allLocked());
    btnStartTournament.disabled = !(state.phase === PHASE.LOCK && allLocked());

    btnConfirmMatch.disabled = state.phase !== PHASE.TOURNAMENT;
    btnClearMatchVotes.disabled = state.phase !== PHASE.TOURNAMENT;
  }

  function getSwapPlayer() {
    if (state.phase === PHASE.LOCK) {
      const id = state.swapTargetPlayerId || state.players[0]?.id;
      return state.players.find(p => p.id === id) || null;
    }
    return null;
  }

  function renderHint() {
    if (state.phase === PHASE.LOBBY) {
      hint.textContent = 'Set up the lobby to begin.';
    } else if (state.phase === PHASE.DRAFT) {
      hint.textContent = 'Select 1 of the 4 characters, assign a role, then confirm.';
    } else if (state.phase === PHASE.LOCK) {
      if (allLocked()) {
        hint.textContent = 'All teams locked! Reveal modifier (if any), then start the tournament.';
      } else {
        hint.textContent = 'Teams are filled. (Optional) click a team card to select it, then use Swap. Lock teams to proceed.';
      }
    } else if (state.phase === PHASE.TOURNAMENT) {
      const t = state.tournament;
      if (t.roundChampion) {
        hint.textContent = 'Tournament complete! Click Next Round to continue.';
      } else if (t.currentMatchup?.bye) {
        hint.textContent = 'This player receives a BYE and advances automatically.';
      } else {
        hint.textContent = 'Debate which team wins! Click a team to vote, then confirm the winner.';
      }
    } else if (state.phase === PHASE.END) {
      hint.textContent = 'Match ended. Restart to play again.';
    }
  }

  function render() {
    renderPills();
    renderHint();
    renderModifier();
    renderCards();
    renderRoleButtons();
    renderTeams();
    renderTournament();
    renderButtons();

    // swap box visibility
    swapBox.style.display = swapBox.dataset.open === '1' ? 'block' : 'none';

    btnConfirmPick.disabled = !(state.phase === PHASE.DRAFT && state.selectedChar && state.selectedRoleId);
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replaceAll('`', '&#96;');
  }

  // -------------------------
  // Lobby
  // -------------------------
  function openLobby() {
    lobbyModal.style.display = 'flex';
  }

  function closeLobby() {
    lobbyModal.style.display = 'none';
  }

  function buildNameFields(count) {
    nameFields.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'namefield';
      wrap.innerHTML = `
        <label>Player ${i} name</label>
        <input type="text" value="Player ${i}" data-idx="${i-1}" />
      `;
      nameFields.appendChild(wrap);
    }
  }

  playerCountSel.addEventListener('change', () => {
    buildNameFields(parseInt(playerCountSel.value, 10));
  });

  btnStart.addEventListener('click', () => {
    const count = clampInt(playerCountSel.value, 2, 8, 2);
    const modEvery = clampInt(modEveryInput.value, 0, 99, 0);
    const totalRounds = clampInt(totalRoundsInput.value, 1, 99, 5);

    const names = Array.from(nameFields.querySelectorAll('input')).slice(0, count).map(i => i.value.trim() || 'Player');

    state.players = names.map((name, idx) => ({
      id: `P${idx+1}`,
      name,
      points: 0,
      swapUsedThisRound: false,
      locked: false,
    }));

    state.modEvery = modEvery;
    state.totalRounds = totalRounds;

    closeLobby();
    startNewMatch();
  });

  // -------------------------
  // Match / Round lifecycle
  // -------------------------
  function startNewMatch() {
    state.round = 0;
    state.players.forEach(p => { p.points = 0; });
    startNextRound();
  }

  function startNextRound(forceSuddenDeath = false) {
    state.round += 1;

    if (!forceSuddenDeath && state.round > state.totalRounds) {
      // Check for overall match winner
      const leader = matchLeaders();
      if (leader.tied) {
        // Sudden death continues
        hint.textContent = `Tie after ${state.totalRounds} rounds! Sudden death round ${state.round}.`;
      } else {
        setPhase(PHASE.END);
        hint.textContent = `Match Winner: ${leader.names[0]} (${leader.max} pts). Restart to play again.`;
        render();
        return;
      }
    }

    // Reset per-round state
    state.inRoundDrafted = new Set();
    state.teams = new Map();
    state.players.forEach(p => {
      p.swapUsedThisRound = false;
      p.locked = false;
      state.teams.set(p.id, { captain: null, vice: null, tank: null, assassin: null, support: null });
    });

    state.swapTargetPlayerId = state.players[0]?.id || null;

    // Reset tournament state
    state.tournament = {
      bracket: [],
      currentRoundIndex: 0,
      currentMatchIndex: 0,
      remainingTeams: [],
      eliminatedTeams: [],
      matchVotesA: 0,
      matchVotesB: 0,
      currentMatchup: null,
      bracketHistory: [],
      roundChampion: null,
    };

    // Pick order
    state.pickOrder = computeSnakePickOrder(state.players.length, roles.length);
    state.pickIndex = 0;

    // Modifier
    state.modifier = isModifierRound() ? randomModifier() : null;
    state.modifierRevealed = false;

    // Selection
    state.selectedChar = null;
    state.selectedRoleId = null;

    // Generate first 4
    setPhase(PHASE.DRAFT);
    generate4();
  }

  function generate4() {
    const exclude = new Set([...state.inRoundDrafted, ...assignedKeysSet()]);
    state.current4 = sampleN(DATA.characters, 4, exclude);
    state.selectedChar = null;
    state.selectedRoleId = null;
  }

  function advanceTurn() {
    if (state.phase !== PHASE.DRAFT) return;
    if (state.pickIndex < state.pickOrder.length - 1) {
      state.pickIndex += 1;
      generate4();
      render();
      return;
    }

    // Draft finished
    state.pickIndex += 1;
    setPhase(PHASE.LOCK);
    render();
  }

  function ensureDraftReady() {
    if (state.phase === PHASE.DRAFT && allTeamsFilled() && state.pickIndex >= state.pickOrder.length) {
      setPhase(PHASE.LOCK);
    }
  }

  function matchLeaders() {
    let max = -1;
    let ids = [];
    state.players.forEach(p => {
      if (p.points > max) {
        max = p.points;
        ids = [p.id];
      } else if (p.points === max) {
        ids.push(p.id);
      }
    });
    const names = ids.map(id => state.players.find(p => p.id === id)?.name).filter(Boolean);
    return { max, ids, names, tied: ids.length > 1 };
  }

  // -------------------------
  // Actions
  // -------------------------
  btnReroll4.addEventListener('click', () => {
    if (state.phase !== PHASE.DRAFT) return;
    generate4();
    render();
  });

  btnConfirmPick.addEventListener('click', () => {
    if (state.phase !== PHASE.DRAFT) return;
    const p = currentPlayer();
    if (!p) return;
    if (!state.selectedChar || !state.selectedRoleId) return;

    const t = getTeam(p.id);
    if (!t) return;
    if (t[state.selectedRoleId]) return;

    const key = itemKey(state.selectedChar);
    if (state.inRoundDrafted.has(key)) return;

    t[state.selectedRoleId] = state.selectedChar;
    state.inRoundDrafted.add(key);

    state.selectedChar = null;
    state.selectedRoleId = null;

    advanceTurn();
    ensureDraftReady();
    render();
  });

  btnNextTurn.addEventListener('click', () => {
    if (state.phase !== PHASE.DRAFT) return;
    generate4();
    render();
  });

  btnNewRound.addEventListener('click', () => {
    if (state.phase === PHASE.LOBBY || state.phase === PHASE.TOURNAMENT) return;
    startNextRound(state.round > state.totalRounds);
  });

  btnRestart.addEventListener('click', () => {
    openLobby();
  });

  btnLockAll.addEventListener('click', () => {
    if (state.phase !== PHASE.LOCK) return;
    state.players.forEach(p => p.locked = true);
    render();
  });

  btnRevealModifier.addEventListener('click', () => {
    if (state.phase !== PHASE.LOCK) return;
    if (!isModifierRound()) return;
    if (!allLocked()) return;
    state.modifierRevealed = true;
    render();
  });

  btnStartTournament.addEventListener('click', () => {
    if (state.phase !== PHASE.LOCK) return;
    if (!allLocked()) return;
    
    initTournamentBracket();
    setPhase(PHASE.TOURNAMENT);
  });

  // Tournament match voting
  matchTeamA.addEventListener('click', () => {
    if (state.phase !== PHASE.TOURNAMENT) return;
    const t = state.tournament;
    if (!t.currentMatchup || t.currentMatchup.bye) return;
    t.matchVotesA += 1;
    render();
  });

  matchTeamB.addEventListener('click', () => {
    if (state.phase !== PHASE.TOURNAMENT) return;
    const t = state.tournament;
    if (!t.currentMatchup || t.currentMatchup.bye) return;
    t.matchVotesB += 1;
    render();
  });

  btnClearMatchVotes.addEventListener('click', () => {
    if (state.phase !== PHASE.TOURNAMENT) return;
    const t = state.tournament;
    t.matchVotesA = 0;
    t.matchVotesB = 0;
    render();
  });

  btnConfirmMatch.addEventListener('click', () => {
    if (state.phase !== PHASE.TOURNAMENT) return;
    const t = state.tournament;
    
    if (!t.currentMatchup || t.currentMatchup.bye) return;

    if (t.matchVotesA === 0 && t.matchVotesB === 0) {
      tournamentHint.textContent = 'No votes cast! Click a team to vote for them.';
      return;
    }

    if (t.matchVotesA === t.matchVotesB) {
      tournamentHint.textContent = 'Tied! Cast a tiebreaker vote or clear and revote.';
      return;
    }

    const winnerId = t.matchVotesA > t.matchVotesB ? t.currentMatchup.teamA : t.currentMatchup.teamB;
    const loserId = t.matchVotesA > t.matchVotesB ? t.currentMatchup.teamB : t.currentMatchup.teamA;

    processMatchWinner(winnerId, loserId);
  });

  btnAcknowledgeBye.addEventListener('click', () => {
    if (state.phase !== PHASE.TOURNAMENT) return;
    const t = state.tournament;
    
    if (!t.currentMatchup || !t.currentMatchup.bye) return;

    processByeAdvance(t.currentMatchup.bye);
  });

  btnNextRoundFromTournament.addEventListener('click', () => {
    if (state.phase !== PHASE.TOURNAMENT) return;
    
    // Check if match is over
    const finishedNormalRounds = state.round >= state.totalRounds;

    if (finishedNormalRounds) {
      const top = matchLeaders();
      if (top.tied) {
        // Sudden death
        startNextRound(true);
        return;
      } else {
        setPhase(PHASE.END);
        hint.textContent = `Match Winner: ${top.names[0]} (${top.max} pts). Restart to play again.`;
        render();
        return;
      }
    }

    startNextRound(false);
  });

  // -------------------------
  // Swap (two filled slots only)
  // -------------------------
  btnSwap.addEventListener('click', () => {
    if (state.phase !== PHASE.LOCK) return;
    const p = getSwapPlayer();
    if (!p) return;
    if (p.swapUsedThisRound) return;

    const t = getTeam(p.id);
    const filled = roles.filter(r => !!t[r]);
    if (filled.length < 2) return;

    swapRoleA.innerHTML = '';
    swapRoleB.innerHTML = '';

    filled.forEach(r => {
      const oa = document.createElement('option');
      oa.value = r;
      oa.textContent = roleName(r);
      const ob = oa.cloneNode(true);
      swapRoleA.appendChild(oa);
      swapRoleB.appendChild(ob);
    });

    swapBox.dataset.open = '1';
    render();
  });

  btnCancelSwap.addEventListener('click', () => {
    swapBox.dataset.open = '0';
    render();
  });

  btnDoSwap.addEventListener('click', () => {
    if (state.phase !== PHASE.LOCK) return;
    const p = getSwapPlayer();
    if (!p) return;
    if (p.swapUsedThisRound) return;

    const a = swapRoleA.value;
    const b = swapRoleB.value;
    if (!a || !b || a === b) return;

    const t = getTeam(p.id);
    if (!t[a] || !t[b]) return;

    const tmp = t[a];
    t[a] = t[b];
    t[b] = tmp;

    p.swapUsedThisRound = true;
    swapBox.dataset.open = '0';
    render();
  });

  // -------------------------
  // Init
  // -------------------------
  function init() {
    buildNameFields(4);
    playerCountSel.value = '4';

    swapBox.dataset.open = '0';

    DATA.roles.forEach(r => {
      const b = document.createElement('button');
      b.className = 'rolebtn';
      b.type = 'button';
      b.textContent = r.name;
      b.disabled = true;
      roleButtons.appendChild(b);
    });

    openLobby();
    render();
  }

  init();
})();
