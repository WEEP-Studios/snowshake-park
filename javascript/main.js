const app = new PIXI.Application({
    width: WIDTH, height: HEIGHT, backgroundColor: 0x000000, resolution: 1,
});
document.body.appendChild(app.view);

let b = new Bump(PIXI);

const sprite = new PIXI.AnimatedSprite(ANI_WALK);
sprite.texture = IDLE_TEXTURE;
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
sprite.animationSpeed = .1;
sprite.loop = true;
app.stage.addChild(sprite);

var levelLoaded = false;
var gamePaused = false;



var olof;







app.ticker.add(update);

loadLevel('test');


setInterval(updateTrees, 500);



function update() {
    if (isGamePaused()) return;

    updateMovementInteraction();
    updateOlof();
}



function pauseGame() {
    gamePaused = true;
    skakTimeOut?.pause();
    $('.pause-screen').show();
}

function resumeGame() {
    $('.pause-screen').hide();
    gamePaused = false;
    skakTimeOut?.resume();
}

function isGamePaused() {
    return (!levelLoaded || gamePaused);
}