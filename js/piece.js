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
                if (newShape[row][column] !== 0 && grid.cells[this.row + row][this.column + column] !== 0) {
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
        const newShape = [...this.shape.map(row => [...row])]
        const size = this.shape.length

        // Perform the rotation (clockwise for this example)
        for (let i = 0; i < size / 2; i++) {
            for (let j = i; j < size - i - 1; j++) {
                const temp = newShape[i][j]
                newShape[i][j] = newShape[size - 1 - j][i]
                newShape[size - 1 - j][i] = newShape[size - 1 - i][size - 1 - j]
                newShape[size - 1 - i][size - 1 - j] = newShape[j][size - 1 - i]
                newShape[j][size - 1 - i] = temp
            }
        }

        // Check if the rotated shape is valid (doesn't go out of bounds or overlap with other pieces)
        if (this.isValidRotation(newShape, grid)) {
            this.shape = newShape // Update the shape if the rotation is valid
        }
    }

}

export { Piece }