class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }

    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {
        // Step 1, load JSON
        this.load.tilemapTiledJSON("room1","assets/house.json");
    
        // Step 2 : Preload any images here, nickname, filename
        this.load.image("bathroom", "assets/bathroom32x32.png");
        this.load.image("bedroom", "assets/bedroom32x32.png");
        this.load.image("livingRoom", "assets/livingRoom32x32.png");
        this.load.image("roomBuilder", "assets/roomBuilder32x32.png");

    }/////////////////// end of preload //////////////////////////////

    create() {
        console.log('*** room1 scene');
        console.log("life: ", window.heart);

        this.healSnd = this.sound.add("heart");

        let map = this.make.tilemap({key:'room1'});

        let bathroomTiles = map.addTilesetImage("bathroom32x32", "bathroom");
        let bedroomTiles = map.addTilesetImage("bedroom32x32", "bedroom");
        let livingRoomTiles = map.addTilesetImage("livingRoom32x32", "livingRoom");
        let roomBuilderTiles = map.addTilesetImage("roomBuilder32x32", "roomBuilder");

        let tilesArray = [bathroomTiles,bedroomTiles,livingRoomTiles,roomBuilderTiles];
    
        this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
        this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
        this.carpetLayer = map.createLayer("carpetLayer", tilesArray, 0, 0);
        this.furnitureLayer = map.createLayer("furnitureLayer", tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;
    
        this.player = this.physics.add.sprite(
          this.playerPos.x,
          this.playerPos.y,
          this.playerPos.dir
        ).setScale(1.5).setSize(20,32);
    
        //enable debug
        window.player = this.player;
    
        this.player.setCollideWorldBounds(true); // don't go out of the this.map

        //hearts
        this.life1 = this.add
        .image(50, 40, "Life")
        .setScale(1.5)
        .setScrollFactor(0)
        .setVisible(false);
        this.life2 = this.add
        .image(100, 40, "Life")
        .setScale(1.5)
        .setScrollFactor(0)
        .setVisible(false);
        this.life3 = this.add
        .image(150, 40, "Life")
        .setScale(1.5)
        .setScrollFactor(0)
        .setVisible(false);

      if (window.heart >= 3) {
        this.life1.setVisible(true);
        this.life2.setVisible(true);
        this.life3.setVisible(true);
      } 
       else if (window.heart == 2) {
        this.life1.setVisible(true);
        this.life2.setVisible(true);
      } 
       else if (window.heart == 1) {
        this.life1.setVisible(true);
      } 
       
        this.cursors = this.input.keyboard.createCursorKeys();
      
        this.cameras.main.startFollow(this.player);

        this.wallLayer.setCollisionByExclusion(-1, true)
        this.itemLayer.setCollisionByExclusion(-1, true)
        this.furnitureLayer.setCollisionByExclusion(-1, true)
    
        this.physics.add.collider(this.player, this.itemLayer);
        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.player, this.furnitureLayer);

        this.heart = this.physics.add.sprite(146, 546, 'Heart').play('Heal');
        
        this.physics.add.overlap(this.player, this.heart, this.collectHeart, null, this );

        this.npc = this.add.sprite(440,120,"Faro").play("FaroNPC").setScale(1.5);
    
    }/////////////////// end of create //////////////////////////////

    update() {
        
        //check room1 (out)
        if (this.player.x > 408 && this.player.x < 456
        && this.player.y > 615) {

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
    }/////////////////// end of update //////////////////////////////

    //Function jump to room1
    world(player,tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 308;
        playerPos.y = 212;
        playerPos.dir = "Lee-Down";

        this.scene.start("world",{playerPos: playerPos});
    }

    collectHeart(player, sprite){
      console.log("heart collected");

      this.healSnd.play();
  
      sprite.disableBody (true, true);
      
      // deduct live
      window.heart++;
      console.log("life: ", window.heart);
      if (window.heart > 3){
          window.heart = 3;
      }
  
      if (window.heart == 3) {
        this.life3.setVisible(true);
      } 
       else if (window.heart == 2) {
        this.life2.setVisible(true);
      } 
       else if (window.heart == 1) {
        this.life1.setVisible(true);
      }
    }

}//////////// end of room1 ////////////////////////
