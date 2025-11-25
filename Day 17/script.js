const canvas = document.querySelector('#game')
const ctx = canvas.getContext("2d")

const ScoreE1 = document.querySelector("#Score")
const highScroeE1 = document.querySelector("#highscore")
const gameoverMsg = document.querySelector("#gameOverMsg")

const startBtn = document.querySelector("#startbtn")
const restartBtn = document.querySelector("#restartBtn")

const tileSize = 20;
const tileCount = canvas.width / tileSize;

let snake = [];
let direction = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let highScroe = 0;
let gameOver = false;
let gameInterval;
let gameStarted = false;

// INITIAL SETUP
function setup() {
    const center = Math.floor(tileCount / 2);

    snake = [
        { x: center - 1, y: center },
        { x: center - 2, y: center },
        { x: center - 3, y: center },
    ];

    direction = { x: 1, y: 0 };
    score = 0;
    gameOver = false;
    gameStarted = false;

    gameoverMsg.textContent = "";
    ScoreE1.textContent = score;

    placeFood();
    draw();
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;

    // placeFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 120);
}

function gameLoop() {
    if (gameOver || !gameStarted) return;

    update();
    draw(); // VERY IMPORTANT
}

function update() {
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
    };

    // WALL COLLISION
    if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount
    ) {
        return endGame();
    }

    // SELF COLLISION
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return endGame();
        }
    }

    snake.unshift(head);

    // FOOD COLLISION
    if (head.x === food.x && head.y === food.y) {
        score++;
        ScoreE1.textContent = score;

        if (score > highScroe) {
            highScroe = score;
            highScroeE1.textContent = highScroe;
        }

        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // DRAW SNAKE
    snake.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? "#22c55e" : "#4ade80";
        ctx.fillRect(
            segment.x * tileSize + 1,
            segment.y * tileSize + 1,
            tileSize - 2,
            tileSize - 2
        );
    });

    // DRAW FOOD
    ctx.fillStyle = "#f972e3";
    ctx.beginPath();
    ctx.arc(
        food.x * tileSize + tileSize / 2,
        food.y * tileSize + tileSize / 2,
        tileSize / 2 - 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// FIXED FOOD PLACEMENT
function placeFood() {
    let newFood;
    let overLap = true;

    while (overLap) {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
        };

        overLap = snake.some(
            part => part.x === newFood.x && part.y === newFood.y
        );
    }

    food = newFood;
}

function endGame() {
    gameOver = true;
    gameoverMsg.textContent = "Game Over! Click Start to Play Again";
    clearInterval(gameInterval);
}

// CONTROLS
document.addEventListener("keydown", (e) => {
    if (!gameStarted) return;

    if (e.code === "ArrowUp" && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    }
    else if (e.code === "ArrowDown" && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    }
    else if (e.code === "ArrowLeft" && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    }
    else if (e.code === "ArrowRight" && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
});

// BUTTONS
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", setup);

setup();
