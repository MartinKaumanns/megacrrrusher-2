const canvasElement = document.querySelector('canvas');

const startScreenElement = document.getElementById('start-screen');
const playingScreenElement = document.getElementById('playing-screen');
const endScreenElement = document.getElementById('game-over-screen');

const startButton = startScreenElement.querySelector('button');
const tryAgainButton = endScreenElement.querySelector('button');

const screenElements = {
    start: startScreenElement,
    playing: playingScreenElement,
    end: endScreenElement
};

const game = new Game(canvasElement, screenElements);

startButton.addEventListener ('click',() => {
    game.start();
    
});

tryAgainButton.addEventListener ('click',() => {
    game.start();
    
});

