import { Game } from "./game.js"


const game = new Game()

game.grid.setRandom()
game.redrawCanvas()

function gameLoop() {
    
    requestAnimationFrame(gameLoop)
}

gameLoop()