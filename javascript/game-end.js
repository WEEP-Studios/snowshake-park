


function gameOver(success) {

    if (tutorial) return;

    const totaltrees = JSON.parse(JSON.stringify(currentLevel.trees.length));
    const levelData = JSON.parse(JSON.stringify(currentLevel.levelData));
    const aliveTrees = getSurvivingTrees();

    unLoadLevel();

    

    console.warn('AAAAA', success);

    $('.game-over-screen').show();
    $('.timer').hide();

    let sum = 0; fpsList.forEach(fps => sum += fps);
    const avrageFPS = sum / fpsList.length;
    console.log('time in olof is', Math.round((levelStats.olofFrames / avrageFPS) * 100) / 100);

    $(`
    
    <table class="stats-table">



    <tr>
        <td>Alive trees left</td>
        <td>${aliveTrees} of ${totaltrees}</td>
    </tr>

    <tr>
        <td>Total tree shakes</td>
        <td>${levelStats.treeShakes}</td>
    </tr>

    <tr>
        <td>Time within Olof's range</td>
        <td>${(Math.round((levelStats.olofFrames / avrageFPS) * 100) / 100)}s</td>
    </tr>

    <tr>
        <td>Times escaped from Olof</td>
        <td>${levelStats.olofEscapes}</td>
    </tr>

    <tr>
      <td>Knockdowns from Olof</td>
      <td>${levelStats.olofKnocks}</td>
    </tr>


  </table>

    `).appendTo('.stats');




    $('.slider-container').show();


    let pointSum = 0;

    /**
     * för varje levande träd: 10000 poäng
     * alla träd bonus: 10000 poäng
     * skaka träd: 600p
     * olof escape: 1500p
     * olof träff: -2000p
     */

    pointSum += aliveTrees * 10000;
    pointSum += (aliveTrees === totaltrees ? 10000 : 0);
    pointSum += levelStats.treeShakes * 600;
    pointSum -= levelStats.olofEscapes * 1500;
    pointSum -= levelStats.olofKnocks * 2000;

    pointSum = (pointSum < 0 ? 0 : pointSum);

    if ((levelData.pointCap * 0.2) > pointSum) success = false;


    $(`#${success ? 'levelClear' : 'gameOver'}`).show();

    $('#star1').attr('src', `./imgs/star_small${(levelData.pointCap * 0.2) <= pointSum && success ? '1' : '0'}.png`); // 20%
    $('#star2').attr('src', `./imgs/star_big${(levelData.pointCap * 0.5) <= pointSum && success ? '1' : '0'}.png`); // 50%
    $('#star3').attr('src', `./imgs/star_small${levelData.pointCap <= pointSum && success ? '1' : '0'}.png`); // 100%


    sound.pause();

    setTimeout(() => {
        PIXI.sound.Sound.from({
            url: `music/${success ? 'VictoryEffectAlt1' : 'DefeatAlt1'}.mp3`,
            autoPlay: true,
            complete: function() {
                sound.resume();
            }
        });
    }, 200);

    


}


