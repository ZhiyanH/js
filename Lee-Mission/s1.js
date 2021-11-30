class s1 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 's1' });
  }

  preload() {
    this.load.image('s1', 'assets/s1.png')

    
}

create () {

    this.S1 = this.add.image(0, 0, 's1').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is S1");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    

    spaceDown.on('down', function(){
    this.scene.stop("s1");
    this.scene.start("s2");
    }, this );
    
  

}


  
}