class Cleaner {
    constructor(boardSize, blockSize, board) {
        this.boardSize = boardSize;
        this.blockSize = blockSize;
        this.board = board;
    }

    cleanupSuggestions() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                let cell = this.board[i][j];
                if (cell.hasValue) {
                    // Logger.log(`Value! Remove ${cell.value} from row ${i + 1}, col ${j + 1}`);
                    this.removeSuggestionsFromRow(i, cell.value);
                    this.removeSuggestionsFromCol(j, cell.value);
                    const blockX = Math.floor(j / this.blockSize);
                    const blockY = Math.floor(i / this.blockSize);
                    this.removeSuggestionsFromBlock(blockX, blockY, cell.value);
                }
            }
        }
        for (let i = 0; i < this.boardSize; i++) {
            let success = this.removeUniqueFromRow(i);
            if (success) {
                return;
            }
        }
        for (let i = 0; i < this.boardSize; i++) {
            let success = this.removeUniqueFromColumn(i);
            if (success) {
                return;
            }
        }

    }

    removeUniqueFromBlock(blockX, blockY) {
        var startX = blockX * 3;
        var startY = blockY * 3;
        for (let i = 1; i <= 9; i++) { // all digits
            let cells = [];
            for (let x = startX; x < this.blockSize; x++) {
                for (let y = startY; y < this.blockSize; y++) {
                    let cell = this.board[y][x];
                    let index = cell.suggests.indexOf(i);
                    if (index > -1) {
                        cells.push({x: x, y: y});
                    }
                }
            }
            if (cells.length === 1) {
                Logger.log(`${i} is only available for [${row + 1}][${cells[0] + 1}]`);
                this.board[row][cells[0]].solve(i); // TODO: Actually, it should change sugggests list, not solve
                return true;
            }
        }
        return false;
    }

    removeUniqueFromRow(row) {
        for (let i = 1; i <= 9; i++) { // all digits
            let cells = [];
            for (let c = 0; c < this.boardSize; c++) {
                let cell = this.board[row][c];
                let index = cell.suggests.indexOf(i);
                if (index > -1) {
                    cells.push(c);
                }
            }
            if (cells.length === 1) {
                Logger.log(`${i} is only available for [${row + 1}][${cells[0] + 1}]`);
                this.board[row][cells[0]].solve(i); // TODO: Actually, it should change sugggests list, not solve
                return true;
            }
        }
        return false;
    }

    removeUniqueFromColumn(column) {
        for (let i = 1; i <= 9; i++) { // all digits
            let cells = [];
            for (let r = 0; r < this.boardSize; r++) {
                let cell = this.board[r][column];
                let index = cell.suggests.indexOf(i);
                if (index > -1) {
                    cells.push(r);
                }
            }
            if (cells.length === 1) {
                Logger.log(`${i} is only available for [${cells[0] + 1}][${column + 1}]`);
                this.board[cells[0]][column].solve(i); // TODO: Actually, it should change sugggests list, not solve
            }
        }
    }

    removeSuggestionsFromRow(row, value) {
        for (let i = 0; i < this.boardSize; i++) {
            this.board[row][i].removeSuggestion(value);
        }
    }

    removeSuggestionsFromCol(col, value) {
        for (let i = 0; i < this.boardSize; i++) {
            this.board[i][col].removeSuggestion(value);
        }
    }

    removeSuggestionsFromBlock(x, y, value) {
        const xStart = x * this.blockSize;
        const yStart = y * this.blockSize;
        for (let i = 0; i < this.blockSize; i++) {
            for (let j = 0; j < this.blockSize; j++) {
                this.board[yStart + j][xStart + i].removeSuggestion(value);
            }
        }
    }
}