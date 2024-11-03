const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
let turn;
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function createGameBoard() {
    const emptyTiles = " ".repeat(9).split("");
    const tileGrid = emptyTiles.map(tile => `<button class= "tile"></button>`).join("");
    gameBoard.innerHTML = tileGrid;
    turn = "X";
    info.textContent = `${turn}'s turn`
    gameBoard.addEventListener("click", handleGameBoardClick)
}
createGameBoard()

function updateTurn() {
    if(turn === "X") {
        turn = "O";
    } else {
        turn = "X";
    }
   // turn = turn === "X" ? "O" : "X";
   info.textContent =`${turn}'s turn`;
}

function restartGame(){
    let seconds = 5;
    const timer = setInterval(() => {
        info.textContent =`Restarting Game in ${seconds}...`;
        seconds--;
        if (seconds < 0) {
            clearInterval(timer);
            createGameBoard();
        }
    }, 1000)
}

function showCongrats() {
    info.textContent = `${turn} wins!`;
    gameBoard.removeEventListener("click", handleGameBoardClick);
    setTimeout(restartGame, 2000)
}

function showDraw () {
    info.textContent = "Draw!";
    gameBoard.removeEventListener("click", handleGameBoardClick);
    setTimeout(restartGame, 2000)
}

function checkScore(){
    const allTiles = [...document.querySelectorAll(".tile")];
    const tileValues = allTiles.map(tile => tile.dataset.value);
    const isWinner = winningCombos.some(combo => {
        const [a, b, c] = combo;
        return (
            tileValues[a]&&
            tileValues[a]=== tileValues[b]&&
            tileValues[a]=== tileValues[c]
        );
    })
    const isDraw = allTiles.every(tile => tile.dataset.value)
   if(isWinner) {
    return showCongrats();
   } else if (isDraw) {
    return showDraw()
   }
   updateTurn();
}

function handleGameBoardClick (e) {
    const valueExists = e.target.dataset.value;
    if (!valueExists) {
        e.target.dataset.value = turn;
        checkScore()
    }
}