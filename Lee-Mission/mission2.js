class mission2 extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'mission2' });
  }

  preload() {
    this.load.image('mission2', 'assets/mission2.png')

}

create () {
    this.mission2 = this.add.image(0, 0, 'mission2').setOrigin(0, 0).setScale(0.24);
   
    console.log("This is mission2");

    var spaceDown = this.input.keyboard.addKey('SPACE');
    

    spaceDown.on('down', function(){
        console.log("mission 2");
        this.scene.stop("mission2");

        let playerPos = {};
        playerPos.x = 211
        playerPos.y = 777
        playerPos.dir = "Lee-Down";
        this.scene.start("world", { playerPos: playerPos });
      },
      this
    );
    
}
  
}