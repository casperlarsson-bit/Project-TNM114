const gameWindow = document.getElementById('game-window')

function init() {
    gameWindow.style.width = gameWindow.clientHeight / 2 + 'px'
}

// Update the size of the window if the browser ir resized
window.addEventListener('resize', function () {
    gameWindow.style.width = gameWindow.clientHeight / 2 + 'px'
})

export { init }