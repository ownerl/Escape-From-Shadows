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
        this.enemy2 = new Demon(this);
        this.playerIsAlive = true;
        this.enemies = [this.enemy, this.enemy2];
    }
    update() {
        if (this.playerIsAlive) {
            this.player.update(this.input.keysPressed);
        }
        this.enemies.forEach((baddie) => baddie.update(this.player, this.input));
        //this.enemy.update(this.player, this.input);
    }
    render(context) {
        if (this.playerIsAlive) {
            this.player.render(context);
        }
        this.enemies.forEach((baddie) => baddie.render(context));
    }
    collion() {
        this.player.collision();
    }

}
const game = new Game(canvas.width, canvas.height);
/* <><><><><><><>       FUNCTIONS       <><><><><><><> */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.render(ctx);
    game.collion();
    requestAnimationFrame(animate);
}
animate();
