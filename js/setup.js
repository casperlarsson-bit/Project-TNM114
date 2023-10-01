const gameWindow = document.getElementById('game-window')

const nextPieceCanvas = document.getElementById('next-piece-canvas')
const nextPieceContainer = document.getElementById('next-piece')

function init() {
    gameWindow.style.width = gameWindow.clientHeight / 2 + 'px'

    //nextPieceCanvas.style.width = nextPieceContainer.clientWidth
    //nextPieceCanvas.style.height = nextPieceContainer.clientHeight

    nextPieceCanvas.style.width = nextPieceCanvas.clientHeight + 'px'
}

// Update the size of the window if the browser ir resized
window.addEventListener('resize', function () {
    init()
})

export { init }