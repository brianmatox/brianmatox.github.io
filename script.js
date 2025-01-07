/*document.addEventListener("DOMContentLoaded", function () {

    const symbols = ["●", "■", "▬", "♠", "♣", "♥", "♫♦%ׁׂ♫", "♪", "‽", "ᴥ", "ࢠ", "۹", "®", "©", "@", "=", "#", "▼"];
    const container = document.getElementById('symbol-container');

    setInterval(() => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);

        const symbolElem = document.createElement('span');
        symbolElem.classList.add('symbol');
        symbolElem.innerText = randomSymbol;
        symbolElem.style.left = randomX + 'px';
        symbolElem.style.top = randomY + 'px';

        container.appendChild(symbolElem);

        // Optionally remove the element after animation to avoid cluttering the DOM
        setTimeout(() => {
            symbolElem.remove();
        }, 1000);

    }, 1000);

});*/


// sound
/*let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = audioContext.createOscillator();

oscillator.type = 'sine'; // This is the default - also square, sawtooth, triangle
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Value in hertz
oscillator.connect(audioContext.destination);
oscillator.start();
oscillator.stop(audioContext.currentTime + 1); // Stop after one second
*/
/*
document.addEventListener("DOMContentLoaded", function () {
    /*let sound = document.getElementById("mySound");
    sound.play();

    const sound = document.getElementById("mySound");

    setInterval(() => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);

        const symbolElem = document.createElement('span');
        symbolElem.classList.add('symbol');
        symbolElem.innerText = randomSymbol;
        symbolElem.style.left = randomX + 'px';
        symbolElem.style.top = randomY + 'px';

        container.appendChild(symbolElem);
        sound.play(); // Play the sound

        // Remove the element after animation
        setTimeout(() => {
            symbolElem.remove();
        }, 1000);

    }, 1000);
});*/
document.addEventListener("DOMContentLoaded", function() {

    const symbols = ["●", "■", "▬", "♠", "♣", "♥", "♦", "♪", "‽", "ᴥ", "ࢠ", "۹", "®", "©", "@", "=", "#", "▼"];
    const container = document.getElementById('symbol-container');
    const sound = document.getElementById("mySound");
    const playSoundButton = document.getElementById('playSoundButton');

    let isPlaying = false; // flag to keep track of the sound's state

    playSoundButton.addEventListener('click', function() {
        if (isPlaying) {
            sound.pause();
        } else {
            sound.play();
        }
        isPlaying = !isPlaying; // toggle the state
    });

    setInterval(() => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);

        const symbolElem = document.createElement('span');
        symbolElem.classList.add('symbol');
        symbolElem.innerText = randomSymbol;
        symbolElem.style.left = randomX + 'px';
        symbolElem.style.top = randomY + 'px';

        container.appendChild(symbolElem);

        // Remove the element after animation
        setTimeout(() => {
            symbolElem.remove();
        }, 1000);

    }, 1000);
});
