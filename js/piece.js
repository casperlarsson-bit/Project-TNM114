class Piece {
    constructor(shape) {
        this.shape = shape
        this.row = 0
        this.column = 0
    }

    canMoveLeft(grid) {
        // Iterate over the shape of the piece
        for (let row = 0; row < this.shape.length; ++row) {
            for (let column = 0; column < this.shape[row].length; ++column) {
                // If the current cell in the piece shape is empty, skip it
                if (this.shape[row][column] === 0) continue

                // Calculate the target row and column for the cell after moving down
                const targetRow = this.row + row
                const targetColumn = this.column + column - 1

                // Check if the target cell is out of bounds or occupied by another piece
                if (targetRow >= grid.rows || grid.cells[targetRow][targetColumn] !== 0) return false
            }
        }

        return true // The piece can move left
    }

    canMoveRight(grid) {
        // Iterate over the shape of the piece
        for (let row = 0; row < this.shape.length; ++row) {
            for (let column = 0; column < this.shape[row].length; ++column) {
                // If the current cell in the piece shape is empty, skip it
                if (this.shape[row][column] === 0) continue

                // Calculate the target row and column for the cell after moving down
                const targetRow = this.row + row
                const targetColumn = this.column + column + 1

                // Check if the target cell is out of bounds or occupied by another piece
                if (targetRow >= grid.rows || grid.cells[targetRow][targetColumn] !== 0) return false
            }
        }

        return true // The piece can move right
    }

    canMoveDown(grid) {
        // Iterate over the shape of the piece
        for (let row = 0; row < this.shape.length; ++row) {
            for (let column = 0; column < this.shape[row].length; ++column) {
                // If the current cell in the piece shape is empty, skip it
                if (this.shape[row][column] === 0) continue

                // Calculate the target row and column for the cell after moving down
                const targetRow = this.row + row + 1
                const targetColumn = this.column + column

                // Check if the target cell is out of bounds or occupied by another piece
                if (targetRow >= grid.rows || grid.cells[targetRow][targetColumn] !== 0) return false
            }
        }

        return true // The piece can move down
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

    }
}

export { Piece }