// Escape and key interactables

export class KeyObject {
    constructor(game) {
        this.game = game;
        this.width = 10;
        this.height = 10;
        this.x = 0;
        this.y = 0;
    }
    update(player, color) {
        if (
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
        ) {
            this.x = player.x + 25;
            this.y = player.y - 5;
            if (!this.game.keysCollected.includes(color)) {
                this.game.keysCollected.push(color);
            }
        }
    }
    render(context, color) {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export class Door {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this. width = 60;
        this.x = 400;
        this.y = 400;
    }
    update() {

    }
    render(context) {
        context.fillStyle = 'purple';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}