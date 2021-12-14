class s2 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 's2' });
  }

  preload() {
    this.load.image('s2', 'assets/s2.png')

}

create () {
    this.s2 = this.add.image(0, 0, 's2').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is S2");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    var enterDown = this.input.keyboard.addKey('enter');

    spaceDown.on('down', function(){
    this.scene.stop("s2");
    this.scene.start("s3");
    }, this );

    enterDown.on('down', function(){
    console.log("skip tutorial");
    this.scene.start("mission1");
    }, this );    
    
}
  
}