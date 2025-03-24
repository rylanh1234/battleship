import { realPlayer, computerPlayer } from "./players";
import { displayBoard, displayHit } from "./board-display";

displayBoard(realPlayer.playerType, realPlayer.playerBoard.boardSize);
displayBoard(computerPlayer.playerType, computerPlayer.playerBoard.boardSize);
displayHit(realPlayer.playerType, 2, 2, true);
displayHit(realPlayer.playerType, 6, 4, false);
