class Cell {
    constructor(x, y, cellSize, value = 0) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.value = value;
        this.hasValue = this.value !== 0;
        this.suggests = this.hasValue ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.justSolved = false;
    }

    setValue(value) {
        if (this.hasValue) {
            throw new Error('Cell already has value');
        }
        this.value = value;
        this.hasValue = true;
        this.suggests = [];
    }

    solve(value) {
        if (this.suggests.indexOf(value) === -1) {
            throw new Error('Cell does not contain ' + value + '. Suggestions: ' + this.suggests.join(', '));
        }
        this.value = value;
        this.hasValue = true;
        this.suggests = [];
        this.justSolved = true;
    }

    removeSuggestion(value) {
        if (this.hasValue) 
            return;
        if (this.suggests.length === 0) 
            throw new Error(`Cell [${this.x + 1}][${this.y + 1}] already has no suggestion.`);
        var index = this.suggests.indexOf(value);
        if (index > -1) {
            Logger.log(`Remove suggestion ${value} for [${this.x + 1}][${this.y + 1}].`);
            this.suggests.splice(index, 1);
            Logger.log(`Left ${this.suggests.join(', ')}`);
        }
    }

    draw() {
        fill(255);
        rect(this.x * this.cellSize, this.y * this.cellSize, this.cellSize);
        if (this.hasValue) {
            this.writeText(this.value);
        }
        
    }

    writeText(message) {
        fill(this.justSolved ? 'red' : 'black');
        this.justSolved = false;
        textSize(Math.floor(this.cellSize * 0.8));
        text(message, this.x * this.cellSize + (this.cellSize * 0.3), this.y * this.cellSize + (this.cellSize * 0.8));
      }
}