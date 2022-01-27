



function loadOlof(data) {
    olof = new PIXI.Sprite.from('sprites/snowman.png');

    OLOFSPEED = data.speed;

    olof.settings = data;
    olof.radius = data.roaming ? data.roamRadius : data.huntRadius;


    var texture = generateOlofRadiusRing(olof.radius);
    olofCircle = new PIXI.Sprite(texture);
    app.stage.addChild(olofCircle);

    olofCircle.anchor.set(0.5);
    olof.anchor.set(0.5);

    olofCircle.x = olof.x;
    olofCircle.y = olof.y;

    app.stage.addChild(olof);

    respawnOlof();
}


function generateOlofRadiusRing(radius) {
    var gr = new PIXI.Graphics();
    gr.lineStyle(2.5, 0xFFFFFF, 1);
    const points = calcPointsCirc(0, 0, radius, 2);
    for (const point of points) {
        gr.moveTo(point.x, point.y);
        gr.lineTo(point.ex, point.ey);
    }
    return app.renderer.generateTexture(gr);
}


var olofMoveTimes = 0;

function moveOlof(x, y) {

    // for (const wall of currentLevel.walls) {
    //     if (b.hit({ x: olof.x + x, y: olof.y + y - (olof.height / 2) }, wall)) return;
    //     if (b.hit({ x: olof.x + x, y: olof.y + y + (olof.height / 2) }, wall)) return;
    // }

    olof.x = x;
    olof.y = y;
    olofCircle.x = x;
    olofCircle.y = y;

    // if (olofMoveTimes % 4 === 0) {
    //     let test = new PIXI.Sprite.from('sprites/error.png');
    //     test.x = olof.x;
    //     test.y = olof.y;
    //     app.stage.addChild(test);
    // }

    updateMask();
    olofMoveTimes++;
}

function bounceOlofTo(x, y) {

    olof.isBounce = true;

    const startX = JSON.parse(JSON.stringify(olof.x));

    const x1 = x;
    const y1 = y;
    const x2 = olof.x;
    const y2 = olof.y;
    const x3 = (olof.x + x) / 2;
    const y3 = olof.y - 40;

    // const y3 = olof.y - Math.abs(olof.x - sprite.x) / 2;



    const denom = (x1 - x2) * (x1 - x3) * (x2 - x3);
    const A = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denom;
    const B = (x3 * x3 * (y1 - y2) + x2 * x2 * (y3 - y1) + x1 * x1 * (y2 - y3)) / denom;
    const C = (x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / denom;

    const getY = function (x1) {
        return (A * Math.pow(x1, 2) + B * x1 + C);
    }

    const directionRight = (olof.x - x) < 0;


    const moveWith = Math.abs(olof.x - x) / 50;

    let times = 0;

    const olofBouncer = setInterval(() => {
        if (isGamePaused()) return;

        const move = (directionRight ? startX + times : startX - times);

        moveOlof(move, getY(move));
        times += moveWith;

        if ((directionRight && olof.x > x) || (!directionRight && olof.x < x)) {
            clearInterval(olofBouncer);
            olof.isBounce = false;

            olof.coolDown = true;
            setTimeout(() => {
                olof.coolDown = false;
            }, 1000);
        }

        if (b.hit(olof, sprite)) {
            olofLastSawMe = false;
            // moveOlof(olof.settings.spawn.x, olof.settings.spawn.y);
            const side = getLeftRight();
            respawnOlof();
            clearInterval(olofBouncer);
            olof.isBounce = false;
            fallOver(2, side);
        }

    }, 8);

}

function respawnOlof() {
    let closestDist = 10000000000;
    let bestI;
    console.log(olof.settings)
    for (let i = 0; i < olof.settings.spawns.length; i++) {
        const olofSpawnPos = olof.settings.spawns[i];
        const dx = sprite.x - olofSpawnPos.x;
        const dy = sprite.y - olofSpawnPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < closestDist) {
            bestI = i;
            closestDist = distance;
        }
    }
    moveOlof(olof.settings.spawns[bestI].x, olof.settings.spawns[bestI].y)
}


var olofLastSawMe = false;

var olofWayPoint = {
    x: undefined,
    y: undefined
}

var fps = 0;
var fpsList = [];

setInterval(() => {
    if (isGamePaused()) return;
    fpsList.push(fps);
    fps = 0;
}, 1000);

