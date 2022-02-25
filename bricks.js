class Bricks {
    constructor (gameInstance, x, y) {
        this.game = gameInstance;
        this.x = x;
        this.y = 3;
        this.height = 40;
        this.width = 80;
        this.vy = 0.3;
        this.vx = 0;
        this.arr = [];
    }
    

    
    
    draw() {
        this.game.context.save();
        // this.game.context.translate(this.x, this.y/2);
         this.game.context.fillRect(this.x, this.y, this.width, this.height);
         this.game.context.restore();
        
       
       /* for (let row = 0; row < 16; row++) {
           this.game.context.fillRect(this.x,row * this.y * 15 , this.width, this.height);
           this.game.context.fillStyle = '#000000';

            
        } */
       
    }

    
    
    
    
    bricksAnimation() {
        
        this.height += this.vy; 
        
        if (this.height + this.vy <= 1 || this.height + this.vy > 40) {
            this.vy *= -1
        }    
    }
    
    bricksIntersection (player) {

        /* for(let brick of this.arr) {
            return (
                player.x + player.radius > this.brick.x && 
                player.x < brick.x + brick.width &&
                player.y + player.radius > brick.y && 
                player.y < brick.y + brick.height
                )};
        
                */
               return (
                   player.x + player.radius > this.x && 
                   player.x < this.x + this.width &&
                   player.y + player.radius > this.y && 
                   player.y < this.y + this.height
                   )};
                 
         
    
    runLogic() {
        this.bricksAnimation();
       /*  this.x -= 1;
        this.x1 -= 1; */
    }

}