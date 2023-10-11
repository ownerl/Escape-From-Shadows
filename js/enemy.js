// Enemy object

export class Demon {
    constructor(game) {
        this.game = game;
        this.width = 2;
        this.height = 3;
        this.x = Math.random() * 100; // redo
        this.y = Math.random() * 100; // redo
        this.speedEnemy = (Math.random() * 0.3) + 0.5
        this.eyes = new Image();
        this.eyes.src = './images/red.png'
        // Scale to percentages of canvas size instead of pixels
        this.width = (this.width / 100) * this.game.width;
        this.height = (this.height / 100) * this.game.height;
        this.x = (this.x / 100) * this.game.width;
        this.y = (this.y / 100) * this.game.height;
        
    }
    update(player, input) {
        if (this.game.input.keyToggle === true) {
            if (player.x+5 > this.x) {
                this.x += this.speedEnemy;
            }
            if (player.y+10 > this.y) {
                this.y += this.speedEnemy;
            }
            if (player.x+5 < this.x) {
                this.x -= this.speedEnemy;
            }
            if (player.y+10 < this.y) {
                this.y -= this.speedEnemy;
            }
        }
        if (this.game.input.keyToggle === false && input.playerPosition) {
            if (input.playerPosition[0]+5 > this.x) {
                this.x += this.speedEnemy;
            }
            if (input.playerPosition[1]+10 > this.y) {
                this.y += this.speedEnemy;
            }
            if (input.playerPosition[0]+5 < this.x) {
                this.x -= this.speedEnemy;
            }
            if (input.playerPosition[1]+10 < this.y) {
                this.y -= this.speedEnemy;
            }
        }
    }
    render(context, context3) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        let eyes = [(3 / 100) * this.game.width, (4 / 100) * this.game.height];
        context3.drawImage(this.eyes, this.x + ((this.width / 2) - (eyes[0] / 2)), this.y, eyes[0], eyes[1]);
    }
}

