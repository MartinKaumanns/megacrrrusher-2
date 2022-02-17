class Crusher {
    constructor (gameInstance) {
        this.game = gameInstance;
        this.x = 200;
        this.y = 310;
        this.width = 100;
        this.height = 310;
        this.vx = 0;
        this.vy = 0.1;

        // crusher from top
        this.yTop = -20;
        this.xTop = 310;
        this.vxTop = 0;
        this.vyTop = 0.1
    }
    
    runLogic() {
        
        this.y += this.vy; 
        this.yTop -=this.vyTop;
        
        // Top Crusher
        if (this.yTop - this.vyTop > -10 || this.yTop - this.vyTop < -30) {
            this.vyTop *= -1
        } 

        // Bottom Crusher
        if (this.y + this.vy > 320 || this.y + this.vy < 300) {
            this.vy *= -1;
        }
    }
    
    draw() {
        this.game.context.save();
        this.game.context.fillStyle = '#FFF1B9';
        this.game.context.fillRect(this.x, this.yTop, this.width, this.height);

        this.game.context.fillStyle = '#FFF1B9';
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
        this.game.context.restore();
    
    }
}


