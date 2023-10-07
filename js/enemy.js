// Enemy object

export class Enemy {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }
    update() {
        
    }
    render(context) {
    }
}

export class Demon extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 20;
        this.height = 30;
        this.x = Math.random() * 500;
        this.y = Math.random() * 500;
        this.speedEnemy = (Math.random() * 0.3) + 0.5;
        
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
    render(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}