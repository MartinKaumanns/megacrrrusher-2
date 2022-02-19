class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.player = new Player(this, 200, 300);
    this.spikes = new Spikes(this, 400, 400);
    this.bricks = new Bricks(this, 400, 0);
    this.enableControls();
    this.obstacles = [];
    // this.startTime = 0;
    this.startTime = Date.now();
    this.timer = 0;
  }

  generateObstacle() {
    const createObstacle = new Crusher(
      this,
      1200,
      300,
      20 + Math.random() * 180,
      Math.random() + 0.5
    );
    this.obstacles.push(createObstacle);
    
     /* for(element of this.obstacles) {
        if (element.x + element.width <= 0){
            this.obstacles.splice(element);
        } */

  }

  trackTime() {
    const milliseconds = Date.now() - this.startTime;
    this.timer = (milliseconds / 1000).toFixed(1);
    // return milliseconds / 1000;
    /*
        let seconds = 0
        let interval = setInterval(function() {
            seconds += 1;

           console.log('Time', seconds)
        }, 1000); 
        */
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
          this.player.y -= this.player.run;
          if(this.player.y <= 0) {
            this.player.y = 7.5;
        }
          break;

        case 'ArrowDown':
          this.player.y += this.player.run;
          if(this.player.y >= this.canvas.height) {
            this.player.y = this.canvas.height - 7.5;
        }
          break;

        case 'ArrowLeft':
            this.player.x -= this.player.run;
            if(this.player.x <= 0) {
                this.player.x = 0 + 7.5;
            }
          break;

        case 'ArrowRight':
          this.player.x += this.player.run;
          if(this.player.x >= this.canvas.width) {
            this.player.x = this.canvas.width - 7.5;
        }
          break;
      }

      

      /* this.player.vy *= this.player.friction;
            this.player.y += this.player.vy;
            this.player.vx *= this.player.friction;
            this.player.x += this.player.vx; */
    });
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }

  runLogic() {
    this.trackTime();
    if (this.obstacles.length < this.timer / 10) {
      this.generateObstacle();
    }
    /*
    if (Math.random() < 0.002) {
    }
    */

    this.spikes.runLogic();
    this.bricks.runLogic();
    for (const obstacle of this.obstacles) {
      obstacle.runLogic();

      const areIntersecting = obstacle.checkIntersection(this.player);
      if (areIntersecting) {
        console.log('intersecting');
      }
    }
  }

  drawTimer() {
    let seconds = this.timer;
    this.context.font = '36px sans-serif';
    this.context.fillText(seconds, 30, 60);
    // console.log(this.interval)
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }

    this.player.draw();

    // this.crusher.draw();
    // this.spikes.draw();
    // this.bricks.draw();
    // this.rotators.draw();
    this.drawTimer();
    // this.spikes.draw()
    // this.bricks.draw();
  }
}

// cleanInterval(interval);
