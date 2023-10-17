/* <><><><><><><>  IMPORTS (NOT TAXED)  <><><><><><><> */
import { InputHandler } from './input.js';
import { Player } from './player.js';
import { Demon } from './enemy.js';
import { KeyObject, Door, Obstacle } from './interactions.js';

/* <><><><><><><>         AUDIO         <><><><><><><> */
const backgroundSounds = new Audio('./audio/nightsounds.wav');
backgroundSounds.volume = 0.4;
const footsteps = new Audio('./audio/footsteps.wav');
footsteps.volume = 0.3;
const growl = new Audio('./audio/growl.wav');
growl.volume = 0.7;
const keySound = new Audio('./audio/tink.wav');
keySound.volume = 0.7;
const hatch = new Audio('./audio/hatch.wav');
hatch.volume = 0.7;
const dead = new Audio('./audio/dead.wav');
dead.volume = 0.7;

/* <><><><><><><>      DOM SELECTORS    <><><><><><><> */
const canvas1 = document.querySelector('#canvas1');
const canvas11 = document.querySelector('#canvas11');
const canvas2 = document.querySelector('#canvas2');
const canvas3 = document.querySelector('#canvas3');
const buttonPlay = document.querySelector('#start');
const buttonRestart = document.querySelector('#restart');
const background = document.querySelector('#background');
const leftText = document.querySelector('#leftText');
const endgame = document.querySelector('#endgame');
const endMessage = document.querySelector('#endMessage');

/* <><><><><><><>      CANVAS SETUP     <><><><><><><> */
// Game area
const ctx = canvas1.getContext('2d');
const ctx1 = canvas11.getContext('2d');
// Shadow cover
const ctx2 = canvas2.getContext('2d');
// Glowing eyes
const ctx3 = canvas3.getContext('2d');

canvas1.height = window.screen.height;
canvas1.width = canvas1.height;
canvas11.width = canvas1.width;
canvas11.height = canvas1.height;
canvas2.width = canvas1.width;
canvas2.height = canvas1.height;
canvas3.width = canvas1.width;
canvas3.height = canvas1.height;

/* <><><><><><><>        GAME           <><><><><><><> */
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.graceTimer = 9;
        this.gracePeriod = true;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.enemy = new Demon(this);
        this.trees = [];
        this.maxTrees = 60;
        this.treeCount = 0;
        this.enemies = [this.enemy];
        this.goldenKey = new KeyObject(this);
        this.escape = new Door(this);
        this.keysCollected = [];
        this.playerIsAlive = true;
        this.win = false;
    }
    footsteps() {
        if (
            (this.input.keysPressed.includes('w') ||
            this.input.keysPressed.includes('a') ||
            this.input.keysPressed.includes('s') ||
            this.input.keysPressed.includes('d')) &&
            this.playerIsAlive === true) {
            footsteps.play();
        } else {
            footsteps.pause();
        }
    }
    timer() {
        const intervalID = setInterval(() => {
            if (this.graceTimer > 0) {
                console.log(`${this.graceTimer} seconds left before enemy spawn.`)
                this.graceTimer --;
            } 
            if (this.graceTimer <= 0) {
                growl.play();
                clearInterval(intervalID);
                this.gracePeriod = false;
            }
        }, 1000);
    }
    makeTrees() {
        if (this.treeCount < this.maxTrees) {
            //console.log('tree creataed!')
            let newTree = new Obstacle(this.width, this.height, this.trees);
            this.trees.push(newTree);
            this.treeCount ++;
        }
                // Sort trees for correct z-level rendering
        this.trees.sort((a, b) => a.y - b.y);
    }
    removeTrees() {
        if (this.treeCount === this.maxTrees - 1) {
            console.log('worked!')
            for (let j = this.trees.length - 1; j > 0; j--) {
                let treeJ = this.trees[j];
                for (let i = j - 1; i >= 0; i--) {
                    let treeI = this.trees[i];
                    if (
                        treeI.x + treeI.width > treeJ.x &&
                        treeI.x < treeJ.x + treeJ.width &&
                        treeI.y + treeI.height > treeJ.y &&
                        treeI.y < treeJ.y + treeJ.height
                        ) {
                            this.trees.splice(j, 1);
                        }
                }
            }
        }
    }
    update(timeChange) {
        if (this.playerIsAlive) {
            this.player.update(this.input.keysPressed, this.trees, timeChange);
        }
        if (this.gracePeriod === false) {
            this.enemies.forEach((baddie) => baddie.update(this.player, this.input));
        }
        this.goldenKey.update(this.player, 'gold', keySound);
        this.escape.update(this.player, hatch);
    }
    render(context, context2, context3, context1) {
        this.escape.render(context);
        if (this.playerIsAlive) {
            this.player.render(context, context2, context3, context1, this.input.keysPressed);
        }
        if (this.gracePeriod === false) {
            this.enemies.forEach((baddie) => baddie.render(context, context3));
        }
        this.goldenKey.render(context);
        this.trees.forEach((tree) => tree.render(context, this.player));
    }
    collision() {
        if (this.gracePeriod === false) {
            this.player.collision(dead);
        }
    }
}

const game = new Game(canvas1.width, canvas1.height);

/* <><><><><><><>   OUTSIDE FUNCTIONS   <><><><><><><> */
function updateAspectRatio() {
    const centralContent = document.getElementById('centralContent');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const maxSize = Math.min(viewportWidth, viewportHeight);
    centralContent.style.width = maxSize + 'px';
    centralContent.style.height = maxSize + 'px';
}

let lastTime = 0;
function animate(timeStamp) {
    const timeChange = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.fillRect(0, 0, canvas1.width, canvas1.height);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    game.makeTrees();
    game.removeTrees();
    game.update(timeChange);
    game.footsteps();
    game.render(ctx, ctx2, ctx3, ctx1);
    game.collision();
    if (game.win === false && game.playerIsAlive === true) {
        requestAnimationFrame(animate);
    } else if (game.win === true) {
        winScreen();
    }
    if (game.playerIsAlive === false) {
        badEnd();
    }
}

function winScreen() {
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx3.fillStyle = 'black';
    ctx3.fillRect(0, 0, canvas1.width, canvas1.height)
    endMessage.innerText = 'You have successfully escaped!'
    endMessage.style.color = 'rgb(118, 191, 0)';
    endgame.style.visibility = 'visible';

}

function badEnd() {
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx3.fillStyle = 'black';
    ctx3.fillRect(0, 0, canvas1.width, canvas1.height)
    endMessage.innerText = 'You have died.'
    endMessage.style.color = 'rgb(200, 0, 0)';
    endgame.style.visibility = 'visible';
}

function gameStart() {
    background.setAttribute('src', './images/background1.png')
    playBackgroundSounds();
    game.timer();
    buttonPlay.style.visibility = 'hidden';
    animate(0);
}

window.addEventListener('keyup', e => {
    let x = e.key.toLowerCase();
    if (x === 'x' && leftText.style.visibility === 'visible') {
        leftText.style.visibility = 'hidden';
    } else if (x === 'x' && leftText.style.visibility === 'hidden') {
        leftText.style.visibility = 'visible';
    }
    console.log(leftText.style.visibility)
})

function playBackgroundSounds() {
    backgroundSounds.play();
    setTimeout(playBackgroundSounds, 335000);
}

window.addEventListener('resize', updateAspectRatio);
buttonPlay.addEventListener('click', gameStart);
buttonRestart.addEventListener('click', () => location.reload());
leftText.style.visibility = 'visible';
updateAspectRatio();