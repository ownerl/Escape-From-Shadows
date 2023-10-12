// Player object

export class Player {
    constructor(game) {
        this.game = game;
        this.width = (3.5 * 1.3);
        this.height = (5 * 1.3);
        this.x = 50;
        this.y = 0;
        this.lanternX = 0;
        this.lanternY = 0;
        this.eyes = new Image();
        this.eyes.src = './images/playerEyes.png';
        this.character = new Image();
        this.character.src = './images/player.png';
        this.characterRunning = new Image();
        this.characterRunning.src = './images/playeranimations.png';
        this.eyesRunning = new Image();
        this.eyesRunning.src = './images/eyesanimations.png';
        // Scale to percentages of canvas size instead of pixels
        this.width = (this.width / 100) * this.game.width;
        this.height = (this.height / 100) * this.game.height;
        this.x = (this.x / 100) * this.game.width;
        this.y = (this.y / 100) * this.game.height;
        this.horizontalFrame = 0;
        this.fps = 30;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(keysPressed, trees, timeChange) {
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.horizontalFrame < 11) this.horizontalFrame++;
            else this.horizontalFrame = 0;
        } else {
            this.frameTimer += timeChange;
        }

        // Translating registered key inputs to movement
        const diagonalMultiplier = 0.7;
        const speed = 0.7;
        const slowSpeed = 0.2
        const treeTopOffset = (14.5 / 100) * this.game.height;
        const treeBottomOffset = (14.0 / 100) * this.game.height;
        const treeRightOffset = (5 / 100) * this.game.width;
        const treeLeftOffset = (5 / 100) * this.game.width;
        // Turn lantern on or off
        if (this.game.input.keyToggle === true) {
            this.lanternX = (22 / 100) * this.game.width;
            this.lanternY = (22 / 100) * this.game.height;
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
                    this.y += isDiagonal ? slowSpeed * diagonalMultiplier : slowSpeed;
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
                    this.y -= isDiagonal ? slowSpeed * diagonalMultiplier : slowSpeed;
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
                    this.x -= isDiagonal ? slowSpeed * diagonalMultiplier : slowSpeed;
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
                    this.x += isDiagonal ? slowSpeed * diagonalMultiplier : slowSpeed;
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
    render(context, context2, context3, context1, keysPressed) {
        // Soft lantern - stretch goal
        // let circleRadius = 100;
        // let RGB = [0, 0, 0];
        // let alphas = [0, 0, 0.3, 0.5, 1];
        // let playerCenterX = this.x - ((this.lanternX / 2) - (this.width / 2));
        // let playerCenterY = this.y - ((this.lanternY / 2) - (this.height / 2));
        
        // player
        let runningWidth = 349;
        let runningHeight = 493;
        // aligning sprites is hard
        let runningEyesW = 350;
        let runningEyesH = 492;
        let standingWidth = this.width * 1.15;
        let standingHeight = this.height * 1.10;
        let standingX = this.x - (this.width * 0.075);
        let standingY = this.y - (this.height * 0.04);
        if (keysPressed.includes('w') || keysPressed.includes('a') || keysPressed.includes('s') || keysPressed.includes('d')) {
            context.drawImage(this.characterRunning, this.horizontalFrame * runningWidth, 0, runningWidth, runningHeight, this.x, this.y, this.width, this.height);
        } else {
            context.drawImage(this.character, standingX, standingY, standingWidth, standingHeight);
        }

        // glowing player eyes
        if (keysPressed.includes('w') || keysPressed.includes('a') || keysPressed.includes('s') || keysPressed.includes('d')) {
            context3.drawImage(this.eyesRunning, this.horizontalFrame * runningEyesW, 0, runningEyesW, runningEyesH, this.x + (this.width * 0.02), this.y, this.width, this.height);
        } else {
            context3.drawImage(this.eyes, standingX, standingY, standingWidth, standingHeight);
        }

        // clip for lantern
        let circle = new Path2D();
        context2.save();
        circle.arc(this.x + this.width / 2, this.y + this.height / 2, this.lanternX/2, 0, Math.PI * 2);
        context2.clip(circle);
        context2.clearRect(this.x - ((this.lanternX / 2) - (this.width / 2)), this.y - ((this.lanternY / 2) - (this.height / 2)), this.lanternX, this.lanternY);
        context2.restore();

        // lantern light orange glow
        context1.globalAlpha = 0.1;
        context1.fillStyle = 'orange';
        context1.fillRect(0, 0, this.game.width, this.game.height);

    }
    collision(dead) {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                if (this.game.playerIsAlive === true) {
                    dead.play();
                    this.game.playerIsAlive = false;
                }
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