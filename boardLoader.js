class BoardLoader {
    constructor(boardSize, cellSize) {
        this.boardSize = boardSize;
        this.cellSize = cellSize;
    }

    async getBoardFromWeb(level) {
        var url = `http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=${level}`;
        var rawResponse = await httpGet(url);
        return this.parseBoardReponse(rawResponse);
    }

    getExampleBoard() {
        var board = this.getEmptyBoard();
        var temps = [
            [9, 2, 0, 0, 0, 5, 8, 0, 0],
            [0, 0, 1, 7, 2, 6, 3, 0, 9],
            [0, 0, 3, 8, 9, 1, 2, 0, 6],

            [0, 8, 0, 0, 0, 0, 1, 0, 2],
            [7, 0, 0, 0, 6, 0, 5, 0, 8],
            [0, 0, 0, 0, 3, 0, 7, 0, 0],

            [5, 0, 8, 0, 1, 3, 0, 0, 7],
            [0, 4, 0, 6, 0, 7, 9, 1, 5],
            [0, 0, 0, 2, 0, 0, 6, 0, 0]
        ]
        for (let i = 0; i < temps.length; i++) {
            const row = temps[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (cell !== 0)
                    board[i][j].setValue(cell);

            }
        }
        return board;
    }

    getEmptyBoard() {
        let board = new Array(this.boardSize);
        for (let i = 0; i < this.boardSize; i++) {
            board[i] = new Array(this.boardSize);
            for (let j = 0; j < this.boardSize; j++) {
                board[i][j] = new Cell(j, i, this.cellSize);
            }
        }
        return board;
    }

    parseBoardReponse(response) {
        var parsed = JSON.parse(response).squares;
        var board = this.getEmptyBoard();
        parsed.forEach(val => {
            board[val.y][val.x].setValue(val.value);
        });
        return board;

    }

}