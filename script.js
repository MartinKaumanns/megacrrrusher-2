const canvasElement = document.querySelector('canvas');


//// still to do
const startScreenElement = document.querySelector('.start-screen')
const playingScreenElement = document.querySelector('.playing-screen')
const endScreenElement = document.querySelector('.game-over-screen')
////

const game = new Game(canvasElement);


game.loop();

