









function updateMovementInteraction() {
    currentSpeed = slowDown() ? BASESPEED / 2 : BASESPEED;

    for (const key of moveKeys) {
        move(key);
    }

    for (const key of interactKeys) {
        interact(key);
    }

    for (const wall of currentLevel.walls) {
        (b.hit(sprite, wall, true))
    }
    for (const tree of currentLevel.trees) {
        (b.hit(sprite, tree.children[1], true));
    }

    if (moveKeys.length === 0 && interactKeys.length === 0) {
        sprite.stop();
        sprite.texture = IDLE_TEXTURE;
        clearTimeout(skakTimeOut);
        skakTimeOut = undefined;
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

            if (skakTimeOut === undefined) {
                skakTimeOut = setTimeout(() => {
                    crown.texture = CROWN_TEXTURES[crown.textureName]._0;
                    crown.textureState = 0;

                    // clearing
                    clearTimeout(skakTimeOut);
                    skakTimeOut = undefined;
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
            clearTimeout(skakTimeOut);
            skakTimeOut = undefined;
            sprite.stop();
            sprite.texture = IDLE_TEXTURE;
        }
    }
}





function move(key) {
    if (['arrowleft', 'a'].includes(key)) {
        if (hitBorder(sprite, -currentSpeed, 0)) return;
        if (!sprite.playing) {
            sprite.textures = ANI_WALK;
            sprite.play();
        }
        sprite.x -= currentSpeed;
    }
    else if (['arrowright', 'd'].includes(key)) {
        if (hitBorder(sprite, currentSpeed, 0)) return;
        if (!sprite.playing) {
            sprite.textures = ANI_WALK;
            sprite.play();
        }
        sprite.x += currentSpeed;
    }
    else if (['arrowdown', 's'].includes(key)) {
        if (hitBorder(sprite, 0, currentSpeed)) return;
        if (!sprite.playing) {
            sprite.textures = ANI_WALK;
            sprite.play();
        }
        sprite.y += currentSpeed;
    }
    else if (['arrowup', 'w'].includes(key)) {
        if (hitBorder(sprite, 0, -currentSpeed)) return;
        if (!sprite.playing) {
            sprite.textures = ANI_WALK;
            sprite.play();
        }
        sprite.y -= currentSpeed;
    }
}

function hitBorder(player, x, y) {
    const newPos = { x: player.x + x, y: player.y + y };
    if (newPos.x > (WIDTH - player.width) || newPos.x < 0 || newPos.y > (HEIGHT - player.height) || newPos.y < 0) {
        return true;
    }
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