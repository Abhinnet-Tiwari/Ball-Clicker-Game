const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score-value");
const timerDisplay = document.getElementById("time-left");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");

let timeLeft = 20;
let score = 0;
let ballSpeed = 1500; //millisecond
let ballInterval;
let timeInterval;
let isRunning = false;




function getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    return { x, y };
}

function createBall() {
    const ball = document.createElement("div");
    ball.className = "ball";
    const { x, y } = getRandomPosition();
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    ball.addEventListener("click", () => {
        score += 1;
        scoreDisplay.textContent = score;
        timeLeft += 3;
        ball.remove();
        playClickSound();
        if (ballSpeed > 500) ballSpeed -= 50;
        resetBallInterval();
    });

    gameContainer.appendChild(ball);

    setTimeout(() => {
        if (document.body.contains(ball)) {
            ball.remove();
            timeLeft -= 2;
            if (timeLeft <= 0) endGame();
        }
    }, ballSpeed);
}

function resetBallInterval() {
    clearInterval(ballInterval);
    ballInterval = setInterval(createBall, ballSpeed);
}

function startTimer() {
    timeInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000)
}


function stopGame() {
    clearInterval(ballInterval);
    clearInterval(timeInterval);
    gameContainer.innerHTML = "";
    timeLeft = 20;
    score = 0;
    ballSpeed = 1500;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
}

function pauseGame() {
    clearInterval(ballInterval);
    clearInterval(timeInterval);
}


function endGame() {
    clearInterval(ballInterval);
    clearInterval(timeInterval);
    alert(`Game Over! Your score is ${score}.`);
    window.location.reload();
}

function playClickSound() {
    const audio = new Audio("./button-7.wav");
    audio.play();
}

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTimer();
        resetBallInterval();
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
    }
});



pauseBtn.addEventListener("click", () => {
    if (isRunning) {
        pauseGame();
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
});
stopBtn.addEventListener("click", () => {
    stopGame();
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
});

