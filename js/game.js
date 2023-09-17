import { Grid } from "./grid.js"
import { Piece } from './piece.js'

class Game {
    constructor() {
        this.gridCanvas = document.getElementById('grid-canvas')
        this.gridContext = this.gridCanvas.getContext('2d')
        this.scoreContainer = document.getElementById("score")

        this.grid = new Grid(20, 10)
        this.score = 0
    }

    redrawCanvas() {
        this.gridContext.clearRect(0, 0, this.gridCanvas.width, this.gridCanvas.height)

        for (let row = 0; row < this.grid.rows; ++row) {
            for (let column = 0; column < this.grid.columns; ++column) {
                // There is a block at current grid, draw it!
                if (this.grid.cells[row][column]) {
                    this.gridContext.fillStyle = '#FF3213'
                    this.gridContext.fillRect(this.grid.blockSize * column, this.grid.blockSize * row, this.grid.blockSize, this.grid.blockSize)
                    this.gridContext.strokeStyle = "#FFFFFF"
                    this.gridContext.strokeRect(this.grid.blockSize * column, this.grid.blockSize * row, this.grid.blockSize, this.grid.blockSize)
                }
            }
        }
    }

    updateScore() {
        this.scoreContainer.innerHTML = this.score
    }

    generatePiece() {
        const piece = this.pieceByIndex(getRandomInt(0, 6))
    }

    pieceByIndex(index) {
        let piece

        switch (index) {
            case 0: // O
                piece = new Piece([
                    [1, 1],
                    [1, 1]
                ])
                break;
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            case 5:

                break;
            case 6:

                break;

            default:
                throw 'Generated piece index out of range.'
                break;
        }
    }
}

// Get a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export { Game }