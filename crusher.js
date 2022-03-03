class Crusher {
    constructor (gameInstance, x, y, width, speed) {
        this.game = gameInstance;
        this.speed = speed;
        this.width = width;
        this.height = gameInstance.canvas.height / 2;
        this.x = x;  // 600
        this.y = y;  // 300
        
        // Crusher Top
        this.xT = this.x;
        this.yT = this.y - this.height;
        this.vxT = 0;
        this.vyT = 0.2;
       
        // Crusher Bottom
        this.xB = this.x;
        this.yB = this.yT + this.height;
        this.vxB = 0;
        this.vyB = 0.2;
       
    }


   checkIntersectionTop (player) {
       return (
           player.x + player.radius > this.xT && 
           player.x - player.radius < this.xT + this.width &&
           player.y + player.radius > this.yT && 
           player.y - player.radius < this.yT + this.height             
       );   
    }
    
    checkIntersectionBottom (player) {
        return (
            player.x + player.radius > this.xB && 
            player.x - player.radius < this.xB + this.width &&
            player.y + player.radius > this.yB && 
            player.y - player.radius < this.yB + this.height
        );   
    }

    
    crusherAnimation() {

        // this.yT = this.y + Math.cos(this.vyT) * 10;
        
        //bottom movement
         this.yT = this.yT -= this.vyT;

        // top movement
         this.yB += this.vyB; 
        
        // crusher top 
        if (this.yT - this.vyT < this.height - this.height - 30 || this.yT - this.vyT > this.height-this.height) {
            this.vyT *= -1;
        }  

        // crusher bottom
        if (this.yB + this.vyB > this.height + 30 || this.yB + this.vyB < this.height) {
            this.vyB *= -1;
        }
    }


    runLogic() {
        this.crusherAnimation();
        this.xT - this.speed;
        this.xB - this.speed;
            
    }
    
    draw() {

        // crusher top
        this.game.context.save();
        this.game.context.fillStyle = '#000000';
        this.game.context.fillRect(this.xT, this.yT, this.width, this.height);

        // crusher bottom
        this.game.context.fillStyle = '#000000';
        this.game.context.fillRect(this.xB, this.yB, this.width, this.height);
        this.game.context.restore();
    
    }
}


