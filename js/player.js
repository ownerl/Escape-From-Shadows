// Player object

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 30;
        this.height = 50;
        this.x = 500;
        this.y = 0;
        this.lanternX = 0;
        this.lanternY = 0;
        this.eyes = new Image();
        this.eyes.src = '../images/googly.png';
    }
    update(keysPressed, trees) {
        // Translating registered key inputs to movement
        const diagonalMultiplier = 0.7;
        const speed = 1;
        const treeTopOffset = 145;
        const treeBottomOffset = 140;
        const treeRightOffset = 50;
        const treeLeftOffset = 50;
        // Turn lantern on or off
        if (this.game.input.keyToggle === true) {
            this.lanternX = 200;
            this.lanternY = 200;
        }
        if (this.game.input.keyToggle === false) {
            this.lanternX = 0;
            this.lanternY = 0;
        }
        // Movement inputs
        if (keysPressed.includes('w')) {
            let isDiagonal = false;
            if (keysPressed.includes('a') || keysPressed.includes('d')){
                isDiagonal = true;
            }
            this.y -= isDiagonal ? speed * diagonalMultiplier : speed;
            trees.forEach((tree) => {
                if (
                    this.x < tree.x + treeLeftOffset + tree.width && // left collision
                    this.x + this.width > tree.x + treeRightOffset && // right collision
                    this.y < tree.y + treeTopOffset + tree.height && // top collision
                    this.y + this.height > tree.y + treeBottomOffset // bottom collision
                    ) {
                    this.y += isDiagonal ? speed * diagonalMultiplier : speed;
                }
            })
        }
        if (keysPressed.includes('s')) {
            let isDiagonal = false;
            if (keysPressed.includes('a') || keysPressed.includes('d')){
                isDiagonal = true;
            }
            this.y += isDiagonal ? speed * diagonalMultiplier : speed;;
            trees.forEach((tree) => {
                if (
                    this.x < tree.x + treeLeftOffset + tree.width && // left collision
                    this.x + this.width > tree.x + treeRightOffset && // right collision
                    this.y < tree.y + treeTopOffset + tree.height && // top collision
                    this.y + this.height > tree.y + treeBottomOffset // bottom collision
                    ) {
                    this.y -= isDiagonal ? speed * diagonalMultiplier : speed;
                }
            })
        }
        if (keysPressed.includes('d')) {
            let isDiagonal = false;
            if (keysPressed.includes('w') || keysPressed.includes('s')){
                isDiagonal = true;
            }
            this.x += isDiagonal ? speed * diagonalMultiplier : speed;;
            trees.forEach((tree) => {
                if (
                    this.x < tree.x + treeLeftOffset + tree.width && // left collision
                    this.x + this.width > tree.x + treeRightOffset && // right collision
                    this.y < tree.y + treeTopOffset + tree.height && // top collision
                    this.y + this.height > tree.y + treeBottomOffset // bottom collision
                    ) {
                    this.x -= isDiagonal ? speed * diagonalMultiplier : speed;
                }
            })
        }
        if (keysPressed.includes('a')) {
            let isDiagonal = false;
            if (keysPressed.includes('w') || keysPressed.includes('s')){
                isDiagonal = true;
            }
            this.x -= isDiagonal ? speed * diagonalMultiplier : speed;;
            trees.forEach((tree) => {
                if (
                    this.x < tree.x + treeLeftOffset + tree.width && // left collision
                    this.x + this.width > tree.x + treeRightOffset && // right collision
                    this.y < tree.y + treeTopOffset + tree.height && // top collision
                    this.y + this.height > tree.y + treeBottomOffset // bottom collision
                    ) {
                    this.x += isDiagonal ? speed * diagonalMultiplier : speed;
                }
            })
        }
        // Set horizontal boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // Set vertical boundaries
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
        // Set environmental obstacles

    }
    render(context, context2, context3) {
        // lantern lights
        //context.fillStyle = 'yellow';
        //context.fillRect(this.x - ((this.lanternX / 2) - (this.width / 2)), this.y - ((this.lanternY / 2) - (this.height / 2)), this.lanternX, this.lanternY);

        // player
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
        // googly eyes
        let eyes = [30, 40];
        context3.drawImage(this.eyes, this.x + ((this.width / 2) - (eyes[0] / 2)), this.y, eyes[0], eyes[1]);
        // clip for lantern
        let circle = new Path2D();
        context2.save();
        circle.arc(this.x + this.width / 2, this.y + this.height / 2, this.lanternX/2, 0, Math.PI * 2);
        context2.clip(circle);
        context2.clearRect(this.x - ((this.lanternX / 2) - (this.width / 2)), this.y - ((this.lanternY / 2) - (this.height / 2)), 200, 200);
        context2.restore();
    }
    collision() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                this.game.playerIsAlive = false;
            }
        })
    }
}
//             obstacles.x + obstacles.width > this.x &&
//             obstacles.y < this.y + this.height &&
//             obstacles.y + obstacles.height > this.y
//         ) 
//     }
// }




// if (keyToggle.includes('f')) {
//     // this.lantern = this.lantern === true ? false : true;
//     if (this.lantern === true) {
//         this.lantern = false;
//     } else {
//         this.lantern = true;
//     }