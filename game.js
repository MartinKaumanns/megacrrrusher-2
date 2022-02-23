// to do:
// Show final score in endscreen - Done
// - Stop counter - Done
// – Display final score - Done
// Changing color background (transition) – Done
// Soundeffect collision, Start Screen, endscreen, playing Loop + some  hihats
// Smooth controls
// Startscreen animation (can I embed gifs?)
// clean array after Obstacles leaving the canvas
// Spikes ( center of spike as origin for movement maybe?)
// Bricks (increasing and decreasing by height ?)
// Rotators (possible)
// Obstaces:Crusher
// Crusher up and down(?)
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

    //NEW FOR BETTER CONTROLS
    // this.keysPressed = [];
    // this.enableControls();


    // HARD CODED OBSTACLES
    this.spikes = new Spikes(this, 400, 400);
    this.bricks = new Bricks(this, 400, 0);
  }

  start() {
    this.running = true;
    this.startTime = Date.now();
    this.player = new Player(this, 200, 300);
    this.obstacles = [];
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
    finalScoreDiv.innerHTML = `HGHSCR ${this.timer}`;
  }

  // NEW CONTROLS

  /* enableControls () {
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
  } */

  generateObstacle() {
    const createObstacle = new Crusher(
      this,
      1200,
      300,
      20 + Math.random() * 180,
      Math.random() + 0.5
    );
    this.obstacles.push(createObstacle);

    // ***** TO BE DONE!! ERASE ELEMENTS FROM OBSTACLE ARRAY **** 

    /* for(element of this.obstacles) {
        if (element.x + element.width <= 0){
            this.obstacles.splice(element);
        } */
  }

  trackTime() {
    const milliseconds = Date.now() - this.startTime;
    this.timer = (milliseconds / 1000).toFixed(1);
  }

  /* enableControls() {
    window.addEventListener('keydown', (event) => {
      if (this.running) {
        const code = event.code;
        switch (code) {
          case 'ArrowUp':
            this.player.y -= this.player.speed;
            if (this.player.y <= 0) {
              this.player.y = 7.5;
            }
            /* if (this.player.vy > -this.player.speed) {
              vy--;
            } 
            event.preventDefault();
            break;

          case 'ArrowDown':
            this.player.y += this.player.speed;
            if (this.player.y >= this.canvas.height) {
              this.player.y = this.canvas.height - 7.5;
            }
            /* if (this.player.vy < this.player.speed) {
              vy++;
            } 
            event.preventDefault();
            break;

          case 'ArrowLeft':
            this.player.x -= this.player.speed;
            if (this.player.x <= 0) {
              this.player.x = 0 + 7.5;
            }
            /* if (this.player.vx < -this.player.speed) {
              vx--;
            } 
            event.preventDefault();
            break;

          case 'ArrowRight':
            this.player.x += this.player.speed;
            if (this.player.x >= this.canvas.width) {
              this.player.x = this.canvas.width - 7.5;
            }
            /* if (this.player.vx > this.player.speed) {
              vx++;
            } 
            event.preventDefault();
            break;
          }
          
        this.player.vy *= this.player.friction;
        this.player.y += this.player.vy;
        this.player.vx *= this.player.friction;
        this.player.x += this.player.vx;
      }

    });

    window.addEventListener('keyup', function(e) {
      keys[e.keycode] = false;
    })
  } */

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      if (this.running) {
        this.loop();
        // startSound.play();
      }
    });
  }
  
  runLogic() {
    // this.player.runLogic();
    this.trackTime();
    if (this.obstacles.length < this.timer / 10) {
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
  
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }

    this.player.draw();
    this.drawTimer();

    // HARD CODED DRAW OBSTACLES
    // this.spikes.draw();
    // this.bricks.draw();
  }
}
