class Player extends GameElement {
    constructor (gameInstance) {
        super(gameInstance, 0, 0, 50, 50);
        this.friction = 0.1;
    }

    runLogic() {
        const keys = this.game.keysPressed;
        for (const key of keys) {
          switch (key) {
            case 'ArrowUp':
              this.accelerationY = -1.5;
              break;
            case 'ArrowDown':
              this.accelerationY = +1.5;
              break;
            case 'ArrowRight':
              this.accelerationX = +1.5;
              break;
            case 'ArrowLeft':
              this.accelerationX = -1.5;
              break;
          }
        }
         const {
          x,
          y,
          speedX,
          speedY,
          accelerationX,
          accelerationY,
          friction
        } = this; 
        let newAccelerationY = accelerationY * (1 - friction);
        let newAccelerationX = accelerationX * (1 - friction);
        let newSpeedX = speedX * (1 - friction * 3) + newAccelerationX;
        let newSpeedY = speedY * (1 - friction * 3) + newAccelerationY;
        let newX = x + newSpeedX;
        let newY = y + newSpeedY;
       /*  for (let obstacle of obstacles) {
          const horizontalIntersection = obstacle.checkIntersection({
            ...this,
            x: newX
          });
          const verticalIntersection = obstacle.checkIntersection({
            ...this,
            y: newY
          });
          if (verticalIntersection) {
            newSpeedY = 0;
            newY = y;
          }
          if (horizontalIntersection) {
            newSpeedX = 0;
            newX = x;
          }
        } */
        /* Object.assign(this, {
          x: newX,
          y: newY,
          speedX: newSpeedX,
          speedY: newSpeedY,
          accelerationX: newAccelerationX,
          accelerationY: newAccelerationY
        });   */
    }

    drawScore () {
        this.context.fillText(this.score)
    }
    
    draw () {
        this.game.context.save();
        this.game.context.fillStyle = '#000';
        this.game.context.beginPath();
        this.game.context.arc(100, 100, 7.5,  0 , Math.PI * 2 );
        this.game.context.fill();
        this.game.context.restore();
    }
}