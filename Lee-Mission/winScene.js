class winScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'winScene' });
  }

  preload() {
      this.load.image('winScene','assets/winScene.png');
  
  }

  create () {

      window.music.stop();

      this.winGameSnd = this.sound.add("Win");

      this.add.image(0, 0, 'winScene').setOrigin(0, 0).setScale(0.24);
      console.log("This is winScene");

      window.zombie = 20;
      window.heart = 3;

      var spaceDown = this.input.keyboard.addKey('SPACE');

      spaceDown.on('down', function(){
      console.log("Win");
      this.scene.start("preload");
      }, this );

      this.winGameSnd.play();

  }

}