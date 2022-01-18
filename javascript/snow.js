



function updateTrees() {



    for (const tree of currentLevel.trees) {
        const crown = tree.children[1];
        console.log('update');
        if (random(0, 15) > 12 && !crown.shaking && !tree.dead) {
            const textureState = crown.textureState;
            if (textureState === TREE_DEAD_STATE) {
                tree.dead = true;
                break;
            };
            crown.texture = CROWN_TEXTURES[crown.textureName][`_${(textureState + 1)}`];
            crown.textureState += 1;
            break;
        }

    }
    



}

