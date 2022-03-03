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
    }
    
    runLogic () {
      this.speedX += this.accelerationX;
      this.speedY += this.accelerationY;
      this.x += this.speedX;
      this.y += this.speedY;
    }


}