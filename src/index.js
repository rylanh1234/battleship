import { realPlayer, computerPlayer } from "./players";
import { displayBoard, displayShip, displayHit } from "./board-display";

displayBoard(realPlayer.playerType, realPlayer.playerBoard.boardSize);
displayBoard(computerPlayer.playerType, computerPlayer.playerBoard.boardSize);
const selectCell = (function() {
    const cells = document.querySelectorAll("#computerBoard .cell");
    for (const [cellIdx, cell] of cells.entries()) {
        cell.addEventListener("click", () => {
            const y = Math.floor(cellIdx / 10);
            const x = cellIdx % 10; // x = cellIdx - y * 10
            const [isDupe, isHit] = computerPlayer.playerBoard.receiveAttack(x, y);
            console.log(isDupe)
            if (!isDupe) {
                displayHit(computerPlayer.playerType, x, y, isHit);
            };
        });
    };
})();

for (const [rowIdx, row] of realPlayer.playerBoard.board.entries()) {
    for (const [colIdx, ship] of row.entries()) {
    if (ship.length) {
        displayShip(colIdx, rowIdx);
    }}
}
displayHit(realPlayer.playerType, 2, 2, true);
displayHit(realPlayer.playerType, 6, 4, false);
