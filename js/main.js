import { InputHandler } from './input.js';
import { Player } from './player.js'

/* <><><><><><><>      DOM SELECTORS    <><><><><><><> */
const canvas = document.querySelector('#canvas1');
/* <><><><><><><>      CANVAS SETUP     <><><><><><><> */
const ctx = canvas.getContext('2d');

    // Set resolution to window
//canvas1.setAttribute('height', getComputedStyle(canvas1).height);
//canvas1.setAttribute('width', getComputedStyle(canvas1).width);

canvas.width = 500;
canvas.height = 500;
/* <><><><><><><>        CLASSES        <><><><><><><> */
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler();
    }
    update() {
        this.player.update(this.input.keysPressed);
    }
    render(context) {
        this.player.render(context);

    }

}
const game = new Game(canvas.width, canvas.height);
/* <><><><><><><>       FUNCTIONS       <><><><><><><> */
/* <><><><><><><>    EVENT LISTENERS    <><><><><><><> */

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.render(ctx);
    requestAnimationFrame(animate);
}
animate();