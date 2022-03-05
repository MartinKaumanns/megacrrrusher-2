// randomize new Crusher

const startSound = new Audio('sounds/Projekt-Space-Crusher.mp3');
const EndScreenSound = new Audio('sounds/Projekt-Space-Crusher-End.mp3');
const obstacalappear = new Audio('sounds/crusher-appear01.mp3');
const youDead = new Audio('sounds/YouareDead-less.mp3');
const finalScoreDiv = document.querySelector('.finalScore');

class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.screens = screens;
    this.running = false;
    this.timer = 0;
    this.keysPressed = [];
    this.enableControls();
    this.currentSpeed = 0;
    this.arrayOfObstacles = [];
    this.arrayOfSecondObstacles = [];
  }

  // Obstacle: RANDOM GENERATION
  generateObstacle() {
    const height = this.canvas.height / 2;
    const width = 8 + Math.random() * 180;
    const x = Math.floor(Math.random() * (1400 - 1600 + 1) + 1400);
    const speed = 0.2 + Math.random() + 0.8;
    this.obstacles = [
      new Obstacle(this, x, 0, width, height, speed, -1),
      new Obstacle(this, x, height, width, height, speed, 1)
    ];
    this.arrayOfObstacles.push(this.obstacles);
    // console.log(this.arrayOfObstacles);

    // SecondObstacle: RANDOM GENERATION
  }
  generateSecondObstacle() {
    const height = this.canvas.height * 0.917;
    const width = 8 + Math.random() * 80;
    const x = this.canvas.width;
    const speed = 0.7;
    const secondObstacle = new SecObstacle(this, x, 0, width, height, speed);
    this.arrayOfSecondObstacles.push(secondObstacle);
  }

  start() {
    this.running = true;
    this.startTime = Date.now();
    this.player = new Player(this);
    // this.generateObstacle();
    this.displayScreen('playing');
    this.loop();
  }

  /// Switches the three Screens
  displayScreen(name) {
    for (let screenName in this.screens) {
      this.screens[screenName].style.display = 'none';
    }
    this.screens[name].style.display = '';
  }

  lose() {
    this.running = false;
    this.arrayOfObstacles = [];
    this.arrayOfSecondObstacles = [];
    this.displayScreen('end');
    finalScoreDiv.innerHTML = `SCORE ${this.timer}`;
    startSound.pause();

    youDead.play();
  }

  // NEW CONTROLS

  enableControls() {
    // Prevents scrolling sideways if screen is smaller than cnavas
    const keysToPreventDefaultAction = [
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft'
    ];
    window.addEventListener('keydown', (event) => {
      if (keysToPreventDefaultAction.includes(event.code)) {
        event.preventDefault();
      }
      this.keysPressed.push(event.code);
    });
    window.addEventListener('keyup', (event) => {
      this.keysPressed = this.keysPressed.filter((code) => code !== event.code);
    });
  }

  trackTime() {
    const milliseconds = Date.now() - this.startTime;
    this.timer = (milliseconds / 1000).toFixed(1);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      if (this.running) {
        this.loop();

        // MUSIC
        startSound.play();
      }
    });
  }

  runLogic() {
    this.player.runLogic();
    this.trackTime();

    for (const obstacle of this.arrayOfObstacles) {
      for (const innerObstacle of obstacle) {
        innerObstacle.runLogic();
      }

      /// CLEANING THE ARRAY OF OBSTACLES ///
      if (obstacle.x + obstacle.width < 0) {
        const indexOfObstacle = this.arrayOfObstacles.indexOf(obstacle);
        this.arrayOfObstacles.splice(indexOfObstacle, 3);
      }
    }
    if (this.arrayOfObstacles.length < this.timer / 8) {
      this.generateObstacle();
    }
    /* if (Math.random() < 0.002) {
      this.generateObstacle();
    } */

    // Second Obstacle: RUN LOGIC ////

    for (const elem of this.arrayOfSecondObstacles) {
      elem.runLogic();

      if (elem.x + elem.width < 0) {
        const indexOfElem = this.arrayOfSecondObstacles.indexOf(elem);
        this.arrayOfSecondObstacles.splice(indexOfElem, 1);
      }
    }
    if (this.timer > 29) {
      if (this.arrayOfSecondObstacles.length < this.timer / 20) {
        this.generateSecondObstacle();
      }
    }

         if (this.timer > 40 ) {
      if (Math.random() < 0.002) {
        this.generateSecondObstacle();
      }
    } 
  }

  drawTimer() {
    let seconds = this.timer;
    this.context.font = '36px sans-serif';
    this.context.fillText(seconds, 30, 60);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const obstacle of this.arrayOfObstacles) {
      for (const innerObstacle of obstacle) {
        innerObstacle.draw();
      }
    }
    this.player.draw();
    this.drawTimer();

    for (const elem of this.arrayOfSecondObstacles) {
      elem.draw();
    }
  }
}
