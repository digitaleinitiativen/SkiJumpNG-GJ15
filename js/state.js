SkiJump.State = function() {
    this.bg = null;
    this.groundLayer = null;
    this.tiles = null;
};

SkiJump.State.prototype = {
    init: function() {
        this.physics.startSystem(Phaser.Physics.NINJA);
    },

    preload: function() {
        this.load.spritesheet('jumper', 'assets/jumperdude.png', 64, 64, 20);
        this.load.tilemap('tilemap', 'assets/large-hill.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ball', 'assets/shinyball.png');
        this.load.image('sky', 'assets/sky2.png');
        this.load.image('tiles', 'assets/kenney.png');
    },

    create: function() {
        var jumper, slopeMap;

        this.stage.backgroundColor = "#a9f0ff";

        this.world.setBounds(0, 0, SkiJump.consts.WIDTH, SkiJump.consts.HEIGHT);

        //this.game.world.setBounds(0, 0, width, height);
        this.map = this.add.tilemap('tilemap');
        this.map.addTilesetImage('hilltiles', 'tiles');

        //Add both the background and ground layers
        this.groundLayer = this.map.createLayer('GroundLayer');

        this.map.setCollisionBetween(1, 100, true, 'GroundLayer');

        //This maps the tiles in your sprite sheet to the phaser ninja tiles to be used
        slopeMap = {'129': 2, '130': 1, '20': 1, '66': 1};
        this.tiles = this.game.physics.ninja.convertTilemap(this.map, this.groundLayer, slopeMap);


        //Add the sprite to the game and enable arcade physics on it
        this.sprite = this.game.add.sprite(50, 50, 'ball');
        this.game.physics.ninja.enableCircle(this.sprite, this.sprite.width/2);

        this.groundLayer.resizeWorld();

        //Set some physics on the sprite
        this.sprite.body.bounce.y = 0.5;
        this.sprite.body.friction = 0.01;
        this.game.physics.ninja.gravity = 0.3;
        this.game.camera.follow(this.sprite);


        // add the player to the stage
        jumper = new SkiJump.Jumper(this.game, 64, 64, 'jumper');
        this.game.add.existing(jumper);
    },

    update: function() {
        for (var i = 0; i < this.tiles.length; i++)
        {
            this.sprite.body.circle.collideCircleVsTile(this.tiles[i].tile);

        }
    }
};

SkiJump.game.state.add('State', SkiJump.State, true);
