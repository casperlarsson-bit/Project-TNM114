import { Grid } from './grid.js'
import { Piece } from './piece.js'
import { GameRenderer } from './gameRenderer.js'
import { Queue } from './queue.js'
import { Ai } from './ai.js'
import { EMPTY_CELL, PIECE_INTERVAL, GRID_HEIGHT, GRID_WIDTH, BORDER_COLOR } from './constants.js'

class Game {
    constructor() {
        this.grid = new Grid(GRID_HEIGHT, GRID_WIDTH)
        this.gameRenderer = new GameRenderer(this.grid)

        this.score = 0

        this.pieces = new Queue()
        this.pieces.enqueue(this.pieceByIndex(getRandomInt(0, 6)))
        this.currentPiece = null
        this.pieceInterval = PIECE_INTERVAL
        this.lastPieceMoveTime = Date.now() // The time when last piece was moved

        this.addKeyboardListeners()
        this.animationFrameId = null
        this.isGameOver = false // Game over flag

        this.ai = new Ai()
    }

    startGameLoop() {
        this.generatePiece()

        const gameLoop = () => {
            if (!this.isGameOver) {
                const currentTime = Date.now()
                if (currentTime - this.lastPieceMoveTime >= this.pieceInterval) {
                    this.moveCurrentPieceDown()
                    this.lastPieceMoveTime = currentTime
                }

                this.gameRenderer.updateScore(this.score)
                this.gameRenderer.redrawCanvas()

                this.animationFrameId = requestAnimationFrame(gameLoop)
            }
        }

        this.animationFrameId = requestAnimationFrame(gameLoop)
    }

    gameOver() {
        if (!this.isGameOver) {
            this.isGameOver = true
            console.log('Game Over')
            cancelAnimationFrame(this.animationFrameId) // Stop the game loop
        }
    }

    // Move the current piece in the specified direction
    moveCurrentPiece(direction) {
        if (!this.currentPiece) return

        // Clear the cells where the current piece is before moving it
        this.clearPieceCells()

        // Attempt to move the piece in the specified direction
        switch (direction) {
            case 'left':
                this.currentPiece.moveLeft(this.grid)
                break
            case 'right':
                this.currentPiece.moveRight(this.grid)
                break
            case 'down':

                // Check for collision or locking condition
                if (!this.currentPiece.canMoveDown(this.grid)) {
                    this.lockCurrentPiece()
                    this.generatePiece()
                }
                this.currentPiece.moveDown(this.grid)
                break
            case 'rotate clockwise':
                this.currentPiece.rotate(this.grid)
                break
            default:
                break
        }

        // Set the cells where the current piece is
        this.setPieceCells()
    }

    moveCurrentPieceDown() {
        this.moveCurrentPiece('down')
    }

    moveCurrentPieceLeft() {
        this.moveCurrentPiece('left')
    }

    moveCurrentPieceRight() {
        this.moveCurrentPiece('right')
    }

    rotateCurrentPieceClockwise() {
        this.moveCurrentPiece('rotate clockwise')
    }

    updateGridFromPiece(value) {
        // Iterate over the shape of the piece
        for (let row = 0; row < this.currentPiece.shape.length; ++row) {
            for (let column = 0; column < this.currentPiece.shape[row].length; ++column) {
                // If the current cell in the piece shape is empty, skip it
                if (this.currentPiece.shape[row][column] === EMPTY_CELL) continue

                // Calculate the grid cell coordinates for the piece cell
                const gridRow = this.currentPiece.row + row
                const gridColumn = this.currentPiece.column + column

                // Set the value for the cell in the grid
                this.grid.cells[gridRow][gridColumn] = value
            }
        }
    }

    clearPieceCells() {
        this.updateGridFromPiece(EMPTY_CELL) // Clear cells by setting them to 0
    }

    setPieceCells() {
        this.updateGridFromPiece(this.currentPiece.color) // Set cells by setting them to the color of the piece
    }

    lockCurrentPiece() {
        this.setPieceCells() // Locking the piece essentially sets the cells to 1
        // Temp
        this.ai.getBestScore(this.grid)
        this.score += this.grid.clearRows()

    }

    // Define the event listener for handling keyboard input
    handleKeyPress(event) {
        // Handle key presses here
        if (event.key === 'ArrowLeft') {
            // Move the current piece left
            this.moveCurrentPieceLeft()
        }
        else if (event.key === 'ArrowRight') {
            // Move the current piece right
            this.moveCurrentPieceRight()
        }
        else if (event.key === 'ArrowUp' || event.key === 'z') {
            // Rotate the current piece
            this.rotateCurrentPieceClockwise()

        }
        else if (event.key === 'ArrowDown') {
            // Move the current piece down faster
            this.moveCurrentPieceDown()
            this.lastPieceMoveTime = Date.now()
        }
        else if (event.key === 'Space') {
            // Move the current piece to the bottom
        }
    }

    // Add event listeners to the document
    addKeyboardListeners() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this))
    }

    // Generate a random piece and set it as the current piece
    generatePiece() {
        /*this.currentPiece = this.pieceByIndex(getRandomInt(0, 6))
        // @TODO Create a Queue class which stores current and next piece

        if (!this.currentPiece.canMoveDown(this.grid)) {
            this.gameOver()
        }
        
        return this.currentPiece*/

        this.currentPiece = this.pieces.dequeue()
        this.pieces.enqueue(this.pieceByIndex(getRandomInt(0, 6)))
        this.gameRenderer.redrawNextPiece(this.pieces.peek())

        if (!this.currentPiece.canMoveDown(this.grid)) {
            this.gameOver()
        }
    }

    // Get a piece based on the index
    pieceByIndex(index) {
        let piece

        switch (index) {
            case 0: // O
                piece = new Piece([
                    [1, 1],
                    [1, 1]
                ])
                piece.color = '#F0F000'
                break
            case 1: // J
                piece = new Piece([
                    [1, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0],
                ])
                piece.color = '#0000F0'
                break
            case 2: // L
                piece = new Piece([
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0],
                ])
                piece.color = '#F0A000'
                break
            case 3: // Z
                piece = new Piece([
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0],
                ])
                piece.color = '#F00000'
                break
            case 4: // S
                piece = new Piece([
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0],
                ])
                piece.color = '#00F000'
                break
            case 5: // T
                piece = new Piece([
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0],
                ])
                piece.color = '#A000F0'
                break
            case 6: // I
                piece = new Piece([
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ])
                piece.color = '#00F0F0'
                break
            default:
                throw new RangeError('Generated piece index out of range.')
        }

        const pieceWidth = piece.shape.length
        piece.column = Math.floor((this.grid.columns - pieceWidth) / 2) // Position new piece in centre
        return piece
    }
}


// Get a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export { Game }