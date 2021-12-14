class s6 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 's6' });
  }

  preload() {
    this.load.image('s6', 'assets/s6.png')

}

create () {
    this.s6 = this.add.image(0, 0, 's6').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is S6");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    var enterDown = this.input.keyboard.addKey('enter');
    
    spaceDown.on('down', function(){
    this.scene.stop("s6");
    this.scene.start("s7");
    }, this );

    enterDown.on('down', function(){
    console.log("skip tutorial");
    this.scene.start("mission1");
    }, this );    

}
  
}