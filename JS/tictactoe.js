const cells = document.querySelectorAll(".cell");
const turnText = document.querySelector(".turnText");
const restartButton = document.querySelector(".restartButton");
let firstplayerCredits = document.querySelector(".firstplayerCredits");
let secondplayerCredits = document.querySelector(".secondplayerCredits");

window.localStorage.setItem('username', 'Cas');

const currentUserName = window.localStorage.getItem('username');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    turnText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

   
    if (running && currentPlayer === "O") {
        setTimeout(computerMove, 500); // Delay for better user experience
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        turnText.textContent = ` ${currentPlayer} wins!`;
        updateWins();
        running = false;
    } else if (!options.includes("")) {
        turnText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function computerMove() {
    
    const emptyCells = options.reduce((blub, value, index) => {
        if (value === "") {
            blub.push(index);
        }
        return blub;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cellIndex = emptyCells[randomIndex];
        const cell = cells[cellIndex];
        updateCell(cell, cellIndex);
        checkWinner();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    turnText.textContent = `${currentPlayer}'s turn`;
    cells.forEach((cell) => (cell.textContent = ""));
    running = true;

    if (currentPlayer === "O") {
        setTimeout(computerMove, 1000);
    }
}

let firstPlayerWins = 0;
let secondPlayerWins = 0;

function updateWins() {
    if (currentPlayer === "X") {
        firstPlayerWins++;
        firstplayerCredits.textContent = firstPlayerWins;
    } else {
        secondPlayerWins++;
        secondplayerCredits.textContent = secondPlayerWins;
    }
}


window.localStorage.setItem('username', 'Cas'); //Slaat Cas op als username