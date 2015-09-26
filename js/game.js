var width = 2048;
var height = 2048;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

SkiJump.Game = function(game) {
    this.game = game;
    this.bg = null;
    this.dude = null;
    this.cursors = null;
    this.stars = null;
    this.scorebox = null;
    this.starCount = 0;
    this.hill = null;
    this.groundLayer = null;
    this.tiles = null;
};

SkiJump.Game.prototype = {
    init: function() {
        this.physics.startSystem(Phaser.Physics.NINJA);
        this.cursors = this.input.keyboard.createCursorKeys();
    },

    preload: function() {
        this.load.tilemap('tilemap', 'assets/large-hill.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ball', 'assets/shinyball.png');
        this.load.image('sky', 'assets/sky2.png');
        this.load.image('tiles', 'assets/kenney.png');

        this.load.baseURL = 'http://skijump.lo/';
    },

    create: function() {
        this.stage.backgroundColor = "#a9f0ff";

        //this.game.world.setBounds(0, 0, width, height);
        this.map = this.add.tilemap('tilemap');
        this.map.addTilesetImage('hilltiles', 'tiles');

        //Add both the background and ground layers
        this.groundLayer = this.map.createLayer('GroundLayer');

        this.map.setCollisionBetween(1, 100, true, 'GroundLayer');

        //Change the world size to match the size of this layer



        //This maps the tiles in your sprite sheet to the phaser ninja tiles to be used
        var slopeMap = {'129': 2, '130': 1, '20': 1, '66': 1};
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


    },

    update: function() {
        for (var i = 0; i < this.tiles.length; i++)
        {
            this.sprite.body.circle.collideCircleVsTile(this.tiles[i].tile);

        }
    }
};

game.state.add('Level One', SkiJump.Game, true);
