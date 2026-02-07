// hangman_app.js
// Hangman game logic with pack system and multi-team support

(function() {
  'use strict';

  // =============================
  // STATE
  // =============================
  let gameState = {
    currentPack: 'anime',
    selectedCategories: [],
    teams: [],
    currentTeamIndex: 0,
    currentRound: 1,
    totalRounds: 5,
    timerEnabled: false,
    timerSeconds: 60,
    timerInterval: null,
    timeRemaining: 0,
    
    // Current word state
    currentWord: '',
    currentWordEntry: null,
    currentCategory: '',
    displayWord: [],
    usedLetters: new Set(),
    wrongGuesses: 0,
    maxWrongGuesses: 7,
    usedWords: new Set(),
    hintsUsed: 0,
    maxHints: 3,
  };

  // =============================
  // DOM ELEMENTS
  // =============================
  const $ = id => document.getElementById(id);

  // Lobby
  const lobbySection = $('lobby');
  const packSelect = $('packSelect');
  const teamCountInput = $('teamCount');
  const categoryCheckboxes = $('categoryCheckboxes');
  const timerToggle = $('timerToggle');
  const timerSecondsInput = $('timerSeconds');
  const totalRoundsInput = $('totalRounds');
  const teamInputs = $('teamInputs');
  const btnStart = $('btnStart');
  const lobbyStatus = $('lobbyStatus');

  // Game
  const gameSection = $('game');
  const roundLabel = $('roundLabel');
  const roundProgress = $('roundProgress');
  const turnName = $('turnName');
  const turnMeta = $('turnMeta');
  const categoryBadge = $('categoryBadge');
  const wordDisplay = $('wordDisplay');
  const usedLettersDisplay = $('usedLettersDisplay');
  const guessesLeft = $('guessesLeft');
  const hintsLeft = $('hintsLeft');
  const hintDisplay = $('hintDisplay');
  const hintText = $('hintText');
  const timerDisplay = $('timerDisplay');
  const timerValue = $('timerValue');
  const guessInput = $('guessInput');
  const btnGuessLetter = $('btnGuessLetter');
  const btnSolveWord = $('btnSolveWord');
  const btnUseHint = $('btnUseHint');
  const resultBar = $('resultBar');
  const teamsBox = $('teamsBox');
  const btnEndGame = $('btnEndGame');

  // Top bar
  const packLabel = $('packLabel');
  const teamsLabel = $('teamsLabel');

  // Modal
  const winnerModal = $('winnerModal');
  const winnerTitle = $('winnerTitle');
  const winnerText = $('winnerText');
  const btnPlayAgain = $('btnPlayAgain');
  const btnCloseWinner = $('btnCloseWinner');

  // =============================
  // INITIALIZATION
  // =============================
  function init() {
    setupLobby();
    attachEventListeners();
  }

  function setupLobby() {
    // Populate categories
    const pack = window.HANGMAN_DATA.packs[gameState.currentPack];
    const categories = pack.categories;
    
    categoryCheckboxes.innerHTML = '';
    Object.values(categories).forEach(cat => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = cat.id;
      checkbox.checked = true;
      
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(cat.name));
      categoryCheckboxes.appendChild(label);
    });

    // Generate team inputs
    updateTeamInputs();
  }

  function updateTeamInputs() {
    const count = parseInt(teamCountInput.value) || 2;
    teamInputs.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Team ${i}`;
      input.dataset.teamIndex = i - 1;
      teamInputs.appendChild(input);
    }
  }

  function attachEventListeners() {
    // Lobby
    teamCountInput.addEventListener('input', updateTeamInputs);
    timerToggle.addEventListener('change', () => {
      timerSecondsInput.disabled = !timerToggle.checked;
    });
    btnStart.addEventListener('click', startGame);

    // Game
    btnGuessLetter.addEventListener('click', () => handleGuess('letter'));
    btnSolveWord.addEventListener('click', () => handleGuess('word'));
    btnUseHint.addEventListener('click', useHint);
    guessInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const val = guessInput.value.trim();
        if (val.length === 1) {
          handleGuess('letter');
        } else if (val.length > 1) {
          handleGuess('word');
        }
      }
    });
    btnEndGame.addEventListener('click', endGame);

    // Modal
    btnPlayAgain.addEventListener('click', () => {
      winnerModal.classList.add('hidden');
      resetToLobby();
    });
    btnCloseWinner.addEventListener('click', () => {
      winnerModal.classList.add('hidden');
    });
  }

  // =============================
  // GAME START
  // =============================
  function startGame() {
    // Validate
    const checkedCategories = Array.from(categoryCheckboxes.querySelectorAll('input:checked'))
      .map(cb => cb.value);
    
    if (checkedCategories.length === 0) {
      lobbyStatus.textContent = 'Please select at least one category.';
      return;
    }

    const teamCount = parseInt(teamCountInput.value) || 2;
    if (teamCount < 1 || teamCount > 8) {
      lobbyStatus.textContent = 'Team count must be between 1 and 8.';
      return;
    }

    // Build teams
    gameState.teams = [];
    const inputs = teamInputs.querySelectorAll('input');
    inputs.forEach((input, idx) => {
      const name = input.value.trim() || `Team ${idx + 1}`;
      gameState.teams.push({
        name,
        points: 0,
        streak: 0,
        roundsWon: 0,
      });
    });

    gameState.selectedCategories = checkedCategories;
    gameState.totalRounds = parseInt(totalRoundsInput.value) || 5;
    gameState.timerEnabled = timerToggle.checked;
    gameState.timerSeconds = parseInt(timerSecondsInput.value) || 60;
    gameState.currentRound = 1;
    gameState.currentTeamIndex = 0;
    gameState.usedWords.clear();

    // Update top bar
    packLabel.textContent = window.HANGMAN_DATA.packs[gameState.currentPack].name;
    teamsLabel.textContent = gameState.teams.length;

    // Switch to game
    lobbySection.classList.add('hidden');
    gameSection.classList.remove('hidden');

    startRound();
  }

  // =============================
  // ROUND LOGIC
  // =============================
  function startRound() {
    gameState.currentTeamIndex = 0;
    startTurn();
  }

  function startTurn() {
    const team = gameState.teams[gameState.currentTeamIndex];
    
    // Pick random word
    pickNewWord();

    // Reset turn state
    gameState.usedLetters.clear();
    gameState.wrongGuesses = 0;
    gameState.hintsUsed = 0;
    gameState.timeRemaining = gameState.timerSeconds;

    // Update UI
    updateUI();
    clearHangmanParts();
    
    // Start timer if enabled
    if (gameState.timerEnabled) {
      startTimer();
    }

    // Focus input
    guessInput.value = '';
    guessInput.focus();
  }

  function pickNewWord() {
    const pack = window.HANGMAN_DATA.packs[gameState.currentPack];
    const availableCategories = gameState.selectedCategories.map(catId => pack.categories[catId]);
    
    // Pick random category
    const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    
    // Filter out used words
    const availableEntries = category.entries.filter(entry => !gameState.usedWords.has(entry.answer));
    
    // If all words used, clear used pool
    if (availableEntries.length === 0) {
      gameState.usedWords.clear();
      availableEntries.push(...category.entries);
    }
    
    // Pick random entry
    const entry = availableEntries[Math.floor(Math.random() * availableEntries.length)];
    
    gameState.currentWord = entry.answer;
    gameState.currentWordEntry = entry;
    gameState.currentCategory = category.name;
    gameState.usedWords.add(entry.answer);
    
    // Initialize display word (show spaces, hide letters)
    gameState.displayWord = entry.answer.split('').map(char => {
      if (char === ' ') return ' ';
      return '_';
    });
  }

  function updateUI() {
    const team = gameState.teams[gameState.currentTeamIndex];
    
    // Round info
    roundLabel.textContent = `${gameState.currentRound} / ${gameState.totalRounds}`;
    roundProgress.textContent = `${gameState.currentRound} / ${gameState.totalRounds}`;
    turnName.textContent = team.name;
    turnMeta.textContent = `${team.points} pts • ${team.streak > 0 ? team.streak + ' streak' : 'No streak'}`;
    
    // Word display
    categoryBadge.textContent = gameState.currentCategory;
    wordDisplay.textContent = gameState.displayWord.join(' ');
    
    // Used letters
    if (gameState.usedLetters.size === 0) {
      usedLettersDisplay.textContent = '—';
    } else {
      usedLettersDisplay.innerHTML = '';
      Array.from(gameState.usedLetters).sort().forEach(letter => {
        const pill = document.createElement('span');
        pill.className = 'letterPill';
        pill.textContent = letter;
        usedLettersDisplay.appendChild(pill);
      });
    }
    
    // Guesses
    guessesLeft.textContent = gameState.maxWrongGuesses - gameState.wrongGuesses;
    
    // Hints
    hintsLeft.textContent = gameState.maxHints - gameState.hintsUsed;
    hintDisplay.classList.add('hidden');
    
    // Timer
    if (gameState.timerEnabled) {
      timerDisplay.classList.remove('hidden');
      timerValue.textContent = gameState.timeRemaining;
    } else {
      timerDisplay.classList.add('hidden');
    }
    
    // Scoreboard
    renderScoreboard();
  }

  function renderScoreboard() {
    teamsBox.innerHTML = '';
    
    gameState.teams.forEach((team, idx) => {
      const row = document.createElement('div');
      row.className = 'teamRow';
      if (idx === gameState.currentTeamIndex) {
        row.classList.add('active');
      }
      
      const info = document.createElement('div');
      info.className = 'teamInfo';
      
      const name = document.createElement('div');
      name.className = 'teamName';
      name.textContent = team.name;
      name.addEventListener('click', () => editTeamName(idx));
      
      const meta = document.createElement('div');
      meta.className = 'small muted';
      meta.textContent = `${team.roundsWon} rounds won`;
      
      info.appendChild(name);
      info.appendChild(meta);
      
      const stats = document.createElement('div');
      stats.className = 'teamStats';
      
      const points = document.createElement('div');
      points.className = 'teamPoints';
      points.textContent = team.points;
      
      stats.appendChild(points);
      
      if (team.streak > 0) {
        const streak = document.createElement('div');
        streak.className = team.streak >= 3 ? 'streakBadge hot' : 'streakBadge';
        streak.textContent = `🔥 ${team.streak}`;
        stats.appendChild(streak);
      }
      
      row.appendChild(info);
      row.appendChild(stats);
      teamsBox.appendChild(row);
    });
  }

  function editTeamName(idx) {
    const newName = prompt('Enter new team name:', gameState.teams[idx].name);
    if (newName && newName.trim()) {
      gameState.teams[idx].name = newName.trim();
      updateUI();
    }
  }

  // =============================
  // TIMER
  // =============================
  function startTimer() {
    stopTimer();
    
    gameState.timerInterval = setInterval(() => {
      gameState.timeRemaining--;
      timerValue.textContent = gameState.timeRemaining;
      
      if (gameState.timeRemaining <= 0) {
        stopTimer();
        handleTimerExpired();
      }
    }, 1000);
  }

  function stopTimer() {
    if (gameState.timerInterval) {
      clearInterval(gameState.timerInterval);
      gameState.timerInterval = null;
    }
  }

  function resetTimer() {
    gameState.timeRemaining = gameState.timerSeconds;
    timerValue.textContent = gameState.timeRemaining;
    if (gameState.timerEnabled) {
      startTimer();
    }
  }

  function handleTimerExpired() {
    showResult('Time expired! Counts as wrong guess.', 'incorrect');
    gameState.wrongGuesses++;
    showHangmanPart(gameState.wrongGuesses);
    
    setTimeout(() => {
      if (gameState.wrongGuesses >= gameState.maxWrongGuesses) {
        handleLoss();
      } else {
        hideResult();
        resetTimer();
      }
    }, 2000);
  }

  // =============================
  // HINT HANDLING
  // =============================
  function useHint() {
    // Check if hints available
    if (gameState.hintsUsed >= gameState.maxHints) {
      showResult('No hints remaining!', 'warning');
      return;
    }
    
    // Check if guesses available
    if (gameState.wrongGuesses >= gameState.maxWrongGuesses) {
      showResult('No guesses left to use a hint!', 'warning');
      return;
    }
    
    // Show hint
    const hint = gameState.currentWordEntry.hints[gameState.hintsUsed];
    hintText.textContent = hint;
    hintDisplay.classList.remove('hidden');
    
    // Increment hints used and wrong guesses
    gameState.hintsUsed++;
    gameState.wrongGuesses++;
    
    // Show hangman part
    showHangmanPart(gameState.wrongGuesses);
    
    // Update UI
    hintsLeft.textContent = gameState.maxHints - gameState.hintsUsed;
    guessesLeft.textContent = gameState.maxWrongGuesses - gameState.wrongGuesses;
    
    // Check if game over
    if (gameState.wrongGuesses >= gameState.maxWrongGuesses) {
      setTimeout(() => {
        handleLoss();
      }, 2000);
    }
  }

  // =============================
  // GUESS HANDLING
  // =============================
  function handleGuess(type) {
    const input = guessInput.value.trim().toUpperCase();
    
    if (!input) {
      showResult('Please enter a letter or word.', 'warning');
      return;
    }
    
    if (type === 'letter' && input.length !== 1) {
      showResult('Please enter only one letter.', 'warning');
      return;
    }
    
    if (type === 'letter') {
      handleLetterGuess(input);
    } else {
      handleWordGuess(input);
    }
    
    guessInput.value = '';
  }

  function handleLetterGuess(letter) {
    // Check if already used
    if (gameState.usedLetters.has(letter)) {
      showResult(`Letter "${letter}" already guessed!`, 'warning');
      return;
    }
    
    // Add to used letters
    gameState.usedLetters.add(letter);
    
    // Check if letter is in word
    let found = false;
    gameState.currentWord.split('').forEach((char, idx) => {
      if (char === letter) {
        gameState.displayWord[idx] = letter;
        found = true;
      }
    });
    
    if (found) {
      showResult(`Correct! "${letter}" is in the word.`, 'correct');
      resetTimer(); // Reset timer on correct guess
      
      // Check if word is complete
      if (!gameState.displayWord.includes('_')) {
        setTimeout(() => {
          handleWin();
        }, 1500);
      } else {
        setTimeout(() => {
          hideResult();
          updateUI();
        }, 1500);
      }
    } else {
      showResult(`Wrong! "${letter}" is not in the word.`, 'incorrect');
      gameState.wrongGuesses++;
      showHangmanPart(gameState.wrongGuesses);
      
      setTimeout(() => {
        if (gameState.wrongGuesses >= gameState.maxWrongGuesses) {
          handleLoss();
        } else {
          hideResult();
          updateUI();
        }
      }, 1500);
    }
  }

  function handleWordGuess(word) {
    // Check if already attempted
    if (gameState.usedLetters.has(word)) {
      showResult(`Word "${word}" already attempted!`, 'warning');
      return;
    }
    
    // Add to used attempts
    gameState.usedLetters.add(word);
    
    if (word === gameState.currentWord) {
      // Reveal all letters
      gameState.displayWord = gameState.currentWord.split('');
      showResult(`Correct! You solved it!`, 'correct');
      
      setTimeout(() => {
        handleWin();
      }, 1500);
    } else {
      showResult(`Wrong! "${word}" is incorrect.`, 'incorrect');
      gameState.wrongGuesses++;
      showHangmanPart(gameState.wrongGuesses);
      
      setTimeout(() => {
        if (gameState.wrongGuesses >= gameState.maxWrongGuesses) {
          handleLoss();
        } else {
          hideResult();
          updateUI();
        }
      }, 1500);
    }
  }

  // =============================
  // WIN/LOSS HANDLING
  // =============================
  function handleWin() {
    stopTimer();
    
    const team = gameState.teams[gameState.currentTeamIndex];
    
    // Calculate points
    let points = 10; // Base points
    const wrong = gameState.wrongGuesses;
    
    if (wrong === 0) {
      points += 10;
    } else if (wrong <= 2) {
      points += 5;
    } else if (wrong <= 4) {
      points += 2;
    }
    
    team.points += points;
    team.streak++;
    team.roundsWon++;
    
    showResult(`${team.name} wins! +${points} pts (${wrong} wrong guesses)`, 'correct');
    
    setTimeout(() => {
      nextTurn();
    }, 2500);
  }

  function handleLoss() {
    stopTimer();
    
    const team = gameState.teams[gameState.currentTeamIndex];
    team.streak = 0;
    
    showResult(`${team.name} loses! The word was: ${gameState.currentWord}`, 'incorrect');
    
    setTimeout(() => {
      nextTurn();
    }, 3000);
  }

  function nextTurn() {
    hideResult();
    
    gameState.currentTeamIndex++;
    
    // Check if round is over
    if (gameState.currentTeamIndex >= gameState.teams.length) {
      gameState.currentRound++;
      
      // Check if game is over
      if (gameState.currentRound > gameState.totalRounds) {
        endGame();
      } else {
        startRound();
      }
    } else {
      startTurn();
    }
  }

  // =============================
  // HANGMAN VISUAL
  // =============================
  function clearHangmanParts() {
    for (let i = 1; i <= 7; i++) {
      const part = $('part' + i);
      if (part) part.classList.remove('visible');
    }
  }

  function showHangmanPart(wrongCount) {
    if (wrongCount === 1) {
      $('part1').classList.add('visible'); // Head
    } else if (wrongCount === 2) {
      $('part2').classList.add('visible'); // Face (eyes + mouth)
    } else if (wrongCount === 3) {
      $('part3').classList.add('visible'); // Body
    } else if (wrongCount === 4) {
      $('part4').classList.add('visible'); // Left arm
    } else if (wrongCount === 5) {
      $('part5').classList.add('visible'); // Right arm
    } else if (wrongCount === 6) {
      $('part6').classList.add('visible'); // Left leg
    } else if (wrongCount === 7) {
      $('part7').classList.add('visible'); // Right leg
    }
  }

  // =============================
  // UI HELPERS
  // =============================
  function showResult(message, type) {
    resultBar.textContent = message;
    resultBar.className = 'resultBar ' + type;
    resultBar.classList.remove('hidden');
  }

  function hideResult() {
    resultBar.classList.add('hidden');
  }

  // =============================
  // GAME END
  // =============================
  function endGame() {
    stopTimer();
    
    // Sort teams by points
    const sorted = [...gameState.teams].sort((a, b) => b.points - a.points);
    
    const winner = sorted[0];
    
    winnerTitle.textContent = 'Game Over!';
    
    let text = `🏆 Winner: ${winner.name} with ${winner.points} points!\n\n`;
    text += 'Final Standings:\n';
    sorted.forEach((team, idx) => {
      text += `${idx + 1}. ${team.name}: ${team.points} pts (${team.roundsWon} wins)\n`;
    });
    
    winnerText.textContent = text;
    winnerModal.classList.remove('hidden');
  }

  function resetToLobby() {
    gameSection.classList.add('hidden');
    lobbySection.classList.remove('hidden');
    
    // Reset state
    gameState = {
      currentPack: 'anime',
      selectedCategories: [],
      teams: [],
      currentTeamIndex: 0,
      currentRound: 1,
      totalRounds: 5,
      timerEnabled: false,
      timerSeconds: 60,
      timerInterval: null,
      timeRemaining: 0,
      currentWord: '',
      currentWordEntry: null,
      currentCategory: '',
      displayWord: [],
      usedLetters: new Set(),
      wrongGuesses: 0,
      maxWrongGuesses: 7,
      usedWords: new Set(),
      hintsUsed: 0,
      maxHints: 3,
    };
    
    setupLobby();
  }

  // =============================
  // START
  // =============================
  init();
})();
