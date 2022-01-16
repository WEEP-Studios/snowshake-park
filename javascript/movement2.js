const app = new PIXI.Application({
    width: document.body.offsetWidth, height: document.body.offsetHeight, backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

let b = new Bump(PIXI);



// const tree1 = PIXI.Sprite.from('sprites/tree2.png');

// tree1.x = app.screen.width / 4;
// tree1.y = app.screen.height / 4;








const stubbar = ['sprites/tree_stump1.png', 'sprites/tree_stump2.png'];
const kronor = ['sprites/tree_leaves1.png', 'sprites/tree_leaves2.png'];

const träd = [];

const TrädPositioner = [
    { x: 100, y: 150 },
    { x: 500, y: 500 },
    { x: 900, y: 200 },
    { x: 600, y: 150 },
    { x: 800, y: 700 },
];

for (let i = 0; i < TrädPositioner.length; i++) {
    const dettaTräd = new PIXI.Container();
    const stubbe = PIXI.Sprite.from(stubbar[random(0, 2)]);
    const krona = PIXI.Sprite.from(kronor[random(0, 2)]);
    stubbe.anchor.set(0.5);
    krona.anchor.set(0.5);
    krona.y = -75;
    dettaTräd.addChild(stubbe);
    dettaTräd.addChild(krona);

    dettaTräd.x = TrädPositioner[i].x;
    dettaTräd.y = TrädPositioner[i].y;

    träd.push(dettaTräd);
    app.stage.addChild(dettaTräd);
}





// väggarna är 32x32
// BARA HELA VÄGGAR TILLÅTNA!!!
// ENDAST ETT HÅLL ÅT GÅNGEN!
// VID Y: ENDAST FRÅN UPPIFRÅN TLL NED!!!!
// VID X: ENDAST FRÅN VÄNSTER TILL HÖGER !!!

const väggar = [
    // [ { x: 100, y: 800 }, { x: 420, y: 800 } ],
    [{ x: 388, y: 288 }, { x: 388, y: 768 }],
]

const färdigaVäggar = [];



for (const vägg of väggar) {

    const dennaVägg = new PIXI.Container();
    const dy = vägg[1].y - vägg[0].y;

    for (let i = 0; i < Math.abs(dy) / 32; i++) {
        const byggkloss = PIXI.Sprite.from('sprites/wall.png');
        // byggkloss.anchor.set(0.5);
        byggkloss.y = i * 32;
        byggkloss.x = 0;
        dennaVägg.addChild(byggkloss);
    }


    dennaVägg.x = vägg[0].x;
    dennaVägg.y = vägg[0].y;

    färdigaVäggar.push(dennaVägg);
    app.stage.addChild(dennaVägg);

}

setTimeout(() => {
    for (const wall of färdigaVäggar) {

        console.log(wall.x, wall.width);

        const wallpoints = {
            topLeft: { x: wall.x, y: wall.y },
            topRight: { x: wall.x + wall.width, y: wall.y },
            bottomLeft: { x: wall.x, y: wall.y + wall.height },
            bottomRight: { x: wall.x + wall.width, y: wall.y + wall.height }
        };

        for (const xy of Object.values(wallpoints)) {

            const aaa = PIXI.Sprite.from('sprites/unknown.png');
            // aaa.anchor.set(0.5);
            aaa.x = xy.x;
            aaa.y = xy.y;

            console.log('aaaaaa');

            app.stage.addChild(aaa);
        }



    }
}, 1000);































// for (const vägg of väggar) {

//     const dennaVägg = new PIXI.Container();
//     const dx = vägg[1].x - vägg[0].x;
//     const dy = vägg[0].y - vägg[1].y;

//     for (let i = 0; i < Math.abs(dx)/32; i++) {
//         const byggkloss = PIXI.Sprite.from('sprites/wall.png');
//         byggkloss.anchor.set(0.5);  
//         byggkloss.x = i * 32 * (dx > 0 ? 1 : -1);
//         dennaVägg.addChild(byggkloss);
//     }

//     for (let i = 0; i < Math.abs(dy)/32; i++) {
//         const byggkloss = PIXI.Sprite.from('sprites/wall.png');
//         byggkloss.anchor.set(0.5);  
//         byggkloss.y = i * 32 * (dy > 0 ? 1 : -1);
//         dennaVägg.addChild(byggkloss);

//         console.log(byggkloss, byggkloss.y);

//     }

//     dennaVägg.x = vägg[0].x;
//     dennaVägg.y = vägg[0].y;

//     färdigaVäggar.push(dennaVägg);
//     app.stage.addChild(dennaVägg);

//     console.log(dennaVägg);
// }








const char1 = PIXI.Texture.from('sprites/char1.png');
const walkAnimation = [
    PIXI.Texture.from('sprites/char2.png'),
    PIXI.Texture.from('sprites/char3.png')
]

const shakeAnimationLeft = [
    PIXI.Texture.from('sprites/char_shake1.png'),
    PIXI.Texture.from('sprites/char_shake2.png'),
    PIXI.Texture.from('sprites/char_shake3.png'),
    PIXI.Texture.from('sprites/char_shake2.png')
];

const shakeAnimationRight = [
    PIXI.Texture.from('sprites/char_shake1_mirror.png'),
    PIXI.Texture.from('sprites/char_shake2_mirror.png'),
    PIXI.Texture.from('sprites/char_shake3_mirror.png'),
    PIXI.Texture.from('sprites/char_shake2_mirror.png')
]


const sprite = new PIXI.AnimatedSprite(walkAnimation);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
sprite.animationSpeed = .1;
sprite.loop = true;
app.stage.addChild(sprite);
sprite.texture = char1;






const points = {
    topLeft: { x: sprite.x, y: sprite.y },
    topRight: { x: sprite.x + sprite.width, y: sprite.y },
    bottomLeft: { x: sprite.x, y: sprite.y + sprite.height },
    bottomRight: { x: sprite.x + sprite.width, y: sprite.y + sprite.height }
}


const charpoints = [];

for (const xy of Object.values(points)) {

    const aaa = PIXI.Sprite.from('sprites/unknown2.png');
    // aaa.anchor.set(0.5);
    aaa.x = xy.x;
    aaa.y = xy.y;

    charpoints.push(aaa);

    app.stage.addChild(aaa);
}









// App constraints
const UPPER_LIMIT_Y = 10
const UPPER_LIMIT_X = 2
const LOWER_LIMIT_X = -2
const MAX_SIZE = 6
const MIN_SIZE = 2
const AMOUNT = 100
const COLOR = 0xffffff


const floored = v => Math.floor(Math.random() * v)
// Update value by either subtracting to adding
const updateSnow = p =>
    Math.random() > 0.5
        ? Math.max(LOWER_LIMIT_X, p - 1)
        : Math.min(p + 1, UPPER_LIMIT_X)
// Reset particle start points based on screen
const reset = p => {
    p.x = floored(app.renderer.width)
    p.y = -(p.size + floored(app.renderer.height))
    p.vy = floored(UPPER_LIMIT_Y) + 2
}
// Generate a particle set based on a given texture
const genParticles = (t) =>
    new Array(AMOUNT).fill().map(p => {
        const SIZE = floored(MAX_SIZE) + MIN_SIZE
        p = new PIXI.Sprite.from('sprites/snowflake.png')
        p.size = SIZE
        p.vx = floored(UPPER_LIMIT_X) - UPPER_LIMIT_X
        p.vy = floored(UPPER_LIMIT_Y) + 2
        p.x = p.startX = floored(app.renderer.width)
        p.y = p.startY = -(SIZE + floored(app.renderer.height))
        p.width = p.height = SIZE
        // p.scale.x = 5
        p.tint = 0xffffff;
        drops.addChild(p)
        return p
    })


// Create particle container
const drops = new PIXI.ParticleContainer(AMOUNT, {
    scale: true,
    position: true,
    rotation: true,
    alpha: false,
})

app.stage.addChild(drops)


const p = new PIXI.Graphics()
p.beginFill(COLOR)
p.drawCircle(0, 0, 100)
p.endFill()

const baseTexture = app.renderer.generateTexture(p);
let particles = genParticles(baseTexture);

const test = PIXI.Texture.from('sprites/snowflake.png');


app.ticker.add(i => {
    if (
        app.renderer.height !== innerHeight ||
        app.renderer.width !== innerWidth
    ) {
        app.renderer.resize(innerWidth, innerHeight)
        drops.removeChildren()
        particles = genParticles(test)
    }
    for (let particle of particles) {
        if (particle.y > 0) particle.x += particle.vx
        particle.y += particle.vy

        if (Math.random() > 0.9) particle.vx = updateSnow(particle.vx)
        // if (Math.random() > 0.9) particle.vy = Math.min(particle.vy + 1, UPPER_LIMIT_Y)
        if (
            particle.x > app.renderer.width ||
            particle.x < 0 ||
            particle.y > app.renderer.height
        )
            reset(particle)
    }
    app.renderer.render(drops)
});

app.ticker.add(update);





var baseSpeed = 3;
var currentSpeed = baseSpeed;
var pressedKeys = [];
var heldKeys = [];
$(document).keydown(function (e) {
    if (!pressedKeys.includes(e.key)) pressedKeys.push(e.key);
});

$(document).keyup(function (e) {
    pressedKeys = pressedKeys.filter(a => a !== e.key);
    heldKeys = heldKeys.filter(a => a !== e.key);
    sprite.stop();
    sprite.texture = char1;
});


function update() {


    if (slowDown()) {
        currentSpeed = baseSpeed / 2;
    }
    else {
        currentSpeed = baseSpeed;
    }
    for (const key of pressedKeys) {
        move(key);

        interaction(key);
    }


    for (const wall of färdigaVäggar) {
        console.log(b.hit(sprite, wall, true));
    }




}

function slowDown() {
    const movmentKeys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'w', 'a', 's', 'd'];
    return pressedKeys.filter(e => movmentKeys.includes(e)).length > 1;
}


function move(key) {
    if (['ArrowLeft', 'a'].includes(key)) {
        if (!sprite.playing) {
            sprite.textures = walkAnimation;
            sprite.play();
        }
        var moveVec = canMove(sprite, -currentSpeed, 0);
        sprite.x += moveVec.x;
    }
    else if (['ArrowRight', 'd'].includes(key)) {
        if (!sprite.playing) {
            sprite.textures = walkAnimation;
            sprite.play();
        }
        var moveVec = canMove(sprite, currentSpeed, 0);
        sprite.x += moveVec.x;
    }
    else if (['ArrowDown', 's'].includes(key)) {
        3
        if (!sprite.playing) {
            sprite.textures = walkAnimation;
            sprite.play();
        }
        var moveVec = canMove(sprite, 0, currentSpeed);
        sprite.y += moveVec.y;
    }
    else if (['ArrowUp', 'w'].includes(key)) {
        if (!sprite.playing) {
            sprite.textures = walkAnimation;
            sprite.play();
        }
        var moveVec = canMove(sprite, 0, -currentSpeed);
        sprite.y += moveVec.y;
    }
}


function interaction(key) {
    if (['e'].includes(key)) {
        if (heldKeys.includes('e')) {

        } else {
            heldKeys.push('e');

            for (const tree of träd) {
                if (getCrashSide(tree.children[0], sprite) === 'right') {
                    sprite.textures = shakeAnimationLeft;
                    sprite.play();
                } else if (getCrashSide(tree.children[0], sprite) === 'left') {
                    sprite.textures = shakeAnimationRight;
                    sprite.play();
                }
            }



        }
    }
}


function canMove(player, x, y) {

    const points = {
        topLeft: { x: player.x + x, y: player.y + y },
        topRight: { x: player.x + player.width + x, y: player.y + y },
        bottomLeft: { x: player.x + x, y: player.y + player.height + y },
        bottomRight: { x: player.x + player.width + x, y: player.y + player.height + y }
    }


    for (let i = 0; i < 4; i++) {
        const xy = Object.values(points)[i];
        const characterpoint = charpoints[i];
        characterpoint.x = xy.x;
        characterpoint.y = xy.y;
    }



    for (const wall of färdigaVäggar) {
        const wallpoints = {
            topLeft: { x: wall.x, y: wall.y },
            topRight: { x: wall.x + wall.width, y: wall.y },
            bottomLeft: { x: wall.x, y: wall.y + wall.height },
            bottomRight: { x: wall.x + wall.width, y: wall.y + wall.height }
        };

        


        for (const point of Object.values(points)) {

            // console.log(wallpoints.topLeft.x);
            // console.log(wallpoints.topRight.x);
            // console.warn(point.x);




            if (wallpoints.topLeft.x < point.x && wallpoints.topRight.x > point.x &&
                wallpoints.topLeft.y < point.y && wallpoints.topRight.y < point.y &&
                wallpoints.bottomLeft.x < point.x && wallpoints.bottomRight.x > point.x &&
                wallpoints.bottomLeft.y > point.y && wallpoints.bottomRight.y > point.y) {
                // return { x: 0, y: 0 };
            }
        }
    }

    return { x: x, y: y };


}



function getCrashSide(r1, r2) {
    var collision;
    if (!r1._bumpPropertiesAdded) b.addCollisionProperties(r1);
    if (!r2._bumpPropertiesAdded) b.addCollisionProperties(r2);
    vx = (r1.gx + Math.abs(r1.halfWidth) - r1.xAnchorOffset) - (r2.gx + Math.abs(r2.halfWidth) - r2.xAnchorOffset);
    vy = (r1.gy + Math.abs(r1.halfHeight) - r1.yAnchorOffset) - (r2.gy + Math.abs(r2.halfHeight) - r2.yAnchorOffset);
    combinedHalfWidths = Math.abs(r1.halfWidth) + Math.abs(r2.halfWidth);
    combinedHalfHeights = Math.abs(r1.halfHeight) + Math.abs(r2.halfHeight);
    if (Math.abs(vx) < combinedHalfWidths) {
        if (Math.abs(vy) < combinedHalfHeights) {
            overlapX = combinedHalfWidths - Math.abs(vx);
            overlapY = combinedHalfHeights - Math.abs(vy);
            if (overlapX >= overlapY) {
                if (vy > 0) {
                    collision = "top";
                } else {
                    collision = "bottom";
                }
            } else {
                if (vx > 0) {
                    collision = "left";
                } else {
                    collision = "right";
                }
            }
        }
    }
    return collision;
}



function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}











