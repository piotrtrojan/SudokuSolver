class Engine {

    constructor(cellSize) {
        this.boardSize = 9;
        this.blockSize = 3;
        this.cellSize = cellSize;
        this.loader = new BoardLoader(this.boardSize, this.cellSize);
        this.board = this.loader.getExampleBoard();
        this.reinit();
    }

    async loadBoardFromWebservice(level) {
        this.board = await this.loader.getBoardFromWeb(level);
        this.reinit();
    }

    reinit() {
        this.cleaner = new Cleaner(this.boardSize, this.blockSize, this.board);
        this.stopSolving = false;
        this.solved = false;
        this.stopSolving = false;
    }

    cleanupSuggestions() {
        this.cleaner.cleanupSuggestions();
    }


    ////////////////////////////////////////////////////////////////
    // Region: UI
    ////////////////////////////////////////////////////////////////

    draw() {
        this.board.forEach(row => {
            row.forEach(cell => {
                cell.draw();
            });
        });
    }

    mousePressed() {
        var coordinates = this.getCellCoordinatesByPosition(mouseX, mouseY);
        if (!coordinates)
            return;
        const cell = this.board[coordinates.y][coordinates.x];
        if (cell.hasValue) {
            Logger.log(`Cell[${coordinates.x + 1}][${coordinates.y + 1}] = ${cell.value}`);
        } else {
            Logger.log(`Cell[${coordinates.x + 1}][${coordinates.y + 1}] has suggestions: ${cell.suggests.join(', ')}`);
        }
    }

    ////////////////////////////////////////////////////////////////
    // Region: Solver
    ////////////////////////////////////////////////////////////////

    async continiousWork() {
        for (let level = 1; level <= 3; level++) {
            for (let i = 0; i < 120; i++) {
                await this.loadBoardFromWebservice(level);
                this.solve(true);
            }
        }
    }

    solve(solveAll) {
        var maxAttempts = 30;
        do {
            maxAttempts--;
            this.solveInternal();
        } while (solveAll && !this.stopSolving && maxAttempts > 0);
        if (maxAttempts === 0) {
            Logger.warn('To many tries');
        }
    }

    solveInternal() {
        this.solutionInThisStep = false;
        this.cleanupSuggestions();
        this.solveCells();
        this.solved = this.isSolved();
        if (this.solved) {
            this.stopSolving = true;
            console.warn('SOLVED');
        }
    }

    solveCells() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                let cell = this.board[i][j];
                if (!cell.hasValue && cell.suggests.length === 1) {
                    Logger.log(`Solved [${i + 1}][${j + 1}] = ${cell.suggests[0]}`);
                    cell.solve(cell.suggests[0]);
                    return true;
                }
            }
        }
        return false;
    }

    isSolved() {
        var notSolved = this.board.some(x => x.some(y => !y.hasValue));
        return !notSolved;
    }

    ////////////////////////////////////////////////////////////////
    // MISC
    ////////////////////////////////////////////////////////////////

    getCellCoordinatesByPosition(mouseX, mouseY) {
        if (mouseX < 0 || mouseY < 0)
            return null;
        const x = Math.floor(mouseX / cellSize);
        const y = Math.floor(mouseY / cellSize);
        if (x >= this.boardSize || y >= this.boardSize)
            return null;

        return {
            x: x,
            y: y
        };
    }

}