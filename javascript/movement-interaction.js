









function updateMovementInteraction() {
    currentSpeed = slowDown() ? baseSpeed / 2 : baseSpeed;

    for (const key of moveKeys) {
        move(key);
    }

    for (const key of interactKeys) {
        interact(key);
    }

    for (const wall of currentLevel.walls) {
        b.hit(sprite, wall, true);
    }

    // for (const tree of currentLevel.trees) {
    //     (b.hit(sprite, tree.children[1], !tree.dead));
    // }





    if (moveKeys.length === 0 && interactKeys.length === 0) {
        sprite.stop();
        sprite.texture = IDLE_TEXTURE;
        timeouts.skakTimeOut?.cancel();
        timeouts.skakTimeOut = undefined;
    }
}





function interact(key) {
    if (['e'].includes(key)) {

        let touch;

        const tree = currentLevel.trees.find(tree => getTouchSide(tree.children[0], sprite));
        if (tree) touch = getTouchSide(tree.children[0], sprite);

        if (touch && !tree.dead) {
            if (!sprite.playing || sprite.totalFrames === 2) {
                sprite.textures = (touch === 'right' ? ANI_SHAKE_LEFT : ANI_SHAKE_RIGHT);
                sprite.play();
            }
            const crown = tree.children[1];

            tree.x = tree.ox;

            if (skakTimer % 20 >= 10) {
                tree.x += 3;
            } else {
                tree.x -= 3;
            }
            skakTimer += 1;

            crown.shaking = true;

            if (timeouts.skakTimeOut === undefined) {
                timeouts.skakTimeOut = new Timer(() => {
                    generateFallParticles(tree, crown.textureState);
                    crown.texture = CROWN_TEXTURES[crown.textureName]._0;
                    crown.textureState = 0;


                    // clearing
                    timeouts.skakTimeOut?.cancel();
                    timeouts.skakTimeOut = undefined;
                    interactKeys = interactKeys.filter(a => a !== key);
                    skakningDone = true;
                    setTimeout(() => {
                        crown.shaking = false;
                        skakningDone = false;
                    }, SHAKECOOLDOWN * 1000);
                }, DEFAULT_SHAKETIME * 1000);
            }

        } else {
            currentLevel.trees.forEach(tree => tree.children[1].shaking = false);
            if (timeouts.skakTimeOut) {
                timeouts.skakTimeOut?.cancel();
                timeouts.skakTimeOut = undefined;
            }
            sprite.stop();
            sprite.texture = IDLE_TEXTURE;
        }
    }
}


function generateFallParticles(tree, particle_amount) {

    let particles = [];
    const crownX = tree.x;
    const crownY = tree.y + tree.children[1].y;

    for (let i = 0; i < particle_amount * 2 * (random(8, 20) / 8 * particle_amount); i++) {

        const particle = new PIXI.Sprite(SNOWPUFF_TEXTURES[random(0, SNOWPUFF_TEXTURES.length)]);
        particle.x = crownX + (random(0, tree.children[0].width) * (random(0, 2) === 1 ? 1 : -1));
        particle.y = crownY + (random(0, tree.children[0].height) * (random(0, 2) === 1 ? 1 : -1));
        app.stage.addChild(particle);
        particles.push(particle);
    }

    const snowFallInterval = setInterval(function () {
        if (isGamePaused()) return;
        particles.forEach(particle => {
            particle.y += (((tree.y + tree.children[0].height / 2) - (particle.y + particle.height)) / 70) + random(1, 2.5);// random(2, 5);

            if ((particle.y + particle.height) > (tree.y + tree.children[0].height / 2)) {
                particle.destroy();
                particles = particles.filter(e => e !== particle);
            }


        });
        if (particles.length === 0) clearInterval(snowFallInterval);
    }, 10);

}

function move(key) {
    if (['arrowleft', 'a'].includes(key)) {
        if (hitBorder(sprite, -currentSpeed, 0)) return;
        if (!sprite.playing) {
            sprite.textures = ANI_WALK;
            sprite.play();
        }
        sprite.x -= currentSpeed;
        updateMask();
    }
    else if (['arrowright', 'd'].includes(key)) {
        if (hitBorder(sprite, currentSpeed, 0)) return;
        if (!sprite.playing) {
            sprite.textures = ANI_WALK;
            sprite.play();
        }
        sprite.x += currentSpeed;
        updateMask();
    }
    else if (['arrowdown', 's'].includes(key)) {
        if (hitBorder(sprite, 0, currentSpeed)) return;
        if (!sprite.playing) {
            sprite.textures = ANI_WALK;
            sprite.play();
        }
        sprite.y += currentSpeed;
        updateMask();
    }
    else if (['arrowup', 'w'].includes(key)) {
        if (hitBorder(sprite, 0, -currentSpeed)) return;
        if (!sprite.playing) {
            sprite.textures = ANI_WALK;
            sprite.play();
        }
        sprite.y -= currentSpeed;
        updateMask();
    }
}

function hitBorder(player, x, y) {
    const newPos = { x: player.x + x, y: player.y + y };
    if (newPos.x > (WIDTH - player.width) || newPos.x < 0 || newPos.y > (HEIGHT - player.height) || newPos.y < 0) {
        return true;
    }
}


function updateMask() {

    if (!nightData?.enabled) return;

    const playerX = sprite.x + sprite.width / 2;
    const playerY = sprite.y + sprite.height / 2;

    const x = (nightData?.olofView ? olof.x : playerX);
    const y = (nightData?.olofView ? olof.y : playerY);

    const gr = new PIXI.Graphics();
    gr.beginFill(0x0000ff);
    gr.lineStyle(0);
    gr.drawCircle(x, y, (nightData?.olofView ? OLOF_RADIUS : nightData?.radius));
    gr.endFill();

    app.stage.mask = gr;

    if (!nightData?.olofView) {
        nightPlayerCircle.x = playerX;
        nightPlayerCircle.y = playerY;
    }

}


function fallOver(time) {
    sprite.stop();
    fallenOver = true;
    frame = 0;
    const FRAME_TIME = 120;

    timeouts.skakTimeOut?.cancel(); timeouts.skakTimeOut = undefined;

    const reset = function() {
        fallenOver = false;
        sprite.texture = IDLE_TEXTURE;
    }

    const animation = setInterval(() => {
        if (isGamePaused()) return;
        if (frame === 3) {
            clearInterval(animation);

            timeouts.fallenOverTimeOut = new Timer(() => {
                reset();
            }, time * 1000)
            return;
        }
        sprite.texture = ANI_FALL_OVER[frame];
        frame++;
    }, FRAME_TIME);

}







function slowDown() {
    return moveKeys.filter(e => MOVEMENT_KEYS.includes(e)).length > 1;
}


function getTouchSide(r1, r2) {
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