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




app.ticker.add(update);

loadLevel('test')


setInterval(updateTrees, 5000);



function update() {


    updateMovementInteraction();

}