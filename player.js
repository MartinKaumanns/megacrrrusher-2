const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

class Player extends GameElement {
  constructor(gameInstance) {
    super(gameInstance, 527, 295, 1200, 600);
    this.friction = 0.08;
    this.radius = 7.5;
    this.crushedToDeathTop = false;
    this.crushedToDeathBottom = false;
  }

  runLogic() {

    this.crushedToDeath();

    // Player movement Keys
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






   const obstaclesTop = this.game.newObs;
   const obstaclesBottom = this.game.newObsAnti;

   
    const { x, y, speedX, speedY, accelerationX, accelerationY, friction } =
      this;
    let newAccelerationY = accelerationY * (1 - friction);
    let newAccelerationX = accelerationX * (1 - friction);
    let newSpeedX = speedX * (1 - friction * 4) + newAccelerationX;
    let newSpeedY = speedY * (1 - friction * 4) + newAccelerationY;
    let newX = x + newSpeedX;
    let newY = y + newSpeedY;


    /// TOP OBSTACLE

    for (let obstacle of obstaclesTop) {

      const horizontalIntersectionTop = obstacle.checkIntersectionTop({
        ...this,
        x: newX
      });
      if (horizontalIntersectionTop) {
        newSpeedX === 0;
        newX = this.x; 
      }
      
      const horizontalIntersectionBottom = obstacle.checkIntersectionBottom({
        ...this,
        x: newX
      });
      if (horizontalIntersectionBottom) {
        newSpeedX === 0;
        newX = this.x - 1; 
      }
      
       const verticalIntersectionTop = obstacle.checkIntersectionTop({
        ...this,
        y: newY
      });
      // console.log(verticalIntersectionTop)
      if (verticalIntersectionTop) {
        newSpeedY = 0;
        newY = this.y;
      } 
      
       const verticalIntersectionBottom = obstacle.checkIntersectionBottom({
        ...this,
        y: newY
      });
      
      if (verticalIntersectionBottom) {
        newSpeedY = 0;
        newY = this.y;
      }  

      //// BOTTOM OBSTACLE

      for (let obstacle of obstaclesBottom) {

        const horizontalIntersectionTop = obstacle.checkIntersectionTop({
          ...this,
          x: newX
        });
        if (horizontalIntersectionTop) {
          newSpeedX === 0;
          newX = this.x - 1; 
        }
        
        const horizontalIntersectionBottom = obstacle.checkIntersectionBottom({
          ...this,
          x: newX
        });
        if (horizontalIntersectionBottom) {
          newSpeedX === 0;
          newX = this.x; 
        }
        
         const verticalIntersectionTop = obstacle.checkIntersectionTop({
          ...this,
          y: newY
        });
        console.log(verticalIntersectionTop)
        if (verticalIntersectionTop) {
          newSpeedY = 0;
          newY = this.y;
        }
        
        const verticalIntersectionBottom = obstacle.checkIntersectionBottom({
          ...this,
          y: newY
        });
        
        if (verticalIntersectionBottom) {
          newSpeedY = 0;
          newY = this.y;
        }  
      }
       
      
      // INTERSECTIONS TO LOSE THE GAME
      
      //if (verticalIntersectionTop && verticalIntersectionBottom) {
        // game.lose();
      //}
      
      /* if (horizontalIntersectionTop && horizontalIntersectionBottom) {
        game.lose();
      }  */
      // collision with new obj
    }
   

    Object.assign(this, {
      x: newX,
      y: newY,
      speedX: newSpeedX,
      speedY: newSpeedY,
      accelerationX: newAccelerationX,
      accelerationY: newAccelerationY
    });

    this.y = clamp(this.y, this.radius, this.game.canvas.height - this.radius);
    this.x = clamp(this.x, this.radius, this.game.canvas.width - this.radius);
  }

  crushedToDeath() {
    
    /// Top Obstacle
    for (let i = 0; i < this.game.newObs.length; i++) {
  
      let obstacle = this.game.newObs[i];
      // console.log(obstacle.length)
  
      if (this.x > obstacle.x && this.x < obstacle.x + obstacle.width) {
        if (this.y < obstacle.y + obstacle.height) {
          this.y = obstacle.y + obstacle.height + this.radius;
          this.crushedToDeathTop = true;
          console.log('intersectup');
        }
      }  
    } 
  
    /// Bottom Obstacle
    for (let i = 0; i < this.game.newObsAnti.length; i++) {
  
      let obstacle = this.game.newObsAnti[i];
      // console.log(obstacle.length)
  
      if (this.x > obstacle.x && this.x < obstacle.x + obstacle.width) {
  
        if (this.y > obstacle.y) {
          this.y = obstacle.y - this.radius;
          this.crushedToDeathBottom = true;
          console.log('intersectdown');
        }
      } 
    }
    if (this.crushedToDeathTop && this.crushedToDeathBottom) {
      game.lose();
    } 
  }

  drawScore() {
    this.context.fillText(this.score);
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = '#fff';
    this.game.context.beginPath();
    this.game.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.game.context.fill();
    this.game.context.restore();
  }
}
