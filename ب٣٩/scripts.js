// Author: Brian Matomola
const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let cardOneImg, cardTwoImg;
let disableDeck = false;

let countdown = 60; // Initial countdown time in seconds
let timerInterval; // Variable to store the timer interval

let isPlaying = false;
let isPaused = false;

const increaseButton = document.getElementById("increaseButton");
const decreaseButton = document.getElementById("decreaseButton");

const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");

playButton.addEventListener("click", toggleGame);
pauseButton.addEventListener("click", togglePause);

increaseButton.addEventListener("click", increaseTimer);
decreaseButton.addEventListener("click", decreaseTimer);

function increaseTimer() {
    countdown += 30;
    updateCountdownDisplay();
}

function decreaseTimer() {
    countdown = Math.max(0, countdown - 30);
    updateCountdownDisplay();
}

function updateCountdownDisplay() {
    document.getElementById("countdown").textContent = countdown;
}

function flipCard(e) {
    if (isPaused) return;
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        cardOneImg = cardOne.querySelector("img").src;
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard == 8) {
            setTimeout(() => {
                shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);
        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        countdown--;

        if (countdown <= 0) {
            clearInterval(timerInterval);
            disableDeck = true;
            setTimeout(() => {
                shuffleCard();
            }, 1000);
        } else {
            document.getElementById("countdown").textContent = countdown;
        }
    }, 1000);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;

    countdown = 60;
    document.getElementById("countdown").textContent = countdown;

    let arr = ["lion", "cheetah", "racoon", "black_panther", "tiger", "buffalo", "elephant", "zebra", "lion", "cheetah", "racoon", "black_panther", "tiger", "buffalo", "elephant", "zebra"];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = arr[index] + ".png";
        card.addEventListener("click", flipCard);
    });

    if (!isPaused && isPlaying) {
        startTimer();
    }
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

function toggleGame() {
    if (!isPlaying) {
        isPlaying = true;
        disableDeck = false;
        startTimer();
        shuffleCard();
    } else {
        isPlaying = false;
        isPaused = false; // Reset the pause state
        disableDeck = false; // Enable card flipping
        clearInterval(timerInterval); // Clear the timer
    }
}

function togglePause() {
    if (isPlaying) {
        isPaused = !isPaused; // Toggle the pause state
        if (isPaused) {
            disableDeck = true; // Disable card flipping during pause
            clearInterval(timerInterval); // Pause the timer
        } else {
            disableDeck = false; // Enable card flipping after pause
            startTimer(); // Resume the timer
        }
    }
}
