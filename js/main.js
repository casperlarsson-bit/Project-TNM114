import { Game } from "./game.js"
import { init } from "./setup.js"

const game = new Game()

// game.grid.setRandom()

game.generatePiece()
function gameLoop() {
    //game.grid.clearRows()
    game.updateScore()

    const currentTime = Date.now()
    if (currentTime - game.lastPieceMoveTime >= game.pieceInterval) {
        game.moveCurrentPieceDown()
        game.lastPieceMoveTime = currentTime
    }




    game.redrawCanvas()

    requestAnimationFrame(gameLoop)
}


init()
gameLoop()