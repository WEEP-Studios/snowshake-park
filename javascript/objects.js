

function addTrees(treePositions) {
    const trees = [];

    for (const treePosition of treePositions) {
        const currentTree = new PIXI.Container();
        const stump = PIXI.Sprite.from(STUMPS[random(0, 2)]);
        const crownTexture = Object.keys(CROWN_TEXTURES)[random(0, 2)];
        const crown = PIXI.Sprite.from(`sprites/error.png`);
        stump.anchor.set(0.5);
        crown.anchor.set(0.5);
        crown.texture = CROWN_TEXTURES[crownTexture]._0;
        crown.textureName = crownTexture;
        crown.textureState = 0;
        crown.shaking = false;
        crown.y = -83;
        currentTree.addChild(stump);
        currentTree.addChild(crown);
    
        currentTree.x = treePosition.x;
        currentTree.y = treePosition.y;
        currentTree.ox = currentTree.x; // original x pos
        currentTree.oy = currentTree.y; // original y pos
    
        trees.push(currentTree);
    }

    return trees;
}


function addWalls(wallPositions) {
    const walls = [];

    for (const wallPosition of wallPositions) {
        const currentWall = new PIXI.Container();
        currentWall.x = wallPosition.x1;
        currentWall.y = wallPosition.y1;
        const dy = wallPosition.y2 - wallPosition.y1;
        const dx = wallPosition.x2 - wallPosition.x1;
    
        for (let i = 0; i < Math.abs(dy) / WALL_SIZE; i++) {
            const wallBlock = PIXI.Sprite.from('sprites/wall_up_down.png');
            wallBlock.y = i * 32;
            currentWall.addChild(wallBlock);
        }

        for (let i = 0; i < Math.abs(dx) / WALL_SIZE; i++) {
            const wallBlock = PIXI.Sprite.from('sprites/wall_left_right.png');
            wallBlock.x = i * WALL_SIZE;
            currentWall.addChild(wallBlock);
        }

        walls.push(currentWall);
    }

    return walls;
}

