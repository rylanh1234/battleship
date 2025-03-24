import { Player } from "./battleship";

const realPlayer = new Player("real");
realPlayer.initBoard();
realPlayer.playerBoard.placeShip(0, 0, 3, true);
realPlayer.playerBoard.placeShip(3, 4, 5, false);

const computerPlayer = new Player("computer");
computerPlayer.initBoard();

export { realPlayer, computerPlayer };