



function updateTrees() {

    if (isGamePaused()) return;

    if (getSurvivingTrees() === 0) gameOver(false); 

    for (const tree of currentLevel.trees) {
        const crown = tree.children[1];
        if (random(0, 15) > 12 && !crown.shaking && !tree.dead) {
            const textureState = crown.textureState;
            if (textureState === TREE_DEAD_STATE) {
                break;
            };
            crown.texture = CROWN_TEXTURES[crown.textureName][`_${(textureState + 1)}`];
            if ((textureState + 1) === TREE_DEAD_STATE) {
                tree.children[0].texture = STUMPS_TEXTURES[tree.children[0].textureName].dead;
                tree.children[2].alpha = 1;
                tree.dead = true;
            }
            crown.textureState += 1;
            break;
        }

    }
    
}

