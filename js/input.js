// Movement input

export class InputHandler {
    constructor() {
        this.keysPressed = [];
        this.keyToggle = false;
        this.toggles = {
            'f': false,
            'g': false
        };
        window.addEventListener('keydown', e => {
            if (this.keysPressed.indexOf(e.key.toLowerCase()) === -1){
                this.keysPressed.push(e.key.toLowerCase());
            }
            //console.log(this.keysPressed);
        })
        window.addEventListener('keyup', e => {
            if (this.keysPressed.includes(e.key.toLowerCase())) {
                this.keysPressed.splice(this.keysPressed.indexOf(e.key.toLowerCase()), 1);
            }
            //console.log(this.keysPressed);
        })
        // window.addEventListener('keydown', e => {
        //     if (e.key === 'f' && !this.keyToggle) {
        //         this.keyToggle = true;
        //     }
        // })
        window.addEventListener('keyup', e => {
            if (e.key === 'f' && this.keyToggle === false) {
                this.keyToggle = true;
            } else if (e.key === 'f' && this.keyToggle === true) {
                this.keyToggle = false;
            }
        })
        // window.addEventListener('keyup', e => {
        //     if (e.key === 'f') {
        //         this.toggles['f'] = false;
        //     }
        // }, {once: true})
    }
}


// window.addEventListener('keyup', e => {
//     // if (e.repeat) return;f
//     if (this.keyToggle.indexOf(e.key.toLowerCase()) === -1) {
//         this.keyToggle.push(e.key.toLowerCase());
//     }
//     if (this.keyToggle.includes(e.key.toLowerCase())){
//         this.keyToggle.splice(this.keyToggle.indexOf(e.key.toLowerCase()), 1);
//     }