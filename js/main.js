import { Game } from "./game.js"
import { init } from "./setup.js"

const game = new Game()

game.generatePiece()
function gameLoop() {   
    const currentTime = Date.now()
    if (currentTime - game.lastPieceMoveTime >= game.pieceInterval) {
        game.moveCurrentPieceDown()
        game.lastPieceMoveTime = currentTime
    }
    
    
    
    
    game.updateScore()
    game.redrawCanvas()

    requestAnimationFrame(gameLoop)
}


init()
gameLoop()