/* <><><><><><><>  IMPORTS (NOT TAXED)  <><><><><><><> */
import { InputHandler } from './input.js';
import { Player } from './player.js';
import { Demon } from './enemy.js';
import { KeyObject, Door, Obstacle } from './interactions.js';

/* <><><><><><><>      DOM SELECTORS    <><><><><><><> */
const canvas1 = document.querySelector('#canvas1');
const canvas2 = document.querySelector('#canvas2');
const canvas3 = document.querySelector('#canvas3');
const buttonPlay = document.querySelector('button');
/* <><><><><><><>      CANVAS SETUP     <><><><><><><> */
// Game area
const ctx = canvas1.getContext('2d');
// Shadow cover
const ctx2 = canvas2.getContext('2d');
// Glowing eyes
const ctx3 = canvas3.getContext('2d');

// Best resolution 1000px
canvas1.height = window.screen.height;
canvas1.width = canvas1.height;
canvas2.width = canvas1.width;
canvas2.height = canvas1.height;
canvas3.width = canvas1.width;
canvas3.height = canvas1.height;
/* <><><><><><><>        CLASSES        <><><><><><><> */
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.graceTimer = 100;
        this.gracePeriod = true;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.enemy = new Demon(this);
        this.trees = [];
        this.enemies = [this.enemy];
        for (let i = 0; i < 20; i++) {
            this.trees[i] = new Obstacle(this.width, this.height);
        }
        this.greenKey = new KeyObject(this);
        this.escape = new Door(this);
        this.keysCollected = [];
        this.playerIsAlive = true;
        this.win = false;
        timer(this.graceTimer, () => {
            this.gracePeriod = false;
        });
    }
    update() {
        if (this.playerIsAlive) {
            this.player.update(this.input.keysPressed, this.trees);
        }
        if (this.gracePeriod === false) {
            this.enemies.forEach((baddie) => baddie.update(this.player, this.input));
        }
        this.greenKey.update(this.player, 'green', this.trees);
        this.escape.update(this.player);
    }
    render(context, context2, context3) {
        this.escape.render(context);
        if (this.playerIsAlive) {
            this.player.render(context, context2, context3);
        }
        if (this.gracePeriod === false) {
            this.enemies.forEach((baddie) => baddie.render(context, context3));
        }
        this.trees.forEach((tree) => tree.render(context));
        this.greenKey.render(context, 'green');
    }
    collision() {
        if (this.gracePeriod === false) {
            this.player.collision();
        }
    }

}
const game = new Game(canvas1.width, canvas1.height);
/* <><><><><><><>       FUNCTIONS       <><><><><><><> */
function animate() {
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.fillRect(0, 0, canvas1.width, canvas1.height);
    game.update();
    game.render(ctx, ctx2, ctx3);
    game.collision();
    if (!game.win) {
        requestAnimationFrame(animate);
    } else if (game.win) {
        winScreen();
    }
}

function winScreen() {
    alert('you win this game')
}

function timer(graceTimer, onTimerComplete) {
    const intervalId = setInterval(() => {
        if (graceTimer > 0) {
            console.log(`${graceTimer} seconds left!`)
            graceTimer --;
        } else {
            clearInterval(intervalId);
            onTimerComplete();
        }
    }, 1000)
    return false;
}
animate();
