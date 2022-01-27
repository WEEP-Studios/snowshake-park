
let sound;

function loadMusic(file) {

    sound = PIXI.sound.Sound.from(file);
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

    baseSpeed = level.player.speed || DEFAULT_baseSpeed;

    sprite.x = level.player.spawn.x;
    sprite.y = level.player.spawn.y;

    addSnowParticles(level.snowParticleAmount);
    setInterval(updateTrees, level.snowTimer);

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
            "realTime": 3,
        },
        "music": 'music/gtkiajnieoifawhniotftganwiofranfoia.mp3',
        "pointCap": 1500000000000,
    },

    {
        "tutorial": true,
        "id": "tutorial",
        "title": "Tutorial",
        "playerSpeed": 4,
        "music": 'music/gtkiajnieoifawhniotftganwiofranfoia.mp3',
    },

    {
        "id": "level_1",
        "title": "Level 1",
        "wallPositions": [
            {x: 250, y: 150, dx: 0, dy: 7 * WALL_SIZE},
            {x: 250 + WALL_SIZE, y: 150 + 3 * WALL_SIZE, dx: 13 * WALL_SIZE, dy: 0},
            {x: 250 + 14 * WALL_SIZE, y: 150, dx: 0, dy: 7 * WALL_SIZE},
            {x: 250 + 4 * WALL_SIZE, y: 150 + 4 * WALL_SIZE, dx: 0, dy: 3 * WALL_SIZE}
        ],
        "treePositions": [
            { "x": 500, "y": 600 },
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
            "roaming": true,
            "huntRadius": 175,
            "roamRadius": 100
        },
        "night": {
            "enabled": false,
            "radius": 200,
            "olofView": false
        },
        "player": {
            "speed": 4,
            "spawn": {x: 1000, y: 500}
        },
        "snowTimer": 1500,
        "snowParticleAmount": 150,
        "time": {
            "start": new Date('2069-04-20 09:00'),
            "end": new Date('2069-04-20 15:00'),
            "realTime": 180,
        },
        "music": 'music/gtkiajnieoifawhniotftganwiofranfoia.mp3',
        "pointCap": 150000000,
    }


]




