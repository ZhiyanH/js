class gameOver extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'gameOver' });
  }

  preload() {
      this.load.image('gameOver','assets/gameOver.png');
  
  }

  create () {
      this.gameoverSnd = this.sound.add("gameOver");

      this.add.image(0, 0, 'gameOver').setOrigin(0, 0).setScale(0.24);
      console.log("game over");

      window.zombie = 20;
      window.heart = 3;

      var spaceDown = this.input.keyboard.addKey('SPACE');

      spaceDown.on('down', function(){
      console.log("Try Again");
      this.scene.start("room1");
      }, this );

      this.gameoverSnd.play();

  }
  

}