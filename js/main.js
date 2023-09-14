import { Game } from "./game.js"


const game = new Game()

game.redrawCanvas()

function gameLoop() {
    
    requestAnimationFrame(gameLoop)
}

gameLoop()