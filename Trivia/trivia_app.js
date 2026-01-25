// trivia_app.js - Updated to match Draft mode patterns
// Winner checked AFTER all rounds complete, tiebreaker adds extra rounds
(() => {
  'use strict';

  // =====================================================
  // PACK SYSTEM
  // =====================================================
  const PACKS = window.TRIVIA_PACKS || {};
  let currentPackKey = 'anime';
  let currentPack = PACKS[currentPackKey] || {};

  function loadPack(key) {
    currentPackKey = key;
    currentPack = PACKS[key] || PACKS.anime || {};
  }

  loadPack('anime');

  // =====================================================
  // DOM ELEMENTS
  // =====================================================
  const pillPhase = document.getElementById('pillPhase');
  const pillRound = document.getElementById('pillRound');
  const pillPack = document.getElementById('pillPack');
  const questionStatus = document.getElementById('questionStatus');

  const qText = document.getElementById('qText');
  const qSource = document.getElementById('qSource');
  const answersGrid = document.getElementById('answersGrid');
  const modBanner = document.getElementById('modBanner');
  const modText = document.getElementById('modText');
  const revealBox = document.getElementById('revealBox');
  const revealAnswer = document.getElementById('revealAnswer');
  const winnerBox = document.getElementById('winnerBox');
  const winnerName = document.getElementById('winnerName');

  const voteGrid = document.getElementById('voteGrid');
  const voteHint = document.getElementById('voteHint');
  const scoreList = document.getElementById('scoreList');
  const hintBox = document.getElementById('hintBox');

  // Buttons
  const btnLobby = document.getElementById('btnLobby');
  const btnRevealMod = document.getElementById('btnRevealMod');
  const btnLockVotes = document.getElementById('btnLockVotes');
  const btnRevealAnswer = document.getElementById('btnRevealAnswer');
  const btnNextQuestion = document.getElementById('btnNextQuestion');
  const btnRestart = document.getElementById('btnRestart');

  // Lobby modal
  const lobbyBackdrop = document.getElementById('lobbyBackdrop');
  const btnCloseLobby = document.getElementById('btnCloseLobby');
  const packSelect = document.getElementById('packSelect');
  const playerCount = document.getElementById('playerCount');
  const questionCount = document.getElementById('questionCount');
  const modsToggle = document.getElementById('modsToggle');
  const lobbyNames = document.getElementById('lobbyNames');
  const btnStartGame = document.getElementById('btnStartGame');

  // =====================================================
  // STATE
  // =====================================================
  const PHASE = { LOBBY: 'Lobby', QUESTION: 'Question', VOTING: 'Voting', REVEAL: 'Reveal', FINISHED: 'Finished' };
  const OPTION_KEYS = ['A', 'B', 'C', 'D'];

  const state = {
    phase: PHASE.LOBBY,
    round: 0,
    totalRounds: 10,
    modsEnabled: true,
    inTiebreaker: false,
    tiebreakPlayers: [],  // Player IDs in tiebreaker

    players: [],
    questionPool: [],
    usedQuestionIds: new Set(),

    // Current question
    current: null,  // { question, options, correctKey, modifierText }
    votes: {},      // playerId -> 'A'/'B'/'C'/'D' or null
    locked: false,
    revealed: false,
  };

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

  function uid() {
    return Math.random().toString(36).slice(2, 9);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function activePlayers() {
    if (state.inTiebreaker && state.tiebreakPlayers.length > 0) {
      return state.players.filter(p => state.tiebreakPlayers.includes(p.id));
    }
    return state.players;
  }

  function setPhase(p) {
    state.phase = p;
    render();
  }

  // =====================================================
  // QUESTION POOL
  // =====================================================
  function buildQuestionPool() {
    const questions = currentPack.questions || [];
    state.questionPool = shuffle(questions.filter(q => q && q.question && q.answer));
    state.usedQuestionIds = new Set();
  }

  function getNextQuestion() {
    if (state.questionPool.length === 0) buildQuestionPool();
    
    const unused = state.questionPool.filter(q => !state.usedQuestionIds.has(q.id));
    const pick = unused.length > 0 ? unused[0] : state.questionPool[0];
    
    state.usedQuestionIds.add(pick.id);
    return pick;
  }

  function buildOptionsForQuestion(q) {
    const need = OPTION_KEYS.length - 1; // 3 wrong answers
    
    // PRIORITY: Get distractors from the SAME ANIME first (harder)
    // Then same TYPE, then random
    const pool = state.questionPool.filter(x => x.id !== q.id && x.answer && x.answer !== q.answer);
    
    // 1. Same anime + same type (hardest - e.g., other Naruto characters)
    const sameAnimeAndType = pool.filter(x => 
      x.source && q.source && 
      x.source.toLowerCase() === q.source.toLowerCase() && 
      x.type === q.type
    );
    
    // 2. Same anime, any type (still hard - e.g., Naruto locations when asking about Naruto character)
    const sameAnime = pool.filter(x => 
      x.source && q.source && 
      x.source.toLowerCase() === q.source.toLowerCase() &&
      !sameAnimeAndType.includes(x)
    );
    
    // 3. Same type, different anime (medium - e.g., other anime characters)
    const sameType = pool.filter(x => 
      x.type === q.type && 
      (!x.source || !q.source || x.source.toLowerCase() !== q.source.toLowerCase())
    );
    
    // 4. Random from other categories (easiest)
    const other = pool.filter(x => 
      x.type !== q.type && 
      (!x.source || !q.source || x.source.toLowerCase() !== q.source.toLowerCase())
    );
    
    let distractors = [];
    
    // Fill distractors prioritizing difficulty
    // Try to get 2-3 from same anime, 1 random
    const shuffledSameAnimeType = shuffle(sameAnimeAndType);
    const shuffledSameAnime = shuffle(sameAnime);
    const shuffledSameType = shuffle(sameType);
    const shuffledOther = shuffle(other);
    
    // Take from same anime first (combine both lists)
    const allSameAnime = [...shuffledSameAnimeType, ...shuffledSameAnime];
    
    if (allSameAnime.length >= 2) {
      // Ideal: 2-3 from same anime
      const fromSameAnime = Math.min(allSameAnime.length, need - 1); // Leave 1 slot for variety
      distractors = allSameAnime.slice(0, fromSameAnime).map(x => x.answer);
    }
    
    // Fill remaining with same type (different anime)
    if (distractors.length < need) {
      const remaining = need - distractors.length;
      const moreDistractors = shuffledSameType
        .filter(x => !distractors.includes(x.answer))
        .slice(0, remaining)
        .map(x => x.answer);
      distractors = [...distractors, ...moreDistractors];
    }
    
    // Fill any remaining with random
    if (distractors.length < need) {
      const remaining = need - distractors.length;
      const moreDistractors = shuffledOther
        .filter(x => !distractors.includes(x.answer))
        .slice(0, remaining)
        .map(x => x.answer);
      distractors = [...distractors, ...moreDistractors];
    }
    
    // Last resort: use anything available
    if (distractors.length < need) {
      const remaining = need - distractors.length;
      const anyLeft = shuffle(pool)
        .filter(x => !distractors.includes(x.answer))
        .slice(0, remaining)
        .map(x => x.answer);
      distractors = [...distractors, ...anyLeft];
    }
    
    // Remove duplicates
    distractors = [...new Set(distractors)].slice(0, need);
    
    const all = shuffle([q.answer, ...distractors]);
    const options = all.map((txt, i) => ({
      key: OPTION_KEYS[i],
      text: txt,
      isCorrect: txt === q.answer
    }));
    
    const correctKey = options.find(o => o.isCorrect)?.key || 'A';
    return { options, correctKey };
  }

  // =====================================================
  // RENDER FUNCTIONS
  // =====================================================
  function render() {
    renderPills();
    renderQuestion();
    renderVotes();
    renderScoreboard();
    renderButtons();
  }

  function renderPills() {
    pillPhase.textContent = state.phase;
    pillRound.textContent = `${state.round}/${state.totalRounds}${state.inTiebreaker ? ' (Tiebreaker)' : ''}`;
    pillPack.textContent = currentPack.title || currentPackKey;
    
    if (state.current) {
      if (state.revealed) {
        questionStatus.textContent = 'Revealed';
        questionStatus.style.borderColor = 'rgba(34,197,94,.55)';
      } else if (state.locked) {
        questionStatus.textContent = 'Votes Locked';
        questionStatus.style.borderColor = 'rgba(245,158,11,.55)';
      } else {
        questionStatus.textContent = 'Voting…';
        questionStatus.style.borderColor = 'rgba(96,165,250,.55)';
      }
    } else {
      questionStatus.textContent = 'Waiting…';
      questionStatus.style.borderColor = 'rgba(31,41,55,.75)';
    }
  }

  function renderQuestion() {
    if (!state.current) {
      qText.innerHTML = 'Open <b>Lobby Setup</b> to begin.';
      qSource.textContent = 'Source: —';
      answersGrid.innerHTML = '';
      modBanner.classList.add('hidden');
      revealBox.classList.add('hidden');
      return;
    }

    qText.textContent = state.current.question.question;
    qSource.textContent = `Source: ${state.current.question.source || '—'}`;

    // Modifier banner
    if (state.current.modifierText) {
      modText.textContent = state.current.modifierText;
      modBanner.classList.remove('hidden');
    } else {
      modBanner.classList.add('hidden');
    }

    // Answer cards
    answersGrid.innerHTML = '';
    state.current.options.forEach(opt => {
      const card = document.createElement('div');
      card.className = 'answer-card';
      if (state.revealed) {
        card.classList.add(opt.isCorrect ? 'correct' : 'wrong');
      }
      card.innerHTML = `
        <div class="badge">${opt.key}</div>
        <div class="text">${escapeHtml(opt.text)}</div>
      `;
      answersGrid.appendChild(card);
    });

    // Reveal box
    if (state.revealed) {
      const correct = state.current.options.find(o => o.isCorrect);
      revealAnswer.textContent = `${state.current.correctKey}. ${correct?.text || state.current.question.answer}`;
      revealBox.classList.remove('hidden');
    } else {
      revealBox.classList.add('hidden');
    }
  }

  function renderVotes() {
    voteGrid.innerHTML = '';
    
    if (!state.current) return;

    const players = activePlayers();
    
    if (state.inTiebreaker) {
      voteHint.textContent = `Tiebreaker! Only: ${players.map(p => p.name).join(', ')}`;
    } else {
      voteHint.textContent = 'Select each player\'s answer choice.';
    }

    players.forEach(p => {
      const row = document.createElement('div');
      row.className = 'vote-row';

      const opts = OPTION_KEYS.map(k => 
        `<option value="${k}" ${state.votes[p.id] === k ? 'selected' : ''}>${k}</option>`
      ).join('');

      row.innerHTML = `
        <div class="player-info">
          <span class="player-name">${escapeHtml(p.name)}</span>
          <span class="player-pts">${p.points} pts</span>
        </div>
        <select data-pid="${p.id}" ${state.locked ? 'disabled' : ''}>
          <option value="">—</option>
          ${opts}
        </select>
      `;

      const sel = row.querySelector('select');
      sel.addEventListener('change', () => {
        state.votes[p.id] = sel.value || null;
      });

      voteGrid.appendChild(row);
    });
  }

  function renderScoreboard() {
    scoreList.innerHTML = '';
    
    const sorted = [...state.players].sort((a, b) => b.points - a.points);
    const maxPoints = sorted.length > 0 ? sorted[0].points : 0;

    sorted.forEach(p => {
      const item = document.createElement('div');
      item.className = 'score-item';
      if (p.points === maxPoints && maxPoints > 0) {
        item.classList.add('leader');
      }

      item.innerHTML = `
        <span class="name">${escapeHtml(p.name)}</span>
        <div class="pts-controls">
          <button data-pid="${p.id}" data-action="minus">−</button>
          <span class="num">${p.points}</span>
          <button data-pid="${p.id}" data-action="plus">+</button>
        </div>
      `;

      // Manual point controls
      item.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const pid = btn.dataset.pid;
          const action = btn.dataset.action;
          const player = state.players.find(x => x.id === pid);
          if (!player) return;
          
          if (action === 'plus') player.points += 1;
          if (action === 'minus') player.points = Math.max(0, player.points - 1);
          
          renderScoreboard();
        });
      });

      scoreList.appendChild(item);
    });
  }

  function renderButtons() {
    const inLobby = state.phase === PHASE.LOBBY;
    const hasQuestion = !!state.current;

    btnRevealMod.disabled = !state.modsEnabled || !hasQuestion || state.locked || !!state.current?.modifierText;
    btnLockVotes.disabled = !hasQuestion || state.locked;
    btnRevealAnswer.disabled = !state.locked || state.revealed;
    btnNextQuestion.disabled = !state.revealed;
    
    // Hide modifier button if disabled
    btnRevealMod.style.display = state.modsEnabled ? '' : 'none';
  }

  // =====================================================
  // LOBBY
  // =====================================================
  function openLobby() {
    lobbyBackdrop.classList.remove('hidden');
  }

  function closeLobby() {
    lobbyBackdrop.classList.add('hidden');
  }

  function initPackSelect() {
    packSelect.innerHTML = '';
    Object.keys(PACKS).forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = PACKS[k].title || k;
      packSelect.appendChild(opt);
    });
    packSelect.value = currentPackKey;
  }

  function renderLobbyNames(count) {
    lobbyNames.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'name-field';
      wrap.innerHTML = `
        <span class="label">Player ${i + 1} name</span>
        <input type="text" value="${state.players[i]?.name || `Player ${i + 1}`}" data-index="${i}" />
      `;
      lobbyNames.appendChild(wrap);
    }
  }

  function applyLobbyAndStart() {
    // Load selected pack
    loadPack(packSelect.value);
    
    const count = parseInt(playerCount.value, 10) || 4;
    state.totalRounds = Math.max(1, parseInt(questionCount.value, 10) || 10);
    state.modsEnabled = modsToggle.value === 'on';

    // Build players from name inputs
    const names = lobbyNames.querySelectorAll('input');
    state.players = [];
    for (let i = 0; i < count; i++) {
      const name = names[i]?.value?.trim() || `Player ${i + 1}`;
      state.players.push({
        id: uid(),
        name: name,
        points: 0
      });
    }

    // Reset game state
    state.round = 0;
    state.inTiebreaker = false;
    state.tiebreakPlayers = [];
    state.current = null;
    state.votes = {};
    state.locked = false;
    state.revealed = false;

    // Build question pool
    buildQuestionPool();

    // Hide winner box
    winnerBox.classList.add('hidden');

    // Close lobby and start first question
    closeLobby();
    startNextQuestion();
  }

  // =====================================================
  // GAME LOGIC
  // =====================================================
  function startNextQuestion() {
    state.round += 1;
    state.locked = false;
    state.revealed = false;
    state.votes = {};

    const q = getNextQuestion();
    const { options, correctKey } = buildOptionsForQuestion(q);

    state.current = {
      question: q,
      options: options,
      correctKey: correctKey,
      modifierText: null
    };

    // Initialize votes
    activePlayers().forEach(p => {
      state.votes[p.id] = null;
    });

    setPhase(PHASE.QUESTION);
    hintBox.innerHTML = 'Players voting. Host can <b>Reveal Modifier</b> anytime, then <b>Lock Votes</b>.';
  }

  function revealModifier() {
    if (!state.modsEnabled || !state.current || state.current.modifierText) return;
    
    const modifiers = currentPack.modifiers || [];
    if (modifiers.length === 0) {
      hintBox.innerHTML = 'No modifiers in this pack.';
      return;
    }

    const pick = modifiers[Math.floor(Math.random() * modifiers.length)];
    state.current.modifierText = pick;
    
    hintBox.innerHTML = '🎲 <b>Modifier revealed!</b> Factor this into the round!';
    render();
  }

  function lockVotes() {
    if (!state.current) return;

    // Check for missing votes
    const players = activePlayers();
    const missing = players.filter(p => !state.votes[p.id]);
    
    if (missing.length > 0) {
      hintBox.innerHTML = `⚠️ Missing votes for: <b>${missing.map(p => p.name).join(', ')}</b>`;
      return;
    }

    state.locked = true;
    setPhase(PHASE.VOTING);
    hintBox.innerHTML = 'Votes locked! Now <b>Reveal Answer</b> to award points.';
  }

  function revealAnswerFn() {
    if (!state.locked || !state.current) return;

    state.revealed = true;
    const correctKey = state.current.correctKey;
    const modifier = state.current.modifierText;

    // Parse modifier effects
    const isDouble = modifier && modifier.includes('Double points');
    const isMinusWrong = modifier && modifier.includes('Wrong answer penalty');
    const isOnlyTied = modifier && modifier.includes('Only players tied for 1st');
    const isSkipLeader = modifier && modifier.includes('most points are skipped');

    // Get leader IDs for modifier checks
    const maxPoints = Math.max(...state.players.map(p => p.points), 0);
    const leaderIds = state.players.filter(p => p.points === maxPoints).map(p => p.id);
    const tiedForFirst = leaderIds.length >= 2 ? new Set(leaderIds) : null;

    // Award points to correct answers
    const players = activePlayers();
    const winners = [];
    const losers = [];

    players.forEach(p => {
      const vote = state.votes[p.id];
      const isCorrect = vote === correctKey;

      // Skip leader modifier
      if (isSkipLeader && leaderIds.includes(p.id)) {
        return; // Skip scoring for leaders
      }

      // Only tied for 1st can score
      if (isOnlyTied && tiedForFirst && !tiedForFirst.has(p.id)) {
        return; // Not tied for first, can't score
      }

      if (isCorrect) {
        const points = isDouble ? 2 : 1;
        p.points += points;
        winners.push({ name: p.name, points });
      } else {
        if (isMinusWrong) {
          p.points = Math.max(0, p.points - 1);
          losers.push(p.name);
        }
      }
    });

    setPhase(PHASE.REVEAL);

    // Build result message
    let msg = '';
    if (winners.length > 0) {
      if (isDouble) {
        msg = `✓ Correct: <b>${winners.map(w => w.name).join(', ')}</b> (+2 points each!). `;
      } else {
        msg = `✓ Correct: <b>${winners.map(w => w.name).join(', ')}</b> (+1 point). `;
      }
    } else {
      msg = 'No one got it right! ';
    }

    if (isMinusWrong && losers.length > 0) {
      msg += `Wrong answers: <b>${losers.join(', ')}</b> (-1 point). `;
    }

    if (isSkipLeader && leaderIds.length > 0) {
      const skippedNames = state.players.filter(p => leaderIds.includes(p.id)).map(p => p.name);
      msg += `(Leaders skipped: ${skippedNames.join(', ')}) `;
    }

    if (isOnlyTied && tiedForFirst) {
      msg += `(Only tied players could score) `;
    }

    msg += 'Click <b>Next Question</b>.';
    hintBox.innerHTML = msg;
  }

  function nextStep() {
    if (!state.revealed) return;

    // Check if we've completed all rounds
    if (state.round >= state.totalRounds) {
      checkWinner();
      return;
    }

    // Continue to next question
    startNextQuestion();
  }

  function checkWinner() {
    const maxPoints = Math.max(...state.players.map(p => p.points), 0);
    const leaders = state.players.filter(p => p.points === maxPoints);

    if (leaders.length === 1) {
      // We have a winner!
      declareWinner(leaders[0]);
    } else if (leaders.length > 1) {
      // Tie! Start tiebreaker
      startTiebreaker(leaders);
    }
  }

  function declareWinner(player) {
    setPhase(PHASE.FINISHED);
    winnerName.textContent = `${player.name} (${player.points} pts)`;
    winnerBox.classList.remove('hidden');
    hintBox.innerHTML = `🏆 <b>${player.name}</b> wins with <b>${player.points}</b> points! Click <b>Restart</b> to play again.`;
    state.inTiebreaker = false;
    state.tiebreakPlayers = [];
  }

  function startTiebreaker(tiedPlayers) {
    state.inTiebreaker = true;
    state.tiebreakPlayers = tiedPlayers.map(p => p.id);
    state.totalRounds += 1;  // Add one more round

    hintBox.innerHTML = `⚔️ <b>Tiebreaker!</b> ${tiedPlayers.map(p => p.name).join(' vs ')} at ${tiedPlayers[0].points} pts. Sudden death round!`;
    
    // Start tiebreaker question
    startNextQuestion();
  }

  // =====================================================
  // EVENT HANDLERS
  // =====================================================
  btnLobby.addEventListener('click', openLobby);
  btnCloseLobby.addEventListener('click', closeLobby);
  lobbyBackdrop.addEventListener('click', (e) => {
    if (e.target === lobbyBackdrop) closeLobby();
  });

  playerCount.addEventListener('change', () => {
    renderLobbyNames(parseInt(playerCount.value, 10) || 4);
  });

  btnStartGame.addEventListener('click', applyLobbyAndStart);

  btnRevealMod.addEventListener('click', revealModifier);
  btnLockVotes.addEventListener('click', lockVotes);
  btnRevealAnswer.addEventListener('click', revealAnswerFn);
  btnNextQuestion.addEventListener('click', nextStep);

  btnRestart.addEventListener('click', () => {
    state.phase = PHASE.LOBBY;
    state.round = 0;
    state.current = null;
    state.votes = {};
    state.locked = false;
    state.revealed = false;
    state.inTiebreaker = false;
    state.tiebreakPlayers = [];
    state.players.forEach(p => p.points = 0);
    winnerBox.classList.add('hidden');
    render();
    openLobby();
  });

  // =====================================================
  // INIT
  // =====================================================
  function init() {
    initPackSelect();
    renderLobbyNames(4);
    render();
    openLobby();  // Auto-open lobby on page load
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
