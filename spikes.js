class Spikes {
    constructor(gameInstance){
        this.game = gameInstance;
        this.x = 600;
        this.y = this.game.canvas.height;
        this.vx = 0.8;
        this.vxTop = 0.8;

        //top Triangle
        this.xTop = 500;
        this.yTop = this.y * 0.6;
    }

    runLogic() {
        
        this.x += this.vx; 
        this.xTop -= this.vxTop;
        
        // bottom Spike
        if (this.x + this.vx > 600 || this.x + this.vx < 500) {
            this.vx *= -1;
        }
        
        // top Spike
        if (this.xTop - this.vxTop < 500 || this.xTop - this.vxTop > 600) {
            this.vxTop *= -1;
        }   
    }



    draw() {
        // bottom Triangle
        this.game.context.save();
        this.game.context.beginPath();
        this.game.context.lineTo(this.x, this.y);
        this.game.context.lineTo(this.x + 50, this.y * 0.4);
        this.game.context.lineTo(this.x + 100, this.y);
        this.game.context.closePath();

        this.game.context.fillStyle = '#0064AA';
        this.game.context.fill();
       
        // top Triange
        this.game.context.beginPath();
        this.game.context.lineTo(this.xTop, 0);
        this.game.context.lineTo(this.xTop + 50, this.yTop);
        this.game.context.lineTo(this.xTop + 100, 0);
        this.game.context.closePath();

        this.game.context.fillStyle = '#0064AA';
        this.game.context.fill();
        this.game.context.restore();
    }


}