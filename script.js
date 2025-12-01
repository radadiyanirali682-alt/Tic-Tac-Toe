const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = false;

let player1 = { name: '', symbol: '', score: '0' };
let player2 = { name: '', symbol: '', score: 0 };

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]            
];



function handleCellClick(e) {
  if (!player1.name || !player2.name) {
    alert("Please set both player names and symbols before starting.");
    return;
  }

  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (board[clickedCellIndex] !== '' || !isGameActive) return;

  board[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkResult();
}



function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    const winner = currentPlayer === player1.symbol ? player1 : player2;
    winner.score += 1;

    gameStatus.textContent = `${winner.name} has won!`;

   
    document.getElementById('player1-score').textContent = `Wins: ${player1.score}`;
    document.getElementById('player2-score').textContent = `Wins: ${player2.score}`;

    isGameActive = false;
    return;
  }



  if (!board.includes('')) {
    gameStatus.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }



  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  const nextPlayer = currentPlayer === player1.symbol ? player1.name : player2.name;
  gameStatus.textContent = `It's ${nextPlayer}'s turn`;
}



function resetGame() {
  board.fill('');
  cells.forEach(cell => cell.textContent = '');
  if (player1.name && player2.name) {
    currentPlayer = player1.symbol;
    isGameActive = true;
    gameStatus.textContent = `It's ${player1.name}'s turn`;
  } else {
    gameStatus.textContent = "Let's players game is start!";
    isGameActive = false;
  }
}



function setPlayer(playerNum) {
  const name = prompt(`Player ${playerNum}, enter your name:`);
  if (!name) {
    alert("Name is required.");
    return;
  }

  let symbol = prompt(`${name}, choose your symbol (X or O):`).toUpperCase();
  if (symbol !== 'X' && symbol !== 'O') {
    alert("Invalid symbol. Please choose X or O.");
    return;
  }



  if (playerNum === 1) {
    if (player2.symbol === symbol) {
      alert(`Symbol ${symbol} already taken by ${player2.name}. Choose the other one.`);
      return;
    }
    player1 = { name, symbol, score: 0 };
    document.getElementById('player1-info').textContent = `${name} (${symbol})`;
    document.getElementById('player1-score').textContent = `Wins: ${player1.score}`;
    currentPlayer = symbol;

    
  } else {
    if (player1.symbol === symbol) {
      alert(`Symbol ${symbol} already taken by ${player1.name}. Choose the other one.`);
      return;
    }
    player2 = { name, symbol, score: 0 };
    document.getElementById('player2-info').textContent = `${name} (${symbol})`;
    document.getElementById('player2-score').textContent = `Wins: ${player2.score}`;
  }

  if (player1.name && player2.name) {
    isGameActive = true;
    currentPlayer = player1.symbol;
    gameStatus.textContent = `It's ${player1.name}'s turn`;
  }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

gameStatus.textContent = "Let's players game is start!";
