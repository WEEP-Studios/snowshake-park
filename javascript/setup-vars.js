
const WIDTH = 1280;
const HEIGHT = 720;



const STUMPS = ['sprites/tree_stump1.png', 'sprites/tree_stump2.png'];



const DEFAULT_SHAKETIME = 3;
const SHAKECOOLDOWN = 1;


const WALL_SIZE = 48;


const IDLE_TEXTURE = PIXI.Texture.from('sprites/char1.png');
const ANI_WALK = [
    PIXI.Texture.from('sprites/char2.png'),
    PIXI.Texture.from('sprites/char3.png')
];
const ANI_SHAKE_LEFT = [
    PIXI.Texture.from('sprites/char_shake1.png'),
    PIXI.Texture.from('sprites/char_shake2.png'),
    PIXI.Texture.from('sprites/char_shake3.png'),
    PIXI.Texture.from('sprites/char_shake2.png')
];
const ANI_SHAKE_RIGHT = [
    PIXI.Texture.from('sprites/char_shake1_mirror.png'),
    PIXI.Texture.from('sprites/char_shake2_mirror.png'),
    PIXI.Texture.from('sprites/char_shake3_mirror.png'),
    PIXI.Texture.from('sprites/char_shake2_mirror.png')
];


const CROWN_TEXTURES = {
    tree_leaves1: {
        _0: PIXI.Texture.from('sprites/tree_leaves1_0.png'),
        _1: PIXI.Texture.from('sprites/tree_leaves1_1.png'),
        _2: PIXI.Texture.from('sprites/tree_leaves1_2.png'),
        _3: PIXI.Texture.from('sprites/tree_leaves1_3.png'),
        _4: PIXI.Texture.from('sprites/tree_leaves1_4.png'),
    },
    tree_leaves2: {
        _0: PIXI.Texture.from('sprites/tree_leaves2_0.png'),
        _1: PIXI.Texture.from('sprites/tree_leaves2_1.png'),
        _2: PIXI.Texture.from('sprites/tree_leaves2_2.png'),
        _3: PIXI.Texture.from('sprites/tree_leaves2_3.png'),
        _4: PIXI.Texture.from('sprites/tree_leaves2_4.png'),
    }
}



const TREE_DEAD_STATE = 4;

const PARTICLE_UPPER_LIMIT_Y = 10;
const PARTICLE_UPPER_LIMIT_X = 2;
const PARTICLE_LOWER_LIMIT_X = -2;
const PARTICLE_MAX_SIZE = 12;
const PARTICLE_MIN_SIZE = 7;
const PARTICLE_AMOUNT = 100;
const PARTICLE_COLOR = 0xffffff;

const MOVEMENT_KEYS = ['arrowleft', 'arrowright', 'arrowdown', 'arrowup', 'w', 'a', 's', 'd'];
const INTERACTION_KEYS = ['e'];

const BASESPEED = 4;
var currentSpeed = BASESPEED;
var moveKeys = [];
var interactKeys = [];


var currentLevel = {
    walls: [],
    trees: []
};

var skakTimer = 0;
var skakTimeOut = undefined;
var skakningDone = false;






// FUNCTIONS SETUP

$(document).keydown(function (event) {
    const key = event.key.toLowerCase();
    if (!moveKeys.includes(key) && MOVEMENT_KEYS.includes(key)) moveKeys.push(key);
    if (window.event.repeat || INTERACTION_KEYS.includes(key)) if (!interactKeys.includes(key) && INTERACTION_KEYS.includes(key) && !skakningDone) interactKeys.push(key);
});

$(document).keyup(function (event) {
    const key = event.key.toLowerCase();
    moveKeys = moveKeys.filter(a => a !== key);
    interactKeys = interactKeys.filter(a => a !== key);
});


function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
