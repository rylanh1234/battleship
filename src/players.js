import { Player } from "./battleship";

const realPlayer = new Player();
realPlayer.initBoard();
realPlayer.playerBoard.placeShip(0, 0, 3, true)

const computerPlayer = new Player();
computerPlayer.initBoard();

export { realPlayer, computerPlayer };