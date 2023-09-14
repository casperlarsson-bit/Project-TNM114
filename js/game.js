import { Grid } from "./grid.js"

class Game {
    constructor() {
        this.gridCanvas = document.getElementById('grid-canvas')
        this.gridContext = this.gridCanvas.getContext('2d')
        this.scoreContainer = document.getElementById("score")

        this.grid = new Grid(20, 10)
        this.score = 0
    }

    redrawCanvas() {
        for (let r = 0; r < this.grid.rows; ++r) {
            for (let c = 0; c < this.grid.columns; ++c) {
                // There is a block at current grid, draw it!
                if (this.grid.cells[r][c]) {
                    this.gridContext.fillStyle = 'red'
                    this.gridContext.fillRect(this.grid.blockSize * c, this.grid.blockSize * (r - 2), this.grid.blockSize, this.grid.blockSize)
                    this.gridContext.strokeStyle="#FFFFFF"
                    this.gridContext.strokeRect(this.grid.blockSize * c, this.grid.blockSize * (r - 2), this.grid.blockSize, this.grid.blockSize)
                }
            }
        }
    }

    updateScore() {

    }
}

export { Game }