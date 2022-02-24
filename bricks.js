class Bricks {
    constructor (gameInstance, x) {
        this.game = gameInstance;
        this.x = x;
        this.y = 1.2;
        this.height = 30;
        this.width = 80;
        this.vy = 0.005;
        this.vx = 0;
    }

    draw() {
        this.game.context.save();
        // this.game.context.translate(this.x /2, this.y/2);
        this.game.context.fillStyle = '#000000';
        for (let row = 0; row < 30; row++) {
            this.game.context.fillRect(this.x, row * this.y * 24, this.width, this.height);
        }
        this.game.context.restore();
    }
    
    bricksAnimation() {

        this.y += this.vy; 
        
        // Top Crusher
        if (this.y + this.vy < 1.2 || this.y + this.vy > 2.3) {
            this.vy *= -1
        } 

    }


    runLogic() {
        this.bricksAnimation();
        this.x -= 1;

    }

}