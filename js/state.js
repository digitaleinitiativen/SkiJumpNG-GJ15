SkiJump.State = function() {};

SkiJump.State.prototype = {
    init: function() {
        // this.physics.startSystem(Phaser.Physics.NINJA);
    },

    preload: function() {
        // this.load.baseURL = './';

        // this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        // this.load.image('hill', 'assets/kenney.png');
        this.load.spritesheet('jumper', 'assets/jumperdude.png', 64, 64, 20);
    },

    create: function() {
        var jumper;

        this.world.setBounds(0, 0, SkiJump.consts.WIDTH, SkiJump.consts.HEIGHT);

        // add the player to the stage
        jumper = new SkiJump.Jumper(this.game, 64, 64, 'jumper');
        this.game.add.existing(jumper);
    },

    update: function() {
    }
};

SkiJump.game.state.add('State', SkiJump.State, true);
