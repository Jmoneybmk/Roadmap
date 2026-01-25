/* Hi/Lo Game Mode - Fixed Version */
(() => {
  'use strict';

  // -------------------------
  // DOM
  // -------------------------
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const elLobby = $('#lobby');
  const elGame = $('#game');

  const elModeSelect = $('#modeSelect');
  const elPlayerCount = $('#playerCount');
  const elStartPoints = $('#startPoints');
  const elModsToggle = $('#modsToggle');
  const elMatchesInput = $('#matchesInput');
  const elLoanToggle = $('#loanToggle');

  const elPlayerInputs = $('#playerInputs');
  const elLobbyStatus = $('#lobbyStatus');

  const btnLoadData = $('#btnLoadData');
  const btnStart = $('#btnStart');

  const packLabel = $('#packLabel');
  const modeLabel = $('#modeLabel');

  const matchLabel = $('#matchLabel');
  const turnName = $('#turnName');
  const turnMeta = $('#turnMeta');

  const titleA = $('#titleA');
  const titleB = $('#titleB');
  const metaA = $('#metaA');
  const metaB = $('#metaB');
  const imgA = $('#imgA');
  const imgB = $('#imgB');
  const scoreA = $('#scoreA');
  const scoreB = $('#scoreB');
  const scoreRowA = $('#scoreRowA');
  const scoreRowB = $('#scoreRowB');

  const betAmount = $('#betAmount');
  const betHelp = $('#betHelp');

  const btnPickHi = $('#btnPickHi');
  const btnPickLo = $('#btnPickLo');

  const btnReveal = $('#btnReveal');
  const btnNext = $('#btnNext');
  const btnModifier = $('#btnModifier');

  const phaseHelp = $('#phaseHelp');
  const resultBar = $('#resultBar');

  const playersBoxGame = $('#playersBoxGame');
  const teamsBox = $('#teamsBox');
  const usedList = $('#usedList');
  const btnClearUsed = $('#btnClearUsed');
  const btnResetMatch = $('#btnResetMatch');

  const modifierBar = $('#modifierBar');
  const modifierText = $('#modifierText');
  const btnClearModifier = $('#btnClearModifier');

  const winnerModal = $('#winnerModal');
  const winnerTitle = $('#winnerTitle');
  const winnerText = $('#winnerText');
  const btnNextMatch = $('#btnNextMatch');
  const btnCloseWinner = $('#btnCloseWinner');

  // -------------------------
  // State
  // -------------------------
  const DEFAULT_MODIFIERS = [
    { id: 1, name: 'Double Points', desc: 'Winnings are doubled this turn.' },
    { id: 2, name: 'Upside Down', desc: 'Your pick is reversed (HI becomes LO and LO becomes HI).' },
    { id: 3, name: 'Double Down', desc: 'Your bet amount is doubled (if you can\'t cover it, you go all-in).' },
    { id: 4, name: 'All In / Jackpot', desc: 'Lose: drop to 0. Win: double your TOTAL points.' },
    { id: 5, name: 'Safety Net', desc: 'If you lose, you only lose half your bet (rounded down).' },
  ];

  let DATA = null;
  let entries = [];

  const state = {
    lobby: {
      mode: 'singles',
      playerCount: 4,
      startPoints: 10,
      modifiersOn: true,
      totalMatches: 3,
      loansOn: true,
    },
    game: null,
  };

  // -------------------------
  // Utilities
  // -------------------------
  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function entryTitle(e) {
    return e.displayTitle || e.rawEnglishTitle || e.rawTitle || e.japaneseTitle || 'Unknown Title';
  }

  function entryMeta(e) {
    const bits = [];
    if (e.type) bits.push(e.type);
    if (e.year) bits.push(String(e.year));
    if (e.season) bits.push(e.season);
    if (typeof e.episodes === 'number') bits.push(`${e.episodes} eps`);
    return bits.join(' • ') || '—';
  }

  function normalizeEntries(raw) {
    const list = Array.isArray(raw) ? raw : (raw?.entries || []);
    return list
      .filter(e => typeof e?.score === 'number' && e.score > 0)
      .map(e => ({
        ...e,
        displayTitle: entryTitle(e),
        imageUrl: e.imageUrl || null,
      }));
  }

  function show(el) { el.classList.remove('hidden'); }
  function hide(el) { el.classList.add('hidden'); }

  function setStatus(msg) { elLobbyStatus.textContent = msg || ''; }

  function modalOpen(title, text, showNextMatch) {
    winnerTitle.textContent = title;
    winnerText.textContent = text;
    if (showNextMatch) show(btnNextMatch); else hide(btnNextMatch);
    show(winnerModal);
  }
  function modalClose() { hide(winnerModal); }

  // -------------------------
  // Data loading
  // -------------------------
  async function loadData() {
    setStatus('Loading Hi/Lo data…');
    try {
      if (window.HILO_DATA && (window.HILO_DATA.entries || window.HILO_DATA.meta)) {
        DATA = window.HILO_DATA;
        entries = normalizeEntries(window.HILO_DATA);
        if (entries.length < 2) throw new Error('Not enough entries in HILO_DATA.');
        setStatus(`Loaded ${entries.length} entries.`);
        return;
      }

      const res = await fetch('hilo_data.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load hilo_data.json (${res.status})`);
      const json = await res.json();
      DATA = json;
      entries = normalizeEntries(json);
      if (entries.length < 2) throw new Error('Not enough entries in hilo_data.json.');
      setStatus(`Loaded ${entries.length} entries.`);
    } catch (err) {
      console.error(err);
      if (location.protocol === 'file:') {
        setStatus('Error: Failed to fetch. Use a local web server OR include hilo_data.js.');
      } else {
        setStatus(`Error: ${err.message}`);
      }
      DATA = null;
      entries = [];
    }
  }

  // -------------------------
  // Lobby UI
  // -------------------------
  function rebuildPlayerInputs() {
    const count = clamp(parseInt(elPlayerCount.value || '2', 10), 2, 8);
    elPlayerCount.value = String(count);

    const existing = $$('#playerInputs input').map(i => i.value);

    elPlayerInputs.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Player ${i + 1}`;
      input.value = (existing[i] ?? `Player ${i + 1}`);
      elPlayerInputs.appendChild(input);
    }
  }

  function readLobbyPlayers() {
    const count = clamp(parseInt(elPlayerCount.value || '2', 10), 2, 8);
    const names = $$('#playerInputs input')
      .slice(0, count)
      .map(i => i.value.trim())
      .filter(v => v.length > 0);
    return names;
  }

  // -------------------------
  // Game creation
  // -------------------------
  function createGame(players, opts) {
    const mode = opts.mode;
    const startPoints = opts.startPoints;

    const playerObjs = players.map((name, idx) => ({
      id: idx + 1,
      name,
      points: startPoints,
      debt: 0,
      team: null,

      // Stats (per match)
      streak: { current: 0, best: 0 }, // consecutive correct guesses in a row
      biggestWin: 0,                  // largest single-bet gain (positive)
      biggestLoss: 0,                 // largest single-bet loss (positive magnitude)
      wins: 0,
      losses: 0,
    }));

    const game = {
      mode,
      players: playerObjs,
      totalMatches: opts.totalMatches,
      currentMatch: 1,

      // Match state
      turnIndex: 0,
      turnComplete: false,  // Player finished their streak (lost)
      playersCompletedThisMatch: new Set(),

      // Anime state
      usedMalIds: new Set(),
      usedDisplay: [],
      deck: entries.slice(),
      currentA: null,
      currentB: null,

      // Turn state
      pick: null,
      bet: 1,
      revealed: false,

      // Settings
      modifiersOn: opts.modifiersOn,
      activeModifier: null,
      loansOn: opts.loansOn,

      // Teams (if applicable)
      teams: null,

      // Tie-break state
      tiebreakActive: false,
      tiebreakRound: 0,
      tiebreakEligibleIds: null, // Set of player ids allowed to play during tie-break

    };

    if (mode === 'teams') {
      const shuffled = playerObjs.slice().sort(() => Math.random() - 0.5);
      const A = [];
      const B = [];
      for (const p of shuffled) {
        if (A.length <= B.length) A.push(p); else B.push(p);
      }
      for (const p of A) p.team = 'A';
      for (const p of B) p.team = 'B';

      const capA = pickRandom(A);
      const capB = pickRandom(B);

      game.teams = {
        A: { name: 'Team A', captainId: capA.id, members: A.map(x => x.id) },
        B: { name: 'Team B', captainId: capB.id, members: B.map(x => x.id) },
      };
    }

    return game;
  }

  // -------------------------
  // Deck + drawing
  // -------------------------
  function drawEntry() {
    const g = state.game;
    const available = g.deck.filter(e => !g.usedMalIds.has(e.malId));
    if (available.length === 0) {
      g.usedMalIds.clear();
      g.usedDisplay = [];
      usedList.innerHTML = '';
      return drawEntry();
    }
    const e = pickRandom(available);
    g.usedMalIds.add(e.malId);
    g.usedDisplay.push(`${e.displayTitle}`);
    renderUsedPool();
    return e;
  }

  function ensureAB() {
    const g = state.game;
    if (!g.currentA) g.currentA = drawEntry();
    if (!g.currentB) g.currentB = drawEntry();
    if (g.currentA.malId === g.currentB.malId) g.currentB = drawEntry();
    renderAB(false);
  }

  function rotateBtoA() {
    const g = state.game;
    g.currentA = g.currentB;
    g.currentB = drawEntry();
    if (g.currentA.malId === g.currentB.malId) g.currentB = drawEntry();
    renderAB(false);
  }

  // -------------------------
  // Rendering
  // -------------------------
  function renderAB(showScoreB) {
    const g = state.game;
    const A = g.currentA, B = g.currentB;

    titleA.textContent = entryTitle(A);
    titleB.textContent = entryTitle(B);
    metaA.textContent = entryMeta(A);
    metaB.textContent = entryMeta(B);

    imgA.src = A.imageUrl || '';
    imgB.src = B.imageUrl || '';
    imgA.style.opacity = A.imageUrl ? '1' : '0.25';
    imgB.style.opacity = B.imageUrl ? '1' : '0.25';

    // ALWAYS show Anime A's score
    scoreA.textContent = A.score.toFixed(2);
    show(scoreRowA);

    // Only show Anime B's score after reveal
    if (showScoreB) {
      scoreB.textContent = B.score.toFixed(2);
      show(scoreRowB);
    } else {
      scoreB.textContent = '???';
      hide(scoreRowB);
    }
  }

  function renderScoreboard() {
    const g = state.game;
    playersBoxGame.innerHTML = '';

    // Teams header
    if (g.mode === 'teams' && g.teams) {
      show(teamsBox);
      teamsBox.innerHTML = '';

      const Apts = teamPoints('A');
      const Bpts = teamPoints('B');

      const teamCardA = document.createElement('div');
      teamCardA.className = 'teamCard';
      teamCardA.innerHTML = `<div class="teamName">Team A</div><div class="teamMeta">Points: <b>${Apts}</b> • Captain: ${playerName(g.teams.A.captainId)}</div>`;
      const teamCardB = document.createElement('div');
      teamCardB.className = 'teamCard';
      teamCardB.innerHTML = `<div class="teamName">Team B</div><div class="teamMeta">Points: <b>${Bpts}</b> • Captain: ${playerName(g.teams.B.captainId)}</div>`;
      teamsBox.appendChild(teamCardA);
      teamsBox.appendChild(teamCardB);
    } else {
      hide(teamsBox);
    }

    // Sort by points descending for display
    const sorted = [...g.players].sort((a, b) => b.points - a.points);

    for (const p of sorted) {
      const row = document.createElement('div');
      row.className = 'playerRow';

      // Highlight current player
      if (g.players[g.turnIndex]?.id === p.id) {
        row.style.borderColor = 'rgba(124,92,255,.55)';
        row.style.background = 'rgba(124,92,255,.08)';
      }

      const name = document.createElement('div');
      name.className = 'nameEdit';
      name.textContent = p.name;
      name.title = 'Click to edit name';
      name.addEventListener('click', () => {
        const next = prompt('Edit player name:', p.name);
        if (next && next.trim()) {
          p.name = next.trim();
          renderTurnHeader();
          renderScoreboard();
        }
      });

      const pts = document.createElement('div');
      pts.className = 'points';

      const ptsValue = document.createElement('b');
      ptsValue.textContent = String(p.points);
      pts.appendChild(ptsValue);

      // Streak badge (only when hot)
      const curStreak = p.streak?.current || 0;
      if (curStreak >= 2) {
        const badge = document.createElement('span');
        badge.className = 'streakBadge';
        badge.textContent = `🔥${curStreak}`;
        pts.appendChild(badge);
      }

      const minus = document.createElement('button');
      minus.className = 'tinyBtn';
      minus.textContent = '−';
      minus.addEventListener('click', () => {
        p.points = Math.max(0, p.points - 1);
        renderScoreboard();
        renderTurnHeader();
      });

      const plus = document.createElement('button');
      plus.className = 'tinyBtn';
      plus.textContent = '+';
      plus.addEventListener('click', () => {
        p.points += 1;
        renderScoreboard();
        renderTurnHeader();
      });

      pts.appendChild(minus);
      pts.appendChild(plus);

      row.appendChild(name);

      if (g.mode === 'teams' && p.team) {
        const tag = document.createElement('div');
        tag.className = 'muted small';
        tag.textContent = `Team ${p.team}`;
        row.appendChild(tag);
      }

      row.appendChild(pts);

      const meta = document.createElement('div');
      meta.className = 'muted small';
      const best = p.streak?.best || 0;
      const bw = p.biggestWin || 0;
      const bl = p.biggestLoss || 0;
      const w = p.wins || 0;
      const l = p.losses || 0;
      meta.textContent = `W/L: ${w}/${l} • Best streak: ${best} • Big win: +${bw} • Big loss: -${bl}`;
      row.appendChild(meta);

      playersBoxGame.appendChild(row);
    }

    // Debts summary
    const debtLines = g.players
      .filter(p => p.debt > 0)
      .map(p => `${p.name} owes ${p.debt}`)
      .join(' • ');
    $('#debtRow').textContent = debtLines ? `Debts: ${debtLines}` : 'Debts: none';

    // Stats summary rows (longest streak + biggest single swings)
    const { streakRow, swingRow } = ensureStatRows();
    if (streakRow && swingRow) {
      // Longest streak (best)
      let bestVal = 0;
      let bestNames = [];
      for (const pl of g.players) {
        const s = pl.streak?.best || 0;
        if (s > bestVal) { bestVal = s; bestNames = [pl.name]; }
        else if (s === bestVal && s > 0) { bestNames.push(pl.name); }
      }
      streakRow.textContent = bestVal > 0
        ? `Longest streak: ${bestNames.join(', ')} (${bestVal})`
        : 'Longest streak: none yet';

      // Biggest swings
      let winVal = 0, winNames = [];
      let lossVal = 0, lossNames = [];
      for (const pl of g.players) {
        const bw = pl.biggestWin || 0;
        const bl = pl.biggestLoss || 0;
        if (bw > winVal) { winVal = bw; winNames = [pl.name]; }
        else if (bw === winVal && bw > 0) { winNames.push(pl.name); }

        if (bl > lossVal) { lossVal = bl; lossNames = [pl.name]; }
        else if (bl === lossVal && bl > 0) { lossNames.push(pl.name); }
      }
      const winText = winVal > 0 ? `${winNames.join(', ')} (+${winVal})` : 'none yet';
      const lossText = lossVal > 0 ? `${lossNames.join(', ')} (-${lossVal})` : 'none yet';
      swingRow.textContent = `Biggest win: ${winText} • Biggest loss: ${lossText}`;
    }

  }

  function renderUsedPool() {
    usedList.innerHTML = '';
    const g = state.game;
    const tail = g.usedDisplay.slice(-40);
    for (const s of tail) {
      const div = document.createElement('div');
      div.className = 'usedItem';
      div.textContent = s;
      usedList.appendChild(div);
    }
  }

  function playerName(id) {
    const p = state.game.players.find(x => x.id === id);
    return p ? p.name : '—';
  }

  function activePlayer() {
    const g = state.game;
    return g.players[g.turnIndex];
  }

  function isEligiblePlayer(p) {
    const g = state.game;
    if (!g?.tiebreakActive) return true;
    return !!(p && g.tiebreakEligibleIds && g.tiebreakEligibleIds.has(p.id));
  }

  function teamPoints(team) {
    const g = state.game;
    if (!g.teams) return 0;
    const ids = team === 'A' ? g.teams.A.members : g.teams.B.members;
    return ids.map(id => g.players.find(p => p.id === id)?.points || 0).reduce((a, b) => a + b, 0);
  }

  function renderTurnHeader() {
    const g = state.game;
    matchLabel.textContent = `${g.currentMatch} / ${g.totalMatches}`;

    const p = activePlayer();
    turnName.textContent = p ? p.name : '—';

    if (g.mode === 'teams' && p?.team) {
      const capId = p.team === 'A' ? g.teams.A.captainId : g.teams.B.captainId;
      const capName = playerName(capId);
      turnMeta.textContent = `Team ${p.team} • Captain: ${capName}`;
    } else {
      turnMeta.textContent = `${p?.points || 0} points`;
    }

    modeLabel.textContent = (g.mode === 'teams') ? 'Teams' : 'Singles';

    // Bet max hint
    if (p) {
      const max = Math.max(1, p.points || 1);
      betAmount.max = String(max);
      betAmount.value = String(clamp(parseInt(betAmount.value || '1', 10), 1, max));
      betHelp.textContent = `Bet up to ${p.points} points.`;
    }
  }

  function renderModifier() {
    const g = state.game;
    if (!g.activeModifier) {
      hide(modifierBar);
      return;
    }
    show(modifierBar);
    modifierText.textContent = `${g.activeModifier.name}: ${g.activeModifier.desc}`;
  }

  function resetTurnFlags() {
    const g = state.game;
    g.pick = null;
    g.revealed = false;
    hide(resultBar);
    hide(scoreRowB);
    btnReveal.disabled = true;
    btnNext.disabled = true;
    btnModifier.disabled = false;  // Re-enable modifier button
    phaseHelp.textContent = 'Pick HI or LO, then Reveal.';
    btnPickHi.classList.remove('selected');
    btnPickLo.classList.remove('selected');
  }

  // -------------------------
  // Turn progression
  // -------------------------
  function checkLoanOnTurnStart() {
    const g = state.game;
    const p = activePlayer();
    if (!p) return true;

    // Check if this player has 0 points at the START of their turn
    if (p.points === 0 && g.loansOn) {
      const ok = confirm(`${p.name} has 0 points!\n\nLoan them +3 points?\n\nYes = They get 3 points (adds to debt)\nNo = They skip this match`);
      if (ok) {
        p.points += 3;
        p.debt += 3;
        renderScoreboard();
        renderTurnHeader();
        return true;  // Player can play
      } else {
        // Skip this player for the rest of the match
        g.playersCompletedThisMatch.add(p.id);
        return false;  // Signal to move to next player
      }
    }

    return true;  // Player has points, can play
  }

  function nextPlayer() {
    const g = state.game;

    // Mark current player as completed for this match
    const currentPlayer = activePlayer();
    if (currentPlayer) {
      g.playersCompletedThisMatch.add(currentPlayer.id);
    }

    // Find next player who hasn't completed their turn this match
    let attempts = 0;
    while (attempts < g.players.length) {
      g.turnIndex = (g.turnIndex + 1) % g.players.length;
      attempts++;

      const nextP = g.players[g.turnIndex];

      // Skip if already completed this match
      if (g.playersCompletedThisMatch.has(nextP.id)) {
        continue;
      }

      // During tie-break, skip players who are not eligible
      if (!isEligiblePlayer(nextP)) {
        continue;
      }


      // Found a player who hasn't gone yet - now check if they need a loan
      // This happens at the START of their turn
      if (nextP.points === 0 && g.loansOn) {
        const ok = confirm(`${nextP.name}'s turn!\n\nThey have 0 points. Loan them +3?\n\nYes = They get 3 points (adds to debt)\nNo = They skip this match`);
        if (ok) {
          nextP.points += 3;
          nextP.debt += 3;
          renderScoreboard();
          // Continue to let them play
        } else {
          // They refused, mark as completed and continue looking
          g.playersCompletedThisMatch.add(nextP.id);
          continue;
        }
      }

      // This player is valid and ready to play
      renderTurnHeader();
      resetTurnFlags();
      renderScoreboard();
      return;
    }

    // All players have completed this match
    endMatch();
  }

  function applyModifierToBet(pick, bet, player) {
    const g = state.game;
    let effPick = pick;
    let effBet = bet;

    const mod = g.activeModifier;
    if (!mod) return { effPick, effBet, special: null };

    if (mod.name === 'Upside Down') {
      if (effPick === 'hi') effPick = 'lo';
      else if (effPick === 'lo') effPick = 'hi';
    }

    if (mod.name === 'Double Down') {
      const doubled = effBet * 2;
      if (player.points >= doubled) {
        effBet = doubled;
      } else {
        effBet = player.points; // all-in
      }
    }

    return { effPick, effBet, special: mod.name };
  }
  // -------------------------
  // Stats tracking (streaks + big swings)
  // -------------------------
  function trackBetOutcome(player, delta, outcome) {
    // outcome: 'win' | 'lose' | 'push'
    if (!player) return;

    if (outcome === 'win') {
      player.wins = (player.wins || 0) + 1;
      player.streak = player.streak || { current: 0, best: 0 };
      player.streak.current += 1;
      player.streak.best = Math.max(player.streak.best, player.streak.current);

      if (delta > 0) player.biggestWin = Math.max(player.biggestWin || 0, delta);
    } else if (outcome === 'lose') {
      player.losses = (player.losses || 0) + 1;
      player.streak = player.streak || { current: 0, best: 0 };
      player.streak.current = 0;

      if (delta < 0) player.biggestLoss = Math.max(player.biggestLoss || 0, Math.abs(delta));
    } else {
      // push: no change to streak (keeps tension), no win/loss count
      player.streak = player.streak || { current: 0, best: 0 };
    }
  }

  function ensureStatRows() {
    const debt = $('#debtRow');
    if (!debt) return { streakRow: null, swingRow: null };

    const parent = debt.parentElement || debt;

    let streakRow = $('#streakRow');
    if (!streakRow) {
      streakRow = document.createElement('div');
      streakRow.id = 'streakRow';
      streakRow.className = 'debtRow muted';
      parent.appendChild(streakRow);
    }

    let swingRow = $('#swingRow');
    if (!swingRow) {
      swingRow = document.createElement('div');
      swingRow.id = 'swingRow';
      swingRow.className = 'debtRow muted';
      parent.appendChild(swingRow);
    }

    return { streakRow, swingRow };
  }


  function resolveTurn() {
    const g = state.game;
    const p = activePlayer();
    if (!p) return;

    const beforePoints = p.points;

    const A = g.currentA, B = g.currentB;
    const a = A.score, b = B.score;

    let bet = clamp(parseInt(betAmount.value || '1', 10), 1, Math.max(1, p.points || 1));
    betAmount.value = String(bet);
    g.bet = bet;

    const { effPick, effBet } = applyModifierToBet(g.pick, bet, p);

    // PUSH: Equal scores - player gets their bet back, continues
    if (Math.abs(a - b) < 0.001 || a.toFixed(2) === b.toFixed(2)) {
      showResult(`🔄 Push! Scores are equal (${a.toFixed(2)} vs ${b.toFixed(2)}). Bet returned. Continue guessing!`);
      trackBetOutcome(p, 0, 'push');
      return { outcome: 'push', playerContinues: true };
    }

    const isHigher = b > a;
    const correct = (effPick === 'hi' && isHigher) || (effPick === 'lo' && !isHigher);

    // Special: All In / Jackpot
    if (g.activeModifier?.name === 'All In / Jackpot') {
      if (correct) {
        const gain = p.points;
        p.points += gain;
        trackBetOutcome(p, p.points - beforePoints, 'win');
        showResult(`✅ JACKPOT! ${p.name} doubles total points (+${gain})! Continue guessing!`);
        renderScoreboard();
        return { outcome: 'win', playerContinues: true };
      } else {
        p.points = 0;
        trackBetOutcome(p, p.points - beforePoints, 'lose');
        // NO loan prompt here - just end turn, will prompt at START of next turn
        showResult(`❌ JACKPOT fail! ${p.name} drops to 0. Turn ends.`);
        renderScoreboard();
        return { outcome: 'lose', playerContinues: false };
      }
    }

    // Normal win/lose
    if (correct) {
      let gain = effBet;

      if (g.activeModifier?.name === 'Double Points') {
        gain = effBet * 2;
      }

      p.points += gain;
      trackBetOutcome(p, p.points - beforePoints, 'win');
      showResult(`✅ Correct! ${p.name} wins +${gain} points! Continue guessing!`);
      renderScoreboard();
      return { outcome: 'win', playerContinues: true };
    } else {
      let loss = effBet;

      if (g.activeModifier?.name === 'Safety Net') {
        loss = Math.floor(effBet / 2);
      }

      p.points = Math.max(0, p.points - loss);
      trackBetOutcome(p, p.points - beforePoints, 'lose');
      // NO loan prompt here - just end turn, will prompt at START of next turn
      showResult(`❌ Wrong! ${p.name} loses -${loss} points. Turn ends.`);
      renderScoreboard();
      return { outcome: 'lose', playerContinues: false };
    }
  }

  function showResult(text) {
    resultBar.textContent = text;
    show(resultBar);
  }

  function reveal() {
    const g = state.game;
    if (!g.pick) return null;

    g.revealed = true;
    renderAB(true);  // Show Anime B's score

    // Disable modifier button once revealed
    btnModifier.disabled = true;

    const result = resolveTurn();

    btnReveal.disabled = true;
    btnNext.disabled = false;

    if (result.playerContinues) {
      phaseHelp.textContent = 'Click Next to continue your streak!';
    } else {
      phaseHelp.textContent = 'Click Next for the next player.';
    }

    return result;
  }

  function advanceAfterReveal() {
    const g = state.game;

    // Clear modifier after each turn
    g.activeModifier = null;
    renderModifier();

    // Check last result
    const txt = resultBar.textContent || '';
    const playerContinues = txt.includes('Continue guessing');

    if (playerContinues) {
      // Same player continues - rotate anime and reset for next guess
      rotateBtoA();
      resetTurnFlags();
      renderTurnHeader();
    } else {
      // Player's turn is over, move to next player
      rotateBtoA();
      nextPlayer();
    }
  }

  function endMatch() {
    const g = state.game;

    // Repay debts at end of each match
    for (const p of g.players) {
      if (p.debt > 0) {
        p.points = Math.max(0, p.points - p.debt);
        p.debt = 0;
      }
    }
    renderScoreboard();

    // Check if more matches remain
    if (g.currentMatch < g.totalMatches) {
      modalOpen(
        `Match ${g.currentMatch} Complete!`,
        `Debts repaid. Ready for Match ${g.currentMatch + 1}?`,
        true
      );
    } else {
      // Game over - find winner
      const max = Math.max(...g.players.map(p => p.points));
      const winners = g.players.filter(p => p.points === max);

      if (winners.length === 1) {
        g.tiebreakActive = false;
        g.tiebreakEligibleIds = null;
        
        modalOpen('🏆 Game Over!', `${winners[0].name} wins with ${winners[0].points} points!`, false);
      } else {
        // Start/continue tie-break: only tied players keep playing extra matches until one winner remains
        g.tiebreakActive = true;
        g.tiebreakRound = (g.tiebreakRound || 0) + 1;
        g.tiebreakEligibleIds = new Set(winners.map(w => w.id));

        // Add 1 extra match for the tie-break round
        g.totalMatches += 1;

        modalOpen(
          `🏁 Tie-break Round ${g.tiebreakRound}!`,
          `Tied: ${winners.map(w => w.name).join(', ')} (${max} pts). Only tied players will play the next match.`,
          true
        );
      }
    }
  }

  function startNextMatch() {
    const g = state.game;
    g.currentMatch += 1;
    g.turnIndex = 0;
    g.playersCompletedThisMatch.clear();

    // If tie-break is active, start turnIndex on the first eligible player
    if (g.tiebreakActive && g.tiebreakEligibleIds) {
      const firstEligibleIndex = g.players.findIndex(p => g.tiebreakEligibleIds.has(p.id));
      g.turnIndex = firstEligibleIndex >= 0 ? firstEligibleIndex : 0;
    }

    modalClose();

    // Check if first player needs loan at START of their turn
    const firstPlayer = g.players[g.turnIndex];
    if (firstPlayer.points === 0 && g.loansOn) {
      const ok = confirm(`${firstPlayer.name}'s turn!\n\nThey have 0 points. Loan them +3?\n\nYes = They get 3 points (adds to debt)\nNo = They skip this match`);
      if (ok) {
        firstPlayer.points += 3;
        firstPlayer.debt += 3;
      } else {
        g.playersCompletedThisMatch.add(firstPlayer.id);
        nextPlayer();
        return;
      }
    }

    renderTurnHeader();
    resetTurnFlags();
    renderScoreboard();
  }

  // -------------------------
  // Events
  // -------------------------
  btnLoadData.addEventListener('click', loadData);

  elPlayerCount.addEventListener('input', rebuildPlayerInputs);

  btnStart.addEventListener('click', () => {
    if (!entries.length) {
      setStatus('Data not loaded. Click "Reload Data" first.');
      return;
    }

    const players = readLobbyPlayers();
    if (players.length < 2) {
      setStatus('Please enter at least 2 player names.');
      return;
    }

    // Lobby -> state
    state.lobby.mode = elModeSelect.value;
    state.lobby.playerCount = clamp(parseInt(elPlayerCount.value || '2', 10), 2, 8);
    state.lobby.startPoints = clamp(parseInt(elStartPoints.value || '10', 10), 1, 999);
    state.lobby.modifiersOn = (elModsToggle.value === 'on');
    state.lobby.totalMatches = clamp(parseInt(elMatchesInput.value || '3', 10), 1, 99);
    state.lobby.loansOn = !!elLoanToggle.checked;

    state.game = createGame(players, {
      mode: state.lobby.mode,
      startPoints: state.lobby.startPoints,
      modifiersOn: state.lobby.modifiersOn,
      totalMatches: state.lobby.totalMatches,
      loansOn: state.lobby.loansOn,
    });

    packLabel.textContent = 'Anime';
    modeLabel.textContent = state.game.mode === 'teams' ? 'Teams' : 'Singles';

    hide(elLobby);
    show(elGame);

    ensureAB();
    renderTurnHeader();
    renderScoreboard();
    resetTurnFlags();
    renderModifier();
  });

  btnPickHi.addEventListener('click', () => {
    const g = state.game;
    if (!g || g.revealed) return;
    g.pick = 'hi';
    btnPickHi.classList.add('selected');
    btnPickLo.classList.remove('selected');
    btnReveal.disabled = false;
    phaseHelp.textContent = 'Ready! Click Reveal to see Anime B\'s score.';
  });

  btnPickLo.addEventListener('click', () => {
    const g = state.game;
    if (!g || g.revealed) return;
    g.pick = 'lo';
    btnPickLo.classList.add('selected');
    btnPickHi.classList.remove('selected');
    btnReveal.disabled = false;
    phaseHelp.textContent = 'Ready! Click Reveal to see Anime B\'s score.';
  });

  betAmount.addEventListener('input', () => {
    const p = activePlayer();
    if (!p) return;
    const max = Math.max(1, p.points || 1);
    betAmount.value = String(clamp(parseInt(betAmount.value || '1', 10), 1, max));
  });

  btnReveal.addEventListener('click', () => {
    if (!state.game) return;
    reveal();
  });

  btnNext.addEventListener('click', () => {
    if (!state.game) return;
    advanceAfterReveal();
  });

  btnModifier.addEventListener('click', () => {
    const g = state.game;
    if (!g || !g.modifiersOn || g.revealed) return;
    g.activeModifier = pickRandom(DEFAULT_MODIFIERS);
    renderModifier();
  });

  btnClearModifier.addEventListener('click', () => {
    const g = state.game;
    if (!g) return;
    g.activeModifier = null;
    renderModifier();
  });

  btnClearUsed.addEventListener('click', () => {
    const g = state.game;
    if (!g) return;
    g.usedMalIds.clear();
    g.usedDisplay = [];
    renderUsedPool();
  });

  btnResetMatch.addEventListener('click', () => {
    if (!confirm('Reset the game and return to lobby?')) return;
    state.game = null;
    show(elLobby);
    hide(elGame);
    setStatus('Game reset.');
  });

  btnNextMatch.addEventListener('click', startNextMatch);
  btnCloseWinner.addEventListener('click', () => {
    modalClose();
    // If game is over, go back to lobby
    if (state.game && state.game.currentMatch >= state.game.totalMatches) {
      state.game = null;
      show(elLobby);
      hide(elGame);
    }
  });

  winnerModal.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('modalBackdrop')) {
      // Don't close on backdrop click during game
    }
  });

  // -------------------------
  // Boot
  // -------------------------
  rebuildPlayerInputs();
  loadData();
})();
