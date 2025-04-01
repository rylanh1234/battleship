import { Player } from "./battleship";
import { displayHit } from "./board-display";

const realPlayer = new Player("real");
realPlayer.initBoard();
realPlayer.playerBoard.placeShip(0, 0, 3, true);
realPlayer.playerBoard.placeShip(3, 4, 5, false);

const computerPlayer = new Player("computer");
computerPlayer.initBoard();
computerPlayer.playerBoard.placeShip(0, 0, 3, true);

async function selectCell(playerType) {
    return new Promise(resolve => {
        let cells = null;
        if (playerType === "computer") {
            cells = document.querySelectorAll("#computerBoard .cell");
        }
        else {
            cells = document.querySelectorAll("#realBoard .cell");
        };
        for (const [cellIdx, cell] of cells.entries()) {
            cell.addEventListener("click", () => {
                const y = Math.floor(cellIdx / 10);
                const x = cellIdx % 10; // x = cellIdx - y * 10
                resolve([x, y]);
            }, { once: true });
        };
    });
};

async function shipPlacement(playerType) {
    const minShipLength = 2;
    const maxShipLength = 5;
    if (playerType === "computer") {
        for (let length = minShipLength; length < maxShipLength + 1; length++) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const horizontal = Math.random() < 0.5;
            const shipPlaced = computerPlayer.playerBoard.placeShip(x, y, length, horizontal);
            if (!shipPlaced) {
                length -= 1; // repeat if invalid ship placement (out of bound, ship overlap)
            };
        };
    }
    else {
        for (let length = minShipLength; length < maxShipLength + 1; length++) {
            const direction = prompt("Choose horizontal or vertical for the ship of length" + length + ". Then, select a coordinate to place the ship's head.").toLowerCase();
            const [x, y] = await selectCell(realPlayer.playerType);
            let shipPlaced = null;
            if (direction === "horizontal" || direction === "h") {
                shipPlaced = realPlayer.playerBoard.placeShip(x, y, length, true);
            }
            else if (direction === "vertical" || direction === "v") {
                shipPlaced = realPlayer.playerBoard.placeShip(x, y, length, false);
            }
            else {
                alert("Please choose either horizontal or vertical direction for the ship.");
                length -= 1;
            }
            if (shipPlaced === false) {
                alert("Invalid ship placement. The ship is out of bounds or overlaps another ship.");
                length -= 1;
            };
        };
    };
};

async function realTurn(continueGame) {
    const [x, y] = await selectCell(computerPlayer.playerType);
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
        return continueGame;
    }
    else {
        alert("This coordinate has already been targeted."); // pick another coordinate
        return realTurn(continueGame);
    };
};

function computerTurn(continueGame) {
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
        return continueGame;
    }
    else {
        return computerTurn(continueGame);
    };
};

export { realPlayer, computerPlayer, realTurn, computerTurn };