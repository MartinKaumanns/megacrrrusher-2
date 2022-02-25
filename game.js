// to do:
// Soundeffect collision, Start Screen, endscreen, playing Loop + some  hihats
// Startscreen animation (can I embed gifs?)
// clean array after Obstacles leaving the canvas
// Spikes (center of spike as origin for movement maybe?)
// Bricks (increasing and decreasing by height ?)
// Rotators (possible)
// Obstaces:Crusher
// Left and right wall collision only while beeing crushed
// collision by color (if pixel-player black in same position as black of obsacle {collision}?)

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



    // HARD CODED OBSTACLES
    this.spikes = new Spikes(this, 800, 400, 800);
    this.bricks = new Bricks(this, 500, 0);
  }

  generateObstacle() {
    const createObstacle = new Crusher(
      this,
      Math.floor(Math.random()* (1400 - 1600 +1)+ 1400),
      300,
      // CRUSHER SCALE
      8 + Math.random() * 180,
      // CRUSHER SPEED
      0.2 + Math.random() + 0.8
    );
    this.obstacles.push(createObstacle);
    console.log(this.obstacles.length)

    }


    // GENERATE BRICKS, after mkin the collisions work..
    generatebricks() {
      const createBricks = new Bricks(
        this,
        Math.floor(Math.random()* (1400 - 1600 +1)+ 1400),
        300,
        // CRUSHER SCALE
        80,
        // CRUSHER SPEED
        0.2 + Math.random() + 0.8
      );
      this.genBricks.push(createBricks);
      console.log(this.genBricks.length)
      }



    // ***** TO BE DONE!! ERASE ELEMENTS FROM OBSTACLE ARRAY **** 
    /* for(obst of this.obstacles) {
        if (obst.x + obst.width <= 0){
            this.obstacles.splice(element);
        } 
    } */   
  


  start() {
    this.running = true;
    this.startTime = Date.now();
    this.player = new Player(this);
    this.obstacles = [];
    this.genBricks = []
    this.displayScreen('playing');
    this.loop();
  }

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

  enableControls () {
    // Prevents scrolling sideways if screen is smaller than cnavas
    const keysToPreventDefaultAction = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
    window.addEventListener('keydown', (event) => {
      if (keysToPreventDefaultAction.includes(event.code)) {
        event.preventDefault();
      }
      this.keysPressed.push(event.code);
    });
    window.addEventListener('keyup', (event) => {
      this.keysPressed = this.keysPressed.filter(code => code !== event.code);
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
        // startSound.play();
      }
    });
  }
  
  runLogic() {
    this.player.runLogic();
    this.trackTime();
    
    // HOW MANY OBSTACLES WILL BE GENERATED
    if (this.obstacles.length < this.timer / 4) {
      this.generateObstacle();
    }
    /*
    if (Math.random() < 0.002) {
    }
    */
   for (const obstacle of this.obstacles) {
     obstacle.runLogic();
     
     const areIntersecting = obstacle.checkIntersection(this.player);
     if (areIntersecting) {
       console.log('intersecting');
       this.lose();
       // collisionSound.play();
      }


      const bricksIntersection = this.bricks.bricksIntersection(this.player);
      if (bricksIntersection) {
        console.log('inter')
      }

    }
    this.spikes.runLogic();
    this.bricks.runLogic();
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

    // HARD CODED DRAW OBSTACLES
    // this.spikes.draw();
    this.bricks.draw();
  }
}
