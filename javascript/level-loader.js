








function loadLevel(id) {
    const level = LEVELS.find(level => level.id === id);

    if (level.olof?.enabled) {
        loadOlof(level.olof);
    }

    const walls = addWalls(level.wallPositions);
    const trees = addTrees(level.treePositions);

    walls.forEach(wall => { app.stage.addChild(wall); });
    trees.forEach(tree => { app.stage.addChild(tree); });

    currentLevel.trees = trees;
    currentLevel.walls = walls;

    baseSpeed = level.playerSpeed || DEFAULT_baseSpeed;

    if (level.night?.enabled) {
        loadNight(level.night);
    }

    levelLoaded = true;
}

function unLoadLevel() {
    levelLoaded = false;

    currentLevel.walls.forEach(wall => { wall?.destroy({ children: true }); });
    currentLevel.trees.forEach(tree => { tree?.destroy({ children: true }) });
    delete currentLevel.walls;
    delete currentLevel.trees;
    currentLevel = {
        walls: [],
        trees: []
    };

    olofCircle?.destroy(); olofCircle = undefined;
    nightPlayerCircle?.destroy(); nightPlayerCircle = undefined;
    olof?.destroy(); olof = undefined;
}


function loadNight(data) {
    if (nightPlayerCircle) nightPlayerCircle.destroy();

    if (!data.olofView) {
        var gr = new PIXI.Graphics();
        gr.lineStyle(2.5, 0xFFFFFF, 1);

        const points = calcPointsCirc(0, 0, data.radius, 5);

        for (const point of points) {
            gr.moveTo(point.x, point.y);
            gr.lineTo(point.ex, point.ey);
        }

        var texture = app.renderer.generateTexture(gr);
        nightPlayerCircle = new PIXI.Sprite(texture);
        nightPlayerCircle.anchor.set(0.5);

        app.stage.addChild(nightPlayerCircle);
    }

    nightData = data;

    updateMask();
}




const LEVELS = [



    {
        "id": "test",
        "title": "TESTING !!!",
        "wallPositions": [
            { "x1": 100, "y1": 100, "x2": 100 + (10 * WALL_SIZE), "y2": 100 }
        ],
        "treePositions": [
            { "x": 500, "y": 500 },
            { "x": 100, "y": 500 },
            { "x": 800, "y": 500 },
        ],
        "olof": {
            "enabled": true,
            "spawn": { x: 200, y: 200 },
            "radius": 175,
            "speed": 1.5
        },
        "night": {
            "enabled": false,
            "radius": 200,
            "olofView": false
        },
        "playerSpeed": 4,
    }



]




