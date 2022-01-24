


function gameOver(success) {

    unLoadLevel();

    

    console.warn('AAAAA', success);

    $('.game-over-screen').show();
    $('.timer').hide();

    let sum = 0; fpsList.forEach(fps => sum += fps);
    const avrageFPS = sum / fpsList.length;
    console.log('time in olof is', Math.round(levelStats.olofFrames / avrageFPS));


}


