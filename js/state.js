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
        this.load.image('bg', 'assets/background_sky.png');
        this.load.image('tiles', 'assets/kenney.png');
    },

    create: function() {
        var slopeMap;

        this.bg = this.add.tileSprite(0, 0, SkiJump.consts.WIDTH, SkiJump.consts.HEIGHT, 'bg');
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

        this.groundLayer.resizeWorld();

        this.game.physics.ninja.gravity = 0.3;

        // add the player to the stage
        this.jumper = new SkiJump.Jumper(this.game, 64, 64, 'jumper');
        this.game.add.existing(this.jumper);
        this.game.physics.ninja.enable(this.jumper);
        this.jumper.body.bounce = 0;
        this.jumper.body.friction = 0.01;

        this.game.camera.follow(this.jumper);
    },

    update: function() {
        var angle = 0, pivotY = 0;
        for (var i = 0; i < this.tiles.length; i++) {
            var hit = this.jumper.body.aabb.collideAABBVsTile(this.tiles[i].tile)
            if (hit) {
                switch (this.tiles[i].tile.type) {
                    case 1:
                        angle = 0;
                        pivotY = 0;
                        break;
                    case 2:
                        angle = 45;
                        pivotY = -this.jumper.height * 0.2;
                        break;
                }

                if (this.tiles[i].tile.id === 1 && this.jumper.body.x < 800) {
                    //remove friction for platform before jump
                    this.jumper.body.friction = 0;
                } else {
                    this.jumper.body.friction = 0.01;
                }
            }
        }
        this.jumper.angle = angle;
        this.jumper.pivot.y = pivotY;

        this.jumper.body.touching.down;
        if (this.jumper.body.x > 1800) {
            this.jumper.body.friction = 0.1;
        }
    }
};

SkiJump.game.state.add('State', SkiJump.State, true);
