class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload"
    });

    // Put global variable here
  }

  preload() {
    this.load.atlas('Faro','assets/Faro.png','assets/Faro.json');
    this.load.atlas('Virus','assets/Virus.png','assets/Virus.json');

    this.load.atlas('zLeft','assets/zLeft.png','assets/zLeft.json');
    this.load.atlas('zRight','assets/zRight.png','assets/zRight.json');
    this.load.atlas('zUp','assets/zUp.png','assets/zUp.json');
    this.load.atlas('zDown','assets/zDown.png','assets/zDown.json');

    this.load.atlas('Heart','assets/Heart.png','assets/Heart.json');
    this.load.atlas('Vaccine','assets/Vaccine.png','assets/Vaccine.json');
    this.load.atlas('Life','assets/Life.png','assets/Life.json');

    this.load.atlas('Lee-Left','assets/Lee-Left.png','assets/Lee-Left.json'); 
    this.load.atlas('Lee-Right','assets/Lee-Right.png','assets/Lee-Right.json');
    this.load.atlas('Lee-Up','assets/Lee-Up.png','assets/Lee-Up.json');
    this.load.atlas('Lee-Down','assets/Lee-Down.png','assets/Lee-Down.json');

    this.load.image("shooting", "assets/shooting.png");
    this.load.image("Entry", "assets/entrySign.png");

    this.load.image('startScene','assets/startScene.png');

    this.load.audio("BGmusic","assets/BGmusic.wav");
    this.load.audio("gameOver","assets/gameOver.wav");
    this.load.audio("Win","assets/Win.wav");
    this.load.audio("shooting","assets/shooting.wav");
    this.load.audio("vaccine","assets/vaccine.wav");
    this.load.audio("heart","assets/heart.wav");
    this.load.audio("zombieHurt","assets/zombieHurt.wav");
    this.load.audio("hurt","assets/hurt.wav");

  }/////////////////// end of preload //////////////////////////////

  create() {
    console.log("*** preload scene");

    //Background music
    window.music = this.sound
      .add("BGmusic", {
        loop: true,
      })
      .setVolume(0.1);
      window.music.play();

    this.anims.create({
      key:'FaroNPC',
      frames:[
        {key:'Faro',frame:'NPC1'},
        {key:'Faro',frame:'NPC2'},
        {key:'Faro',frame:'NPC4'},
        {key:'Faro',frame:'NPC3'},
      ],
      frameRate:2,
      repeat:-1
    })   

    this.anims.create({
      key:'Enemies',
      frames:[
        {key:'Virus',frame:'Virus1'},
        {key:'Virus',frame:'Virus3'},
        {key:'Virus',frame:'Virus4'},
        {key:'Virus',frame:'Virus2'},
      ],
      frameRate:5,
      repeat:-1
    }) 
    
    
    this.anims.create({
      key:'zombieLeft',
      frames:[
        {key:'zLeft',frame:'zLeft 1'},
        {key:'zLeft',frame:'zLeft 2'},
        {key:'zLeft',frame:'zLeft 3'},
      ],
      frameRate:5,
      repeat:-1
    }) 

    this.anims.create({
      key:'zombieRight',
      frames:[
        {key:'zRight',frame:'zRight 1'},
        {key:'zRight',frame:'zRight 2'},
        {key:'zRight',frame:'zRight 3'},
      ],
      frameRate:5,
      repeat:-1
    }) 

    this.anims.create({
      key:'zombieUp',
      frames:[
        {key:'zUp',frame:'zUp 1'},
        {key:'zUp',frame:'zUp 2'},
        {key:'zUp',frame:'zUp 3'},
      ],
      frameRate:5,
      repeat:-1
    }) 

    this.anims.create({
      key:'zombieDown',
      frames:[
        {key:'zDown',frame:'zDown 1'},
        {key:'zDown',frame:'zDown 2'},
        {key:'zDown',frame:'zDown 3'},
      ],
      frameRate:5,
      repeat:-1
    }) 
    
    this.anims.create({
      key:'Heal',
      frames:[
        {key:'Heart',frame:'Heart1'},
        {key:'Heart',frame:'Heart4'},
        {key:'Heart',frame:'Heart2'},
        {key:'Heart',frame:'Heart3'},
      ],
      frameRate:3,
      repeat:-1
    })   

    this.anims.create({
      key:'Cure',
      frames:[
        {key:'Vaccine',frame:'Vaccine1'},
        {key:'Vaccine',frame:'Vaccine2'},
        {key:'Vaccine',frame:'Vaccine4'},
        {key:'Vaccine',frame:'Vaccine3'},
      ],
      frameRate:5,
      repeat:-1
    })   

    this.anims.create({
      key:'Left',
      frames:[
        {key:'Lee-Left',frame:'Left 1'},
        {key:'Lee-Left',frame:'Left 2'},
        {key:'Lee-Left',frame:'Left 3'},
        {key:'Lee-Left',frame:'Left 4'},
      ],
      frameRate:10,
      repeat:-1
    })

    this.anims.create({
      key:'Right',
      frames:[
        {key:'Lee-Right',frame:'Right 1'},
        {key:'Lee-Right',frame:'Right 2'},
        {key:'Lee-Right',frame:'Right 3'},
        {key:'Lee-Right',frame:'Right 4'},
      ],
      frameRate:10,
      repeat:-1
    })
    
    this.anims.create({
      key:'Up',
      frames:[
        {key:'Lee-Up',frame:'Up 1'},
        {key:'Lee-Up',frame:'Up 2'},
        {key:'Lee-Up',frame:'Up 3'},
        {key:'Lee-Up',frame:'Up 4'},
      ],
      frameRate:10,
      repeat:-1
    })

    this.anims.create({
      key:'Down',
      frames:[
        {key:'Lee-Down',frame:'Down 1'},
        {key:'Lee-Down',frame:'Down 2'},
        {key:'Lee-Down',frame:'Down 3'},
        {key:'Lee-Down',frame:'Down 4'},
      ],
      frameRate:10,
      repeat:-1
    })

    this.add.image(0, 0, 'startScene').setOrigin(0, 0).setScale(0.24);
    console.log("This is startScene");

    var spaceDown = this.input.keyboard.addKey('SPACE');

    spaceDown.on('down', function(){
    console.log("Go to s1");
    this.scene.start("s1");
    }, this );

    // Create all the game animations here

  }/////////////////// end of create //////////////////////////////

}//////////// end of preload page ////////////////////////
