class room2 extends Phaser.Scene {

    constructor() {
        super({ key: 'room2' });
        
        // Put global variable here
    }

    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {
      // Step 1, load JSON
      this.load.tilemapTiledJSON("room2","assets/hospital.json");
  
      // Step 2 : Preload any images here, nickname, filename
      this.load.image("hospital", "assets/hospital32x32.png");
      this.load.image("roomBuilder", "assets/roomBuilder32x32.png");

  }

  create() {
      console.log('*** room2 scene');

      let map = this.make.tilemap({key:'room2'});

      let hospitalTiles = map.addTilesetImage("hospital32x32", "hospital");
      let roomBuilderTiles = map.addTilesetImage("roomBuilder32x32", "roomBuilder");

      let tilesArray = [hospitalTiles,roomBuilderTiles];
  
      this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
      this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
      this.furnitureLayer = map.createLayer("furnitureLayer", tilesArray, 0, 0);
      this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);

      this.physics.world.bounds.width = this.groundLayer.width;
      this.physics.world.bounds.height = this.groundLayer.height;
  
      // this.player = this.physics.add.sprite(640,1225,"Lee-Down").setScale(1.5);

      this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir
      ).setScale(1.5);
  
  
      //enable debug
      window.player = this.player;
  
      this.player.setCollideWorldBounds(true); // don't go out of the this.map
     
      this.cursors = this.input.keyboard.createCursorKeys();
    
      this.cameras.main.startFollow(this.player);

      this.wallLayer.setCollisionByExclusion(-1, true)
      this.itemLayer.setCollisionByExclusion(-1, true)
      this.furnitureLayer.setCollisionByExclusion(-1, true)
  
      this.physics.add.collider(this.player, this.itemLayer);
      this.physics.add.collider(this.player, this.wallLayer);
      this.physics.add.collider(this.player, this.furnitureLayer)

  
  }

  update() {
      
   //check room2 (out)
   if (this.player.x > 600 && this.player.x < 680
      && this.player.y > 1239) {

        this.world();
      }       
      
      
      if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-200);
          this.player.anims.play("Left", true);
        } 
        else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(200);
          this.player.anims.play("Right", true);
        } 
        else if (this.cursors.up.isDown) {
          this.player.body.setVelocityY(-200);
          this.player.anims.play("Up", true);
        } 
        else if (this.cursors.down.isDown) {
          this.player.body.setVelocityY(200);
          this.player.anims.play("Down", true);
        } 
        else {
          this.player.anims.stop();
          this.player.body.setVelocity(0, 0);
        }
  }

  //Function jump to room2
  world(player,tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 
    playerPos.y = 
    playerPos.dir = "Lee-Down";

    this.scene.start("world",{playerPos: playerPos});
  }

  

}
