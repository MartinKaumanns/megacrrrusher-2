class Crusher {
    constructor (gameInstance, x, y, width, speed) {
        this.game = gameInstance;
        this.speed = speed;
        this.width = width;
        this.height = 310;
        this.x = x;  // 600
        this.y = y;  // 300
        
        // Bottom Crusher
        this.vx = 0;
        this.vy = 0.2;

        // Top Crusher
        this.yTop = this.y - this.height;
        this.xTop = this.x;
        this.vxTop = 0;
        this.vyTop = 0.2;
    }

    /* checkIntersection (player) {
       return (
           player.x + player.radius*2 > this.x && 
           player.x < this.x + this.width &&
           player.y + player.radius*2 > this.x && 
           player.y < this.x + this.height    
       );
        
    } */


    
    crusherAnimation() {
        
        this.y += this.vy; 
        this.yTop -= this.vyTop;
        
        // Top Crusher
        if (this.yTop - this.vyTop < -30 || this.yTop - this.vyTop > -10) {
            this.vyTop *= -1;
        } 

        // Bottom Crusher
        if (this.y + this.vy > 320 || this.y + this.vy < 300) {
            this.vy *= -1;
        }
    }


    runLogic() {
        this.crusherAnimation();
        /* this.x -= this.speed;
        this.xTop -= this.speed; */

        
    }
    
    draw() {
        this.game.context.save();
        this.game.context.fillStyle = '#000000';
        this.game.context.fillRect(this.xTop, this.yTop, this.width, this.height);

        this.game.context.fillStyle = '#000000';
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
        this.game.context.restore();
    
    }
}


