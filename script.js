import Ball from './Ball.js' 
import Paddle from './Paddle.js' 

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const startGameElem = document.getElementById("start-game")

// Event listener for keypress to then start the game
document.addEventListener("keydown", handleStart, { once: true})

// Update Loop
let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)

        // Changes the hue of the game as time progresses
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        
        document.documentElement.style.setProperty("--hue", hue + delta * .01)


        // Checking to see if a loss has occured to then reset the game
        if(isLose()) handleLose()
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

// Checking for losses here
function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}


// Inside the function to start the game on keypress
function handleStart() {

    startGameElem.classList.add("hide")
    // Player paddle movement
    document.addEventListener("mousemove", e => {
        playerPaddle.position = e.y / window.innerHeight * 100
    }) 

    lastTime = null
    window.requestAnimationFrame(update)
}

