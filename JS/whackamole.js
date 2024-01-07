const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const missScoreDisplay = document.querySelector('.missScore');
const timerDisplay = document.getElementById('timer');
const moles = document.querySelectorAll('.mole');
const highScoreDisplay = document.querySelector('.highscore');
const button = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
const userBtn = document.querySelector('.userBtn');
let lastHole;
let timeUp = false;
let score = 0;
let timer;
let highScore = 0;




function myUsername() {
  let text;
  let person = prompt("Please enter your username:", "");
  if (person == null || person == "") {
    text = "None";
  } else {
    text = person;
  }

  document.querySelector(".demo").innerHTML = text;
}

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

  // Check the score and add more holes when the score is 15
  if (score >= 15) {
    const additionalHoles = 1;
    for (let i = 0; i < additionalHoles; i++) {
      const additionalHole = randomHole(holes);
      additionalHole.classList.add('up');
      setTimeout(() => {
        additionalHole.classList.remove('up');
      }, time);
    }
  }
}


function startGame() {
  
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  button.style.visibility = 'hidden';
  updateTimer(25);
  peep();
  timer = setInterval(() => {
    updateTimer(parseInt(timerDisplay.textContent) - 1);
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    timeUp = true;
    if (score > highScore) {
      highScore = score;
      highScoreDisplay.textContent = highScore;
    }
    button.innerHTML = 'Try again?';
    button.style.visibility = 'visible';
  }, 25000);
}

function resetGame() {
  highScore = 0;
  highScoreDisplay.textContent = highScore;
  startGame();
}

function updateTimer(seconds) {
  timerDisplay.textContent = seconds;
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
localStorage.setItem("lastname", "Stef");

moles.forEach((mole) => mole.addEventListener("click", bonk));

holes.forEach((hole) =>
  hole.addEventListener("click", () => {
    if (!timeUp && !hole.classList.contains("up")) {
      if (score > 0) {
        score--;
        scoreBoard.textContent = score;
      }
    }
  })
);

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

button.addEventListener("click", startGame);

