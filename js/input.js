// Movement input

export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keysPressed = [];
        this.keyToggle = false;
        this.playerPosition;
        window.addEventListener('keydown', e => {
            if (this.keysPressed.indexOf(e.key.toLowerCase()) === -1){
                this.keysPressed.push(e.key.toLowerCase());
            }
        })
        window.addEventListener('keyup', e => {
            if (this.keysPressed.includes(e.key.toLowerCase())) {
                this.keysPressed.splice(this.keysPressed.indexOf(e.key.toLowerCase()), 1);
            }
        })
        window.addEventListener('keyup', e => {
            if (e.key === 'f' && this.keyToggle === false) {
                this.keyToggle = true;
            } else if (e.key === 'f' && this.keyToggle === true) {
                this.keyToggle = false;
                this.playerPosition = [this.game.player.x, this.game.player.y];
            }
        })
    }
}