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
    }

    create ()
    {
        let backgroundMusic = this.sound.add('song');
        backgroundMusic.play();
        backgroundMusic.setVolume(0.5);

        let main = this.add.text(350, 250, "MAIN MENU");

        main.setScale(1.25);

        this.tweens.add({
            targets: main,
            y: {from: 250, to: 50},
            ease: 'linear',
            duration: 2500,
        })


        this.time.delayedCall(3000, () => {
            
            this.input.on('pointerdown', () => {
                this.scene.start('gamesceneone');
                backgroundMusic.stop();
            });

            this.add.text(350, 250, "Click to Start");
        });
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

    }

    create ()
    {

        this.add.text(250, 50, "TEST");
    }

    update ()
    {

    }
}

let config = {
    width: 800,
    height: 500,
    backgroundColor: '#4F4B5A',
    scene: [Intro, MainMenu, GameSceneOne],
}

let game = new Phaser.Game(config);