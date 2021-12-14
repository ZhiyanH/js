class mission3 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'mission3' });
  }

  preload() {
    this.load.image('mission3', 'assets/mission3.png')

}

create () {
    this.mission3 = this.add.image(0, 0, 'mission3').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is mission3");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    window.zombie = 20;

    spaceDown.on('down', function(){
        console.log("mission 3");
        this.scene.stop("mission3");
    
        let playerPos = {};
        playerPos.x = 285
        playerPos.y = 1215
        playerPos.dir = "Lee-Up"    
        this.scene.start("room3",{playerPos: playerPos});
      },
      this
    );
    
 }

}