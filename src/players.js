import { Player } from "./battleship";

const realPlayer = new Player("real");
realPlayer.initBoard();
realPlayer.playerBoard.placeShip(0, 0, 3, true);
realPlayer.playerBoard.placeShip(3, 4, 5, false);

const computerPlayer = new Player("computer");
computerPlayer.initBoard();
computerPlayer.playerBoard.placeShip(0, 0, 3, true);

function realTurn(x, y) {
    const [isDupe, isHit] = computerPlayer.playerBoard.receiveAttack(x, y);
    if (!isDupe) {
        displayHit(computerPlayer.playerType, x, y, isHit);
        if (isHit) {
            const shipSunk = computerPlayer.playerBoard.board[y][x].isSunk();
            if (shipSunk) {
                computerPlayer.playerBoard.shipsSunk += 1;
                continueGame = computerPlayer.playerBoard.shipsRemaining();
            };
        };
    }
    else {
        alert("This coordinate has already been targeted."); // pick another coordinate
        realTurn();
    };
};

function computerTurn() {
    const x = Math.floor(Math.random() * 10); // random number between 0 and 9
    const y = Math.floor(Math.random() * 10);
    const [isDupe, isHit] = realPlayer.playerBoard.receiveAttack(x, y);
    if (!isDupe) {
        displayHit(realPlayer.playerType, x, y, isHit);
        if (isHit) {
            const shipSunk = realPlayer.playerBoard.board[y][x].isSunk();
            if (shipSunk) {
                realPlayer.playerBoard.shipsSunk += 1;
                continueGame = realPlayer.playerBoard.shipsRemaining();
            };
        };
    }
    else {
        alert("This coordinate has already been targeted.");
        computerTurn();
    };
};

export { realPlayer, computerPlayer, realTurn, computerTurn };