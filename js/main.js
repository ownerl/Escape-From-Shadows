/* <><><><><><><>  IMPORTS (NOT TAXED)  <><><><><><><> */
import { InputHandler } from './input.js';
import { Player } from './player.js';
import { Enemy, Demon } from './enemy.js';

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
        this.input = new InputHandler(this);
        this.enemy = new Demon(this);
    }
    update() {
        this.player.update(this.input.keysPressed);
        this.enemy.update(this.player, this.input);
    }
    render(context) {
        this.player.render(context);
        this.enemy.render(context);

    }

}
const game = new Game(canvas.width, canvas.height);
/* <><><><><><><>       FUNCTIONS       <><><><><><><> */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.render(ctx);
    requestAnimationFrame(animate);
}
animate();
