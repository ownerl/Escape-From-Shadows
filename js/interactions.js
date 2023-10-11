// Interactables and obstacles

export class KeyObject {
    constructor(game) {
        this.game = game;
        this.width = 3;
        this.height = 1.7;
        this.treeTopOffset = this.game.player.treeTopOffset;
        this.treeBottomOffset = this.game.player.treeBottomOffset;
        this.treeRightOffset = this.game.player.treeRightOffset;
        this.treeLeftOffset = this.game.player.treeLeftOffset;
        this.x = 5 + Math.random() * 80;
        this.y = 5 + Math.random() * 80;
        this.key = new Image();
        this.key.src = './images/key.png';
        this.width = (this.width / 100) * this.game.width;
        this.height = (this.height / 100) * this.game.height;
        this.x = (this.x / 100) * this.game.width;
        this.y = (this.y / 100) * this.game.height;
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
        context.drawImage(this.key, this.x, this.y, this.width, this.height);
        // context.fillStyle = color;
        // context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export class Door {
    constructor(game) {
        this.game = game;
        this.width = 6;
        this.height = 6;
        this.randomSeed = Math.random() * 2;
        if (this.randomSeed < 1) {
            this.x = Math.random() * 2;
            this.y = Math.random() * 95;
        } else {
            this.x = 92 + Math.random() * 2;
            this.y = Math.random() * 95;
        }
        this.door = new Image();
        this.door.src = './images/door.png';
        this.width = (this.width / 100) * this.game.width;
        this.height = (this.height / 100) * this.game.height;
        this.x = (this.x / 100) * this.game.width;
        this.y = (this.y / 100) * this.game.height;
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
    constructor(width, height) {
        this.gameWidth = width;
        this.gameHeight = height;
        this.width = 4;
        this.height = 4;
        this.x = 5 + Math.random() * 80;
        this.y = Math.random() * 90;
        this.trees = new Image();
        this.trees.src = './images/tree.png';
        this.width = (this.width / 100) * this.gameWidth;
        this.height = (this.height / 100) * this.gameHeight;
        this.x = (this.x / 100) * this.gameWidth;
        this.y = (this.y / 100) * this.gameHeight;
    }
    update () {
    }
    render(context, player) {
        if (
            player.y + player.height > this.y + (0.06 * this.gameHeight) &&
            player.y < this.y + this.height + (0.11 * this.gameHeight) &&
            player.x + player.width > this.x + (0.04 * this.gameWidth) &&
            player.x < this.x + this.width + (0.06 * this.gameWidth)
        ) {
            context.save();
            context.globalAlpha = 0.3;
            context.drawImage(this.trees, this.x, this.y, this.width + (0.1 * this.gameWidth), this.height + (0.16 * this.gameHeight));
            context.restore();
            
            context.fillRect(this.x, this.y, 5, 5)
            context.fillRect(this.x + this.width + (0.1 * this.gameWidth) - 5, this.y, 5, 5)

        } else {
            context.drawImage(this.trees, this.x, this.y, this.width + (0.1 * this.gameWidth), this.height + (0.16 * this.gameHeight));
        }
    }
}