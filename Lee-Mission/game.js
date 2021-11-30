var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    // width: 32 * 20,
    // height: 32 * 15,
    width: 840,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#73c5d0',
    pixelArt: true,
    scene: [preload, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, mission1, world, room1, room2, room3, gameOver]
};

var game = new Phaser.Game(config);