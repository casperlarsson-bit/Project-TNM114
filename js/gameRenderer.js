import { BORDER_COLOR } from './constants.js'

class GameRenderer {
    constructor(grid) {
        this.gridCanvas = document.getElementById('grid-canvas')
        this.gridContext = this.gridCanvas.getContext('2d')

        this.nextPieceCanvas = document.getElementById('next-piece-canvas')
        this.nextPieceContext = this.nextPieceCanvas.getContext('2d')

        this.scoreContainer = document.getElementById('score')

        this.grid = grid
    }

    // Clear the canvas and redraw the grid with the current state of cells
    redrawCanvas() {
        if (!this.gridContext) throw new ReferenceError('No grid context exists')

        this.gridContext.clearRect(0, 0, this.gridCanvas.width, this.gridCanvas.height)

        for (let row = 0; row < this.grid.rows; ++row) {
            for (let column = 0; column < this.grid.columns; ++column) {
                // There is a block at current grid, draw it!
                if (this.grid.cells[row][column]) {
                    this.gridContext.fillStyle = this.grid.cells[row][column]
                    this.gridContext.fillRect(this.grid.blockSize * column, this.grid.blockSize * row, this.grid.blockSize, this.grid.blockSize)
                    this.gridContext.strokeStyle = BORDER_COLOR
                    this.gridContext.strokeRect(this.grid.blockSize * column, this.grid.blockSize * row, this.grid.blockSize, this.grid.blockSize)
                }
            }
        }
    }

    redrawNextPiece(piece) {
        this.nextPieceContext.clearRect(0, 0, this.nextPieceCanvas.width, this.nextPieceCanvas.height)

        this.nextPieceContext.fillStyle = piece.color
        this.nextPieceContext.fillRect(this.grid.blockSize * 1, this.grid.blockSize * 1, this.grid.blockSize, this.grid.blockSize)
        this.nextPieceContext.strokeStyle = BORDER_COLOR
        this.nextPieceContext.strokeRect(this.grid.blockSize * 1, this.grid.blockSize * 1, this.grid.blockSize, this.grid.blockSize)
    }

    // Update the displayed score on the page
    updateScore(score) {
        this.scoreContainer.innerHTML = 'Score: ' + score
    }
}

export { GameRenderer }