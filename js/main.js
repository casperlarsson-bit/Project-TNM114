import { Game } from "./game.js"
import { init } from "./setup.js"

const game = new Game()

init()
game.startGameLoop()
//console.log(game.grid.cells)