import { Game } from "./game.js"
import { init } from "./setup.js"

const game = new Game()

game.grid.setRandom()

function gameLoop() {
    game.grid.clearRows()
    game.updateScore()
    game.generatePiece()

    game.redrawCanvas()

    requestAnimationFrame(gameLoop)
}


init()
gameLoop()