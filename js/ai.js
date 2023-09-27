import { NUM_ROTATIONS, HEURISTIC_COEFFICIENTS } from './constants.js'

class Ai {
    constructor() {
        this.heightWeight = HEURISTIC_COEFFICIENTS.height
        this.linesWeight = HEURISTIC_COEFFICIENTS.lines
        this.holesWeight = HEURISTIC_COEFFICIENTS.holes
        this.bumpinessWeight = HEURISTIC_COEFFICIENTS.bumpiness
    }

    getBestMove(grid, pieces, index) {
        let bestScore = Number.MIN_SAFE_INTEGER
        let bestPiece = null
        const currentPiece = pieces.elements[index]

        // Iterate through all possible rotations
        for (let rot = 0; rot < NUM_ROTATIONS; ++rot) {
            // Create a working copy of the current piece with the specified rotation
            const workingPiece = this.rotatePiece(currentPiece, rot, grid)

            // Move the working piece as far left as possible
            while (workingPiece.moveLeft(grid)) { }

            // Iterate through all possible horizontal positions
            do {
                // Create a clone of the working piece to simulate dropping it
                const droppedPiece = workingPiece.clone()

                // Drop the cloned piece as far down as possible in a grid copy
                while (droppedPiece.moveDown(grid)) { }

                // Create a copy of the grid and add the dropped piece
                const gridCopy = grid.clone()
                gridCopy.addPiece(droppedPiece)

                let currentScore

                // Recursively calculate the heuristic score for the current grid state
                if (index === pieces.tail - 1) {
                    currentScore = this.calculateHeuristics(gridCopy)
                }
                else {
                    // Recursively call getBestMove for the next piece and retrieve its score
                    currentScore = this.getBestMove(gridCopy, pieces, index + 1).score
                }

                // Update the best score and best piece if a higher score is found
                if (currentScore > bestScore) {
                    bestScore = currentScore
                    bestPiece = workingPiece.clone()
                }
            } while (workingPiece.moveRight(grid))
        }

        // Return the best piece and its associated score
        return { piece: bestPiece, score: bestScore }
    }

    // Rotate a piece rotations amount of times
    rotatePiece(piece, rotations, grid) {
        const workingPiece = piece.clone()
        for (let i = 0; i < rotations; ++i) {
            workingPiece.rotate(grid)
        }
        return workingPiece
    }

    // Calculate the total weighted heuristic given the current grid
    calculateHeuristics(grid) {
        return this.heightWeight * this.calculateAggregatedHeight(grid)
            + this.linesWeight * this.calculateNumCompleteLines(grid)
            + this.holesWeight * this.calculateNumHoles(grid)
            + this.bumpinessWeight * this.calculateBumpiness(grid)
    }

    // Calculate the aggregated height of all columns in the grid
    calculateAggregatedHeight(grid) {
        let totalHeight = 0
        // Iterate over each column in the grid
        for (let column = 0; column < grid.columns; ++column) {
            let row = 0

            // Find the first occupied cell in the column
            for (; row < grid.rows && !grid.cells[row][column]; ++row) {
            }

            totalHeight += grid.rows - row
        }

        return totalHeight
    }

    // Calculate the number of complete lines in the grid
    calculateNumCompleteLines(grid) {
        let totalNumLines = 0

        // Iterate over each row in the grid
        for (let row = 0; row < grid.rows; ++row) {
            // Check if the current row is complete (no empty cells)
            if (grid.isRowComplete(row)) ++totalNumLines
        }

        return totalNumLines
    }

    // Calculate the total number of holes in the grid
    // A hole is an empty cell that has at least one filled cell above it in the same column
    calculateNumHoles(grid) {
        let totalNumHoles = 0

        // Iterate through each column in the grid
        for (let column = 0; column < grid.columns; ++column) {
            let isHole = false

            // Iterate through each row in the current column
            for (let row = 0; row < grid.rows; ++row) {
                // Check if the cell in the current row is filled
                if (grid.cells[row][column]) isHole = true // Mark the presence of a filled cell in the column

                // Check if the cell is empty and there is a filled cell above it
                if (!grid.cells[row][column] && isHole) ++totalNumHoles // Increment the count of holes
            }
        }

        return totalNumHoles
    }

    // Calculate the bumpiness of the grid, which measures the variation in heights of columns
    // Bumpiness is the sum of the absolute differences in height between adjacent columns
    calculateBumpiness(grid) {
        let totalBumpiness = 0
        const heights = []

        // Iterate through each column in the grid to determine column heights
        for (let column = 0; column < grid.columns; ++column) {
            let row = 0

            // Find the first occupied cell in the column (bottom of the column)
            for (; row < grid.rows && !grid.cells[row][column]; ++row) {
            }

            // Calculate the height of the column (distance from the bottom)
            heights.push(grid.rows - row)
        }

        // Calculate bumpiness by summing the absolute differences between adjacent column heights
        for (let i = 0; i < heights.length - 1; ++i) {
            totalBumpiness += Math.abs(heights[i + 1] - heights[i])
        }

        return totalBumpiness
    }
}

export { Ai }