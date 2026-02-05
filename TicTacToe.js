const board = document.getElementById("board");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const restartBtn = document.getElementById("restartBtn");
const quitBtn = document.getElementById("quitBtn");
const gameSection = document.getElementById("game-section");
const startSection = document.getElementById("start-section");

let currentPlayer = "X";
let cells = Array(9).fill(null);

startBtn.addEventListener("click", () => {
    startSection.style.display = "none";
    gameSection.style.display = "block";
    resetGame();
});

playAgainBtn.addEventListener("click", () => {
    playAgainBtn.style.display = "none";
    resetGame();
});

restartBtn.addEventListener("click", () => {
    restartBtn.style.display = "none";
    resetGame();
});

quitBtn.addEventListener("click", () => {
    window.location.reload();
});

function drawBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.textContent = cells[i] || "";
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
    }
}

function makeMove(index) {
    if (cells[index] || checkWinner()) return;
    cells[index] = currentPlayer;
    drawBoard();

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
        playAgainBtn.style.display = "inline-block";
        return;
    }

    if (cells.every(cell => cell)) {
        statusText.textContent = "It's a draw!";
        restartBtn.style.display = "inline-block";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function resetGame() {
    cells = Array(9).fill(null);
    currentPlayer = "X";
    statusText.textContent = "X's turn";
    drawBoard();
}