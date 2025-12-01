const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameActive = false;

let player1 = { name: '', symbol: '' };
let player2 = { name: '', symbol: '' };

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
    const winnerName = currentPlayer === player1.symbol ? player1.name : player2.name;
    gameStatus.textContent = `${winnerName} has won!`;
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


function setPlayer(playerNum){
  const name  = prompt(`Player ${playerNum}, enter your name:`);
  if (!name) {
    alert(" required Name.");
    return;
}
  let symbol = prompt(`${name}, chooes your symbol(X or O);`).toUpperCase();
  if(symbol !=='X' && symbol !== 'O'){
    alert(" required symbol .")
    return;
  }


  if (playerNum === 1) {
    if (player2.symbol === symbol) {
      alert(`Symbol ${symbol} already taken by ${player2.name}. Choose the other one.`);
      return;
    }
    player1 = { name, symbol };
    document.getElementById('player1-info').textContent = `${name} (${symbol})`;
    currentPlayer = symbol;

    
  } else {
    if (player1.symbol === symbol) {
      alert(`Symbol ${symbol} already taken by ${player1.name}. Choose the other one.`);
      return;
    }
     player2 = { name, symbol };
      document.getElementById('player2-info').textContent = `${name} (${symbol})`;
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








