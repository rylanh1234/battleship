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
        board: [],
        visited: new Set(),
        numShips: 0,
        shipsSunk: 0,

        createBoard() {
            for (let i = 0; i < this.boardSize; i++) {
                this.board.push([]);
            }
            this.board.forEach((row) => {
                for (let i = 0; i < this.boardSize; i++) {
                    row.push([]);
                }
            });

        },
        placeShip(x, y, length, horizontal) {
            if (horizontal) {
                if (x > 0 && x + length < 11) {
                    const newShip = new Ship();
                    newShip.length = length;
                    this.board[x][y] = newShip;
                    for (let i = 0; i < newShip.length; i++) {
                        this.board[x + i][y] = newShip;
                    };
                    this.numShips += 1;
                };
            }
            else if (!horizontal) {
                if (y > 0 && y + length < 11) {
                    const newShip = new Ship();
                    newShip.length = length;
                    this.board[x][y] = newShip;
                    for (let i = 0; i < newShip.length; i++) {
                        this.board[x][y + i] = newShip;
                    };
                    this.numShips += 1;
                };
            };

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
        playerBoard: new Gameboard(),

        initBoard() {
            this.playerBoard.createBoard();
        }
    };
};

export { Player };