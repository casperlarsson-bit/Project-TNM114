import { EMPTY_CELL } from "./constants.js"

class Grid {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.blockSize = this.calculateBlockSize()
        this.cells = this.initializeCells()
    }

    // Calculate block size based on canvas size and columns
    calculateBlockSize() {
        return document.getElementById('grid-canvas').width / this.columns
    }

    // Initialize grid cells with empty values
    initializeCells() {
        return Array.from({ length: this.rows }, () => Array(this.columns).fill(EMPTY_CELL))
    }

    // Remove all cleared rows and move pieces above downwards
    clearRows() {
        let distance = 0
        // Start from this.rows to go from down and up
        for (let row = this.rows - 1; row >= 0; --row) {
            if (this.isRowComplete(row)) {
                ++distance
                for (let column = 0; column < this.columns; ++column) {
                    this.cells[row][column] = EMPTY_CELL
                }
            }
            else if (distance > 0) {
                for (let column = 0; column < this.columns; ++column) {
                    this.cells[row + distance][column] = this.cells[row][column]
                    this.cells[row][column] = EMPTY_CELL
                }
            }
        }

        return this.calculateScore(distance)
    }

    // Return true if the current row is complete, otherwise false
    isRowComplete(row) {
        for (let column = 0; column < this.columns; ++column) {
            if (this.cells[row][column] === EMPTY_CELL) return false
        }

        return true
    }

    calculateScore(numClearedLevels) {
        const score = [0, 100, 300, 500, 800]
        return score[numClearedLevels] || 0
    }
}

export { Grid }