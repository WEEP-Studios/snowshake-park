




function endless() {


    baseSpeed = 4;

    const tilesize = 48;
    const gridHeight = 15;
    const gridWidth = 27;

    const grid = [];

    const treeAmount = random(4, 7);

    for (let i = 0; i < treeAmount; i++) {
        bad = true;

        var x;
        var y;

        while (bad) {
            x = random(1, gridWidth);
            y = random(3, gridHeight);

            bad = (grid.find(t => (t.x === x) &&
                (t.y === y || t.y === y + 1 || t.y === y + 2 || t.y === y + 3
                    || t.y + 1 === y || t.y + 2 === y || t.y + 3 === y)) != undefined);
        }


        grid.push({ type: 'tree', obj: undefined, x: x, y: y })
    }

    const wallAmount = random(4, 8);

    for (let i = 0; i < wallAmount; i++) {
        var bad = true;

        var x;
        var y;
        var dx;
        var dy;

        var wallbad = true;

        if (grid.find(w => w.type === 'wall') == undefined || random(0, 4) == 1) {
            while (bad) {
                x = random(0, gridWidth + 1);
                y = random(0, gridHeight + 1);


                bad = (grid.find(t => (t.x === x) && (t.y === y)) != undefined);
            }
            wallbad = false;
        }
        else {
            var targetWall = grid.filter(w => w.type === 'wall')[random(0, grid.filter(w => w.type === 'wall').length)];

            if (targetWall.dx > 0) {
                x = targetWall.x + random(-1, targetWall.dx + 2);
                if (x >= targetWall.x && x <= targetWall.x + targetWall.dx) {
                    y = random(0, 2) == 1 ? targetWall.y - 1 : targetWall.y + 1;
                }
                else y = targetWall.y;
            }
            else {
                y = targetWall.y + random(-1, targetWall.dy + 2);
                if (y >= targetWall.y && y <= targetWall.y + targetWall.dy) {
                    x = random(0, 2) == 1 ? targetWall.x - 1 : targetWall.x + 1;
                }
                else x = targetWall.x;
            }


            for (const wall of grid.filter(wall => wall.type === 'wall')) {
                if ((y == wall.y && wall.x >= x && wall.x <= x + dx) || (x == wall.x && wall.y >= y && wall.y <= y + dy)) {
                    wallbad = true;
                    break;
                }
                else {
                    wallbad = false;
                }
            }
        }

        var treebad = true;

        if (random(0, 2) == 1) {
            dx = random(3, 10) * (random(0, 2) == 1 ? -1 : 1);
            dy = 0;
        }
        else {
            dy = random(3, 10) * (random(0, 2) == 1 ? -1 : 1);
            dx = 0;
        }

        for (const tree of grid.filter(tree => tree.type === 'tree')) {
            if (((y == tree.y || y == tree.y + 1 || y == tree.y + 2 || y == tree.y + 3) &&
                tree.x >= x && tree.x <= x + dx) || (x == tree.x && tree.y >= y && tree.y <= y + dy)) {
                treebad = true;
                break;
            }
            else {
                treebad = false;
            }
        }

        if (!treebad && !wallbad) grid.push({ type: 'wall', obj: undefined, x: x, y: y, dx: dx, dy: dy })
    }

    const treePositions = [];
    const wallPositions = [];

    grid.forEach(g => {
        if (g.type === 'tree') {
            treePositions.push({ x: (g.x * tilesize), y: (g.y * tilesize) });
        } else if (g.type === 'wall') {
            wallPositions.push({ x: (g.x * tilesize), y: (g.y * tilesize), dx: g.dx * tilesize, dy: g.dy * tilesize });
        }
    });




    const walls = addWalls(wallPositions);
    const trees = addTrees(treePositions);

    walls.forEach(wall => { app.stage.addChild(wall); });
    trees.forEach(tree => { app.stage.addChild(tree); });

    currentLevel.walls = walls;
    currentLevel.trees = trees;



    levelLoaded = true;

}





