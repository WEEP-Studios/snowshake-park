
const WIDTH = 1280;
const HEIGHT = 720;




var skakTimer = 0;
var skakTimeOut = undefined;
var skakningDone = false;

const DEFAULT_SHAKETIME = 3;
const SHAKECOOLDOWN = 1;

const WALL_SIZE = 48;

var moveKeys = [];
var interactKeys = [];



const SNOWPUFF_TEXTURES = [
    PIXI.Texture.from('sprites/snowpuff1.png'),
    PIXI.Texture.from('sprites/snowpuff2.png'),
    PIXI.Texture.from('sprites/snowpuff3.png'),
    PIXI.Texture.from('sprites/snowpuff4.png'),
    PIXI.Texture.from('sprites/snowpuff5.png'),
];


const STUMPS_TEXTURES = {
    tree_stump1: {
        alive: PIXI.Texture.from('sprites/tree_stump1.png'),
        dead: PIXI.Texture.from('sprites/tree_stump1_dead.png'),
    },
    tree_stump2: {
        alive: PIXI.Texture.from('sprites/tree_stump2.png'),
        dead: PIXI.Texture.from('sprites/tree_stump2_dead.png'),
    }
}


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
const ANI_FALL_OVER = [
    PIXI.Texture.from('sprites/char_dmg1.png'),
    PIXI.Texture.from('sprites/char_dmg2.png'),
    PIXI.Texture.from('sprites/char_dmg3.png')
];


const CROWN_TEXTURES = {
    tree_leaves1: {
        _0: PIXI.Texture.from('sprites/tree_leaves1_0.png'),
        _1: PIXI.Texture.from('sprites/tree_leaves1_1.png'),
        _2: PIXI.Texture.from('sprites/tree_leaves1_2.png'),
        _3: PIXI.Texture.from('sprites/tree_leaves1_3.png'),
        _4: PIXI.Texture.from('sprites/tree_leaves1_4.png'),
        _5: PIXI.Texture.from('sprites/tree_leaves1_5.png'),
    },
    tree_leaves2: {
        _0: PIXI.Texture.from('sprites/tree_leaves2_0.png'),
        _1: PIXI.Texture.from('sprites/tree_leaves2_1.png'),
        _2: PIXI.Texture.from('sprites/tree_leaves2_2.png'),
        _3: PIXI.Texture.from('sprites/tree_leaves2_3.png'),
        _4: PIXI.Texture.from('sprites/tree_leaves2_4.png'),
        _5: PIXI.Texture.from('sprites/tree_leaves2_5.png'),
    }
}

const TREE_DEAD_STATE = 5;

const PARTICLE_UPPER_LIMIT_Y = 10;
const PARTICLE_UPPER_LIMIT_X = 2;
const PARTICLE_LOWER_LIMIT_X = -2;
const PARTICLE_MAX_SIZE = 12;
const PARTICLE_MIN_SIZE = 7;
var PARTICLE_AMOUNT = 100;
const PARTICLE_COLOR = 0xffffff;

const MOVEMENT_KEYS = ['arrowleft', 'arrowright', 'arrowdown', 'arrowup', 'w', 'a', 's', 'd'];
const INTERACTION_KEYS = ['e'];


// DEFAULT VARS

const DEFAULT_OLOFSPEED = 2.8;
const DEFAULT_OLOF_RADIUS = 175;
const DEFAULT_baseSpeed = 5;

// ! DEFAULT VARS


// LEVEL BASED VARS

var baseSpeed = 5;
var currentSpeed = baseSpeed;

var currentLevel = {
    walls: [],
    trees: []
};

var OLOFSPEED = 10;
var OLOF_RADIUS = 175;

var nightData;

var olofCircle, nightPlayerCircle;

var fallenOver;



// ! LEVEL BASED VARS

// FUNCTIONS SETUP

$(document).keydown(function (event) {
    const key = event.key.toLowerCase();
    if (!moveKeys.includes(key) && MOVEMENT_KEYS.includes(key)) moveKeys.push(key);
    if (window.event.repeat || INTERACTION_KEYS.includes(key)) if (!interactKeys.includes(key) && INTERACTION_KEYS.includes(key) && !skakningDone) interactKeys.push(key);

    if (key === 'escape') gamePaused ? resumeGame() : pauseGame();

});

$(document).keyup(function (event) {
    const key = event.key.toLowerCase();
    moveKeys = moveKeys.filter(a => a !== key);
    interactKeys = interactKeys.filter(a => a !== key);
});


function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



var Timer = function (callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function () {
        window.clearTimeout(timerId);
        timerId = null;
        remaining -= Date.now() - start;
    };

    this.cancel = function() {
        window.clearTimeout(timerId);
    }

    this.resume = function () {
        if (timerId) {
            return;
        }

        start = Date.now();
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
};
