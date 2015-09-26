var width = 2048;
var height = 2048;

var game = new Phaser.Game(width/2, height/2, Phaser.AUTO, 'game');

var SkiJumpGame = function(game) {
    this.game = game;
    this.bg = null;
    this.dude = null;
    this.cursors = null;
    this.stars = null;
    this.scorebox = null;
    this.starCount = 0;
};

SkiJumpGame.prototype = {
    init: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();
    },

    preload: function() {
        this.load.baseURL = './';
        this.load.image('bg', 'assets/background.png');
        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.load.image('star', 'assets/star.png');
    },

    create: function() {
        this.world.setBounds(0, 0, width, height);

        this.bg = this.add.tileSprite(0, 0, width, height, 'bg');
        this.stars = this.add.group();
        this.dude = this.add.sprite(50, 0, 'dude');
        var style = {
            fill: '#fff'
        };

        this.scorebox = this.add.text(10, 10, this.starCount + ' Sterne', style);
        this.scorebox.fixedToCamera = true;

        this.physics.enable(this.dude);

        this.stars.enableBody = true;

        for (var i = 0; i < 40; i++) {
            var star = this.stars.create(Math.random() * this.world.width, Math.random() * this.world.height, 'star');
        }

        this.dude.body.gravity.y = 700;
        this.dude.body.collideWorldBounds = true;
        this.dude.body.bounce.y = 0.2;

        this.dude.animations.add('stand', [4], 1, false);
        this.dude.animations.add('left', [0, 1, 2, 3], 10, true);
        this.dude.animations.add('right', [5, 6, 7, 8], 10, true);

        this.camera.follow(this.dude);
    },

    update: function() {
        this.physics.arcade.overlap(this.dude, this.stars, function(dude, star) {
            this.starCount += 1;
            this.scorebox.text = this.starCount + ' Sterne';
            star.kill();
        }.bind(this));

        this.dude.body.velocity.x = 0;
        if (this.cursors.right.isDown) {
            this.dude.body.velocity.x = 500;
            this.dude.animations.play('right');
        } else if (this.cursors.left.isDown) {
            this.dude.body.velocity.x = -500;
            this.dude.animations.play('left');
        } else {
            this.dude.animations.play('stand');
        }

        if (this.cursors.up.isDown) {
            this.dude.body.velocity.y = -500;
        }
    }
};

game.state.add('Level One', SkiJumpGame, true);
