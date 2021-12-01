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
      ).setScale(1.5).setSize(20,32);

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

      this.time.addEvent({
        delay: 1000,
        callback: this.moveLeftRight3,
        callbackScope: this,
        loop: false,
      });

      this.time.addEvent({
        delay: 1000,
        callback: this.moveLeftRight4,
        callbackScope: this,
        loop: false,
      });

      this.time.addEvent({
        delay: 1000,
        callback: this.moveLeftRight5,
        callbackScope: this,
        loop: false,
      });
  
      this.virus1 = this.physics.add.sprite(376,1144,"Virus").play("Enemies").setScale(1.5);
      this.virus2 = this.physics.add.sprite(886,440,"Virus").play("Enemies").setScale(1.5);
      this.virus3 = this.physics.add.sprite(848,184,"Virus").play("Enemies").setScale(1.5);
      this.virus4 = this.physics.add.sprite(1038,296,"Virus").play("Enemies").setScale(1.5);
      this.virus5 = this.physics.add.sprite(162,609,"Virus").play("Enemies").setScale(1.5);
      this.virus6 = this.physics.add.sprite(1201,1087,"Virus").play("Enemies").setScale(1.5);
      this.virus7 = this.physics.add.sprite(728,600,"Virus").play("Enemies").setScale(1.5);
      this.virus8 = this.physics.add.sprite(509,895,"Virus").play("Enemies").setScale(1.5);
      this.virus9 = this.physics.add.sprite(87,240,"Virus").play("Enemies").setScale(1.5);
     
      this.cursors = this.input.keyboard.createCursorKeys();
    
      this.cameras.main.startFollow(this.player);

      this.wallLayer.setCollisionByExclusion(-1, true)
      this.itemLayer.setCollisionByExclusion(-1, true)
      this.furnitureLayer.setCollisionByExclusion(-1, true)
  
      this.physics.add.collider(this.player, this.itemLayer);
      this.physics.add.collider(this.player, this.wallLayer);
      this.physics.add.collider(this.player, this.furnitureLayer)

      this.physics.add.overlap(this.player, this.virus1, this.virusHurt, null, this);
      this.physics.add.overlap(this.player, this.virus2, this.virusHurt, null, this);
      this.physics.add.overlap(this.player, this.virus3, this.virusHurt, null, this);
      this.physics.add.overlap(this.player, this.virus4, this.virusHurt, null, this);
      this.physics.add.overlap(this.player, this.virus5, this.virusHurt, null, this);
      this.physics.add.overlap(this.player, this.virus6, this.virusHurt, null, this);
      this.physics.add.overlap(this.player, this.virus7, this.virusHurt, null, this);
      this.physics.add.overlap(this.player, this.virus8, this.virusHurt, null, this);
      this.physics.add.overlap(this.player, this.virus9, this.virusHurt, null, this);

      this.heart1 = this.physics.add.sprite(152, 535, 'Heart').play('Life');
      this.heart2 = this.physics.add.sprite(1002, 673, 'Heart').play('Life');
      this.heart3 = this.physics.add.sprite(1170, 1212, 'Heart').play('Life');
        
      this.physics.add.overlap(this.player, this.heart1, this.collectHeart, null, this );
      this.physics.add.overlap(this.player, this.heart2, this.collectHeart, null, this );
      this.physics.add.overlap(this.player, this.heart3, this.collectHeart, null, this );

      this.vaccine = this.physics.add.sprite(107, 150, 'Vaccine').play('Cure');
        
      this.physics.add.overlap(this.player, this.vaccine, this.collectVaccine, null, this );
  
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
    playerPos.x = 211
    playerPos.y = 777
    playerPos.dir = "Lee-Down";

    this.scene.start("world",{playerPos: playerPos});
  }

  
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
          y: 1224,
        },
        {
          y: 1144,
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
          y: 630,
        },
        {
          y: 440,
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
          y: 296,
        },
        {
          y: 184,
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
          y: 184,
        },
        {
          y: 296,
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
          x: 369,
        },
        {
          x: 162,
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
          x: 1007,
        },
        {
          x: 1201,
        },
      ],
    });
  }

  moveLeftRight3() {
    console.log("moveLeftRight 3");
    this.tweens.timeline({
      targets: this.virus7,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 5000,
      tweens: [
        {
          x: 535,
        },
        {
          x: 728,
        },
      ],
    });
  }

  moveLeftRight4() {
    console.log("moveLeftRight 4");
    this.tweens.timeline({
      targets: this.virus8,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 6000,
      tweens: [
        {
          x: 803,
        },
        {
          x: 509,
        },
      ],
    });
  }

  moveLeftRight5() {
    console.log("moveLeftRight 5");
    this.tweens.timeline({
      targets: this.virus9,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 6000,
      tweens: [
        {
          x: 395,
        },
        {
          x: 87,
        },
      ],
    });
  }

  collectHeart(player, sprite){
    console.log("Heart collected");

    sprite.disableBody (true, true);
    
    return false;
    }

    collectVaccine(player, sprite){
      console.log("Vaccine collected");

      sprite.disableBody (true, true);
      
      return false;
      }

}
