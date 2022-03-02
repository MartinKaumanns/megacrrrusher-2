class GameElement {
    constructor (gameInstance, x, y, behavior, width, height, speedX, speedY, accelerationX, accelerationY) {
      this.game = gameInstance;
      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 0;
      this.height = height || 0;
      this.speedX = speedX || 0;
      this.speedY = speedY || 0;
      this.accelerationX = accelerationX || 0;
      this.accelerationY = accelerationY || 0;

      //

      this.behavior = behavior;
      this.ox = this.x = x; // old position x
      this.oy = this.y = y; // old position y
      this.vx = this.vy = 0;

    }
  
    checkIntersection (element) {
      return (
        element.x + element.width > this.x &&
        element.x < this.x + this.width &&
        element.y + element.height > this.y &&
        element.y < this.y + this.height
      );
    }
  
    runLogic () {
      this.speedX += this.accelerationX;
      this.speedY += this.accelerationY;
      this.x += this.speedX;
      this.y += this.speedY;
    }


}