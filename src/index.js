import { realPlayer, computerPlayer, realTurn ,computerTurn } from "./players";
import { displayBoard, displayShip, displayHit } from "./board-display";

displayBoard(realPlayer.playerType, realPlayer.playerBoard.boardSize);
displayBoard(computerPlayer.playerType, computerPlayer.playerBoard.boardSize);
const selectCell = (function() {
    const cells = document.querySelectorAll("#computerBoard .cell");
    for (const [cellIdx, cell] of cells.entries()) {
        cell.addEventListener("click", () => {
            const y = Math.floor(cellIdx / 10);
            const x = cellIdx % 10; // x = cellIdx - y * 10
        });
    };
})();

for (const [rowIdx, row] of realPlayer.playerBoard.board.entries()) {
    for (const [colIdx, ship] of row.entries()) {
    if (ship.length) {
        displayShip(colIdx, rowIdx);
    }};
};

const playGame = (function() {
    let continueGame = true;
    while (continueGame) {
        realTurn(x, y);
        if (!continueGame) {
            alert("Game Over! You Win!");
            break; // game over, real player win
        };
        computerTurn();
    }; // if loop ends, game over, computer player win
    alert("Game Over! The Computer Won!");
})();
