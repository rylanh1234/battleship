function displayBoard(boardSize) {
    const container = document.querySelector("#container");
    const boardContainer = document.createElement("div");
    boardContainer.setAttribute("id", "boardContainer");
    boardContainer.style.display = "grid";
    boardContainer.style.gridTemplateColumns = `repeat(${boardSize}, 75px)`;
    boardContainer.style.gridTemplateRows = `repeat(${boardSize}, 75px)`;
    boardContainer.style.marginTop = "10vh";
    boardContainer.style.alignItems = "center";
    boardContainer.style.justifyContent = "center";
    container.appendChild(boardContainer);

    for (let i = 0; i < boardSize **2; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = "100%";
        cell.style.height = "100%";
        cell.style.border = "1px solid black";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        boardContainer.appendChild(cell);
    }
};

function displayHit(x, y, hit) {
    const boardContainer = document.querySelector("#boardContainer");
    const cellIdx = x * 10 + y;
    const cell = boardContainer.children[cellIdx];
    if (hit) {
        const target = document.createElement("div");
        target.style.width = "50px";
        target.style.height = "50px";
        target.style.backgroundColor = "red";
        target.style.borderRadius = "50%";
        cell.appendChild(target);
    }
    else if (!hit) {
        const target = document.createElement("div");
        target.textContent = "\u2715";
        target.style.fontSize = "75px"
        target.style.color = "gray";
        cell.appendChild(target);
    }
};

export { displayBoard, displayHit };