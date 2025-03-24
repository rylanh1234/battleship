import { realPlayer, computerPlayer } from "./players";
import { displayBoard, displayShip, displayHit } from "./board-display";

displayBoard(realPlayer.playerType, realPlayer.playerBoard.boardSize);
displayBoard(computerPlayer.playerType, computerPlayer.playerBoard.boardSize);
for (let i = 0; i < realPlayer.playerBoard.numShips; i++) {

}

for (const [rowIdx, row] of realPlayer.playerBoard.board.entries()) {
    for (const [colIdx, ship] of row.entries()) {
    if (ship.length) {
        displayShip(colIdx, rowIdx);
    }}
}
displayHit(realPlayer.playerType, 2, 2, true);
displayHit(realPlayer.playerType, 6, 4, false);
