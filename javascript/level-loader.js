








function loadLevel(id) {
    const level = LEVELS.find(level => level.id === id);

    const walls = addWalls(level.wallPositions);
    const trees = addTrees(level.treePositions);

    walls.forEach(wall => { app.stage.addChild(wall); });
    trees.forEach(tree => { app.stage.addChild(tree); });

    currentLevel.trees = trees;
    currentLevel.walls = walls;
}






const LEVELS = [



    {
        "id": "test",
        "title": "TESTING !!!",
        "wallPositions": [
            { "x1": 100, "y1": 100, "x2": 164, "y2": 100 }
        ],
        "treePositions": [
            { "x": 500, "y": 500 },
            { "x": 100, "y": 500 },
            { "x": 800, "y": 500 },
        ]
    }



]




