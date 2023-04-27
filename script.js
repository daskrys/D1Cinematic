class Intro extends Phaser.Scene 
{
    constructor () 
    {
        super('intro');
    }

    preload () 
    {
        this.load.image('studio', 'assets/MegaGhostStudios.png');
    }

    create ()
    {
        //const startText = this.add.text(275, 450, "click the center to start", {color: '#000000'});
        const studioImage = this.add.image(400, 250, 'studio');

        studioImage.setScale(0.70);
        
        this.tweens.add({
            targets: studioImage,
            alpha: 0,
            duration: 6000,
            ease: 'Power2',
        });
        
        this.time.delayedCall(6000, () => this.scene.start('mainmenu'));

        //this.input.on("pointerdown", () => this.scene.start('mainmenu'));
        /*let fadeOut = studioImage.setOrigin(0.5).setInteractive();

        function fade () { 
            let bool = false;

            this.tweens.add({
                targets: studioImage,
                alpha: 0,
                duration: 3000,
                ease: 'Power2',
            }, this);
        }  
    
        fadeOut.on('pointerdown', fade, this);
       */
   }
    

    update ()
    {

    }
}

class MainMenu extends Phaser.Scene 
{
    constructor () 
    {
        super('mainmenu');
    }

    preload () 
    {
        this.load.audio("song", 'assets/song.wav');
        this.load.image("cursor", 'assets/cursor.png');
    }

    create ()
    {
        let backgroundMusic = this.sound.add('song');
        //const cursor = this.add.image(50, 450, 'cursor');
        //cursor.setScale(0.15);
        backgroundMusic.play();
        //backgroundMusic.setVolume(0.5);

        let main = this.add.text(340, 250, "MAIN MENU");

        main.setScale(1.25);

        this.tweens.add({
            targets: main,
            y: {from: 250, to: 50},
            ease: 'linear',
            duration: 2500,
        })


        // this.time.delayedCall(3000, () => {
            
        //     this.input.on('pointerdown', () => {
        //         this.scene.start('gamesceneone');
        //         backgroundMusic.stop();
        //     });

        //     this.add.text(350, 250, "Click to Start");

        // });
        this.time.delayedCall(3000, () => {
            this.add.text(360, 100, "Start");
            this.add.text(360, 125, "Options");
            this.add.text(360, 150, "Credits");
            this.add.text(345, 175, "[REDACTED]");
            
        })

        const cursor = this.add.image(780, 50, 'cursor');
        cursor.setScale(0.15);
        cursor.setDepth(1);

        this.time.delayedCall(6000, () => {
            let animation = this.tweens.add({
                targets: cursor,
                x: {from: 780, to: 380},
                y: {from: 50, to: 125},
                duration: 3400,
                ease: 'linear'
            })
        })

        this.time.delayedCall(10000, () => {
            this.scene.start('gamesceneone');
            backgroundMusic.stop();
        })
    }

    update ()
    {
       
    }
}

class GameSceneOne extends Phaser.Scene 
{
    constructor ()
    {
        super('gamesceneone');
    }

    preload ()
    {
        this.load.image("ghost-1", "assets/Mega-Ghost.png");
        this.load.image("ghost-2", "assets/Mega-Ghost-2.png");
        this.load.audio("song-2", "assets/song_2.wav");
    }

    create ()
    {
        let music = this.sound.add('song-2');
        music.loop = true;
        music.play();
        this.ghost = this.add.sprite(100, 200, "ghost-1");
        this.ghostTwo = this.add.sprite(700, 200, "ghost-2");

        this.ghost.setScale(0.35);
        this.ghostTwo.setScale(0.60);

        let animation = this.tweens.add({
            targets: [this.ghost, this.ghostTwo],
            ease: 'linear',
            y:{from: 200, to: 220},
            duration: 3000,
            repeat: -1,
        })

        this.time.delayedCall(2000, () => this.ghost.flipX = true);

        this.time.delayedCall(3500, () => { // main animation function
            let animationTwo = this.tweens.add({
                targets: [this.ghost],
                ease: 'linear',
                x:{from: 100, to: 325},
                duration: 3000,
            })

            let animationThree = this.tweens.add({
                targets: [this.ghostTwo],
                ease: 'linear',
                x:{from: 700, to: 475},
                duraton: 3000,
            })

            let textOne = this.add.text(300, 500, "TEST");
            

        })
        //add keys
        //this.keys = this.input.keyboard.addKeys("W,A,S,D");
        
    }

    update ()
    {
        //const speed = 4;

        // Update the ghost's position based on the keys being pressed this is for controls
        // commented out for animation
        /*if (this.keys.W.isDown) 
        {
            this.ghost.y -= speed;
        }

        if (this.keys.A.isDown) 
        {
            this.ghost.x -= speed;
            this.ghost.flipX = false;
        }

        if (this.keys.S.isDown) 
        {
            this.ghost.y += speed;
        }

        if (this.keys.D.isDown) 
        {
            this.ghost.x += speed;
            this.ghost.flipX = true;
        }*/
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 500,
    backgroundColor: '#4F4B5A',
    scene: [Intro, MainMenu, GameSceneOne],
}

let game = new Phaser.Game(config);