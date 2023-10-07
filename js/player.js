// Player object

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 30;
        this.height = 50;
        this.x = 200;
        this.y = 200;
        this.lanternX = 0;
        this.lanternY = 0;
    }
    update(keysPressed) {
        // Translating registered key inputs to movement
        const diagonalMultiplier = 0.7;
        const speed = 2;
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
        }
        if (keysPressed.includes('s')) {
            let isDiagonal = false;
            if (keysPressed.includes('a') || keysPressed.includes('d')){
                isDiagonal = true;
            }
            this.y += isDiagonal ? speed * diagonalMultiplier : speed;;
        }
        if (keysPressed.includes('d')) {
            let isDiagonal = false;
            if (keysPressed.includes('w') || keysPressed.includes('s')){
                isDiagonal = true;
            }
            this.x += isDiagonal ? speed * diagonalMultiplier : speed;;
        }
        if (keysPressed.includes('a')) {
            let isDiagonal = false;
            if (keysPressed.includes('w') || keysPressed.includes('s')){
                isDiagonal = true;
            }
            this.x -= isDiagonal ? speed * diagonalMultiplier : speed;;
        }
        // Set horizontal boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // Set vertical boundaries
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

    }
    render(context) {
        context.fillStyle = 'yellow';
        context.fillRect(this.x - 85, this.y - 75, this.lanternX, this.lanternY);
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
        console.log(this.keyToggle)
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




// if (keyToggle.includes('f')) {
//     // this.lantern = this.lantern === true ? false : true;
//     if (this.lantern === true) {
//         this.lantern = false;
//     } else {
//         this.lantern = true;
//     }
// }