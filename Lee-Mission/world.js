class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world","assets/worldMap.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("city", "assets/city32x32.png");

    // this.load.atlas('Virus','assets/Virus.png','assets/Virus.json');

  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'world'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let cityTiles = map.addTilesetImage("city32x32", "city");
    
    // Step 5  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", [cityTiles], 0, 0);
    this.treeLayer = map.createLayer("treeLayer", [cityTiles], 0, 0);
    this.houseLayer = map.createLayer("houseLayer", [cityTiles], 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer", [cityTiles], 0, 0);
    this.itemLayer = map.createLayer("itemLayer", [cityTiles], 0, 0);
    this.carLayer = map.createLayer("carLayer", [cityTiles], 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(55,295,"Lee-Down");
    // this.player = this.physics.add.sprite(
    //   this.playerPos.x,
    //   this.playerPos.y,
    //   this.playerPos.dir
    // )    

    //enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    this.add.sprite(411,240,"Virus").play("Enemies");
   
    this.cursors = this.input.keyboard.createCursorKeys();
  
    this.cameras.main.startFollow(this.player);

    this.treeLayer.setCollisionByExclusion(-1, true)
    this.houseLayer.setCollisionByExclusion(-1, true)
    this.buildingLayer.setCollisionByExclusion(-1, true)
    this.itemLayer.setCollisionByExclusion(-1, true)
    this.carLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.treeLayer);
    this.physics.add.collider(this.player, this.houseLayer);
    this.physics.add.collider(this.player, this.buildingLayer);
    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.player, this.carLayer);
    

  } /////////////////// end of create //////////////////////////////

  update() {

    //check room1 (house)
    if (this.player.x > 293 && this.player.x < 316
        && this.player.y > 176 && this.player.y < 196) {

          this.room1()
    } 
    else if (this.player.x > 148 && this.player.x < 268
          && this.player.y > 752 && this.player.y < 765) {
  
            this.room2()
    } 
    else if (this.player.x > 815 && this.player.x < 991
      && this.player.y > 1168 && this.player.y < 1178) {

        this.room3()
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
  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    let playerPos = {};
    playerPos.x = 432
    playerPos.y = 587
    playerPos.dir = "Lee-Up"

    this.scene.start("room1",{playerPos: playerPos});
  }

  // Function to jump to room2
  room2(player, tile) {
      console.log("room2 function");
      let playerPos = {};
      playerPos.x = 640
      playerPos.y = 1218
      playerPos.dir = "Lee-Up"  

      this.scene.start("room2",{playerPos: playerPos});
    }
    
      // Function to jump to room3
  room3(player, tile) {
    console.log("room3 function");
    let playerPos = {};
    playerPos.x = 285
    playerPos.y = 1215
    playerPos.dir = "Lee-Up"    

    this.scene.start("room3",{playerPos: playerPos});
  }
} //////////// end of class world ////////////////////////
