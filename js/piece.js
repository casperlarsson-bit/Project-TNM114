import { EMPTY_CELL } from "./constants.js"

class Piece {
    constructor(shape) {
        this.shape = shape
        this.row = 0
        this.column = 0
    }

    isValidMove(direction, grid) {
        const numRows = this.shape.length
        const numColumns = this.shape[0].length

        // Iterate over the shape of the piece
        for (let row = 0; row < numRows; ++row) {
            for (let column = 0; column < numColumns; ++column) {
                // If the current cell in the piece shape is empty, skip it
                if (this.shape[row][column] === EMPTY_CELL) continue

                // Calculate the target row and column for the cell after moving down
                let targetRow = this.row + row
                let targetColumn = this.column + column

                // Offset depending on the move
                if (direction === 'left') {
                    targetColumn--
                } else if (direction === 'right') {
                    targetColumn++
                } else if (direction === 'down') {
                    targetRow++
                }

                // Check if the target cell is out of bounds or occupied by another piece
                if (
                    targetRow < 0 ||
                    targetColumn < 0 ||
                    targetRow >= grid.rows ||
                    targetColumn >= grid.columns ||
                    grid.cells[targetRow][targetColumn] !== EMPTY_CELL
                ) {
                    return false
                }
            }
        }

        return true
    }

    canMoveLeft(grid) {
        return this.isValidMove('left', grid)
    }

    canMoveRight(grid) {
        return this.isValidMove('right', grid)
    }

    canMoveDown(grid) {
        return this.isValidMove('down', grid)
    }

    isValidRotation(newShape, grid) {
        // Check if the rotated shape is within the bounds of the grid
        if (
            this.row < 0 ||
            this.column < 0 ||
            this.row + newShape.length > grid.rows ||
            this.column + newShape[0].length > grid.columns
        ) {
            return false
        }

        // Check if the rotated shape overlaps with other pieces
        for (let row = 0; row < newShape.length; ++row) {
            for (let column = 0; column < newShape[row].length; ++column) {
                if (newShape[row][column] !== EMPTY_CELL && grid.cells[this.row + row][this.column + column] !== EMPTY_CELL) {
                    return false
                }
            }
        }

        return true // Rotation is valid
    }

    moveLeft(grid) {
        if (this.canMoveLeft(grid)) --this.column
    }

    moveRight(grid) {
        if (this.canMoveRight(grid)) ++this.column
    }

    moveDown(grid) {
        if (this.canMoveDown(grid)) ++this.row
    }

    rotate(grid) {
        // Create a copy of the current shape to perform the rotation on
        const newSize = this.shape.length
        const newShape = new Array(newSize).fill(0).map(() => new Array(newSize).fill(0))

        // Perform closkwise rotation 
        for (let i = 0; i < newSize; i++) {
            for (let j = 0; j < newSize; j++) {
                newShape[i][j] = this.shape[newSize - j - 1][i]
            }
        }

        // Check if the rotated shape is valid (doesn't go out of bounds or overlap with other pieces)
        if (this.isValidRotation(newShape, grid)) {
            this.shape = newShape
        }
    }
}

export { Piece }