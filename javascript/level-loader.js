


function loadMusic(file) {
    const sound = PIXI.sound.Sound.from(file);
    sound.play();
}







function loadLevel(id) {
    const level = LEVELS.find(level => level.id === id);

    if (!level) {
        console.error(`Level "${id}" does not exist!`);
        return;
    }

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

    if (level.music) loadMusic(level.music);

    
    setUpTimer(level.time);


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
            // { "x1": 100, "y1": 100, "x2": 100 + (10 * WALL_SIZE), "y2": 100 }
        ],
        "treePositions": [
            { "x": 500, "y": 500 },
            // { "x": 100, "y": 500 },
            // { "x": 800, "y": 500 },
        ],
        "olof": {
            "enabled": true,
            "spawn": { x: 900, y: 200 },
            "speed": 5,
            "roaming": true,
            "huntRadius": 175,
            "roamRadius": 100
        },
        "night": {
            "enabled": false,
            "radius": 200,
            "olofView": false
        },
        "playerSpeed": 4,
        "time": {
            "start": new Date('2069-04-20 09:00'),
            "end": new Date('2069-04-20 15:00'),
            "realTime": 20,
        },
        "music": 'music/gtkiajnieoifawhniotftganwiofranfoia.mp3'
    },



    {
        "id": "level_1",
        "title": "level 2 (test)",
        "wallPositions": [],
        "treePositions": [
            { "x": 592, "y": 323 },
            { "x": 798, "y": 598 },
            { "x": 1003, "y": 283 },
        ],
        "playerSpeed": 4,
    },

    {
        "id": "level_2",
        "title": "level 2 (test)",
        "wallPositions": [],
        "treePositions": [
            { "x": 328, "y": 420 },
            { "x": 255, "y": 319 },
        ],
        "olof": {
            "enabled": true,
            "spawn": { x: 900, y: 200 },
            "radius": 250,
            "speed": 5
        },
        "playerSpeed": 4,
    }



]




