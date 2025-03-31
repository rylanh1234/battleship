import { realPlayer, computerPlayer, realTurn, computerTurn } from "./players";
import { displayBoard, displayShip } from "./board-display";

displayBoard(realPlayer.playerType, realPlayer.playerBoard.boardSize);
displayBoard(computerPlayer.playerType, computerPlayer.playerBoard.boardSize);

for (const [rowIdx, row] of realPlayer.playerBoard.board.entries()) {
    for (const [colIdx, ship] of row.entries()) {
        if (ship.length) {
            displayShip(colIdx, rowIdx);
        }
    };
};

(async function playGame() {
    let continueGame = true;
    while (continueGame) {
        await realTurn(continueGame)
        if (!continueGame) {
            alert("Game Over! You Win!");
            break; // game over, real player win
        };
        computerTurn(continueGame);
        console.log(continueGame)
    }; // if loop ends, game over, computer player win
    alert("Game Over! The Computer Won!");
})();
