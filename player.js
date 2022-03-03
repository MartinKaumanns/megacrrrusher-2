const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

class Player extends GameElement {
  constructor(gameInstance) {
    super(gameInstance, 527, 295, 1200, 600);
    this.friction = 0.08;
    this.radius = 7.5;
  }

  runLogic() {
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

    const { x, y, speedX, speedY, accelerationX, accelerationY, friction } =
      this;
    let newAccelerationY = accelerationY * (1 - friction);
    let newAccelerationX = accelerationX * (1 - friction);
    let newSpeedX = speedX * (1 - friction * 4) + newAccelerationX;
    let newSpeedY = speedY * (1 - friction * 4) + newAccelerationY;
    let newX = x + newSpeedX;
    let newY = y + newSpeedY;

    const obstacles = this.game.obstacles;

    let crushedToDeathTop = false;
    let crushedToDeathBottom = false;

    for (let obstacle of obstacles) {
      const horizontalIntersection = obstacle.checkIntersection({
        ...this,
        x: newX
      });
      if (horizontalIntersection) {
        newSpeedX = 0;
        newX = this.x - 1;
      }
      const verticalIntersection = obstacle.checkIntersection({
        ...this,
        x: newX,
        y: newY
      });
      if (verticalIntersection) {
        newSpeedY = 0;
        if (obstacle.behavior === -1) {
          newY = obstacle.y + obstacle.height + this.radius;
          crushedToDeathTop = true;
        } else if (obstacle.behavior === 1) {
          newY = obstacle.y - this.radius;
          crushedToDeathBottom = true;
        }
      }
    }

    if (crushedToDeathTop && crushedToDeathBottom) {
      game.lose();
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

  drawScore() {
    this.context.fillText(this.score);
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = '#000';
    this.game.context.beginPath();
    this.game.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.game.context.fill();
    this.game.context.restore();
  }
}
