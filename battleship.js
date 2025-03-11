function Ship() {
    return {
        length: null,
        numHit: 0,
        sunk: false,

        hit() {
            this.numHit += 1;
        },
        isSunk() {
            if (this.length === this.numHit) {
                this.sunk = true;
            }
            return this.sunk;
        }
    };
};

function Gameboard() {
    return {
        boardSize: 10,
        board: new createBoard(),
        visited: new Set(),
        numShips: 0,
        shipsSunk: 0,

        createBoard() {
            const rows = new Array(this.boardSize);
            rows.forEach(() => {
                const column = new Array(this.boardSize);
            });

        },
        placeShip(x, y, length, horizontal) {
            const newShip = new Ship();
            newShip.length = length;
            this.board[x][y] = newShip;
            if (horizontal) {
                for (let i = 1; i < newShip.length; i++) {
                    this.board[x + 1][y] = newShip;
                };
            };
            for (let i = 1; i < newShip.length; i++) {
                this.board[x][y + 1] = newShip;
            };
            this.numShips += 1;
        },
        receiveAttack(x, y) {
            if (!this.visited.has([x, y].toString())) {
                if (this.board[x][y]) {
                    this.board[x][y].hit();
                };
                this.visited.add([x, y].toString());
                return true;
            };
            return false; // pick another coordinate
        },
        shipsRemaining() {
            if (!this.numShips == this.shipsSunk) {
                return true;
            };
            return false;
        }
    };
};

function Player() {
    return {
        gameboard: new Gameboard()
    };
};