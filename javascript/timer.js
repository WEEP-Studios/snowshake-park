

function tick() {
    if (isGamePaused()) return;
    currentLevel.timer.setMinutes(currentLevel.timer.getMinutes() + currentLevel.timerSpeed);
    showTimeText(currentLevel.timer.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    if (currentLevel.timer > currentLevel.timeEnd) {
        gameOver(true);
    }
}

function setUpTimer(time) {
    currentLevel.timer = time.start;
    currentLevel.timeEnd = time.end;

    showTimeText(currentLevel.timer.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), time.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    currentLevel.timerSpeed = ((diff_hours(time.start, time.end)) * 30) / time.realTime;
    setInterval(tick, 500);
}

function diff_hours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}

function showTimeText(hour, endHour) {
    $('#timer').text(hour);
    $('#endtimer').text(endHour);
}
