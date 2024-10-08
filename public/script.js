let word = '';
let guessedWord = [];
let usedLetters = [];
let attempts = 6;

function startGame() {
    word = document.getElementById('word').value.toLowerCase();
    if (word.length === 0) {
        alert('Please enter a word.');
        return;
    }
    guessedWord = Array(word.length).fill('_');
    usedLetters = [];
    attempts = 6;
    document.getElementById('game-section').style.display = 'block';
    updateDisplay();

    // Save the word to the database
    fetch('/save-word', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word })
    }).then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

    // Fetch and display used words
    fetchUsedWords();
}

function makeGuess() {
    const guess = document.getElementById('guess').value.toLowerCase();
    if (guess.length === 0) {
        alert('Please enter a letter.');
        return;
    }
    if (usedLetters.includes(guess)) {
        alert('You already guessed this letter.');
        return;
    }
    usedLetters.push(guess);
    if (word.includes(guess)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                guessedWord[i] = guess;
            }
        }
    } else {
        attempts--;
    }
    updateDisplay();
    checkGameOver();
}

function updateDisplay() {
    document.getElementById('word-display').innerText = guessedWord.join(' ');
    document.getElementById('used-letters').innerText = 'Used letters: ' + usedLetters.join(', ');
    document.getElementById('message').innerText = `Attempts left: ${attempts}`;
}

function checkGameOver() {
    const messageElement = document.getElementById('message');
    if (guessedWord.join('') === word) {
        messageElement.innerText = 'Congratulations! You guessed the word correctly.';
        messageElement.className = 'success';
        document.getElementById('guess').disabled = true;
    } else if (attempts === 0) {
        messageElement.innerText = `Game over! The word was "${word}".`;
        messageElement.className = 'failure';
        document.getElementById('guess').disabled = true;
    }
}

function fetchUsedWords() {
    fetch('/used-words')
        .then(response => response.json())
        .then(data => {
            const usedWordsList = document.getElementById('used-words-list');
            usedWordsList.innerHTML = '';
            data.forEach(word => {
                const li = document.createElement('li');
                li.textContent = word.word;
                usedWordsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Fetch and display used words on page load
fetchUsedWords();

