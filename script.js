class D1Cinematic extends Phaser.Scene 
{
    constructor () 
    {
        super('d1cinematic');
    }

    preload () 
    {

    }

    create ()
    {

    }

    update ()
    {

    }
}

let config = {
    width: 600,
    height: 600,
    backgroundColor: '#561161',
    scene: [D1Cinematic],
}

let game = new Phaser.Game(config);