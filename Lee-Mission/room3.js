var input;
// var score = 0;

var control=false;

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

  }/////////////////// end of preload //////////////////////////////

    create() {
      console.log('*** room3 scene');
      console.log("life: ", window.heart);
      console.log("zombie: ", window.zombie);

      this.healSnd = this.sound.add("heart");
      this.bulletSnd = this.sound.add("shooting");
      this.zombieSnd = this.sound.add("zombieHurt");
      this.playerHurtSnd = this.sound.add("hurt");

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

      this.player = this.physics.add.sprite(
        this.playerPos.x,
        this.playerPos.y,
        this.playerPos.dir
      ).setScale(1.5).setSize(20,32); 

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

      var shootLeft = this.input.keyboard.addKey('z');
      var shootRight = this.input.keyboard.addKey('x');
        
      shootLeft.on('down', function(){
        this.shootLeft()
        }, this);

      shootRight.on('down', function(){
        this.shootRight()
      }, this);

      //enable debug
      window.player = this.player;
  
      this.player.setCollideWorldBounds(true); // don't go out of the this.map

      this.bullet=this.physics.add.sprite(this.player.x, this.player.y,'shooting');
        this.bullet.setVisible(false)

      window.bullet = this.bullet

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

      //Group
      //RightLeft
      this.zombieGroup = this.physics.add.group({
        key:'zRight',
        repeat: 1,
        setXY:{x:200, y:280, stepY:400}
    })

      this.zombieGroup.children.iterate( c => {
        c.play('zombieRight').setSize(20,35).setScale(1.5);
    })

      this.zombieGroup2 = this.physics.add.group({
        key:'zLeft',
        repeat: 1,
        setXY:{x:330, y:820, stepY:300}
    })

      this.zombieGroup2.children.iterate( c => {
        c.play('zombieLeft').setSize(20,35).setScale(1.5);
    })

    
      this.zombieGroup3 = this.physics.add.group({
        key:'zLeft',
        repeat: 2,
        setXY:{x:1735, y:170, stepY:300}
    })

      this.zombieGroup3.children.iterate( c => {
        c.play('zombieLeft').setSize(20,35).setScale(1.5);
    })

      //DownUp
      this.zombieGroup4 = this.physics.add.group({
        key:'zUp',
        repeat: 2,
        setXY:{x:575, y:230, stepX:225}
    })

      this.zombieGroup4.children.iterate( c => {
        c.play('zombieUp').setSize(20,35).setScale(1.5);
    })

      this.zombieGroup5 = this.physics.add.group({
        key:'zDown',
        repeat: 1,
        setXY:{x:1120, y:440, stepX:300}
    })

      this.zombieGroup5.children.iterate( c => {
        c.play('zombieDown').setSize(20,35).setScale(1.5);
    })

      this.zombieGroup6 = this.physics.add.group({
        key:'zUp',
        repeat: 3,
        setXY:{x:660, y:700, stepX:230}
    })

      this.zombieGroup6.children.iterate( c => {
        c.play('zombieUp').setSize(20,35).setScale(1.5);
    })

      this.zombieGroup7 = this.physics.add.group({
        key:'zDown',
        repeat:3,
        setXY:{x:570, y:1160, stepX:400}
    })

      this.zombieGroup7.children.iterate( c => {
        c.play('zombieDown').setSize(20,35).setScale(1.5);
    })
      /////End of group/////

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

      this.physics.add.collider(this.bullet, this.wallLayer);

      this.heart1 = this.physics.add.sprite(133, 582, 'Heart').play('Heal');
      this.heart2 = this.physics.add.sprite(1275, 997, 'Heart').play('Heal');
      this.heart3 = this.physics.add.sprite(1820, 469, 'Heart').play('Heal');
  
      this.physics.add.overlap(this.player, [this.zombieGroup, this.zombieGroup2, this.zombieGroup3, this.zombieGroup4, this.zombieGroup5, this.zombieGroup6, this.zombieGroup7], this.minusHealth, null, this);

      this.physics.add.overlap(this.bullet, [this.zombieGroup, this.zombieGroup2, this.zombieGroup3, this.zombieGroup4, this.zombieGroup5, this.zombieGroup6, this.zombieGroup7], this.killZombie, null, this);

      this.physics.add.overlap(this.player, [this.heart1,this.heart2,this.heart3], this.collectHeart, null, this );

      this.scoreText = this.add.text(600, 23, 'Zombie: '+window.zombie , {fontSize: '35px', fill: '#ffffff' }).setScrollFactor(0);  

  }/////////////////// end of create //////////////////////////////

    update() {
      if (window.zombie <= 0) {
             console.log("Win");
            this.scene.start("winScene");
      }

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

  }/////////////////// end of update //////////////////////////////

  shootLeft() {
    console.log('shoot left')

    this.bullet.x = this.player.x
    this.bullet.y = this.player.y
        
    this.bulletSnd.play();

    this.bullet.setVisible(true)
    this.bullet.body.setEnable(true)
     
    this.bullet.body.setVelocityX(-500)
 
  }

  shootRight() {
    console.log('shoot right')

    this.bullet.x = this.player.x
    this.bullet.y = this.player.y

    this.bulletSnd.play();

    this.bullet.setVisible(true)
    this.bullet.body.setEnable(true)
 
    this.bullet.body.setVelocityX(500)

  }

  //Function jump to room3
  world(player,tile) {
    console.log("world function");

    let playerPos = {};
    playerPos.x = 911
    playerPos.y = 1189
    playerPos.dir = "Lee-Down";

    this.scene.start("world",{playerPos: playerPos});
  }

  minusHealth(player, zombie) {
    console.log("minus life");

    // deduct live
    window.heart--;

    // sound
    this.playerHurtSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    // deduct zombie
    window.zombie--;
    
    //zombie score
    this.scoreText.setText('Zombie: ' + window.zombie);
    
    // remove the zombie
    zombie.disableBody(true, true);

    if (window.heart == 2) {
      this.life3.setVisible(false);
    } 
     else if (window.heart == 1) {
      this.life2.setVisible(false);
    } 
     else if (window.heart == 0) {
      this.life1.setVisible(false);
      console.log("GAME OVER");
      this.scene.stop('room3');
      this.scene.start("gameOver3");
    }
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

  killZombie(bullet,zombie) {
    console.log("Bullet hit zombie");

    this.zombieSnd.play();

    bullet.disableBody(true,true);
    zombie.disableBody(true,true);

    // deduct zombie
    window.zombie--;

    this.scoreText.setText('Zombie: ' + window.zombie);
 
    control=false;
  }

  moveDownUp() {
    console.log("moveDownUp");
    this.tweens.timeline({
      targets: this.zombieGroup4.getChildren(),
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 120,
        },
        {
          y: 230,
        },
      ],
    });
  }

  moveDownUp2() {
    console.log("moveDownUp2");
    this.tweens.timeline({
      targets: this.zombieGroup5.getChildren(),
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 625,
        },
        {
          y: 440,
        },
      ],
    });
  }

  moveDownUp3() {
    console.log("moveDownUp3");
    this.tweens.timeline({
      targets: this.zombieGroup6.getChildren(),
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 840,
        },
        {
          y: 700,
        },
      ],
    });
  }

  moveDownUp4() {
    console.log("moveDownUp4");
    this.tweens.timeline({
      targets: this.zombieGroup7.getChildren(),
      ease: "Linear",
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
        {
          y: 990,
        },
        {
          y: 1160,
        },
      ],
    });
  }
  

  moveLeftRight() {
    console.log("moveLeftRight");
    this.tweens.timeline({
      targets: this.zombieGroup.getChildren(),
      loop: -1, // loop forever
      ease: "Linear",
      duration: 6000,
      tweens: [
        {
          x: 400,
        },
        {
          x: 200,
        },
      ],
    });
  }

  moveLeftRight2() {
    console.log("moveLeftRight2");
    this.tweens.timeline({
      targets: this.zombieGroup2.getChildren(),
      loop: -1, // loop forever
      ease: "Linear",
      duration: 6000,
      tweens: [
        {
          x: 485,
        },
        {
          x: 330,
        },
      ],
    });
  }

  moveLeftRight3() {
    console.log("moveLeftRight3");
    this.tweens.timeline({
      targets: this.zombieGroup3.getChildren(),
      loop: -1, // loop forever
      ease: "Linear",
      duration: 6000,
      tweens: [
        {
          x: 1590,
        },
        {
          x: 1735,
        },
      ],
    });
  }

}//////////// end of room3 ////////////////////////