function updateOlof() {
    const x = sprite.x;
    const y = sprite.y;
    const center_x = olofCircle.x;
    const center_y = olofCircle.y;
    const dx = x - (olof.x - (olof.width / 2));
    const dy = y - (olof.y - (olof.height / 2));
    const angle = Math.atan2(dy, dx)
    const velocityY = Math.sin(angle) * OLOFSPEED;
    const velocityX = Math.cos(angle) * OLOFSPEED;

    fps++;

    

    if (doesOlofSeeMe(center_x, center_y, x, y, dx, dy, angle) && !fallenOver) {
        levelStats.olofFrames++;
        olofLastSawMe = true;
        if (!olof.isBounce) bounceOlofTo(olof.x + (velocityX * 10), (olof.y + velocityY * 10));

        if (olof.radius < olof.settings.huntRadius) olof.radius += 4;
        olofCircle.texture = generateOlofRadiusRing(olof.radius);
    } else {
        if (olofLastSawMe) levelStats.olofEscapes++;
        olofLastSawMe = false;

        if (olof.radius > olof.settings.roamRadius) olof.radius -= 4;
        olofCircle.texture = generateOlofRadiusRing(olof.radius);

        if (olof.settings.roaming) {

            if (!olofWayPoint.x || isPointInCircle(olofWayPoint.x, olofWayPoint.y, 250, olof.x, olof.y)) {
                olofWayPoint.x = random(0, WIDTH);
                olofWayPoint.y = random(0, HEIGHT);
            }

            const x = olofWayPoint.x;
            const y = olofWayPoint.y;
            const dx = x - (olof.x - (olof.width / 2));
            const dy = y - (olof.y - (olof.height / 2));
            const angle = Math.atan2(dy, dx)
            const velocityY = Math.sin(angle) * OLOFSPEED;
            const velocityX = Math.cos(angle) * OLOFSPEED;

            if (!olof.isBounce && !olof.coolDown) bounceOlofTo(olof.x + (velocityX * 10), (olof.y + velocityY * 10));

        }
    }
}

function doesOlofSeeMe(center_x, center_y, x, y, dx, dy, angle) {
    if (isPointInCircle(center_x, center_y, olof.radius, x, y)
        || isPointInCircle(center_x, center_y, olof.radius, (x + sprite.width), (y + sprite.height))
        || isPointInCircle(center_x, center_y, olof.radius, (x + sprite.width), y)
        || isPointInCircle(center_x, center_y, olof.radius, x, (y + sprite.height))) {
        const points = [];
        const hyp = Math.sqrt((dx * dx) + (dy * dy));

        for (let i = 0; i < hyp; i++) {
            const calcX = Math.cos(angle) * i;
            const calcY = Math.sin(angle) * i;
            points.push({ x: olof.x + calcX, y: olof.y + calcY })
        }

        for (const point of points) {
            for (const wall of currentLevel.walls) {
                if (b.hit(point, wall)) {
                    return false;
                }
            }
            // for (const tree of currentLevel.trees) {
            //     if (b.hit(point, tree.children[1])) {
            //         return false;
            //     }
            // }
        }
        return true;
    } else return false;
}


function isInRectangle(centerX, centerY, radius, x, y) {
    return x >= centerX - radius && x <= centerX + radius &&
        y >= centerY - radius && y <= centerY + radius;
}

function isPointInCircle(centerX, centerY, radius, x, y) {
    if (isInRectangle(centerX, centerY, radius, x, y)) {
        dx = centerX - x;
        dy = centerY - y;
        dx *= dx;
        dy *= dy;
        distanceSquared = dx + dy;
        radiusSquared = radius * radius;
        return distanceSquared <= radiusSquared;
    }
    return false;
}












function calcPointsCirc(cx, cy, rad, dashLength) {
    var n = rad / dashLength,
        alpha = Math.PI * 2 / n,
        pointObj = {},
        points = [],
        i = -1;

    while (i < n) {
        var theta = alpha * i,
            theta2 = alpha * (i + 1);

        points.push({ x: (Math.cos(theta) * rad) + cx, y: (Math.sin(theta) * rad) + cy, ex: (Math.cos(theta2) * rad) + cx, ey: (Math.sin(theta2) * rad) + cy });
        i += 2;
    }
    return points;
}


// raycastsss.forEach(ray => {
//     ray.destroy();
// });
// var raycastsss = [];
// let test = new PIXI.Sprite.from('sprites/error.png');
// test.x = point.x;
// test.y = point.y;
// raycastsss.push(test);
// app.stage.addChild(test);