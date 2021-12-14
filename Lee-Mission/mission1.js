class mission1 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'mission1' });
  }

  preload() {
    this.load.image('mission1', 'assets/mission1.png')
    
}

create () {
    this.S1 = this.add.image(0, 0, 'mission1').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is mission1");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    

    spaceDown.on('down', function(){
        console.log("Jump to room1 scene");
        this.scene.stop("mission1");
    
        let playerPos = {};
        playerPos.x = 490;
        playerPos.y = 120;
        playerPos.dir = "Lee-Down";
        this.scene.start("room1", { playerPos: playerPos });
      },
      this
    );
    
  
}

}