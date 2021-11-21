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

    this.load.atlas('Lee-Left','assets/Lee-Left.png','assets/Lee-Left.json'); 
    this.load.atlas('Lee-Right','assets/Lee-Right.png','assets/Lee-Right.json');
    this.load.atlas('Lee-Up','assets/Lee-Up.png','assets/Lee-Up.json');
    this.load.atlas('Lee-Down','assets/Lee-Down.png','assets/Lee-Down.json');
    
  }

  create() {
    console.log("*** preload scene");

    let frame = 3

    this.anims.create({
      key:'FaroNPC',
      frames:[
        {key:'Faro',frame:'NPC1'},
        {key:'Faro',frame:'NPC2'},
        {key:'Faro',frame:'NPC3'},
        {key:'Faro',frame:'NPC4'},
      ],
      frameRate:5,
      reapet:-1
    })   

    this.anims.create({
      key:'Enemies',
      frames:[
        {key:'Virus',frame:'Virus1'},
        {key:'Virus',frame:'Virus2'},
        {key:'Virus',frame:'Virus3'},
        {key:'Virus',frame:'Virus4'},
      ],
      frameRate:5,
      reapet:-1
    })   

    this.anims.create({
      key:'zombieLeft',
      frames:[
        {key:'zLeft',frame:'zLeft1'},
        {key:'zLeft',frame:'zLeft2'},
        {key:'zLeft',frame:'zLeft3'},
      ],
      frameRate:5,
      reapet:-1
    }) 

    this.anims.create({
      key:'zombieRight',
      frames:[
        {key:'zRight',frame:'zRight1'},
        {key:'zRight',frame:'zRight2'},
        {key:'zRight',frame:'zRight3'},
      ],
      frameRate:5,
      reapet:-1
    }) 

    this.anims.create({
      key:'zombieUp',
      frames:[
        {key:'zUp',frame:'zUp1'},
        {key:'zUp',frame:'zUp2'},
        {key:'zUp',frame:'zUp3'},
      ],
      frameRate:5,
      reapet:-1
    }) 

    this.anims.create({
      key:'zombieDown',
      frames:[
        {key:'zDown',frame:'zDown1'},
        {key:'zDown',frame:'zDown2'},
        {key:'zDown',frame:'zDown3'},
      ],
      frameRate:5,
      reapet:-1
    }) 
    
    this.anims.create({
      key:'Life',
      frames:[
        {key:'Heart',frame:'Heart1'},
        {key:'Heart',frame:'Heart2'},
        {key:'Heart',frame:'Heart3'},
        {key:'Heart',frame:'Heart4'},
      ],
      frameRate:5,
      reapet:-1
    })   

    this.anims.create({
      key:'Cure',
      frames:[
        {key:'Vaccine',frame:'Vaccine1'},
        {key:'Vaccine',frame:'Vaccine2'},
        {key:'Vaccine',frame:'Vaccine3'},
        {key:'Vaccine',frame:'Vaccine4'},
      ],
      frameRate:5,
      reapet:-1
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
      reapet:-1
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
      reapet:-1
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
      reapet:-1
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
      reapet:-1
    })

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");

        this.scene.start(
          "world",
          // Optional parameters
          {}
        );
      },
      this
    );

    // Add any text in the main page
    this.add.text(90, 600, "Press spacebar to continue", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });

    // Create all the game animations here
  }
}
