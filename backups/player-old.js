class Player {
    constructor(gameInstance, x, y) {
        this.game = gameInstance;
        this.x = x,
        this.y = y,
        this.radius = 7.5,
        this.vx = 0,
        this.vy = 0,
        this.speed = 12,
        this.friction = 0.98
        this.enableControls(); 
        //this.run = this.speed *= this.vy; 
    }

    drawScore () {
        this.context.fillText(this.score)
    }
    
    draw () {
        this.game.context.save();
        this.game.context.beginPath();
        this.game.context.arc(this.x, this.y, this.radius,  0 , Math.PI * 2 );
        this.game.context.fillStyle = '#000';
        this.game.context.fill();
        this.game.context.restore();
    }

    enableControls() {
        window.addEventListener('keydown', (event) => {
          if (this.game.running) {
            const code = event.code;
            switch (code) {
              case 'ArrowUp':
                this.y -= this.speed;
                if (this.y <= 0) {
                  this.y = 7.5;
                }
                /* if (this.vy > -this.speed) {
                  vy--;
                } */
                event.preventDefault();
                break;
    
              case 'ArrowDown':
                this.y += this.speed;
                if (this.y >= this.game.canvas.height) {
                  this.y = this.game.canvas.height - 7.5;
                }
                /* if (this.vy < this.speed) {
                  vy++;
                } */
                event.preventDefault();
                break;
    
              case 'ArrowLeft':
                this.x -= this.speed;
                if (this.x <= 0) {
                  this.x = 0 + 7.5;
                }
                /* if (this.vx < -this.speed) {
                  vx--;
                } */
                event.preventDefault();
                break;
    
              case 'ArrowRight':
                this.x += this.speed;
                if (this.x >= this.game.canvas.width) {
                  this.x = this.game.canvas.width - 7.5;
                }
                /* if (this.vx > this.speed) {
                  vx++;
                } */
                event.preventDefault();
                break;
              }
              
            this.vy *= this.friction;
            this.y += this.vy;
            this.vx *= this.friction;
            this.x += this.vx;
          }
    
        });
    
        /* window.addEventListener('keyup', function(e) {
          keys[e.keycode] = false;
        }) */
      }


}

