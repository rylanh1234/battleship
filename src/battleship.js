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
                // check if within bounds
                if (x >= 0 && x + length < 11) {
                    // check if cells already have ship
                    let shipOverlap = false;
                    for (let i = 0; i < length; i++) {
                        if (this.board[y][x + i].length) {
                            shipOverlap = true;
                        }
                    };
                    if (!shipOverlap) {
                        const newShip = new Ship();
                        newShip.length = length;
                        this.board[y][x] = newShip;
                        for (let i = 0; i < newShip.length; i++) {
                            this.board[y][x + i] = newShip;
                        };
                        this.numShips += 1;
                        return true;
                    }
                    else {
                        return false;
                    };
                }
                else {
                    return false;
                };
            }
            else if (!horizontal) {
                if (y >= 0 && y + length < 11) {
                    let shipOverlap = false;
                    for (let i = 0; i < length; i++) {
                        if (this.board[y + i][x].length) {
                            shipOverlap = true;
                        }
                    };
                    if (!shipOverlap) {
                        const newShip = new Ship();
                        newShip.length = length;
                        this.board[y][x] = newShip;
                        for (let i = 0; i < newShip.length; i++) {
                            this.board[y + i][x] = newShip;
                        };
                        this.numShips += 1;
                        return true;
                    }
                    else {
                        return false;
                    };
                }
                else {
                    return false;
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
            return [true, false]; // dupe
        },
        shipsRemaining() {
            return this.numShips !== this.shipsSunk;
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