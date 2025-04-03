import { realPlayer, computerPlayer, shipPlacement, realTurn, computerTurn } from "./players";
import { displayBoard, displayShip } from "./board-display";

displayBoard(realPlayer.playerType, realPlayer.playerBoard.boardSize);
displayBoard(computerPlayer.playerType, computerPlayer.playerBoard.boardSize);

(async function playGame() {
    await shipPlacement(realPlayer.playerType);
    shipPlacement(computerPlayer.playerType);
    for (const [rowIdx, row] of realPlayer.playerBoard.board.entries()) {
        for (const [colIdx, ship] of row.entries()) {
            if (ship.length) {
                displayShip(colIdx, rowIdx);
            }
        };
    };
    let continueGame = true;
    let winner = "The Computer";
    while (continueGame) {
        continueGame = await realTurn(continueGame);
        if (!continueGame) {
            winner = "You";
            break; // game over, real player win
        };
        continueGame = computerTurn(continueGame);
    }; // if loop ends without break, game over, computer player win
    alert("Game Over! " + winner + " Won!");
})();