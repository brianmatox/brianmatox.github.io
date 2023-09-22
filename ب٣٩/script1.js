// Author: Brian Matomola
const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let cardOneImg, cardTwoImg;
let disableDeck = false;

let countdown = 60; // Initial countdown time in seconds
let timerInterval; // Variable to store the timer interval

let play = false;
//let pause = true;

let isPlaying = false;  // A flag to track whether the game is playing

// Changed the global scope variable name to `isPaused` instead of `pause`
let isPaused = false;

const increaseButton = document.getElementById("increaseButton");
const decreaseButton = document.getElementById("decreaseButton");

const playButton = document.getElementById("play"); // Get the play button element
const pauseButton = document.getElementById("pause"); // Get the play button element
//const decreaseButton = document.getElementById("decreaseButton");

playButton.addEventListener("click", startGame);  // Changed the event handler
pauseButton.addEventListener("click", pauseGame);  // Changed the event handler

//playButton.addEventListener("click", playGame); // Add event listener for play button
//pauseButton.addEventListener("click", playGame); // Add event listener for play button

increaseButton.addEventListener("click", increaseTimer);
decreaseButton.addEventListener("click", decreaseTimer);

// Function to increase timer by 30 seconds
function increaseTimer() {
    countdown += 30;
    updateCountdownDisplay();
}

// Function to decrease timer by 30 seconds, but ensure it doesn't go below 0
function decreaseTimer() {
    countdown = Math.max(0, countdown - 30);
    updateCountdownDisplay();
}

// Function to update the countdown display
function updateCountdownDisplay() {
    document.getElementById("countdown").textContent = countdown;
}

function flipCard(e) {
    // getting user clicked card
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            //return the cardOne value to clickedCard 
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    // if two cards matched 
    // console.log(img1, img2); 
    if (img1 === img2) {
        // if two cards match 
        matchedCard++;
        // all the cards 16
        if (matchedCard == 8) {
            setTimeout(() => {
                shuffleCard();
            }, 1000);  // reshufling after a second 
        }
        // return console.log("Card Matched");
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        // setting both card value to blank
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    // console.log("Card not matched ");
    // cardOne.classList.add("shake");
    // cardTwo.classList.add("shake");
    setTimeout(() => {
        // adding shakeclass to both card after 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        //removing both the flip and check classes from both the card after 1.2 seconds 
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        // setting both card value to blank
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);

}

/*function startTimer() {
    timerInterval = setInterval(() => {
        countdown--;

        if (countdown <= 0) {
            clearInterval(timerInterval);
            disableDeck = true; // Stop card flipping when the timer runs out
            setTimeout(() => {
                shuffleCard(); // Reshuffle cards after a delay
            }, 1000);
        } else {
            document.getElementById("countdown").textContent = countdown;
        }
    }, 1000); // Update every 1 second
}*/


function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;

    countdown = 60; // Reset countdown
    document.getElementById("countdown").textContent = countdown; // Reset countdown display

    let arr = ["lion", "cheetah", "racoon", "black_panther", "tiger", "buffalo", "elephant", "zebra", "lion", "cheetah", "racoon", "black_panther", "tiger", "buffalo", "elephant", "zebra",];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = arr[index] + ".png"; // Assign a different image from the shuffled array
        card.addEventListener("click", flipCard);
    });

    // Start the timer when shuffling is complete
    //startTimer();
    // Only start the timer if the game is playing
    if (isPlaying && !isPaused) {
        startTimer();
    }
}
// Display the cards 
shuffleCard();

cards.forEach(card => {
    // adding a click event to all cards 
    // card.classList.add("flip");
    card.addEventListener("click", flipCard);
});


function pause() {
    pause = true;
}
// function playGame() {
//     if (!play) { // Check if the game is not already playing
//         play = true; // Start the game when the Play button is clicked
//         disableDeck = false; // Enable card flipping
//         startTimer();
//         shuffleCard();
//     } else {
//         // If the game is already playing and the button is clicked again,
//         // you can implement a logic here to pause or reset the game as desired.
//         // For example, you might want to pause the timer and disable card flipping.
//         play = false;
//         clearInterval(timerInterval); // Stop the timer
//         disableDeck = true; // Disable card flipping
//         // You might also want to reset the matchedCard count and other variables.
//     }
// }
function startGame() {
    if (isPaused) { // Game was paused, continue from where left off
        isPaused = false;
        startTimer();
        disableDeck = false;
    }
    else if (!isPlaying) {  // Fresh start
        isPlaying = true;
        countdown = 60; // Reset the countdown
        updateCountdownDisplay(); // Update the display
        disableDeck = false;
        startTimer();
        shuffleCard();
    }
}


function pauseGame() {
    if (isPlaying && !isPaused) {  // Only pause if the game is playing and not already paused
        isPaused = true;
        clearInterval(timerInterval);  // Pause timer
        disableDeck = true;  // Disable the deck
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (isPaused) return;  // Do not count down if the game is paused
        countdown--;

        if (countdown <= 0) {
            clearInterval(timerInterval); // Clear the timer
            isPlaying = false; // Set the game to not playing
            isPaused = true; // Set the game to paused state
            disableDeck = true; // Disable the deck
            alert('Time is up!'); // Display alert
            setTimeout(() => {
                //alert('Time up!');
                shuffleCard(); // You can keep this line if you want the deck to shuffle automatically
            }, 1000);
        } else {
            document.getElementById("countdown").textContent = countdown;
        }
    }, 1000);
}






