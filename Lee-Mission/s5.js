class s5 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 's5' });
  }

  preload() {
    this.load.image('s5', 'assets/s5.png')

    
}

create () {

    this.s5 = this.add.image(0, 0, 's5').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is S5");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    

    spaceDown.on('down', function(){
    this.scene.stop("s5");
    this.scene.start("s6");
    }, this );
    
  

}


  
}