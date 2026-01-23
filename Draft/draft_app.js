(() => {
  'use strict';

  const DATA = window.DRAFT_TEAM_DATA;
  if (!DATA) { console.error('DRAFT_TEAM_DATA missing'); return; }

  const el = (id) => document.getElementById(id);
  const lobbyModal = el('lobbyModal'), playerCountSel = el('playerCount'), nameFields = el('nameFields');
  const modEveryInput = el('modEvery'), totalRoundsInput = el('totalRounds'), btnStart = el('btnStart');
  const pillPhase = el('pillPhase'), pillRound = el('pillRound'), pillTurn = el('pillTurn');
  const pillPick = el('pillPick'), pillMatch = el('pillMatch'), hint = el('hint');
  const modifierBox = el('modifierBox'), modifierText = el('modifierText'), draftGrid = el('draftGrid');
  const cardGrid = el('cardGrid'), btnReroll4 = el('btnReroll4'), pickedSummary = el('pickedSummary');
  const roleButtons = el('roleButtons'), btnConfirmPick = el('btnConfirmPick'), btnNextTurn = el('btnNextTurn');
  const btnNewRound = el('btnNewRound'), btnRestart = el('btnRestart'), btnSwap = el('btnSwap');
  const swapBox = el('swapBox'), swapRoleA = el('swapRoleA'), swapRoleB = el('swapRoleB');
  const btnDoSwap = el('btnDoSwap'), btnCancelSwap = el('btnCancelSwap'), teamsGrid = el('teamsGrid');
  const btnLockAll = el('btnLockAll'), btnRevealModifier = el('btnRevealModifier'), btnStartTournament = el('btnStartTournament');
  const tournamentZone = el('tournamentZone'), rivalryBanner = el('rivalryBanner'), rivalryText = el('rivalryText');
  const currentMatch = el('currentMatch'), matchLabel = el('matchLabel'), matchTeamA = el('matchTeamA');
  const matchTeamB = el('matchTeamB'), matchTeamAName = el('matchTeamAName'), matchTeamBName = el('matchTeamBName');
  const matchTeamARoster = el('matchTeamARoster'), matchTeamBRoster = el('matchTeamBRoster');
  const matchTeamAVotes = el('matchTeamAVotes'), matchTeamBVotes = el('matchTeamBVotes');
  const btnConfirmMatch = el('btnConfirmMatch'), btnClearMatchVotes = el('btnClearMatchVotes');
  const byeNotice = el('byeNotice'), byePlayerName = el('byePlayerName'), btnAcknowledgeBye = el('btnAcknowledgeBye');
  const bracketRounds = el('bracketRounds'), tournamentComplete = el('tournamentComplete');
  const championName = el('championName'), championSub = el('championSub'), btnGoToMVP = el('btnGoToMVP');
  const mvpZone = el('mvpZone'), mvpRoleName = el('mvpRoleName'), mvpRoleDesc = el('mvpRoleDesc');
  const mvpCandidates = el('mvpCandidates'), mvpTally = el('mvpTally'), btnConfirmMVP = el('btnConfirmMVP');
  const btnClearMVPVotes = el('btnClearMVPVotes'), mvpResult = el('mvpResult'), mvpWinnerName = el('mvpWinnerName');
  const mvpWinnerOwner = el('mvpWinnerOwner'), btnNextRoundFromMVP = el('btnNextRoundFromMVP');

  const PHASE = { LOBBY:'Lobby', DRAFT:'Drafting', LOCK:'Locking', TOURNAMENT:'Tournament', MVP:'MVP Vote', END:'Match End' };
  const state = {
    phase: PHASE.LOBBY, round: 0, totalRounds: DATA.defaultRounds || 5, modEvery: 3,
    modifier: null, modifierRevealed: false, players: [], pickIndex: 0, pickOrder: [],
    current4: [], selectedChar: null, selectedRoleId: null, teams: new Map(),
    inRoundDrafted: new Set(), swapTargetPlayerId: null, rivalries: new Map(),
    tournament: { bracket: [], currentRoundIndex: 0, currentMatchIndex: 0, remainingTeams: [],
      eliminatedTeams: [], matchVotesA: 0, matchVotesB: 0, currentMatchup: null, bracketHistory: [], roundChampion: null },
    mvp: { selectedRole: null, votes: new Map(), winner: null, confirmed: false }
  };
  const roles = DATA.roles.map(r => r.id);

  const clampInt = (v, min, max, fb) => { const n = parseInt(v,10); return Number.isNaN(n) ? fb : Math.min(max, Math.max(min, n)); };
  function sampleN(arr, n, excl) {
    const picks = [], used = new Set(); let tries = 0;
    while (picks.length < n && tries < 10000) {
      tries++; const idx = Math.floor(Math.random() * arr.length);
      if (used.has(idx)) continue; const item = arr[idx], key = itemKey(item);
      if (excl && excl.has(key)) continue; used.add(idx); picks.push(item);
    }
    return picks;
  }
  function shuffleArray(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function itemKey(ch) { return `${ch.name}@@${ch.anime}`; }
  function assignedKeysSet() { const s = new Set(); state.players.forEach(p => { const t = state.teams.get(p.id); if (t) roles.forEach(r => { if (t[r]) s.add(itemKey(t[r])); }); }); return s; }
  function isModifierRound() { return state.modEvery > 0 && state.round % state.modEvery === 0; }
  function randomModifier() { const m = DATA.modifiers || []; return m.length ? m[Math.floor(Math.random() * m.length)] : null; }
  function computeUnderdogSnakeOrder(numP, picksPerP) {
    let minPts = Infinity; state.players.forEach(p => { if (p.points < minPts) minPts = p.points; });
    const underdogs = state.players.map((p,i) => ({idx:i,pts:p.points})).filter(p => p.pts === minPts);
    const first = underdogs[Math.floor(Math.random() * underdogs.length)];
    const pOrder = [first.idx]; for (let i = 0; i < numP; i++) if (i !== first.idx) pOrder.push(i);
    const total = numP * picksPerP, order = [];
    for (let i = 0; i < total; i++) { const c = Math.floor(i / numP), pos = i % numP; order.push(c % 2 === 0 ? pOrder[pos] : pOrder[numP - 1 - pos]); }
    return { order, underdogIdx: first.idx };
  }
  function currentPlayerIndex() { return state.pickOrder[state.pickIndex] ?? null; }
  function currentPlayer() { const i = currentPlayerIndex(); return i !== null ? state.players[i] : null; }
  function getTeam(id) { return state.teams.get(id); }
  function getPlayerById(id) { return state.players.find(p => p.id === id); }
  function allTeamsFilled() { for (const p of state.players) { const t = getTeam(p.id); if (!t) return false; for (const r of roles) if (!t[r]) return false; } return true; }
  function allLocked() { return state.players.every(p => p.locked); }

  function getRivalryKey(a, b) { return [a, b].sort().join('vs'); }
  function getRivalryRecord(a, b) { const k = getRivalryKey(a, b); if (!state.rivalries.has(k)) state.rivalries.set(k, {[a]:0,[b]:0}); return state.rivalries.get(k); }
  function recordRivalryWin(w, l) { const r = getRivalryRecord(w, l); r[w] = (r[w] || 0) + 1; }
  function getRivalryDisplayText(a, b) {
    const r = getRivalryRecord(a, b), wA = r[a] || 0, wB = r[b] || 0, pA = getPlayerById(a), pB = getPlayerById(b);
    if (!wA && !wB) return 'First encounter!';
    if (wA === wB) return `<span class="tied">Rivalry tied ${wA}-${wB}!</span>`;
    const ldr = wA > wB ? pA : pB; return `<span class="ahead">${ldr?.name}</span> leads <b>${Math.max(wA,wB)}-${Math.min(wA,wB)}</b>`;
  }

  function initTournamentBracket() {
    const t = state.tournament; t.bracket = []; t.currentRoundIndex = 0; t.currentMatchIndex = 0;
    t.remainingTeams = shuffleArray(state.players.map(p => p.id)); t.eliminatedTeams = [];
    t.matchVotesA = 0; t.matchVotesB = 0; t.currentMatchup = null; t.bracketHistory = []; t.roundChampion = null;
    generateBracketRound();
  }
  function generateBracketRound() {
    const t = state.tournament, teams = [...t.remainingTeams], matchups = [];
    if (teams.length % 2 === 1) matchups.push({ bye: teams.pop() });
    while (teams.length >= 2) matchups.push({ teamA: teams.shift(), teamB: teams.shift() });
    t.bracket.push({ roundNumber: t.bracket.length + 1, matchups, completed: false });
    t.currentMatchIndex = 0; loadNextMatchup();
  }
  function loadNextMatchup() {
    const t = state.tournament, cr = t.bracket[t.currentRoundIndex];
    if (!cr || t.currentMatchIndex >= cr.matchups.length) {
      if (t.remainingTeams.length === 1) { t.roundChampion = t.remainingTeams[0]; render(); return; }
      t.currentRoundIndex++; generateBracketRound(); return;
    }
    t.currentMatchup = cr.matchups[t.currentMatchIndex]; t.matchVotesA = 0; t.matchVotesB = 0; render();
  }
  function processMatchWinner(wId, lId) {
    const t = state.tournament, w = getPlayerById(wId); if (w) w.points += 1;
    recordRivalryWin(wId, lId);
    t.bracketHistory.push({ round: t.currentRoundIndex + 1, match: t.currentMatchIndex + 1, winner: wId, loser: lId, votesA: t.matchVotesA, votesB: t.matchVotesB });
    t.remainingTeams = t.remainingTeams.filter(id => id !== lId); t.eliminatedTeams.push(lId);
    t.currentMatchIndex++; loadNextMatchup();
  }
  function processByeAdvance(byeId) {
    const t = state.tournament;
    t.bracketHistory.push({ round: t.currentRoundIndex + 1, match: t.currentMatchIndex + 1, bye: byeId });
    t.currentMatchIndex++; loadNextMatchup();
  }

  function initMVPVoting() { const m = state.mvp; m.selectedRole = roles[Math.floor(Math.random() * roles.length)]; m.votes = new Map(); m.winner = null; m.confirmed = false; }
  function getMVPCandidates() {
    const cands = [], rId = state.mvp.selectedRole;
    state.players.forEach(p => { const t = getTeam(p.id); if (t && t[rId]) cands.push({ char: t[rId], ownerId: p.id, ownerName: p.name, key: itemKey(t[rId]) }); });
    return cands;
  }
  function getMVPLeader() {
    const m = state.mvp; let maxV = 0, ldrs = [];
    for (const [k, v] of m.votes) { if (v > maxV) { maxV = v; ldrs = [k]; } else if (v === maxV && maxV > 0) ldrs.push(k); }
    if (maxV === 0) return null;
    const cands = getMVPCandidates(), ldrCands = cands.filter(c => ldrs.includes(c.key));
    return { maxVotes: maxV, leaders: ldrCands, tied: ldrCands.length > 1 };
  }
  function confirmMVPWinner(c) { const m = state.mvp; m.winner = c; m.confirmed = true; const o = getPlayerById(c.ownerId); if (o) o.points += 1; render(); }

  function setPhase(p) { state.phase = p; render(); }
  function roleName(id) { const r = DATA.roles.find(x => x.id === id); return r ? r.name : id; }
  function roleBlurb(id) { const r = DATA.roles.find(x => x.id === id); return r ? r.blurb : ''; }
  function escapeHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
  function escapeAttr(s) { return escapeHtml(s).replace(/`/g,'&#96;'); }

  function renderPills() {
    pillPhase.textContent = `Phase: ${state.phase}`; pillRound.textContent = `Round: ${state.round}/${state.totalRounds}`;
    const p = currentPlayer(), swapP = getSwapPlayer();
    pillTurn.textContent = (state.phase === PHASE.LOCK && swapP) ? `Swap: ${swapP.name}` : (state.phase === PHASE.TOURNAMENT || state.phase === PHASE.MVP) ? 'Turn: —' : p ? `Turn: ${p.name}` : 'Turn: —';
    pillPick.textContent = state.phase === PHASE.DRAFT ? `Pick: ${state.pickIndex + 1}/${state.pickOrder.length}` : 'Pick: —';
    if (state.phase === PHASE.TOURNAMENT) { const t = state.tournament, tot = t.bracket.reduce((s,r) => s + r.matchups.length, 0); pillMatch.textContent = `Match: ${t.bracketHistory.length + 1}/${tot}`; }
    else pillMatch.textContent = 'Match: —';
  }
  function renderModifier() {
    const show = isModifierRound() && (state.phase === PHASE.LOCK || state.phase === PHASE.TOURNAMENT);
    modifierBox.style.display = show ? 'block' : 'none';
    modifierText.textContent = (!show || !state.modifier) ? '—' : state.modifierRevealed ? state.modifier : 'Hidden (reveal after lock)';
  }
  function renderCards() {
    cardGrid.innerHTML = '';
    state.current4.forEach(ch => {
      const btn = document.createElement('button'); btn.type = 'button';
      btn.className = 'card' + (state.selectedChar && itemKey(state.selectedChar) === itemKey(ch) ? ' selected' : '');
      btn.innerHTML = `<div class="card-title">${escapeHtml(ch.name)}</div><div class="card-sub">${escapeHtml(ch.anime)}</div>`;
      btn.onclick = () => { if (state.phase === PHASE.DRAFT) { state.selectedChar = ch; state.selectedRoleId = null; render(); } };
      cardGrid.appendChild(btn);
    });
  }
  function renderRoleButtons() {
    roleButtons.innerHTML = ''; const p = currentPlayer(), enabled = state.phase === PHASE.DRAFT && !!state.selectedChar && !!p, t = p ? getTeam(p.id) : null;
    DATA.roles.forEach(r => {
      const b = document.createElement('button'); b.type = 'button'; const filled = t && !!t[r.id];
      b.className = 'rolebtn' + (state.selectedRoleId === r.id ? ' selected' : ''); b.disabled = !enabled || filled;
      b.textContent = filled ? `${r.name} (filled)` : r.name; b.title = r.blurb;
      b.onclick = () => { if (enabled && !filled) { state.selectedRoleId = r.id; render(); } };
      roleButtons.appendChild(b);
    });
    pickedSummary.textContent = !state.selectedChar ? 'Draft a character to continue.' : `Selected: ${state.selectedChar.name} (${state.selectedChar.anime})` + (state.selectedRoleId ? ` → ${roleName(state.selectedRoleId)}` : ' (choose role)');
    btnConfirmPick.disabled = !(state.phase === PHASE.DRAFT && state.selectedChar && state.selectedRoleId);
  }
  function renderTeams() {
    teamsGrid.innerHTML = ''; const curIdx = currentPlayerIndex(), t = state.tournament;
    let underdogId = null;
    if (state.phase === PHASE.DRAFT && state.round > 1) {
      let minPts = Infinity; state.players.forEach(p => { if (p.points < minPts) minPts = p.points; });
      const uds = state.players.filter(p => p.points === minPts); if (uds.length === 1) underdogId = uds[0].id;
    }
    state.players.forEach((p, idx) => {
      const team = getTeam(p.id), card = document.createElement('div');
      const isActive = (state.phase === PHASE.DRAFT && idx === curIdx) || (state.phase === PHASE.LOCK && state.swapTargetPlayerId === p.id);
      const isElim = t.eliminatedTeams.includes(p.id), isChamp = t.roundChampion === p.id, isUD = p.id === underdogId;
      let cls = 'team'; if (isActive) cls += ' active'; if (state.phase === PHASE.TOURNAMENT && isElim) cls += ' eliminated';
      if (state.phase === PHASE.TOURNAMENT && isChamp) cls += ' champion'; if (isUD) cls += ' underdog'; card.className = cls;
      let statusHtml = ''; if (state.phase === PHASE.TOURNAMENT) statusHtml = isChamp ? '<div class="team-status winner-status">👑 Champion</div>' : isElim ? '<div class="team-status eliminated-status">Eliminated</div>' : '<div class="team-status in-bracket">In Bracket</div>';
      const udBadge = isUD ? '<span class="badge underdog-badge">Underdog</span>' : '';
      card.innerHTML = `<div class="team-head"><div class="team-name"><input class="name-edit" data-player-id="${p.id}" value="${escapeAttr(p.name)}" /><span class="badge points">${p.points} pts</span>${udBadge}</div><div class="team-tools"><button class="btn small" data-lock="${p.id}">${p.locked ? 'Locked' : 'Lock'}</button></div></div><div class="slots">${roles.map(r => { const ch = team?.[r]; return `<div class="slot"><div class="slot-left"><div class="slot-label">${escapeHtml(roleName(r))}</div></div><div class="slot-right">${ch ? `${escapeHtml(ch.name)} <span class="sub">(${escapeHtml(ch.anime)})</span>` : '<span class="empty">Empty</span>'}</div></div>`; }).join('')}</div>${statusHtml}<div class="team-foot"><span class="muted">Swap: ${p.swapUsedThisRound ? 'Used' : 'Available'}</span></div>`;
      teamsGrid.appendChild(card);
    });
    teamsGrid.querySelectorAll('.team').forEach((el, i) => el.onclick = e => { const tag = e.target?.tagName?.toLowerCase(); if (['input','button','select'].includes(tag)) return; if (state.phase === PHASE.LOCK) { state.swapTargetPlayerId = state.players[i]?.id; render(); } });
    teamsGrid.querySelectorAll('.name-edit').forEach(inp => inp.oninput = e => { const pl = state.players.find(x => x.id === e.target.dataset.playerId); if (pl) { pl.name = e.target.value; renderPills(); } });
    teamsGrid.querySelectorAll('button[data-lock]').forEach(b => b.onclick = () => { const pl = state.players.find(x => x.id === b.dataset.lock); if (pl && state.phase !== PHASE.DRAFT) { pl.locked = !pl.locked; render(); } });
  }
  function renderTournament() {
    const inT = state.phase === PHASE.TOURNAMENT;
    draftGrid.style.display = (inT || state.phase === PHASE.MVP) ? 'none' : 'grid';
    tournamentZone.classList.toggle('show', inT); mvpZone.classList.toggle('show', state.phase === PHASE.MVP);
    if (!inT) { currentMatch.classList.remove('show'); byeNotice.classList.remove('show'); tournamentComplete.classList.remove('show'); rivalryBanner.classList.remove('show'); return; }
    const t = state.tournament;
    if (t.roundChampion) {
      currentMatch.classList.remove('show'); byeNotice.classList.remove('show'); rivalryBanner.classList.remove('show'); tournamentComplete.classList.add('show');
      const champ = getPlayerById(t.roundChampion); championName.textContent = champ?.name || '?';
      championSub.textContent = `Won ${t.bracketHistory.filter(m => m.winner === t.roundChampion).length} match(es)!`;
      renderBracket(); return;
    }
    tournamentComplete.classList.remove('show'); const mu = t.currentMatchup;
    if (!mu) { currentMatch.classList.remove('show'); byeNotice.classList.remove('show'); rivalryBanner.classList.remove('show'); return; }
    if (mu.bye) { currentMatch.classList.remove('show'); rivalryBanner.classList.remove('show'); byeNotice.classList.add('show'); byePlayerName.textContent = getPlayerById(mu.bye)?.name || '?'; renderBracket(); return; }
    byeNotice.classList.remove('show'); currentMatch.classList.add('show'); rivalryBanner.classList.add('show');
    rivalryText.innerHTML = getRivalryDisplayText(mu.teamA, mu.teamB);
    const pA = getPlayerById(mu.teamA), pB = getPlayerById(mu.teamB), tA = getTeam(mu.teamA), tB = getTeam(mu.teamB);
    matchLabel.textContent = `Round ${t.currentRoundIndex + 1} — Match ${t.currentMatchIndex + 1}`;
    matchTeamAName.textContent = pA?.name || 'A'; matchTeamBName.textContent = pB?.name || 'B';
    matchTeamARoster.innerHTML = tA ? roles.map(r => tA[r] ? `<div>${roleName(r).charAt(0)}: ${escapeHtml(tA[r].name)}</div>` : '').join('') : '';
    matchTeamBRoster.innerHTML = tB ? roles.map(r => tB[r] ? `<div>${roleName(r).charAt(0)}: ${escapeHtml(tB[r].name)}</div>` : '').join('') : '';
    matchTeamAVotes.textContent = `${t.matchVotesA} vote${t.matchVotesA !== 1 ? 's' : ''}`;
    matchTeamBVotes.textContent = `${t.matchVotesB} vote${t.matchVotesB !== 1 ? 's' : ''}`;
    matchTeamA.classList.toggle('voted', t.matchVotesA > t.matchVotesB);
    matchTeamB.classList.toggle('voted', t.matchVotesB > t.matchVotesA);
    renderBracket();
  }
  function renderBracket() {
    const t = state.tournament; bracketRounds.innerHTML = '';
    t.bracket.forEach((rd, ri) => {
      const div = document.createElement('div'), isCur = ri === t.currentRoundIndex && !t.roundChampion, isDone = ri < t.currentRoundIndex || t.roundChampion;
      div.className = 'bracket-round' + (isCur ? ' current' : '') + (isDone ? ' completed' : '');
      const lbl = rd.matchups.length === 1 && !rd.matchups[0].bye ? 'Finals' : `Round ${rd.roundNumber}`;
      const mHtml = rd.matchups.map((m, mi) => { const h = t.bracketHistory.find(x => x.round === ri + 1 && x.match === mi + 1);
        if (m.bye) return `<span class="bracket-matchup bye">${getPlayerById(m.bye)?.name || '?'} (BYE)</span>`;
        if (h?.winner) return `<span class="bracket-matchup winner">${getPlayerById(h.winner)?.name || '?'} ✓</span>`;
        return `<span class="bracket-matchup">${getPlayerById(m.teamA)?.name || '?'} vs ${getPlayerById(m.teamB)?.name || '?'}</span>`;
      }).join('');
      div.innerHTML = `<span class="bracket-round-label">${lbl}</span><div class="bracket-round-matchups">${mHtml}</div>`;
      bracketRounds.appendChild(div);
    });
    if (t.roundChampion) { const cd = document.createElement('div'); cd.className = 'bracket-round completed'; cd.innerHTML = `<span class="bracket-round-label">Champion</span><div class="bracket-round-matchups"><span class="bracket-matchup winner">👑 ${getPlayerById(t.roundChampion)?.name || '?'}</span></div>`; bracketRounds.appendChild(cd); }
  }
  function renderMVP() {
    if (state.phase !== PHASE.MVP) return; const m = state.mvp;
    mvpRoleName.textContent = roleName(m.selectedRole); mvpRoleDesc.textContent = roleBlurb(m.selectedRole);
    if (m.confirmed && m.winner) { mvpCandidates.style.display = 'none'; mvpTally.style.display = 'none'; document.querySelector('.mvp-actions').style.display = 'none'; mvpResult.classList.add('show'); mvpWinnerName.textContent = `${m.winner.char.name} (${m.winner.char.anime})`; mvpWinnerOwner.textContent = `${getPlayerById(m.winner.ownerId)?.name || '?'} earns +1 point!`; return; }
    mvpCandidates.style.display = 'grid'; mvpTally.style.display = 'block'; document.querySelector('.mvp-actions').style.display = 'flex'; mvpResult.classList.remove('show');
    const cands = getMVPCandidates(); mvpCandidates.innerHTML = '';
    cands.forEach(c => { const v = m.votes.get(c.key) || 0, maxV = Math.max(...Array.from(m.votes.values()), 0), lead = v > 0 && v === maxV;
      const d = document.createElement('button'); d.type = 'button'; d.className = 'mvp-candidate' + (lead ? ' voted' : '');
      d.innerHTML = `<div class="mvp-candidate-name">${escapeHtml(c.char.name)}</div><div class="mvp-candidate-anime">${escapeHtml(c.char.anime)}</div><div class="mvp-candidate-owner">Owner: ${escapeHtml(c.ownerName)}</div><div class="mvp-candidate-votes">${v} vote${v !== 1 ? 's' : ''}</div>`;
      d.onclick = () => { m.votes.set(c.key, (m.votes.get(c.key) || 0) + 1); render(); };
      mvpCandidates.appendChild(d);
    });
    const ldr = getMVPLeader(); mvpTally.textContent = !ldr ? 'Click a character to vote!' : ldr.tied ? `Tied at ${ldr.maxVotes}: ${ldr.leaders.map(l => l.char.name).join(', ')}` : `Leading: ${ldr.leaders[0].char.name} (${ldr.maxVotes})`;
  }
  function renderButtons() {
    btnNewRound.disabled = state.phase === PHASE.LOBBY || state.phase === PHASE.TOURNAMENT || state.phase === PHASE.MVP;
    btnNextTurn.disabled = state.phase !== PHASE.DRAFT; btnReroll4.disabled = state.phase !== PHASE.DRAFT;
    const swapP = getSwapPlayer(), swapT = swapP ? getTeam(swapP.id) : null, fc = swapT ? roles.filter(r => !!swapT[r]).length : 0;
    btnSwap.disabled = !(state.phase === PHASE.LOCK && swapP && !swapP.swapUsedThisRound && fc >= 2);
    btnLockAll.disabled = state.phase !== PHASE.LOCK; btnRevealModifier.disabled = !(state.phase === PHASE.LOCK && isModifierRound() && allLocked());
    btnStartTournament.disabled = !(state.phase === PHASE.LOCK && allLocked());
    btnConfirmMatch.disabled = state.phase !== PHASE.TOURNAMENT; btnClearMatchVotes.disabled = state.phase !== PHASE.TOURNAMENT;
    btnConfirmMVP.disabled = state.phase !== PHASE.MVP; btnClearMVPVotes.disabled = state.phase !== PHASE.MVP;
  }
  function getSwapPlayer() { return state.phase === PHASE.LOCK ? state.players.find(p => p.id === (state.swapTargetPlayerId || state.players[0]?.id)) : null; }
  function renderHint() {
    if (state.phase === PHASE.LOBBY) hint.textContent = 'Set up the lobby to begin.';
    else if (state.phase === PHASE.DRAFT) { const ud = state.players[state.pickOrder[0]]; hint.textContent = (state.round > 1 && state.pickIndex === 0 && ud) ? `Underdog draft! ${ud.name} picks first.` : 'Select character, assign role, confirm.'; }
    else if (state.phase === PHASE.LOCK) hint.textContent = allLocked() ? 'All locked! Start tournament.' : 'Lock teams to proceed.';
    else if (state.phase === PHASE.TOURNAMENT) { const t = state.tournament; hint.textContent = t.roundChampion ? 'Tournament done! Go to MVP vote.' : t.currentMatchup?.bye ? 'BYE — click Continue.' : 'Debate & vote!'; }
    else if (state.phase === PHASE.MVP) hint.textContent = state.mvp.confirmed ? 'MVP awarded! Next round.' : `Vote best ${roleName(state.mvp.selectedRole)}!`;
    else hint.textContent = 'Match ended. Restart to play again.';
  }
  function render() { renderPills(); renderHint(); renderModifier(); renderCards(); renderRoleButtons(); renderTeams(); renderTournament(); renderMVP(); renderButtons(); swapBox.style.display = swapBox.dataset.open === '1' ? 'block' : 'none'; }

  function openLobby() { lobbyModal.style.display = 'flex'; state.rivalries = new Map(); }
  function closeLobby() { lobbyModal.style.display = 'none'; }
  function buildNameFields(n) { nameFields.innerHTML = ''; for (let i = 1; i <= n; i++) { const w = document.createElement('div'); w.className = 'namefield'; w.innerHTML = `<label>Player ${i}</label><input type="text" value="Player ${i}" />`; nameFields.appendChild(w); } }
  playerCountSel.onchange = () => buildNameFields(parseInt(playerCountSel.value, 10));
  btnStart.onclick = () => {
    const cnt = clampInt(playerCountSel.value, 2, 8, 2); state.modEvery = clampInt(modEveryInput.value, 0, 99, 0); state.totalRounds = clampInt(totalRoundsInput.value, 1, 99, 5);
    const names = Array.from(nameFields.querySelectorAll('input')).slice(0, cnt).map(i => i.value.trim() || 'Player');
    state.players = names.map((nm, i) => ({ id: `P${i+1}`, name: nm, points: 0, swapUsedThisRound: false, locked: false }));
    state.rivalries = new Map(); closeLobby(); startNewMatch();
  };
  function startNewMatch() { state.round = 0; state.players.forEach(p => p.points = 0); state.rivalries = new Map(); startNextRound(); }
  function startNextRound(sudden = false) {
    state.round++;
    if (!sudden && state.round > state.totalRounds) { const ld = matchLeaders(); if (!ld.tied) { setPhase(PHASE.END); hint.textContent = `Winner: ${ld.names[0]} (${ld.max} pts)`; return; } }
    state.inRoundDrafted = new Set(); state.teams = new Map();
    state.players.forEach(p => { p.swapUsedThisRound = false; p.locked = false; state.teams.set(p.id, { captain: null, vice: null, tank: null, assassin: null, support: null }); });
    state.swapTargetPlayerId = state.players[0]?.id || null;
    state.tournament = { bracket: [], currentRoundIndex: 0, currentMatchIndex: 0, remainingTeams: [], eliminatedTeams: [], matchVotesA: 0, matchVotesB: 0, currentMatchup: null, bracketHistory: [], roundChampion: null };
    state.mvp = { selectedRole: null, votes: new Map(), winner: null, confirmed: false };
    if (state.round === 1) { const sh = shuffleArray(state.players.map((_, i) => i)), tot = state.players.length * roles.length, ord = []; for (let i = 0; i < tot; i++) { const c = Math.floor(i / state.players.length), pos = i % state.players.length; ord.push(c % 2 === 0 ? sh[pos] : sh[state.players.length - 1 - pos]); } state.pickOrder = ord; }
    else { const res = computeUnderdogSnakeOrder(state.players.length, roles.length); state.pickOrder = res.order; }
    state.pickIndex = 0; state.modifier = isModifierRound() ? randomModifier() : null; state.modifierRevealed = false;
    state.selectedChar = null; state.selectedRoleId = null; setPhase(PHASE.DRAFT); generate4();
  }
  function generate4() { state.current4 = sampleN(DATA.characters, 4, new Set([...state.inRoundDrafted, ...assignedKeysSet()])); state.selectedChar = null; state.selectedRoleId = null; }
  function advanceTurn() { if (state.phase !== PHASE.DRAFT) return; if (state.pickIndex < state.pickOrder.length - 1) { state.pickIndex++; generate4(); render(); return; } state.pickIndex++; setPhase(PHASE.LOCK); }
  function matchLeaders() { let max = -1, ids = []; state.players.forEach(p => { if (p.points > max) { max = p.points; ids = [p.id]; } else if (p.points === max) ids.push(p.id); }); return { max, ids, names: ids.map(id => getPlayerById(id)?.name).filter(Boolean), tied: ids.length > 1 }; }

  btnReroll4.onclick = () => { if (state.phase === PHASE.DRAFT) { generate4(); render(); } };
  btnConfirmPick.onclick = () => {
    if (state.phase !== PHASE.DRAFT) return; const p = currentPlayer(); if (!p || !state.selectedChar || !state.selectedRoleId) return;
    const t = getTeam(p.id); if (!t || t[state.selectedRoleId]) return;
    const k = itemKey(state.selectedChar); if (state.inRoundDrafted.has(k)) return;
    t[state.selectedRoleId] = state.selectedChar; state.inRoundDrafted.add(k);
    state.selectedChar = null; state.selectedRoleId = null; advanceTurn(); render();
  };
  btnNextTurn.onclick = () => { if (state.phase === PHASE.DRAFT) { generate4(); render(); } };
  btnNewRound.onclick = () => { if (state.phase !== PHASE.LOBBY && state.phase !== PHASE.TOURNAMENT && state.phase !== PHASE.MVP) startNextRound(state.round > state.totalRounds); };
  btnRestart.onclick = openLobby;
  btnLockAll.onclick = () => { if (state.phase === PHASE.LOCK) { state.players.forEach(p => p.locked = true); render(); } };
  btnRevealModifier.onclick = () => { if (state.phase === PHASE.LOCK && isModifierRound() && allLocked()) { state.modifierRevealed = true; render(); } };
  btnStartTournament.onclick = () => { if (state.phase === PHASE.LOCK && allLocked()) { initTournamentBracket(); setPhase(PHASE.TOURNAMENT); } };
  matchTeamA.onclick = () => { if (state.phase === PHASE.TOURNAMENT && state.tournament.currentMatchup && !state.tournament.currentMatchup.bye) { state.tournament.matchVotesA++; render(); } };
  matchTeamB.onclick = () => { if (state.phase === PHASE.TOURNAMENT && state.tournament.currentMatchup && !state.tournament.currentMatchup.bye) { state.tournament.matchVotesB++; render(); } };
  btnClearMatchVotes.onclick = () => { if (state.phase === PHASE.TOURNAMENT) { state.tournament.matchVotesA = 0; state.tournament.matchVotesB = 0; render(); } };
  btnConfirmMatch.onclick = () => {
    if (state.phase !== PHASE.TOURNAMENT) return; const t = state.tournament; if (!t.currentMatchup || t.currentMatchup.bye) return;
    if (t.matchVotesA === 0 && t.matchVotesB === 0) { hint.textContent = 'Cast votes first!'; return; }
    if (t.matchVotesA === t.matchVotesB) { hint.textContent = 'Tied! Add tiebreaker vote.'; return; }
    const wId = t.matchVotesA > t.matchVotesB ? t.currentMatchup.teamA : t.currentMatchup.teamB;
    const lId = t.matchVotesA > t.matchVotesB ? t.currentMatchup.teamB : t.currentMatchup.teamA;
    processMatchWinner(wId, lId);
  };
  btnAcknowledgeBye.onclick = () => { if (state.phase === PHASE.TOURNAMENT && state.tournament.currentMatchup?.bye) processByeAdvance(state.tournament.currentMatchup.bye); };
  btnGoToMVP.onclick = () => { if (state.phase === PHASE.TOURNAMENT && state.tournament.roundChampion) { initMVPVoting(); setPhase(PHASE.MVP); } };
  btnClearMVPVotes.onclick = () => { if (state.phase === PHASE.MVP) { state.mvp.votes = new Map(); render(); } };
  btnConfirmMVP.onclick = () => {
    if (state.phase !== PHASE.MVP) return; const ldr = getMVPLeader();
    if (!ldr) { hint.textContent = 'Cast votes first!'; return; }
    if (ldr.tied) { hint.textContent = 'Tied! Add tiebreaker.'; return; }
    confirmMVPWinner(ldr.leaders[0]);
  };
  btnNextRoundFromMVP.onclick = () => { if (state.phase === PHASE.MVP && state.mvp.confirmed) { const ld = matchLeaders(); if (state.round >= state.totalRounds) { if (ld.tied) startNextRound(true); else { setPhase(PHASE.END); hint.textContent = `Winner: ${ld.names[0]} (${ld.max} pts)`; } } else startNextRound(); } };
  btnSwap.onclick = () => { if (state.phase !== PHASE.LOCK) return; const p = getSwapPlayer(); if (!p || p.swapUsedThisRound) return; const t = getTeam(p.id), filled = roles.filter(r => !!t[r]); if (filled.length < 2) return; swapRoleA.innerHTML = ''; swapRoleB.innerHTML = ''; filled.forEach(r => { const o = document.createElement('option'); o.value = r; o.textContent = roleName(r); swapRoleA.appendChild(o); swapRoleB.appendChild(o.cloneNode(true)); }); swapBox.dataset.open = '1'; render(); };
  btnCancelSwap.onclick = () => { swapBox.dataset.open = '0'; render(); };
  btnDoSwap.onclick = () => { if (state.phase !== PHASE.LOCK) return; const p = getSwapPlayer(); if (!p || p.swapUsedThisRound) return; const a = swapRoleA.value, b = swapRoleB.value; if (!a || !b || a === b) return; const t = getTeam(p.id); if (!t[a] || !t[b]) return; const tmp = t[a]; t[a] = t[b]; t[b] = tmp; p.swapUsedThisRound = true; swapBox.dataset.open = '0'; render(); };

  function init() { buildNameFields(4); playerCountSel.value = '4'; swapBox.dataset.open = '0'; openLobby(); render(); }
  init();
})();
