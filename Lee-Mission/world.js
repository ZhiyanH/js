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

    // this.player = this.physics.add.sprite(55,295,"Lee-Down").setSize(20,32);
    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir
    ).setSize(20,32);    

    //enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp2,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp3,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveDownUp4,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight2,
      callbackScope: this,
      loop: false,
    });

    this.virus1 = this.physics.add.sprite(411,240,"Virus").play("Enemies");
    this.virus2 = this.physics.add.sprite(975,304,"Virus").play("Enemies");
    this.virus3 = this.physics.add.sprite(95,752,"Virus").play("Enemies");
    this.virus4 = this.physics.add.sprite(845,688,"Virus").play("Enemies");
    this.virus5 = this.physics.add.sprite(801,1232,"Virus").play("Enemies");
    this.virus6 = this.physics.add.sprite(42,1138,"Virus").play("Enemies");
   
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
    
    this.physics.add.overlap(this.player, this.virus1, this.virusHurt, null, this);
    this.physics.add.overlap(this.player, this.virus2, this.virusHurt, null, this);
    this.physics.add.overlap(this.player, this.virus3, this.virusHurt, null, this);
    this.physics.add.overlap(this.player, this.virus4, this.virusHurt, null, this);
    this.physics.add.overlap(this.player, this.virus5, this.virusHurt, null, this);
    this.physics.add.overlap(this.player, this.virus6, this.virusHurt, null, this);

    this.heart1 = this.physics.add.sprite(108, 1006, 'Heart').play('Life');
    this.heart2 = this.physics.add.sprite(1068, 714, 'Heart').play('Life');

    this.physics.add.overlap(this.player, this.heart1, this.collectHeart, null, this );
    this.physics.add.overlap(this.player, this.heart2, this.collectHeart, null, this );   

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

  virusHurt() {
    console.log("Virus hurt you");
    this.scene.start("gameOver");
  }

  moveDownUp() {
    console.log("enemies moveDownUp 1");
    this.tweens.timeline({
      targets: this.virus1,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 304,
        },
        {
          y: 240,
        },
      ],
    });
  }

  moveDownUp2() {
    console.log("enemies moveDownUp 2");
    this.tweens.timeline({
      targets: this.virus2,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 240,
        },
        {
          y: 304,
        },
      ],
    });
  }

  moveDownUp3() {
    console.log("enemies moveDownUp 3");
    this.tweens.timeline({
      targets: this.virus3,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 816,
        },
        {
          y: 752,
        },
      ],
    });
  }

  moveDownUp4() {
    console.log("enemies moveDownUp 4");
    this.tweens.timeline({
      targets: this.virus4,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 6000,
      tweens: [
        {
          y: 848,
        },
        {
          y: 688,
        },
      ],
    });
  }


  moveLeftRight() {
    console.log("moveLeftRight");
    this.tweens.timeline({
      targets: this.virus5,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 6000,
      tweens: [
        {
          x: 1014,
        },
        {
          x: 801,
        },
      ],
    });
  }

  moveLeftRight2() {
    console.log("moveLeftRight 2");
    this.tweens.timeline({
      targets: this.virus6,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 6000,
      tweens: [
        {
          x: 272,
        },
        {
          x: 42,
        },
      ],
    });
  }

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

  collectHeart(player, sprite){
    console.log("Heart collected");

    sprite.disableBody (true, true);
    
    return false;
    }
} //////////// end of class world ////////////////////////
