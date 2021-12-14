class s4 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 's4' });
  }

  preload() {
    this.load.image('s4', 'assets/s4.png')

}

create () {
    this.s4 = this.add.image(0, 0, 's4').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is S4");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    var enterDown = this.input.keyboard.addKey('enter');

    spaceDown.on('down', function(){
    this.scene.stop("s4");
    this.scene.start("s5");
    }, this );

    enterDown.on('down', function(){
    console.log("skip tutorial");
    this.scene.start("mission1");
    }, this );    

}
  
}