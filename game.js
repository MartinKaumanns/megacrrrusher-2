class Game {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext('2d');
        this.player = new Player(this, 200, 300);
        this.enableControls();
        // this.crusher = new Crusher (this, 300, 300, 200, 2)
        // this.spikes = new Spikes (this, 1000, this.canvas.height);
        // this.rotators = new Rotators (this);
        // this.bricks = new Bricks (this);
        
        this.obstacles = [];
   
    }

     generateObstacle () {
        const createObstacle = new Crusher (this, 1200, 300, Math.random() * 200, Math.random()+ 0.5);
        this.obstacles.push(createObstacle);
    } 


    enableControls () {

        window.addEventListener('keydown', (event) => {
            const code = event.code;
            switch (code) { 
                case 'ArrowUp':
                    this.player.y -= this.player.run;
                    break;
    
                case 'ArrowDown':
                    this.player.y += this.player.run;
                    break; 
                    
                case 'ArrowLeft':
                    this.player.x -= this.player.run;
                    break; 
                    
                case 'ArrowRight':
                    this.player.x += this.player.run;
                    break;       
            }
            

            /* this.player.vy *= this.player.friction;
            this.player.y += this.player.vy;
            this.player.vx *= this.player.friction;
            this.player.x += this.player.vx; */
                
        }) 
    };

    loop() {
        window.requestAnimationFrame(() => { 
            this.runLogic();
            this.draw();
            this.loop();
        }); 
    }

    runLogic() {
         if(Math.random() < 0.002) {
            this.generateObstacle ();
        }
       
        // this.spikes.runLogic();
        // this.bricks.runLogic();
        for(const obstacle of this.obstacles) {
            obstacle.runLogic();
            
            
            const areIntersecting = obstacle.checkIntersection (this.player); 
            if (areIntersecting) {
                console.log('intersecting');
                
            }
            
        }
        
        // this.rotators.runLogic();
        // this.crusher.runLogic();
    };
    
    draw () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(const obstacle of this.obstacles) {
            obstacle.draw();
        }
        this.player.draw();


        // this.crusher.draw();
        // this.spikes.draw();
       // this.bricks.draw();
        // this.rotators.draw();
    }   
}
