class s10 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 's10' });
  }

  preload() {
    this.load.image('s10', 'assets/s10.png')

    
}

create () {

    this.s10 = this.add.image(0, 0, 's10').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is S10");

 
    var spaceDown = this.input.keyboard.addKey('SPACE');
    

    spaceDown.on('down', function(){
    this.scene.stop("s10");
    this.scene.start("mission1");
    }, this );
    
  

}


  
}