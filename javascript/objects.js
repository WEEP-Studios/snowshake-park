

function addTrees(treePositions, tutorial = false) {
    const trees = [];

    for (const treePosition of treePositions) {
        const currentTree = new PIXI.Container();

        const stumpTexture = Object.keys(STUMPS_TEXTURES)[random(0, 2)];
        const stump = PIXI.Sprite.from(`sprites/error.png`);

        const crownTexture = Object.keys(CROWN_TEXTURES)[random(0, 2)];
        const crown = PIXI.Sprite.from(`sprites/error.png`);

        const collapsed = PIXI.Sprite.from(`sprites/tree_leaves1_collapsed.png`);
        collapsed.alpha = 0;

        stump.texture = STUMPS_TEXTURES[stumpTexture].alive;
        stump.textureName = stumpTexture;
        stump.anchor.set(0.5);

        crown.anchor.set(0.5);
        crown.texture = CROWN_TEXTURES[crownTexture][`${tutorial ? '_3' : '_0'}`];
        crown.textureName = crownTexture;
        crown.textureState = (tutorial ? 3 : 0);
        crown.shaking = false;
        crown.y = -83;

        collapsed.anchor.set(0.5);

        currentTree.addChild(stump);
        currentTree.addChild(crown);
        currentTree.addChild(collapsed);

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
            wallBlock.y = i * WALL_SIZE;
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

