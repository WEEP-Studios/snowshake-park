



function loadOlof(data) {
    olof = new PIXI.Sprite.from('sprites/snowman.png');

    OLOF_RADIUS = data.radius;

    OLOFSPEED = data.speed;

    olof.x = data.spawn.x;
    olof.y = data.spawn.y

    var gr = new PIXI.Graphics();
    gr.lineStyle(2.5, 0xFFFFFF, 1);

    const points = calcPointsCirc(0, 0, OLOF_RADIUS, 2);

    for (const point of points) {
        gr.moveTo(point.x, point.y);
        gr.lineTo(point.ex, point.ey);
    }

    var texture = app.renderer.generateTexture(gr);
    olofCircle = new PIXI.Sprite(texture);
    app.stage.addChild(olofCircle);

    olofCircle.anchor.set(0.5);
    olof.anchor.set(0.5);



    olofCircle.x = olof.x;
    olofCircle.y = olof.y;



    app.stage.addChild(olof);
}

function moveOlof(x, y) {

    // for (const wall of currentLevel.walls) {
    //     if (b.hit({ x: olof.x + x, y: olof.y + y - (olof.height / 2) }, wall)) return;
    //     if (b.hit({ x: olof.x + x, y: olof.y + y + (olof.height / 2) }, wall)) return;
    // }

    olof.x += x;
    olof.y += y;
    olofCircle.x += x;
    olofCircle.y += y;

    updateMask();

}

function bounceOlofTo(x, y) {

    olof.isBounce = true;

    const a  = -0.06;
    const c = (olof.x + x) / 2;
    const k = y - (a * (Math.pow(x - c, 2)));

    console.log(`f(x) = ${a} * (x - ${c})^2 + ${k}`);
    console.log(`B = (${x}, ${y})`);
    console.log(`A = (${olof.x}, ${olof.y})`);

    const dx = x - olof.x;
    const dy = y- olof.y;

    const timesToUpdate = dx / 0.3;

    let times = 0;
    

    const olofBouncer = setInterval(function() {
        if (isGamePaused()) return;

        const moveX = dx / timesToUpdate * times;
        moveOlof(moveX, 0);

        moveOlof(0, -getBounceY(a, c, k, olof.x + moveX));

        times++;

        // if (olof.x >= x) {
        //     olof.isBounce = false;
        //     clearInterval(olofBouncer);
        // }

    }, 30)

}

function getBounceY(a, c, k, x) {
    return a * Math.pow(x - c, 2) + k;
}



function updateOlof() {
    const x = sprite.x;
    const y = sprite.y;
    const center_x = olofCircle.x;
    const center_y = olofCircle.y;
    const dx = sprite.x - olof.x;
    const dy = sprite.y - olof.y;
    const angle = Math.atan2(dy, dx)
    const velocityY = Math.sin(angle) * OLOFSPEED;
    const velocityX = Math.cos(angle) * OLOFSPEED;

    if (doesOlofSeeMe(center_x, center_y, x, y, dx, dy, angle)) {
        // moveOlof(olof, velocityX, velocityY);
        if (!olof.isBounce) bounceOlofTo(x, y);
    }
}



function doesOlofSeeMe(center_x, center_y, x, y, dx, dy, angle) {
    if (isPointInCircle(center_x, center_y, OLOF_RADIUS, x, y)) {
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




// var raycastsss = [];
// let test = new PIXI.Sprite.from('sprites/error.png');
// test.x = point.x;
// test.y = point.y;
// raycastsss.push(test);
// app.stage.addChild(test);