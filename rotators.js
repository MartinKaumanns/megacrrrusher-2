class Rotators {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.x = 1000;
        this.y = 0;
        this.width = 8;
        this.height = this.game.canvas.height;
        this.vx += this.x;
        this.rotateAngle = 0.005;

    }

    draw() {
        this.game.context.save();
        this.game.context.translate(1000, this.height * 0.6);
        this.game.context.rotate((Math.PI / 180) * 25);
        this.game.context.translate(-1000, -this.height * 0.6);
        this.game.context.fillStyle = '#5A6F75';
        this.game.context.fillRect(this.x, this.y, this.width, this.height * 0.3);
        this.game.context.rotate(2);
        this.game.context.restore();
    }
    
    runLogic() {
        
        setInterval(function() {
           this.draw();

    },3);
    }
}