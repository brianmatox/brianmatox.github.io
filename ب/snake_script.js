const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = []; 
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

// Getting high score from the local storage 
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    //Passing a random 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
const handleGameOver = () =>{
 //clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === " ") { // Added condition for space key
        handlePause(); // Call function to handle pause game
    }
}

document.addEventListener("keydown", changeDirection);

// Pause game functionality
let isPaused = false;

const handlePause = () => {
    if (isPaused) {
        setIntervalId = setInterval(initGame, 125);
    } else {
        clearInterval(setIntervalId);
    }
    isPaused = !isPaused;
   //initGame(); 
}

controls.forEach(key => {
   //calling changeDirection on each key and passing key dataset value as an object
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key} ));
})

const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
    
    // Checking a snake hit the food  
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();                       //Change position of the food
        snakeBody.push([foodX, foodY]);             //Pushing food position to snake body array 
        //console.log(snakeBody);
        score++;                                    //Increament score by 1
        
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`; 
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // Shifting forward the values of the elements in the snake body one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
        
    }

    snakeBody[0] = [snakeX, snakeY];         //Setting first element of snake body to current snake position.

    // Updating the snakes head position based on the current velocity 
    snakeX += velocityX;
    snakeY += velocityY;

    //Checking if the snakes head is out of the wall, if so set gameOver to true. 
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        //console.log("Game over")
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        //const element = array[i];
        //Adding a div for each part of the snakes body 
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;   
        //checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();

// Speed/Moving the head at 125 milliseconds 
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);

// Index buttons functionality 
function startGame() {
    // Add your game start logic here
    // For example, you can redirect to another page where the game is located
    window.location.href = "game.html";
}

function chooseLevel() {
    // Add your choose level logic here
    // For example, display a level selection modal or redirect to a level selection page
    window.location.href = "chooseLevel.html";
}

function showAbout() {
    // Add your about section logic here
    // For example, display an about section modal or redirect to an about page
    window.location.href = "about.html";
}
// Back button function
function backIndex() {
    window.location.href = "index.html";
}
