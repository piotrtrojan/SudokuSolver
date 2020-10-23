const fps = 150;
const cellSize = 40;
let engine;

function setup() {
    engine = new Engine(cellSize);
    frameRate(fps);
    createCanvas(9 * cellSize, 9 * cellSize);
}

function draw() {
    engine.draw();
}

function mousePressed(event) {
    engine.mousePressed(event);
}

function solveStep() {
    engine.solve(false);
}

function solveBoard() {
    engine.solve(true);
}

function toggleLogs() {
    Logger.toggleLog();
}

async function continiousWork() {
    await engine.continiousWork();
}

async function loadNewBoard(level) {
    await engine.loadBoardFromWebservice(level);
}