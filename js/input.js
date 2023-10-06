// Movement input

export class InputHandler {
    constructor() {
        this.keysPressed = [];
        window.addEventListener('keydown', e => {
            if (this.keysPressed.indexOf(e.key.toLowerCase()) === -1){
                this.keysPressed.push(e.key.toLowerCase());
            }
            console.log(this.keysPressed);
        })
        window.addEventListener('keyup', e => {
            if (this.keysPressed.includes(e.key.toLowerCase())) {
                this.keysPressed.splice(this.keysPressed.indexOf(e.key.toLowerCase()), 1);
            }
            console.log(this.keysPressed);
        })
    }
}