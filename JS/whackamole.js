const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const missScoreDisplay = document.querySelector('.missScore');
const timerDisplay = document.getElementById('timer');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('.start');
let lastHole;
let timeUp = false;
let score = 0;
let missScore = 0;
let timer;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    console.log('Same one');
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(600, 800);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  missScoreDisplay.textContent = 0;
  timeUp = false;
  score = 0;
  missScore = 0;
  button.style.visibility = 'hidden';
  updateTimer(25); 
  peep();
  timer = setInterval(() => {
    updateTimer(parseInt(timerDisplay.textContent) - 1);
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    timeUp = true;
    button.innerHTML = 'Try again?';
    button.style.visibility = 'visible';
  }, 25000);
}

function updateTimer(seconds) {
  timerDisplay.textContent = seconds;
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;

  if (!this.classList.contains('up')) {
    missScore++;
    missScoreDisplay.textContent = missScore;
  }

  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));