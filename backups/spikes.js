class Spikes {
    constructor(gameInstance){
        this.game = gameInstance;
        this.x = 1000; //1000
        this.y = 600;

        this.xBottom = this.x;
        this.yBottom = 600;
        this.vx = 0.8;
        this.vyBottom = 1.2;
        this.speed = this.yBottom * this.vyBottom;
    }


    /* checkIntersection (player) {
        return (
            player.x + player.radius > this.xTop && 
            player.x < this.xTop + this.width &&
            player.y + player.radius > this.yTop && 
            player.y < this.yTop + this.height  
            ||
            player.x + player.radius > this.xBottom && 
            player.x < this.xBottom + this.width &&
            player.y + player.radius > this.yBottom && 
            player.y < this.yBottom + this.height
        );
         
     } */





    spikesAnimation() {
             

             // top movement
             this.yBottom -= this.vyBottom;
             
            
         /*     // crusher bottom
             if (this.yBottom + this.vyBottom > this.height - 400 || this.yBottom + this.vyBottom < this.height) {
                 this.vyBottom *= -1;
             } */  
    }

    runLogic() {
     this.spikesAnimation();
         
       
    }


    draw() {
        // bottom Triangle
        this.game.context.save();
        this.game.context.beginPath();
        this.game.context.lineTo(this.x, 600);
        this.game.context.lineTo(this.x + 200, 0);
        this.game.context.lineTo(this.x + 400, 600);
        this.game.context.closePath();

        this.game.context.fillStyle = '#000';
        this.game.context.fill();
       
       /*  // top Triange
        this.game.context.beginPath();
        this.game.context.lineTo(this.xTop, 0);
        this.game.context.lineTo(this.xTop + 50, this.yTop);
        this.game.context.lineTo(this.xTop + 100, 0);
        this.game.context.closePath();

        this.game.context.fillStyle = '#000';
        this.game.context.fill();
        this.game.context.restore(); */
    }


}