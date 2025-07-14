let board
let boardWidth = 360
let boardHeight = 640
let context

let gameStarted = false

// bird -->
// diamention
let birdWidth = 34 // //width/height ratio = 408/228 = 17/12
let birdHeight = 24
// position respect to board diamention (45px, 320px)
// The bird starts one-eighth from the left and vertically centered.
let birdX = boardWidth / 8     // starting of game
let birdY = boardHeight / 2    // vartically center

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

let startBtn
let restartBtn
let scoreText

let highScore = 0

// pipes -->

let pipeArray = []
let pipeWidth = 64 // width/height ratio = 384/3072 = 1/8
let pipeHeight = 512
let pipeX = boardWidth
let pipeY = 0
// means (360px, 0px (top right corner))


// Physics -->
let velocityX = -2 // pipes moving left speed
let velocityY = 0 // bird jump speed // i have to press up and down key
let gravity = 0.4 // +ve means down

let gameOver = false
let score = 0

let topPipeImg
let bottomPipeImg

window.onload = function () {
    board = document.getElementById("board")
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext("2d")

    restartBtn = document.getElementById("restartBtn")
    scoreText = document.getElementById("scoreText")
    restartBtn.style.display = "none"
    startBtn = document.getElementById("startBtn")
    startBtn.style.display = "inline-block"


    // load image
    birdImg = new Image()
    birdImg.src = "./flappybird.png"
    birdImg.onload = () => {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }

    topPipeImg = new Image()
    topPipeImg.src = "./toppipe.png"

    bottomPipeImg = new Image()
    bottomPipeImg.src = "./bottompipe.png"

    requestAnimationFrame(update)

    setInterval(placePipes, 1500) // run the method every 1.5 sec if its increse then pipes placed more delay

    document.addEventListener("keydown", moveBird)
}

const update = () => {
    requestAnimationFrame(update) // It’s asynchronous (doesn’t call itself immediately)

    if (!gameStarted || gameOver) return

    if (gameOver) {
        return
    }

    context.clearRect(0, 0, board.width, board.height)

    // bird
    velocityY += gravity // gravity is the rate of change for velocity over time
    // bird.y += velocityY
    bird.y = Math.max(bird.y + velocityY, 0) // 0 is the top of the canvas /// apply gravity to current brid.y, limit the bird.y to top of the canvus
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if (bird.y > board.height || bird.y <= 0) { // edge case is bird touch top or bottom
        gameOver = true
    }
    // pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i]
        pipe.x += velocityX // pipe moves towards left
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)

        if (!pipe.passed && bird.x > pipe.x + pipe.width) { // .x = left corner + .width = right corner thats why we add them
            // score += 1
            score += 0.5 // 0.5 because there are 2 pipes so 0.5 * 2 = 1
            pipe.passed = true
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true
        }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) { // pipe towards the left -ve we remove them
        pipeArray.shift() // remove first elm from the array
    }


    // score 
    context.fillStyle = "black"
    context.font = "50px sans-serif"

    scoreText.textContent = `Your Score: ${Math.floor(score)}`
    document.getElementById("highScoreText").textContent = `High Score: ${highScore}`;

    if (gameOver) {
        context.fillText("Game Over", 50, 190);
        highScore = Math.max(highScore, Math.floor(score));
        document.getElementById("highScoreText").textContent = `High Score: ${highScore}`;
        restartBtn.style.display = "inline-block";
    }


}

const placePipes = () => {
    if (gameOver) {
        return
    }

    // random ->  0-1 * pipeHeight/2
    // 0 -> 128px (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    // it means when 0px -> PHei = -128px(-1/4) and when 1px -> -384px(-3/4)
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2)
    // 0 - 512/4 = -128px // lift the pipe by 128px (y axis)

    // randomPipeY = -128 to -384
    // That means the top of the pipe is placed above the canvas, partially hidden.
    // “Visible part of the pipe changes”  -128	Pipe is just a little off-screen (most visible) , -384	Pipe is mostly off-screen (least visible)
    // All are 512px tall	But position makes the difference in what we see
    // ** pipeHeight = 512 , y = -128 , visible part is from y = 0 to y = 384 (bottom 384px of the pipe is visible).


    let openingSpace = board.height / 4

    let topPipe = {
        img: topPipeImg,
        x: pipeX, // Each new pipe starts at x = 360 , just outside the right edge of the canvas
        // y : pipeY,
        y: randomPipeY, // the visible part of the pipe changes because:
        width: pipeWidth,
        height: pipeHeight,
        passed: false // By default bird isn't passed through the pipe
    }

    pipeArray.push(topPipe) // every 1.5 sec add new pipe

    // for bottom, its starts from, topY(thats not visible up from bg) + height(visible) + free space 
    // after this total height the bottom pipe starts, it depands on top pipe

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe)
}

const moveBird = (e) => {
    // if (e.code == "space" || e.code == "ArrowUp" || e.code == "KeyX") {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {

        // jump
        velocityY = -7 // -ve means up

        if (gameOver) {
            bird.y = birdY
            pipeArray = []
            score = 0
            gameOver = false
            restartBtn.style.display = "none"
            scoreText.innerText = score
        }

    }
}

const detectCollision = (a, b) => {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    // All 4 true  Bird is inside the pipe! 
}

const startGame = () => {
    gameStarted = true
    startBtn.style.display = "none"
    restartBtn.style.display = "none"
    score = 0
    bird.y = birdY
    velocityY = 0
    pipeArray = []
}


const restartGame = () => {
    bird.y = birdY
    velocityY = 0
    pipeArray = []
    score = 0
    gameOver = false
    restartBtn.style.display = "none"
    scoreText.innerText = score
}