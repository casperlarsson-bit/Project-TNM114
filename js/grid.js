class Grid {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.blockSize = document.getElementById('grid-canvas').width / columns

        // this.cells = Array.from({ length: rows }, () => Array(columns).fill(0))
        this.cells = Array.from({ length: rows }, () => Array(columns).fill(Math.round(Math.random())))
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
}

export { Grid }