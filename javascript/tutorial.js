noEButton = false;

const E = new PIXI.Sprite.from('imgs/tutorial/E.png');


const arrow1 = new PIXI.Sprite.from('imgs/tutorial/arrow.png');
const arrow2 = new PIXI.Sprite.from('imgs/tutorial/arrow.png');

var stage2 = false;

function spawnEButton(x, y) {
    E.x = x;
    E.y = y;
    app.stage.addChild(E);
}

function spawnPart2() {
    noEButton = true;
    E.alpha = 0;

    setTimeout(() => {

        stage2 = true;

        const wallStartX = 900;
        const wallStartY = 160;

        const wallEndX = wallStartX + 4 * WALL_SIZE;
        const wallEndY = wallStartY + 4 * WALL_SIZE;
        const wallLength = 4 * WALL_SIZE;

        const walls = addWalls([
            {x: wallStartX, y: wallEndY, dx: wallLength + WALL_SIZE, dy: 0},
            {x: wallStartX, y: wallStartY, dx: 0, dy: wallLength},
            {x: wallEndX, y: wallStartY, dx: 0, dy: wallLength}
        ]);

        currentLevel.walls = walls;
        
        for (const wall of walls) {
            app.stage.addChild(wall);
        }


        // x: 1000 y: 200

        loadOlof({
            "enabled": true,
            "spawns": [
                { x: 1000, y: 200 }
            ],
            "speed": 5,
            "roaming": false,
            "huntRadius": 300,
            "roamRadius": 200
        });


        arrow1.x = 1000;
        arrow1.y = 175;
        arrow1.anchor.set(1, 1);
        app.stage.addChild(arrow1);

        arrow2.x = 300;
        arrow2.y = 600;
        arrow2.anchor.set(1, 1);
        app.stage.addChild(arrow2);


    }, 1000);
}

var tutTree;

function startTutorial(level) {
    spawnEButton(180, 80);

    tutorial = true;

    baseSpeed = level.playerSpeed || DEFAULT_baseSpeed;



    tutTree = addTrees([{ "x": 100, "y": 200 }], true)
    app.stage.addChild(tutTree[0]);
    currentLevel.trees = tutTree;



    levelLoaded = true;

    app.ticker.add(tutLoop);
}

function tutLoop() {
    if (!noEButton) {
        E.animTimer = E.animTimer == undefined ? 0 : E.animTimer + 1;
        if (E.animTimer % 30 >= 10) {
            E.y = 100;
        }
        else if (!interactKeys.includes('e')) {
            E.y = 80;
        }
    }

    if (isPointInCircle(130, 230, 75, sprite.x + sprite.width, sprite.y + sprite.height) && !noEButton) E.alpha = 1;
    else E.alpha = 0;

    if (isPointInCircle(300, 600, 50, olof?.x, olof?.y) && stage2) {
        
        app.ticker.remove(tutLoop);

        $('.tutorial-pics').addClass('open-gamemode-chooser');
        $('.tutorial-pics').show();

    }
}


function movePlayerToTree() {
    sprite.x = 100;
    sprite.y = 200;
}
