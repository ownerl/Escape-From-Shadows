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
        this.x = 10;
        this.y = 10;
        this.speedEnemy = 0.5;
        
    }
    update(player) {
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
    }
    render(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}