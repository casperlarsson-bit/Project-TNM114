class Grid {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.blockSize = document.getElementById('grid-canvas').width / columns

        this.cells = Array.from({ length: rows }, () => Array(columns).fill(0))
    }

    // Remove all cleared rows and move pieces above downwards
    clearRows() {
        let distance = 0
        // Start from this.rows to go from down and up
        for (let row = this.rows - 1; row >= 0; --row) {
            if (this.isRowComplete(row)) {
                ++distance
                for (let column = 0; column < this.columns; ++column) {
                    this.cells[row][column] = 0
                }
            }
            else if (distance > 0) {
                for (let column = 0; column < this.columns; ++column) {
                    this.cells[row + distance][column] = this.cells[row][column]
                    this.cells[row][column] = 0
                }
            }
        }
    }

    // Return true if the current row is complete, otherwise false
    isRowComplete(row) {
        for (let column = 0; column < this.columns; ++column) {
            if (this.cells[row][column] === 0) return false
        }

        return true
    }

    // Set random cells to 1, for debugging only
    setRandom() {
        for (let row = 0; row < this.rows; ++row) {
            for (let column = 0; column < this.columns; ++column) {
                this.cells[row][column] = Math.round(Math.random())
            }
        }

        for (let column = 0; column < this.columns; ++column) {
            this.cells[19][column] = 1
        }
    }
}

export { Grid }