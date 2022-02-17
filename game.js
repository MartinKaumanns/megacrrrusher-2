class Game {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext('2d');
        this.player = new Player(this);
        this.enableControls();
        this.crusher = new Crusher (this);
        this.spikes = new Spikes (this);
        this.bricks = new Bricks (this);
        this.rotators = new Rotators (this);
    }

    enableControls () {
        window.addEventListener('keydown', (event) => {
            const code = event.code;
            switch (code) {    
                case 'ArrowUp':
                    if (this.player.vy > - this.player.speed) {
                        this.player.y--;
                    }
                    break; 
                    
                case 'ArrowDown':
                    if (this.player.vy < this.player.speed) {
                        this.player.y++;
                    }
                    break; 
                    
                case 'ArrowLeft':
                    if (this.player.vx > - this.player.speed) {
                        this.player.x--;
                    }
                    break; 
                    
                case 'ArrowRight':
                    if (this.player.vy < this.player.speed) {
                        this.player.y++;
                    }
                    break; 
                    
            }

            this.player.vy *= this.player.friction;
            this.player.y += this.player.vy;
            this.player.vx *= this.player.friction;
            this.player.x += this.player.vx;
        
            
        })
    }

    loop() {
        window.requestAnimationFrame(() => { 
            this.runLogic();
            this.draw();
            this.loop();
        }); 
    }

    runLogic() {
        this.crusher.runLogic();
        this.spikes.runLogic();
        this.bricks.runLogic();
        // this.rotators.runLogic();
    };
    
    draw () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw();
        this.crusher.draw();
        this.spikes.draw();
        this.bricks.draw();
        // this.rotators.draw();
    }   
}