
function getSurvivingTrees() {
    return currentLevel.trees.filter(t => !t.dead).length;
}
