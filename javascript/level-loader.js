


function loadMusic(file) {

    console.log('aaaaaaaa')

    const sound = PIXI.sound.Sound.from(file);
    sound.play();

    var slider = document.getElementById("myRange");
    slider.oninput = function () {
        sound.volume = this.value;
    }

    $('.volume-icon').on('click', function () {
        console.log(!sound.isPlaying)
        if (!sound.isPlaying) {
            sound.resume();
            this.src = './imgs/volume.png';
        } else {
            sound.pause();
            this.src = './imgs/volume_muted.png';
        }
    });
}







function loadLevel(id) {
    const level = LEVELS.find(level => level.id === id);

    if (!level) {
        console.error(`Level "${id}" does not exist!`);
        return;
    } else if (level.tutorial) {
        startTutorial(level);
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

    currentLevel.levelData = level;

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
            // { "x": 500, "y": 500 },
            // { "x": 100, "y": 500 },
            // { "x": 800, "y": 500 },
        ],
        "olof": {
            "enabled": true,
            "spawns": [
                { x: 250, y: 200 },
                { x: 250, y: 200 },
                { x: 250, y: 200 }
            ],
            "speed": 5,
            "roaming": false,
            "huntRadius": 175,
            "roamRadius": 200
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
            "realTime": 3,
        },
        "music": 'music/gtkiajnieoifawhniotftganwiofranfoia.mp3',
        "pointCap": 15000,
    },

    {
        "tutorial": true,
        "id": "tutorial",
        "title": "Tutorial",
        "playerSpeed": 4,
        "music": 'music/gtkiajnieoifawhniotftganwiofranfoia.mp3',
    },


]




