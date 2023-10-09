// Interactables and obstacles

export class KeyObject {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.treeTopOffset = this.game.player.treeTopOffset;
        this.treeBottomOffset = this.game.player.treeBottomOffset;
        this.treeRightOffset = this.game.player.treeRightOffset;
        this.treeLeftOffset = this.game.player.treeLeftOffset;
        this.x = 50 + Math.random() * 800;
        this.y = 50 + Math.random() * 800;
    }
    update(player, color, trees) {
        // respawn in accessible area
        trees.forEach((tree) => {
            if (
                this.x < tree.x + this.treeLeftOffset + tree.width && // left collision
                this.x + this.width > tree.x + this.treeRightOffset && // right collision
                this.y < tree.y + this.treeTopOffset + tree.height && // top collision
                this.y + this.height > tree.y + this.treeBottomOffset // bottom collision
                ) {
                    this.x = 50 + Math.random() * 800;
                    this.y = 50 + Math.random() * 800;
                }
        })
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
        this.width = 60;
        this.height = 60;
        this.randomSeed = Math.random() * 2;
        if (this.randomSeed < 1) {
            this.x = Math.random() * 20;
            this.y = Math.random() * 950;
        } else {
            this.x = 920 + Math.random() * 20;
            this.y = Math.random() * 950;
        }
        this.door = new Image();
        this.door.src = '../images/door.png';
    }
    update(player) {
        if (
            this.game.keysCollected.length === 1 && 
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
            ) {
            this.game.win = true;
        }
    }
    render(context) {
        context.drawImage(this.door, this.x, this.y, this.width, this.height);
        // context.fillStyle = 'purple';
        // context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export class Obstacle {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = 50 + Math.random() * 900;
        this.y = 50 + Math.random() * 800;
        this.trees = new Image();
        this.trees.src = '../images/tree.png';
    }
    update () {

    }
    render(context) {
        context.drawImage(this.trees, this.x, this.y, this.width + 100, this.height + 160);
    }
}