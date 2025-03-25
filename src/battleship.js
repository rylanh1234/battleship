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
                if (x >= 0 && x + length < 11) {
                    const newShip = new Ship();
                    newShip.length = length;
                    this.board[y][x] = newShip;
                    for (let i = 0; i < newShip.length; i++) {
                        this.board[y][x + i] = newShip;
                    };
                    this.numShips += 1;
                };
            }
            else if (!horizontal) {
                if (y >= 0 && y + length < 11) {
                    const newShip = new Ship();
                    newShip.length = length;
                    this.board[y][x] = newShip;
                    for (let i = 0; i < newShip.length; i++) {
                        this.board[y + i][x] = newShip;
                    };
                    this.numShips += 1;
                };
            };

        },
        receiveAttack(x, y) {
            if (!this.visited.has([x, y].toString())) {
                this.visited.add([x, y].toString());
                if (this.board[y][x].length) {
                    this.board[y][x].hit();
                    return [false, true]; // non-dupe, hit
                }
                else {
                    return [false, false]; // non-dupe, miss
                };
            };
            alert("This coordinate has already been targeted."); // pick another coordinate
            return [true, false]; // dupe
        },
        shipsRemaining() {
            if (!this.numShips == this.shipsSunk) {
                return true;
            };
            return false;
        }
    };
};

function Player(type) {
    return {
        playerType: type,
        playerBoard: new Gameboard(),

        initBoard() {
            this.playerBoard.createBoard();
        }
    };
};

export { Player };