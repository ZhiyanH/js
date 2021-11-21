class room3 extends Phaser.Scene {

    constructor() {
        super({ key: 'room3' });
        
        // Put global variable here
    }

    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {
      // Step 1, load JSON
      this.load.tilemapTiledJSON("room3","assets/mall.json");
  
      // Step 2 : Preload any images here, nickname, filename
      this.load.image("clothing", "assets/clothing32x32.png");
      this.load.image("shopping", "assets/shopping32x32.png");
      this.load.image("roomBuilder", "assets/roomBuilder32x32.png");

  }

  create() {
      console.log('*** room3 scene');

      let map = this.make.tilemap({key:'room3'});

      let clothingTiles = map.addTilesetImage("clothing32x32", "clothing");
      let shoppingTiles = map.addTilesetImage("shopping32x32", "shopping");
      let roomBuilderTiles = map.addTilesetImage("roomBuilder32x32", "roomBuilder");

      let tilesArray = [clothingTiles,shoppingTiles,roomBuilderTiles];
  
      this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
      this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
      this.carpetLayer = map.createLayer("carpetLayer", tilesArray, 0, 0);
      this.furnitureLayer = map.createLayer("furnitureLayer", tilesArray, 0, 0);
      this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);
      this.addLayer = map.createLayer("addLayer", tilesArray, 0, 0);

      this.physics.world.bounds.width = this.groundLayer.width;
      this.physics.world.bounds.height = this.groundLayer.height;
  
      // this.player = this.physics.add.sprite(285,1225,"Lee-Down").setScale(1.5);
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
      this.physics.add.collider(this.player, this.furnitureLayer);
      this.physics.add.collider(this.player, this.iteamLayer);
      this.physics.add.collider(this.player, this.addLayer);

  
  }

  update() {
      
   //check room3 (out)
   if (this.player.x > 248 && this.player.x < 328
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

  //Function jump to room3
  world(player,tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 
    playerPos.y = 
    playerPos.dir = "Lee-Down";

    this.scene.start("world",{playerPos: playerPos});
  }

  

}
