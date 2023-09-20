import { Game } from "./game.js"
import { init } from "./setup.js"

init()

const game = new Game()
game.startGameLoop()