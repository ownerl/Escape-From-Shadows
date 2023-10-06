// Player object

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 30;
        this.height = 50;
        this.x = 200;
        this.y = 200;
    }
    update(currentlyPressedKeys) {
        // Translating registered key inputs to movement
        const diagonalMultiplier = 0.7;
        const speed = 2;
        if (currentlyPressedKeys.includes('w')) {
            let isDiagonal = false;
            if (currentlyPressedKeys.includes('a') || currentlyPressedKeys.includes('d')){
                isDiagonal = true;
            }
            this.y -= isDiagonal ? speed * diagonalMultiplier : speed;
        }
        if (currentlyPressedKeys.includes('s')) {
            let isDiagonal = false;
            if (currentlyPressedKeys.includes('a') || currentlyPressedKeys.includes('d')){
                isDiagonal = true;
            }
            this.y += isDiagonal ? speed * diagonalMultiplier : speed;;
        }
        if (currentlyPressedKeys.includes('d')) {
            let isDiagonal = false;
            if (currentlyPressedKeys.includes('w') || currentlyPressedKeys.includes('s')){
                isDiagonal = true;
            }
            this.x += isDiagonal ? speed * diagonalMultiplier : speed;;
        }
        if (currentlyPressedKeys.includes('a')) {
            let isDiagonal = false;
            if (currentlyPressedKeys.includes('w') || currentlyPressedKeys.includes('s')){
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
        console.log(currentlyPressedKeys)
    }
    render(context) {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}