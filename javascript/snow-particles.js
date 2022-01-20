

const floored = v => Math.floor(Math.random() * v)
// Update value by either subtracting to adding
const updateSnow = p =>
    Math.random() > 0.5
        ? Math.max(PARTICLE_LOWER_LIMIT_X, p - 1)
        : Math.min(p + 1, PARTICLE_UPPER_LIMIT_X)
// Reset particle start points based on screen
const reset = p => {
    p.x = floored(app.renderer.width)
    p.y = -(p.size + floored(app.renderer.height))
    p.vy = floored(PARTICLE_UPPER_LIMIT_Y) + 2
}
// Generate a particle set based on a given texture
const genParticles = (t) =>
    new Array(PARTICLE_AMOUNT).fill().map(p => {
        // const SIZE = floored(PARTICLE_MAX_SIZE) + PARTICLE_MIN_SIZE
        const SIZE = VALID_PARTICLE_SIZES[random(0, VALID_PARTICLE_SIZES.length)];
        p = new PIXI.Sprite.from('sprites/snowflake.png')
        p.size = SIZE
        p.vx = floored(PARTICLE_UPPER_LIMIT_X) - PARTICLE_UPPER_LIMIT_X
        p.vy = floored(PARTICLE_UPPER_LIMIT_Y) + 2
        p.x = p.startX = floored(app.renderer.width)
        p.y = p.startY = -(SIZE + floored(app.renderer.height))
        p.width = p.height = SIZE
        // p.scale.x = 5
        p.tint = 0xffffff;
        drops.addChild(p)
        return p
    })


// Create particle container
const drops = new PIXI.ParticleContainer(PARTICLE_AMOUNT, {
    scale: true,
    position: true,
    rotation: true,
    alpha: false,
})

app.stage.addChild(drops)


const p = new PIXI.Graphics()
p.beginFill(PARTICLE_COLOR)
p.drawCircle(0, 0, 100)
p.endFill()

const baseTexture = app.renderer.generateTexture(p);
let particles = genParticles(baseTexture);

const test = PIXI.Texture.from('sprites/snowflake.png');


app.ticker.add(i => {
    if (isGamePaused()) return;
    for (let particle of particles) {
        if (particle.y > 0) particle.x += particle.vx
        particle.y += particle.vy

        if (Math.random() > 0.9) particle.vx = updateSnow(particle.vx)
        // if (Math.random() > 0.9) particle.vy = Math.min(particle.vy + 1, PARTICLE_UPPER_LIMIT_Y)
        if (
            particle.x > app.renderer.width ||
            particle.x < 0 ||
            particle.y > app.renderer.height
        )
            reset(particle)
    }
    app.renderer.render(drops)
});