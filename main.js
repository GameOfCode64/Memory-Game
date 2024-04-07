document.addEventListener("DOMContentLoaded", function () {
  const cardValues = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "H",
    "H",
  ];
  let cards = [];
  let flippedCards = [];
  let score = 0;
  let timer;
  let seconds = 0;

  const gameBoard = document.getElementById("game-board");
  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("score");
  const resetButton = document.getElementById("reset-btn");

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function createGameBoard() {
    cards = shuffle(cardValues);
    gameBoard.innerHTML = "";
    cards.forEach((cardValue, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = cardValue;
      card.dataset.index = index;
      card.textContent = cardValue;
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    });
  }

  function resetGame() {
    clearInterval(timer);
    seconds = 0;
    score = 0;
    flippedCards = [];
    updateScore();
    updateTimer();
    createGameBoard();
  }
  function updateTimer() {
    timer = setInterval(() => {
      seconds++;
      timerElement.textContent = seconds;
    }, 1000);
  }

  function updateScore() {
    scoreElement.textContent = score;
  }

  function flipCard() {
    const card = this;
    if (!card.classList.contains("flipped") && flippedCards.length < 2) {
      card.classList.add("flipped");
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
      score++;
      updateScore();
      flippedCards = [];
      if (score === cardValues.length / 2) {
        clearInterval(timer);
        alert(`Congratulations! You've won in ${seconds} seconds!`);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }

  resetButton.addEventListener("click", resetGame);

  createGameBoard();
  updateTimer();
});
