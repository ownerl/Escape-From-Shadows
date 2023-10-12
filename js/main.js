/* <><><><><><><>  IMPORTS (NOT TAXED)  <><><><><><><> */
import { InputHandler } from './input.js';
import { Player } from './player.js';
import { Demon } from './enemy.js';
import { KeyObject, Door, Obstacle } from './interactions.js';

/* <><><><><><><>         AUDIO         <><><><><><><> */
const backgroundSounds = new Audio('./audio/nightsounds.wav');
const footsteps = new Audio('./audio/running.wav');


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
        this.graceTimer = 1;
        this.gracePeriod = true;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.enemy = new Demon(this);
        this.trees = [];
        this.maxTrees = 60;
        this.treeCount = 0;
        this.enemies = [this.enemy];
        this.greenKey = new KeyObject(this);
        this.escape = new Door(this);
        this.keysCollected = [];
        this.playerIsAlive = true;
        this.win = false;
    }

    timer() {
        console.log('running!')
        const intervalID = setInterval(() => {
            if (this.graceTimer > 0) {
                console.log(`${this.graceTimer} seconds left!`)
                this.graceTimer --;
            } 
            if (this.graceTimer <= 0) {
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
        // delete overlapping trees for player mobility
        this.trees.forEach((tree) => tree.update(this.trees));
        //console.log(this.trees)
        
        if (this.playerIsAlive) {
            this.player.update(this.input.keysPressed, this.trees, timeChange);
        }
        if (this.gracePeriod === false) {
            this.enemies.forEach((baddie) => baddie.update(this.player, this.input));
        }
        this.greenKey.update(this.player, 'green', this.trees);
        this.escape.update(this.player);
    }
    render(context, context2, context3, context1) {
        this.escape.render(context);
        if (this.playerIsAlive) {
            this.player.render(context, context2, context3, context1, this.input.keysPressed);
        }
        if (this.gracePeriod === false) {
            this.enemies.forEach((baddie) => baddie.render(context, context3));
        }
        this.greenKey.render(context, 'green');
        this.trees.forEach((tree) => tree.render(context, this.player));
    }
    collision() {
        if (this.gracePeriod === false) {
            this.player.collision();
        }
    }

}
const game = new Game(canvas1.width, canvas1.height);

let lastTime = 0;
/* <><><><><><><>   OUTSIDE FUNCTIONS   <><><><><><><> */
function updateAspectRatio() {
    const centralContent = document.getElementById('centralContent');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const maxSize = Math.min(viewportWidth, viewportHeight);
    centralContent.style.width = maxSize + 'px';
    centralContent.style.height = maxSize + 'px';
}

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
    game.render(ctx, ctx2, ctx3, ctx1);
    game.collision();
    if (!game.win) {
        requestAnimationFrame(animate);
    } else if (game.win) {
        winScreen();
    }
}

function winScreen() {
    alert('you win this game')
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx3.fillStyle = 'black';
    ctx3.fillRect(0, 0, canvas1.width, canvas1.height)
    endgame.style.visibility = 'visible';

}

function gameStart() {
    background.setAttribute('src', './images/background1.png')
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

window.addEventListener('resize', updateAspectRatio);
buttonPlay.addEventListener('click', gameStart);
buttonRestart.addEventListener('click', () => location.reload());
leftText.style.visibility = 'visible';

updateAspectRatio();