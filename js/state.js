SkiJump.State = function() {
    this.bg = null;
    this.groundLayer = null;
    this.tiles = null;
    this.hasJumped = false;
    this.scoreBox = null;
    this.meters = 0;
    this.isLanded = false;
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
        this.load.image('mountain', 'assets/mountain_big.png');
        this.load.image('satellite', 'assets/satellite.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('tree', 'assets/tree.png');
        this.load.image('public', 'assets/public.png');
        this.load.image('sky', 'assets/background.png');
    },

    create: function() {
        var slopeMap;

        this.bg = this.add.tileSprite(0, 0, SkiJump.consts.WIDTH+100, SkiJump.consts.HEIGHT, 'bg');
        this.add.sprite(1000,1250, 'mountain');
        this.add.sprite(1200,1350, 'mountain');
        this.add.sprite(1400,1300, 'mountain');
        this.add.sprite(1600,1400, 'mountain');
        this.add.sprite(1800,1250, 'mountain');
        this.add.sprite(1800,1250, 'mountain');
        this.add.sprite(300,50, 'satellite');
        this.add.sprite(500,150, 'star');
        this.add.sprite(800,20, 'star');
        this.add.sprite(700,250, 'star');
        this.add.sprite(1200,250, 'star');
        this.add.sprite(850,400, 'star');
        this.add.sprite(200,200, 'tree');
        this.add.sprite(180,190, 'tree');
        this.add.sprite(170,180, 'tree');
        this.add.sprite(800,720, 'tree');
        this.add.sprite(950,900, 'tree');
        this.add.sprite(1000,950, 'tree');
        this.add.sprite(1500,1420, 'tree');
        this.add.sprite(1600,1550, 'public');
        this.add.sprite(1440,1550, 'public');
        this.add.sprite(1900,1553, 'public');
        //this.firstStep = this.add.sprite(500, 300, 'sky');

        var style = {
            fill: '#fff'
        };

        this.scorebox = this.add.text(10, 10, this.meters + ' Meter', style);
        this.scorebox.fixedToCamera = true;

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

        this.game.physics.ninja.gravity = 0.015;

        // add the player to the stage
        this.jumper = new SkiJump.Jumper(this.game, 64, 64, 'jumper');
        this.game.add.existing(this.jumper);
        this.game.physics.ninja.enable(this.jumper);
        //this.game.physics.ninja.enable(this.firstStep);
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

                if (this.jumper.body.x > SkiJump.consts.JUMP_AREA_END && !this.isLanded) {
                    this.meters = this.jumper.body.x - SkiJump.consts.JUMP_AREA_END;
                    this.isLanded = true;
                    this.scorebox.text = parseInt(this.meters) + ' Meter';
                }
            }
        }

        this.jumper.angle = angle;
        this.jumper.pivot.y = pivotY;

        console.log(this.jumper.body.x);

        this.jumper.body.touching.down;

        if (this.jumper.body.x > SkiJump.consts.BRAKING_AREA_START) {
            this.jumper.body.friction = 0.1;
        }

        if (
            this.jumper.body.x >= SkiJump.consts.JUMP_AREA_END + 1 &&
            this.jumper.hasJumpPower &&
            !this.hasJumped
        ) {
            this.hasJumped = true;
            this.jumper.body.y -= SkiJump.consts.BOOST_FACTOR * ((this.jumper.finalJumpPower > 0) ? (this.jumper.finalJumpPower / 100) : 0);
        }
    }
};

SkiJump.game.state.add('State', SkiJump.State, true);
