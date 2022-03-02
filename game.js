// to do:
// Soundeffect collision, Start Screen, endscreen, playing Loop + some  hihats
// Startscreen animation (can I embed gifs?)
// clean array after Obstacles leaving the canvas

// Obstaces:Crusher
// Left and right wall collision only while beeing crushed

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
    this.obst = new Obst(this);
    this.newObs = [new Obst(this, 600, -200, 200, 400, 1, this.obst.obstBehaviorXU)];
    this.newObsAnti = [new Obst(this, 600, 400, 200, 400, 1, this.obst.obstBehaviorXD)];

    // HARD CODED OBSTACLES
   // this.spikes = new Spikes(this, 800, 400, 800);
    // this.bricks = new Bricks(this, 500, 0);
  }

  generateObstacle() {
    const createObstacle = new Crusher(
      this,
      // Randomized X
      Math.floor(Math.random()* (1200 - 1400 +1)+ 1200),
      // 200,
      // Steady Y (always middle of canvas)
      300,
      // Randomized CRUSHER WIDTH
      8 + Math.random() * 180,
      // Randomized CRUSHER SPEED
      this.currentSpeed = 0.2 + Math.random() + 0.8
    );
    this.obstacles.push(createObstacle);
    console.log(this.obstacles.length)

    }
   
//// Randomize Obstacles ///////
    generateNewObtacle () {
      const createNewObstacle = new Obs(
        this,
        // Randomized X
        Math.floor(Math.random()* (1200 - 1400 +1)+ 1200),
        // 200,
        // Steady Y (always middle of canvas)
        300,
        // Randomized CRUSHER WIDTH
        8 + Math.random() * 180,
        // Randomized CRUSHER SPEED
        this.currentSpeed = 0.2 + Math.random() + 0.8
      );
      this.obstacles.push(createObstacle);
      console.log(this.obstacles.length)
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
    this.obst.runLogic();
    this.player.runLogic();
    this.trackTime();

    for (const obstacle of this.newObs) {
      obstacle.obstBehaviorXD();
    }
    
    for (const obstacle of this.newObsAnti) {
      obstacle.obstBehaviorXU();
    }
    
    // HOW MANY OBSTACLES WILL BE GENERATED
    
   /*  if (this.obstacles.length < this.timer / 8) {
      this.generateObstacle();
    } */
    /*
    if (Math.random() < 0.002) {
    }
    */
   for (const obstacle of this.obstacles) {
    obstacle.runLogic();
    // console.log(this.y)

     
     /* const areIntersectingTop = obstacle.checkIntersectionTop(this.player);
     if (areIntersectingTop) {
      console.log('intersecting');
       // this.lose();
       // collisionSound.play();
       this.player.y + this.player.width === this.obstacles.y;
      }

      const areIntersectingBottom = obstacle.checkIntersectionBottom(this.player);
     if (areIntersectingBottom) {
       
       console.log('intersecting');
       // this.lose();
       // collisionSound.play();
      }

      // INTERSECTIONS TO LOSE THE GAME
      
      if (areIntersectingTop && areIntersectingBottom) {
        game.lose();
      }
      if (areIntersectingTop && areIntersectingBottom) {
        game.lose();
      } */

    }
    // this.spikes.runLogic();
    // this.bricks.runLogic();
  }

  drawTimer() {
    let seconds = this.timer;
    this.context.font = '36px sans-serif';
    this.context.fillText(seconds, 30, 60);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    /* for (const obstacle of this.obstacles) {
      obstacle.draw();
    } */

    this.player.draw();
    
    for (const obstacle of this.newObs) {
      obstacle.draw();
    }

    for (const obstacle of this.newObsAnti) {
      obstacle.draw();
    }



    this.drawTimer();

    // HARD CODED DRAW OBSTACLES
    // this.spikes.draw();
    // this.bricks.draw();
  }
}
