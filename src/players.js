import { Player } from "./battleship";
import { displayHit } from "./board-display";

const realPlayer = new Player("real");
realPlayer.initBoard();
realPlayer.playerBoard.placeShip(0, 0, 3, true);
realPlayer.playerBoard.placeShip(3, 4, 5, false);

const computerPlayer = new Player("computer");
computerPlayer.initBoard();
computerPlayer.playerBoard.placeShip(0, 0, 3, true);

async function selectCell() {
    return new Promise(resolve => {
        const cells = document.querySelectorAll("#computerBoard .cell");
        for (const [cellIdx, cell] of cells.entries()) {
            cell.addEventListener("click", () => {
                const y = Math.floor(cellIdx / 10);
                const x = cellIdx % 10; // x = cellIdx - y * 10
                resolve([x, y]);
            }, {once: true});
        };
    });
};

async function realTurn(continueGame) {
    const [x, y] = await selectCell();
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
        console.log(computerPlayer.playerBoard.visited)
        return continueGame;
    }
    else {
        return computerTurn(continueGame);
    };
};

export { realPlayer, computerPlayer, realTurn, computerTurn };