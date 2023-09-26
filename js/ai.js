class Ai {
    constructor() {
        this.Height = -0.510066
        this.Lines = 0.760666
        this.Holes = -0.35663
        this.Bumpiness = -0.184483
    }

    getBestScore(grid, currentPiece) {
        let score = Number.MIN_SAFE_INTEGER
        let bestPiece
        while (currentPiece.moveLeft(grid)) { }

        // For each column, and rotation test final position
        while (currentPiece.moveRight(grid)) {
            for (let rot = 0; rot < 4; ++rot) {
                currentPiece.rotate(grid)

                while (currentPiece.moveDown(grid)) {}
                const gridCopy = grid.clone()
                gridCopy.addPiece(currentPiece)
                
                const currentHeuritic = this.calculateHeuristics(gridCopy)
                if (currentHeuritic > score) {
                    score = currentHeuritic
                    bestPiece = currentPiece.clone()
                    bestPiece.row = 0
                }

            }
        }

        return bestPiece
    }

    calculateHeuristics(grid) {
        return this.Height * this.calculateAggregatedHeight(grid)
            + this.Lines * this.calculateNumCompleteLines(grid)
            + this.Holes * this.calculateNumHoles(grid)
            + this.Bumpiness * this.calculateBumpiness(grid)
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