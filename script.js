const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index');

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.innerText = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
    board.innerHTML = '';
    createBoard();
}

// Initialize game
createBoard();
statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
