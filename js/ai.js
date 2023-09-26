class Ai {
    constructor() {
        this.height = -0.510066
        this.lines = 0.760666
        this.holes = -0.35663
        this.bumpiness = -0.184483
    }

    getBestScore(grid, currentPiece) {
        let score = Number.MIN_SAFE_INTEGER
        let bestPiece
        while (currentPiece.moveLeft(grid)) { }

        // For each column, and rotation test final position
        /*while (currentPiece.moveRight(grid)) {
            for (let rot = 0; rot < 4; ++rot) {
                currentPiece.rotate(grid)

                while (currentPiece.moveDown(grid)) { }
                const gridCopy = grid.clone()
                gridCopy.addPiece(currentPiece)

                const currentHeuritic = this.calculateHeuristics(gridCopy)
                if (currentHeuritic > score) {
                    score = currentHeuritic
                    bestPiece = currentPiece.clone()
                    bestPiece.row = 0
                }

            }
        }*/

        for (let rot = 0; rot < 4; ++rot) {
            const workingPiece = currentPiece.clone()
            for (let i = 0; i < rot; ++i) {
                workingPiece.rotate(grid)
            }

            while (workingPiece.moveLeft(grid)) { }

            do {
                const anotherPiece = workingPiece.clone()
                while (anotherPiece.moveDown(grid)) { }
                const gridCopy = grid.clone()
                gridCopy.addPiece(anotherPiece)

                const currentHeuristic = this.calculateHeuristics(gridCopy)
                if (currentHeuristic > score) {
                    score = currentHeuristic
                    bestPiece = workingPiece.clone()
                }
            } while (workingPiece.moveRight(grid))
        }

        return bestPiece
    }

    calculateHeuristics(grid) {
        return this.height * this.calculateAggregatedHeight(grid)
            + this.lines * this.calculateNumCompleteLines(grid)
            + this.holes * this.calculateNumHoles(grid)
            + this.bumpiness * this.calculateBumpiness(grid)
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

    calculateNumHoles(grid) {
        let totalNumHoles = 0

        for (let column = 0; column < grid.columns; ++column) {
            let isHole = false
            for (let row = 0; row < grid.rows; ++row) {
                if (grid.cells[row][column]) isHole = true

                if (!grid.cells[row][column] && isHole) ++totalNumHoles
            }
        }

        return totalNumHoles
    }

    calculateBumpiness(grid) {
        let totalBumpiness = 0
        const heights = []

        for (let column = 0; column < grid.columns; ++column) {

            let row = 0

            // Find the first occupied cell in the column
            for (; row < grid.rows && !grid.cells[row][column]; ++row) {
            }

            heights.push(grid.rows - row)

        }

        for (let i = 0; i < heights.length - 1; ++i) {
            totalBumpiness += Math.abs(heights[i + 1] - heights[i])

        }

        return totalBumpiness
    }
}

export { Ai }