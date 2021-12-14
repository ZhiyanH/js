class s7 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 's7' });
  }

  preload() {
    this.load.image('s7', 'assets/s7.png')

}

create () {
    this.s7 = this.add.image(0, 0, 's7').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is S7");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    var enterDown = this.input.keyboard.addKey('enter');

    spaceDown.on('down', function(){
    this.scene.stop("s7");
    this.scene.start("s8");
    }, this );

    enterDown.on('down', function(){
    console.log("skip tutorial");
    this.scene.start("mission1");
    }, this );    

}
  
}