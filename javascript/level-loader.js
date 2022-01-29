
let sound;

function loadMusic(file) {

  sound = PIXI.sound.Sound.from(file);
  sound.loop = true;
  sound.play();

  var slider = document.getElementById("myRange");
  slider.oninput = function () {
    sound.volume = this.value;
  }

  $('.volume-icon').on('click', function () {
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
  var level = LEVELS.find(level => level.id === id);

  if (level == undefined) {
    var exportedLevels = JSON.parse(localStorage.getItem('exportedLevels'));
    if (exportedLevels != null) {
      level = exportedLevels.find(level => level.id === id);
    }
  }

  if (level == undefined) {
    console.error(`Level "${id}" does not exist!`);
    return;
  } else if (level.tutorial) {
    startTutorial(level);
    return;
  } else if (level.endless) {
    endless();
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

  setTimeout(() => {
    levelLoaded = true;

  }, 500);




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
    "tutorial": true,
    "id": "tutorial",
    "title": "Tutorial",
    "playerSpeed": 4,
    "music": 'music/gtkiajnieoifawhniotftganwiofranfoia.mp3',
  },

  {
    "endless": true,
    "id": "endless",
    "title": "Endless",
    "music": 'music/gtkiajnieoifawhniotftganwiofranfoia.mp3',
  },

  
  {
    "id": "level_11",
    "title": "Level 11",
    "wallPositions": [
      {
        "x": 336,
        "y": 288,
        "dx": 624,
        "dy": 0
      },
      {
        "x": 288,
        "y": 144,
        "dx": 0,
        "dy": 336
      },
      {
        "x": 960,
        "y": 144,
        "dx": 0,
        "dy": 336
      },
      {
        "x": 576,
        "y": 0,
        "dx": 0,
        "dy": 288
      },
      {
        "x": 624,
        "y": 0,
        "dx": 0,
        "dy": 288
      },
      {
        "x": 672,
        "y": 0,
        "dx": 0,
        "dy": 288
      },
      {
        "x": 528,
        "y": 336,
        "dx": 0,
        "dy": 144
      },
      {
        "x": 720,
        "y": 336,
        "dx": 0,
        "dy": 144
      }
    ],
    "treePositions": [
      {
        "x": 459,
        "y": 227
      },
      {
        "x": 843,
        "y": 227
      },
      {
        "x": 651,
        "y": 467
      }
    ],
    "olof": {
      "enabled": true,
      "spawns": [
        {
          "x": 384,
          "y": 384
        },
        {
          "x": 864,
          "y": 384
        }
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
      "spawn": {
        "x": 1200,
        "y": 48
      }
    },
    "snowTimer": 1500,
    "snowParticleAmount": 150,
    "time": {
      "start": "2069-04-20 09:00",
      "end": "2069-04-20 15:00",
      "realTime": 80
    },
    "music": "music/gtkiajnieoifawhniotftganwiofranfoia.mp3",
    "pointCap": 150000000
  },

  {
    "id": "fan-1643417907297",
    "title": "fan",
    "wallPositions": [
      {
        "x": 192,
        "y": 240,
        "dx": 0,
        "dy": 240
      },
      {
        "x": 1056,
        "y": 240,
        "dx": 0,
        "dy": 240
      },
      {
        "x": 240,
        "y": 336,
        "dx": 384,
        "dy": 0
      },
      {
        "x": 672,
        "y": 336,
        "dx": 384,
        "dy": 0
      },
      {
        "x": 624,
        "y": 192,
        "dx": 0,
        "dy": 336
      },
      {
        "x": 480,
        "y": 528,
        "dx": 336,
        "dy": 0
      },
      {
        "x": 480,
        "y": 144,
        "dx": 336,
        "dy": 0
      }
    ],
    "treePositions": [
      {
        "x": 648,
        "y": 109
      },
      {
        "x": 120,
        "y": 397
      },
      {
        "x": 648,
        "y": 637
      },
      {
        "x": 1176,
        "y": 397
      }
    ],
    "olof": {
      "enabled": true,
      "spawns": [
        {
          "x": 48,
          "y": 192
        },
        {
          "x": 384,
          "y": 48
        },
        {
          "x": 1056,
          "y": 48
        },
        {
          "x": 1056,
          "y": 576
        },
        {
          "x": 288,
          "y": 576
        }
      ],
      "speed": 4,
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
      "speed": 5,
      "spawn": {
        "x": 1008,
        "y": 576
      }
    },
    "snowTimer": 1500,
    "snowParticleAmount": 100,
    "time": {
      "start": "2069-04-20 09:00",
      "end": "2069-04-20 15:00",
      "realTime": 70
    },
    "music": "music/Alt3Bakgrunds.mp3",
    "pointCap": 42069
  },

  {
    "__LINK": "https://weep-studios.itch.io/snowshake-park",
    "id": "level_3-1643417741374",
    "title": "level_3",
    "wallPositions": [
      {
        "x": 624,
        "y": 0,
        "dx": 0,
        "dy": 384
      }
    ],
    "treePositions": [
      {
        "x": 264,
        "y": 205
      },
      {
        "x": 408,
        "y": 205
      },
      {
        "x": 1032,
        "y": 205
      },
      {
        "x": 888,
        "y": 205
      }
    ],
    "olof": {
      "enabled": false,
      "spawns": [],
      "speed": 4,
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
      "speed": 5,
      "spawn": {
        "x": 624,
        "y": 432
      }
    },
    "snowTimer": 2000,
    "snowParticleAmount": 30,
    "time": {
      "start": "2069-04-20 08:00",
      "end": "2069-04-20 17:00",
      "realTime": 60
    },
    "music": "music/menu-music.mp3",
    "pointCap": 45000
  },

  {
    "__LINK": "https://weep-studios.itch.io/snowshake-park",
    "id": "level_6-1643418995305",
    "title": "level_6",
    "wallPositions": [
      {
        "x": 288,
        "y": 480,
        "dx": 720,
        "dy": 0
      },
      {
        "x": 288,
        "y": 192,
        "dx": 240,
        "dy": 0
      },
      {
        "x": 768,
        "y": 192,
        "dx": 240,
        "dy": 0
      },
      {
        "x": 240,
        "y": 192,
        "dx": 0,
        "dy": 336
      },
      {
        "x": 1008,
        "y": 192,
        "dx": 0,
        "dy": 336
      }
    ],
    "treePositions": [
      {
        "x": 120,
        "y": 637
      },
      {
        "x": 1176,
        "y": 637
      },
      {
        "x": 408,
        "y": 397
      },
      {
        "x": 888,
        "y": 397
      },
      {
        "x": 120,
        "y": 109
      },
      {
        "x": 1176,
        "y": 109
      },
      {
        "x": 648,
        "y": 397
      }
    ],
    "olof": {
      "enabled": true,
      "spawns": [
        {
          "x": 1152,
          "y": 384
        },
        {
          "x": 624,
          "y": 624
        },
        {
          "x": 48,
          "y": 336
        },
        {
          "x": 528,
          "y": 336
        },
        {
          "x": 720,
          "y": 336
        }
      ],
      "speed": 4,
      "roaming": true,
      "huntRadius": 200,
      "roamRadius": 175
    },
    "night": {
      "enabled": false,
      "radius": 200,
      "olofView": false
    },
    "player": {
      "speed": 5,
      "spawn": {
        "x": 1008,
        "y": 48
      }
    },
    "snowTimer": 1400,
    "snowParticleAmount": 120,
    "time": {
      "start": "2069-04-20 09:00",
      "end": "2069-04-20 15:00",
      "realTime": 90
    },
    "music": "music/menu-music.mp3",
    "pointCap": 72000
  },

  {
    "__LINK": "https://weep-studios.itch.io/snowshake-park",
    "id": "level_night-1643418926203",
    "title": "level_night",
    "wallPositions": [
      {
        "x": 0,
        "y": 336,
        "dx": 432,
        "dy": 0
      },
      {
        "x": 624,
        "y": 336,
        "dx": 192,
        "dy": 0
      },
      {
        "x": 1008,
        "y": 336,
        "dx": 288,
        "dy": 0
      },
      {
        "x": 576,
        "y": 528,
        "dx": 0,
        "dy": 192
      },
      {
        "x": 672,
        "y": 0,
        "dx": 0,
        "dy": 192
      }
    ],
    "treePositions": [
      {
        "x": 264,
        "y": 301
      },
      {
        "x": 1128,
        "y": 301
      },
      {
        "x": 1032,
        "y": 637
      },
      {
        "x": 216,
        "y": 637
      }
    ],
    "olof": {
      "enabled": true,
      "spawns": [
        {
          "x": 1200,
          "y": 48
        },
        {
          "x": 48,
          "y": 48
        },
        {
          "x": 48,
          "y": 624
        },
        {
          "x": 1248,
          "y": 624
        }
      ],
      "speed": 4,
      "roaming": true,
      "huntRadius": 175,
      "roamRadius": 100
    },
    "night": {
      "enabled": true,
      "radius": 200,
      "olofView": false
    },
    "player": {
      "speed": 5,
      "spawn": {
        "x": 672,
        "y": 432
      }
    },
    "snowTimer": 2000,
    "snowParticleAmount": 70,
    "time": {
      "start": "2069-04-20 09:00",
      "end": "2069-04-20 15:00",
      "realTime": 50
    },
    "music": "music/gtkiajnieoifawhniotftganwiofranfoia.mp3",
    "pointCap": 50000
  },

  {
    "__LINK": "https://weep-studios.itch.io/snowshake-park",
    "id": "olof_view_night-1643419237024",
    "title": "olof_view_night",
    "wallPositions": [
      {
        "x": 336,
        "y": 192,
        "dx": 528,
        "dy": 0
      },
      {
        "x": 48,
        "y": 432,
        "dx": 192,
        "dy": 0
      },
      {
        "x": 960,
        "y": 432,
        "dx": 192,
        "dy": 0
      },
      {
        "x": 432,
        "y": 576,
        "dx": 336,
        "dy": 0
      }
    ],
    "treePositions": [
      {
        "x": 1032,
        "y": 637
      },
      {
        "x": 168,
        "y": 637
      },
      {
        "x": 600,
        "y": 493
      },
      {
        "x": 1032,
        "y": 205
      },
      {
        "x": 168,
        "y": 205
      }
    ],
    "olof": {
      "enabled": true,
      "spawns": [
        {
          "x": 576,
          "y": 144
        }
      ],
      "speed": 4,
      "roaming": false,
      "huntRadius": 275,
      "roamRadius": 275
    },
    "night": {
      "enabled": true,
      "radius": 275,
      "olofView": true
    },
    "player": {
      "speed": 5,
      "spawn": {
        "x": 576,
        "y": 288
      }
    },
    "snowTimer": 1500,
    "snowParticleAmount": 70,
    "time": {
      "start": "2069-04-20 09:00",
      "end": "2069-04-20 15:00",
      "realTime": 60
    },
    "music": "music/Backgrund__Intense_v1.mp3",
    "pointCap": 64000
  },

  {
    "__LINK": "https://weep-studios.itch.io/snowshake-park",
    "id": "level_8-1643419574860",
    "title": "level_8",
    "wallPositions": [
      {
        "x": 432,
        "y": 0,
        "dx": 0,
        "dy": 384
      },
      {
        "x": 480,
        "y": 336,
        "dx": 96,
        "dy": 0
      },
      {
        "x": 1008,
        "y": 144,
        "dx": 288,
        "dy": 0
      },
      {
        "x": 1008,
        "y": 192,
        "dx": 0,
        "dy": 192
      },
      {
        "x": 1008,
        "y": 576,
        "dx": 0,
        "dy": 144
      },
      {
        "x": 240,
        "y": 192,
        "dx": 192,
        "dy": 0
      }
    ],
    "treePositions": [
      {
        "x": 1224,
        "y": 109
      },
      {
        "x": 312,
        "y": 157
      },
      {
        "x": 120,
        "y": 301
      },
      {
        "x": 1176,
        "y": 637
      }
    ],
    "olof": {
      "enabled": true,
      "spawns": [
        {
          "x": 144,
          "y": 96
        },
        {
          "x": 1152,
          "y": 240
        },
        {
          "x": 768,
          "y": 624
        },
        {
          "x": 144,
          "y": 624
        },
        {
          "x": 1104,
          "y": 48
        }
      ],
      "speed": 4,
      "roaming": true,
      "huntRadius": 200,
      "roamRadius": 175
    },
    "night": {
      "enabled": true,
      "radius": 150,
      "olofView": false
    },
    "player": {
      "speed": 5,
      "spawn": {
        "x": 672,
        "y": 48
      }
    },
    "snowTimer": 1400,
    "snowParticleAmount": 140,
    "time": {
      "start": "2069-04-20 23:00",
      "end": "2069-04-21 05:00",
      "realTime": 60
    },
    "music": "music/Backgrund__Intense_v1.mp3",
    "pointCap": 72000
  }
]




