class Spikes {
    constructor(gameInstance, x, y, start){
        this.game = gameInstance;
        this.x = x; //1000
        this.y = this.game.canvas.height;

        this.xBottom = this.x;
        this.vx = 0.8;
        this.start = this.Bottom;
        this.end = this.start - 100;
        
        //top Triangle
        this.xTop = this.x - 100;
        this.yTop = this.y * 0.5;
        this.vxTop = 0.8;
        this.endTop = this.x;
        this.startTop = this.endTop - 100;
    }


    checkIntersection (player) {
        return (
            player.x + player.radius > this.xTop && 
            player.x < this.xTop + this.width &&
            player.y + player.radius > this.yTop && 
            player.y < this.yTop + this.height  
            ||
            player.x + player.radius > this.xBottom && 
            player.x < this.xBottom + this.width &&
            player.y + player.radius  > this.yBottom && 
            player.y < this.yBottom + this.height
        );
         
     }





    spikesAnimation() {
        this.x += this.vx; 
        this.xTop -= this.vxTop;
        
        // bottom Spike
        if (this.x + this.vx > this.start || this.x + this.vx < this.end) {
            this.vx *= -1;
        }
        
        // top Spike
        if (this.xTop - this.vxTop < this.startTop || this.xTop - this.vxTop > this.endTop) {
            this.vxTop *= -1;
        }   
    }

    runLogic() {
     this.spikesAnimation() 
         
       
    }


    draw() {
        // bottom Triangle
        this.game.context.save();
        this.game.context.beginPath();
        this.game.context.lineTo(this.x, this.y);
        this.game.context.lineTo(this.x + 50, this.y * 0.5);
        this.game.context.lineTo(this.x + 100, this.y);
        this.game.context.closePath();

        this.game.context.fillStyle = '#000';
        this.game.context.fill();
       
        // top Triange
        this.game.context.beginPath();
        this.game.context.lineTo(this.xTop, 0);
        this.game.context.lineTo(this.xTop + 50, this.yTop);
        this.game.context.lineTo(this.xTop + 100, 0);
        this.game.context.closePath();

        this.game.context.fillStyle = '#000';
        this.game.context.fill();
        this.game.context.restore();
    }


}