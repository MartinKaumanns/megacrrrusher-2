class Player {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.x = 600,
        this.y = 300,
        this.radius = 7.5,
        this.vx = 0,
        this.vy = 0,
        this.speed = 2,
        this.friction = 0.98 
    }

    draw () {
        this.game.context.save();
        this.game.context.beginPath();
        this.game.context.arc(this.x, this.y, this.radius,  0 , Math.PI * 2 );
        this.game.context.fillStyle = 'white';
        this.game.context.fill();
        this.game.context.restore();
    }
}