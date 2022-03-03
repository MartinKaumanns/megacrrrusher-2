class Obstacle {
  constructor(gameInstance, x, y, width, height, speed, behavior) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.behavior = behavior;
    this.d = 0;
  }

  runLogic() {
    this.d += 0.06;
    this.y = this.y + Math.sin(this.d) * 3 * this.behavior;
    this.x -= this.speed;
  }

  checkIntersection(player) {
    return (
      player.x + player.radius > this.x &&
      player.x - player.radius < this.x + this.width &&
      player.y + player.radius > this.y &&
      player.y - player.radius < this.y + this.height
    );
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = '#000';
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}
