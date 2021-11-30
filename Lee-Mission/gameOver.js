class gameOver extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'gameOver' });
  }

  preload() {
      this.load.image('gameOver','assets/gameOver.png');
  
  }

  create () {

      this.add.image(0, 0, 'gameOver').setOrigin(0, 0).setScale(0.24);
      console.log("game over");

      //this.input.once('pointerdown', function(){
      var spaceDown = this.input.keyboard.addKey('SPACE');

      spaceDown.on('down', function(){
      console.log("Try Again");
      this.scene.start("preload");
      }, this );

  }

}