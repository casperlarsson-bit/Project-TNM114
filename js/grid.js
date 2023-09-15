class Grid {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.blockSize = document.getElementById('grid-canvas').width / columns

        this.cells = Array.from({ length: rows }, () => Array(columns).fill(0))
    }

    // Remove all cleared rows and move pieces above downwards
    clearRows() {

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
    }
}

export { Grid }