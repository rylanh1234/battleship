function displayBoard(playerType, boardSize) {
    const boardContainer = document.querySelector("#boardContainer");
    const board = document.createElement("div");
    board.classList.add("board");
    if (playerType === "real" ) {
        board.setAttribute("id", "realBoard");
    }
    else {
        board.setAttribute("id", "computerBoard");
    }
    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
    board.style.gridTemplateRows = `repeat(${boardSize}, 40px)`;
    board.style.marginTop = "5vh";
    board.style.alignItems = "center";
    board.style.justifyContent = "center";
    boardContainer.appendChild(board);

    for (let i = 0; i < boardSize **2; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = "100%";
        cell.style.height = "100%";
        cell.style.border = "1px solid black";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        board.appendChild(cell);
    }
};

function displayShip(x, y) {
    const board = document.querySelector("#realBoard");
    const cellIdx = y * 10 + x;
    const cell = board.children[cellIdx];
    const ship = document.createElement("div");
    ship.style.width = "25px";
    ship.style.height = "25px";
    ship.style.backgroundColor = "blue";
    cell.appendChild(ship);
}

function displayHit(playerType, x, y, hit) {
    let board = null;
    if (playerType === "real") {
        board = document.querySelector("#realBoard");
    }
    else {
        board = document.querySelector("computerBoard");
    }
    const cellIdx = y * 10 + x;
    const cell = board.children[cellIdx];
    if (hit) {
        const target = document.createElement("div");
        target.style.width = "25px";
        target.style.height = "25px";
        target.style.backgroundColor = "red";
        target.style.borderRadius = "50%";
        cell.appendChild(target);
    }
    else if (!hit) {
        const target = document.createElement("div");
        target.textContent = "\u2715";
        target.style.fontSize = "40px"
        target.style.color = "gray";
        cell.appendChild(target);
    }
};

export { displayBoard, displayShip, displayHit };