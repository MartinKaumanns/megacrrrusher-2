class Obst {
    constructor (gameInstance, x, y, width, height, speed, behavior) {
        this.game = gameInstance;
        this.x = x;
        this.y = y;
        this.d = 0;
        this.width = width;
        this.height = height;
        this.oy = 0;
        this.speed = speed;
        this.nx = x+1;


             
    }

    obstBehaviorXD() {

        this.d += 0.06;
        this.oy = this.y; // keep track of the old x value
        this.y = this.y + Math.sin(this.d) * 3;
        // console.log(this.y);
        this.x -= this.speed;
    } 

    obstBehaviorXU() {

        this.d += 0.06;
        this.oy = this.y; // keep track of the old x value
        this.y = this.y + Math.sin(this.d) * -3;
        // console.log(this.y);
        this.x -= this.speed;
    } 

    runLogic() {
        this.obstBehaviorXD();
        this.obstBehaviorXU();        
    }

    checkIntersectionTop (player) {
        return (
            player.x + player.radius > this.x && 
            player.x - player.radius < this.x + this.width &&
            player.y + player.radius > this.y && 
            player.y - player.radius < this.y + this.height             
        );   
     }
     
     checkIntersectionBottom (player) {
         return (
             player.x + player.radius > this.x && 
             player.x - player.radius < this.x + this.width &&
             player.y + player.radius > this.y && 
             player.y - player.radius < this.y + this.height
         );   
     }



    draw() {

        // obj
        this.game.context.save();
        this.game.context.fillStyle = '#ffffff';
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }


}
