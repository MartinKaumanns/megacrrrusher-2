class Player {
    constructor(gameInstance, x, y) {
        this.game = gameInstance;
        this.x = x,
        this.y = y,
        this.radius = 7.5,
        this.vx = 2.4,
        this.vy = 2.4,
        this.speed = 12,
        this.friction = 0.98 
        this.run = this.speed *= this.vy; 
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
}

