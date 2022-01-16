




var fps = 5;
setInterval(update, 1000 / fps);

var player = $('#player');
var baseSpeed = 20;
var currentSpeed = baseSpeed;



var pressedKeys = [];

$(document).keydown(function (e) {
    if (!pressedKeys.includes(e.key)) pressedKeys.push(e.key);
});

$(document).keyup(function (e) {
    pressedKeys = pressedKeys.filter(a => a !== e.key);
});


function update() {


    if (slowDown()) {
        currentSpeed = baseSpeed / 2;
    }
    else {
        currentSpeed = baseSpeed;
    }
    for (const key of pressedKeys) {
        move(key);
    }
}


function move(key) {
    if (['ArrowLeft', 'a'].includes(key)) {
        moveLeft();
    }
    else if (['ArrowRight', 'd'].includes(key)) {
        moveRight();
    }
    else if (['ArrowDown', 's'].includes(key)) {
        moveDown();
    }
    else if (['ArrowUp', 'w'].includes(key)) {
        moveUp();
    }
}

function slowDown() {
    const movmentKeys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'w', 'a', 's', 'd'];
    return pressedKeys.filter(e => movmentKeys.includes(e)).length > 1;
}



function moveLeft() {
    const pos = $(player).position();
    $(player).css('left', `${pos.left - currentSpeed}px`);
}

function moveRight() {
    const pos = $(player).position();
    $(player).css('left', `${pos.left + currentSpeed}px`);
}

function moveDown() {
    const pos = $(player).position();
    $(player).css('top', `${pos.top + currentSpeed}px`);
}

function moveUp() {
    const pos = $(player).position();
    $(player).css('top', `${pos.top - currentSpeed}px`);
}







function isCollide(a, b) {
    const posA = $(a).position();
    const posB = $(b).position();
    return !(
        ((posA.top + a.height()) < (posB.top)) ||
        (posA.top > (posB.top + b.height())) ||
        ((posA.left + a.width()) < posB.left) ||
        (posA.left > (posB.left + b.width()))
    );
}
