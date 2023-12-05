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

let selectedGameSpeed = 250; // Default value

// Read URL parameters
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level");
const gameSpeed = parseInt(urlParams.get("gameSpeed"));

selectedGameSpeed = gameSpeed; 


// Getting high score from the local storage 
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

/*const changeFoodPosition = () => {
    //Passing a random 0 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}*/
const changeFoodPosition = () => {
    let maxGridPos = 30; // Assuming your grid is 30x30
    let freePositions = [];

    // Generate a list of all free positions
    for(let x = 1; x <= maxGridPos; x++) {
        for(let y = 1; y <= maxGridPos; y++) {
            if(!isPositionOccupiedBySnake({x, y})) {
                freePositions.push({x, y});
            }
        }
    }

    // Pick a random free position for the food
    let foodPos = freePositions[Math.floor(Math.random() * freePositions.length)];

    foodX = foodPos.x;
    foodY = foodPos.y;
}

function isPositionOccupiedBySnake(pos) {
    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeBody[i][0] === pos.x && snakeBody[i][1] === pos.y) {
            return true;
        }
    }

    return false;
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
        updateSnakeDirection('up');
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
        updateSnakeDirection('down');
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
        updateSnakeDirection('left');
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
        updateSnakeDirection('right');
    } else if (e.key === " ") { // Added condition for space key
        handlePause(); // Call function to handle pause game
    }
    
    function updateSnakeDirection(direction) {
        let head = document.querySelector('.head');
        let tail = document.querySelector('.tail');
    
        head.classList.remove('up', 'right', 'down', 'left');
        tail.classList.remove('up', 'right', 'down', 'left');
    
        head.classList.add(direction);
        tail.classList.add(direction);
    }    
}

// document.addEventListener("keydown", changeDirection);

// Pause game functionality
let isPaused = false;

const handlePause = () => {
    if (isPaused) {
        // setIntervalId = setInterval(initGame, 125);
        setIntervalId = setInterval(initGame, selectedGameSpeed);
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
        let partClass = '';

        // Assign 'head' class to the first element
        if(i == 0) {
            partClass = 'head';
        }
        // Assign 'tail' class to the last element
        else if(i == snakeBody.length - 1) {
            partClass = 'tail';
        }
        // Assign 'body' class to all other elements
        else {
            partClass = 'body';
        }
        //const element = array[i];
        //Adding a div for each part of the snakes body-->Adding a fancy body 12/03/2023 
        // htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        htmlMarkup += `<div class="${partClass}" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;   
        //checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
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


changeFoodPosition();

function easy() {
    selectedGameSpeed = 250; // Easy level
    //startGame();
    //window.location.href = "index.html";
    window.location.href = `game.html?level=easy&gameSpeed=${selectedGameSpeed}`;
}

function medium() {
    selectedGameSpeed = 125; // Medium level
    //startGame();
    // window.location.href = "index.html";
    window.location.href = `game.html?level=medium&gameSpeed=${selectedGameSpeed}`;
}

function hard() {
    selectedGameSpeed = 75; // Hard level
    console.log(`game speed: ${selectedGameSpeed}`);
    //startGame();
    //window.location.href = "index.html";
    window.location.href = `game.html?level=hard&gameSpeed=${selectedGameSpeed}`;
}

// Index buttons functionality 
function startGame() {
    // Add your game start logic here
    // For example, you can redirect to another page where the game is located
    window.location.href = "game.html";
}
// Speed/Moving the head at 125 milliseconds 
//setIntervalId = setInterval(initGame, selectedGameSpeed);
document.addEventListener("keydown", changeDirection);

// Set interval function
function setGameInterval() {
    setIntervalId = setInterval(initGame, selectedGameSpeed);
}

// Call the setGameInterval function after selectedGameSpeed is set
setGameInterval();



// Speed/Moving the head at 125 milliseconds 
//setIntervalId = setInterval(initGame, selectedGameSpeed);
document.addEventListener("keydown", changeDirection);



