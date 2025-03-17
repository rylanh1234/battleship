import { realPlayer } from "./players";
import { displayBoard, displayHit } from "./board-display";

displayBoard(realPlayer.playerBoard.boardSize);
displayHit(2, 2, true);
displayHit(6, 4, false);
