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
        this.backgroundMusic = this.sound.add('song');
        //const cursor = this.add.image(50, 450, 'cursor');
        //cursor.setScale(0.15);
        this.backgroundMusic.play();
        //backgroundMusic.setVolume(0.5);

        let main = this.add.text(330, 250, "MAIN MENU");

        main.setScale(1.20);

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
            this.add.text(330, 100, "Start");
            this.add.text(330, 125, "Options");
            this.add.text(330, 150, "Credits");
            this.add.text(330, 175, "[REDACTED]");
            
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
            this.backgroundMusic.stop();
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
        this.music = this.sound.add('song-2');
        this.music.loop = true;
        this.music.play();
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
        })

        const text = this.add.text(105, 400, '', { font: '15px Courier', fill: '#ffffff' });
        const text2 = this.add.text(105, 425, '', { font: '15px Courier', fill: '#ffffff' });

        let content = 'Left Ghost: The geometric shapes. I sense they are up to something..';
        let speed = 120; // Duration (in milliseconds) to display each character

        //this.typeWrite(text, content, 0, speed);

        this.time.delayedCall(5000, () => { // text dialogue 
            this.typeWrite(text, content, 0, speed);

            this.time.delayedCall(9000, () => { // text dialogue 
                const content2 = 'Right Ghost: I feel it too.';

                this.typeWrite(text2, content2, 0, speed);
                this.time.delayedCall(8000, () => {
                    this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
                        if (progress === 1) {
                            this.scene.start('gamescenetwo');
                        }
                    });
                });
            })
        })
        // this.time.delayedCall(4000, () => { this.typeWrite(text, content, 0, speed); this.time.delayedCall(9000, () => { const content2 = 'Right Ghost: Sounds like a plan.'; this.typeWrite(text2, content2, 0, speed); this.time.delayedCall(11000, () => {this.scene.start('gamescenetwo')})})});
    }

    typeWrite(text, content, currentCharIndex, speed) 
    {
        
        if (currentCharIndex < content.length) 
        {
            text.text += content.charAt(currentCharIndex);
            currentCharIndex += 1;

            this.time.delayedCall(speed, () => {
                this.typeWrite(text, content, currentCharIndex, speed);
            });
        }
    }

    update ()
    {
        
    }
}


class GameSceneTwo extends Phaser.Scene {
    
    constructor ()
    {
        super('gamescenetwo');
    }

    preload ()
    {
        this.load.image("ghost-1", "assets/Mega-Ghost.png");
    }

    create () 
    {
        /* this.ghost = this.add.sprite(400, 200, "ghost-1");
        this.ghost.setScale(0.15);
        this.ghost.setDepth(1); */
        //this.keys = this.input.keyboard.addKeys("W,A,S,D"); // this is for movement
        this.cameras.main.setBackgroundColor('#000000');
        const graphics = this.add.graphics();
        const graphics2 = this.add.graphics();
        const graphics3 = this.add.graphics();

        // Set the fill and line style
        graphics.fillStyle(0x616161, 1);
        graphics.fillGradientStyle(0x6F0000, 0xF61600, 0x770007, 0x002F00, 1, 1, 0,1, 0,1);
        graphics.lineStyle(2, 0x000000, 1); // Green line color, 2px width
      
        graphics2.fillStyle(0x616161, 1);
        graphics2.fillGradientStyle(0x6F0000, 0xF61600, 0x770007, 0x002F00, 1, 1, 0,1, 0,1);
        graphics2.lineStyle(2, 0x000000, 1); // Green line color, 2px width
      
        graphics3.fillStyle(0x616161, 1);
        graphics3.fillGradientStyle(0x6F0000, 0xF61600, 0x770007, 0x002F00, 1, 1, 0,1, 0,1);
        graphics3.lineStyle(2, 0x000000, 1); // Green line color, 2px width

        let rect = graphics.fillRect(-100, 50, 100, 100);
        let circ = graphics2.fillCircle(-100, 100, 50);
        let elli = graphics3.fillEllipse(550, 100, 300, 100, 16);
        //graphics.strokeEllipse(550, 100, 300, 100, 16);

        let loop = this.tweens.add({
            targets:[rect, circ, elli],
            ease: 'linear',
            y: {from: 90, to: 100},
            repeat: -1,
        })

        let speed = 100;
        let text = this.add.text(105, 400, "");
        let text2 = this.add.text(105, 425, "");
        let text3 = this.add.text(105, 450, "");
        let cont = "sphere: b0$$ &*-@(%$(}^<? +&=) ^ {2](-^f?=";
        let cont2 = "ellipse: +y& <*@(#$([g }^<? +Z&/= {]('-/^d?]=[|0";
        let cont3 = "square: ( ͡° ͜ʖ ͡°) /ff";
        //this.typeWrite(text, cont, 0, speed); 

        this.time.delayedCall(2000, () => {
            let animation = this.tweens.add({
                targets: [rect],
                x: {from: -100, to: 200},
                ease: 'linear',
                duration: 3000,
            })

            let animation2 = this.tweens.add({
                targets: [circ],
                x: {from: -100, to: 360},
                ease: 'linear',
                duration: 3000,
            })

            this.time.delayedCall(3100, () => {
                this.typeWrite(text, cont, 0, speed); 

                this.time.delayedCall(6400, () => {
                    this.typeWrite(text2, cont2, 0, speed); 
                    
                    this.time.delayedCall(6400, () => {
                        this.typeWrite(text3, cont3, 0, speed); 

                        this.time.delayedCall(6000, () => {
                            this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
                                if (progress === 1) {
                                    this.scene.start('outro');
                                }
                            });
                        });
                    })
                })
            })
        })

    }

    typeWrite(text, content, currentCharIndex, speed) 
    {
        
        if (currentCharIndex < content.length) 
        {
            text.text += content.charAt(currentCharIndex);
            currentCharIndex += 1;

            this.time.delayedCall(speed, () => {
                this.typeWrite(text, content, currentCharIndex, speed);
            });
        }
    }

    update ()
    {
        /*const speed = 4;

        // Update the ghost's position based on the keys being pressed this is for controls
        // commented out for animation
        if (this.keys.W.isDown) 
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

class Outro extends Phaser.Scene 
{
    constructor ()
    {
        super('outro');
    }

    preload ()
    {

    }

    create () 
    {
        const sceneMusic1 = this.scene.get('gamesceneone');
        sceneMusic1.music.stop();

        const sceneMusic2 = this.scene.get('mainmenu');
        sceneMusic2.backgroundMusic.play();
        //sceneMusic2.backgroundMusic.loop();

        let credits = this.add.text(170, 250, "Programming & Art - Christian Perez \nMusic & Sound - Christian Perez \nTools Used - Adobe Illustrator, GarageBand");

        credits.setScale(1.05);

        this.tweens.add({
            targets: credits,
            y: {from: 450, to: 150},
            ease: 'linear',
            duration: 2500,
        })
    }

    update ()
    {

    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 500,
    backgroundColor: '#4F4B5A',
    scene: [Intro, MainMenu, GameSceneOne, GameSceneTwo, Outro],
}

let game = new Phaser.Game(config);