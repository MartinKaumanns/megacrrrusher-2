// randomize new Crusher

const startSound = new Audio('sounds/Projekt-Space-Crusher.mp3');
const EndScreenSound = new Audio('sounds/Projekt-Space-Crusher-End.mp3');
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
    this.arrObstacles = [];
  }

  // CRUSHER: RANDOM GENERATION
  generateObstacle() {
    const height = this.canvas.height / 2;
    const width = 200;
    const x = Math.floor(Math.random() * (1200 - 1400 + 1) + 1200);
    this.obstacles = [
      new Obstacle(this, x, 0, width, height, 1, -1),
      new Obstacle(this, x, height, width, height, 1, 1)
    ];
    
    /*
    const createObstacle = new Crusher(
      this,
      // Randomized X
      Math.floor(Math.random() * (1200 - 1400 + 1) + 1200),
      // 200,
      // Steady Y (always middle of canvas)
      300,
      // Randomized CRUSHER WIDTH
      8 + Math.random() * 180,
      // Randomized CRUSHER SPEED
      (this.currentSpeed = 0.2 + Math.random() + 0.8)
    );
    this.obstacles.push(createObstacle);
    console.log(this.obstacles.length);
    */
  }

  start() {
    this.running = true;
    this.startTime = Date.now();
    this.player = new Player(this);
    this.generateObstacle();
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
    this.displayScreen('end');
    finalScoreDiv.innerHTML = `SCORE ${this.timer}`;
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

    for (const obstacle of this.obstacles) {
      obstacle.runLogic();
      if (obstacle.x + obstacle.width < 0) {
        const indexOfObstacle = this.obstacles.indexOf(this.arrObstacles);
        this.arrObstacles.splice(indexOfObstacle, 2);
      }
    } 
    /* if (this.arrObstacles.length < this.timer / 2) {
      this.generateObstacle();
    }  */
     /* if (Math.random() < 0.002) {
      this.generateObstacle();
    }  */
  }




  drawTimer() {
    let seconds = this.timer;
    this.context.font = '36px sans-serif';
    this.context.fillText(seconds, 30, 60);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
    this.player.draw();
    this.drawTimer();
  }
}
