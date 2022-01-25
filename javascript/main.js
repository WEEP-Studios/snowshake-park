const app = new PIXI.Application({
    width: WIDTH, height: HEIGHT, backgroundColor: 0x000000, resolution: 1,
});
document.body.appendChild(app.view);

PIXI.settings.ROUND_PIXELS = true;

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





const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const level = urlParams.get('level');

if (level) loadLevel(level);

// setInterval(updateTrees, 200);

function update() {
    if (isGamePaused()) return;

    if (!fallenOver) updateMovementInteraction();
    if (olof) updateOlof();
}



function pauseGame() {
    gamePaused = true;
    Object.values(timeouts).forEach(timeout => timeout?.pause());
    $('.pause-screen').show();
    $('.slider-container').show();
}

function resumeGame() {
    $('.slider-container').hide();
    $('.pause-screen').hide();
    gamePaused = false;
    Object.values(timeouts).forEach(timeout => timeout?.resume());
}

function isGamePaused() {
    return (!levelLoaded || gamePaused);
}