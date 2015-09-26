SkiJump.Jumper = function(game, x, y, key) {
    this.game = game;
    this.jumpPower = 0;
    this.finalJumpPower = 0;
    this.hasJumpPower = false;
    this.tryToJump = false;
    this.jump1Done = false;
    this.jump2Done = false;

    Phaser.Sprite.call(this, game, x, y, key, 0);
};

SkiJump.Jumper.prototype = Object.create(Phaser.Sprite.prototype);
SkiJump.Jumper.prototype.constructor = SkiJump.Jumper;

SkiJump.Jumper.prototype.create = function() {
    this.animations.add('stand', [20], 1, false);
    this.physics.ninja.enable(this, this.width / 2);
};

SkiJump.Jumper.prototype.update = function() {
    var difference, strength;

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        if (this.inJumpArea()) {
            this.tryToJump = true;
            this.jumpPower += 5;
        } else {
            this.jumpPower -= 5;
        }
    }

    if (
        this.tryToJump &&
        !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && 
        this.inJumpArea() &&
        !this.hasJumpPower
    ) {
        this.hasJumpPower = true;
        this.finalJumpPower = this.jumpPower;
    }


    if (this.body.x >= SkiJump.consts.BOOSTER.startPositions[0] - SkiJump.consts.BOOSTER.area &&
        this.body.x <= SkiJump.consts.BOOSTER.startPositions[0] + SkiJump.consts.BOOSTER.area &&
        this.game.input.keyboard.isDown(Phaser.Keyboard.J) &&
        this.jump1Done === false) {
        this.jump1Done = true;

        difference = 100 - Math.abs(SkiJump.consts.BOOSTER.startPositions[0] - this.body.x);
        strength = (SkiJump.consts.BOOSTER.strength * (difference/100));

        this.body.y = this.body.y - strength;
        this.body.x = this.body.x + strength;

        console.log(difference);
        console.log(strength);
    }

    if (this.body.x >= SkiJump.consts.BOOSTER.startPositions[1] - SkiJump.consts.BOOSTER.area &&
        this.body.x <= SkiJump.consts.BOOSTER.startPositions[1] + SkiJump.consts.BOOSTER.area &&
        this.game.input.keyboard.isDown(Phaser.Keyboard.J) &&
        this.jump2Done === false) {
        this.jump2Done = true;

        difference = 100 - Math.abs(SkiJump.consts.BOOSTER.startPositions[1] - this.body.x);
        strength = (SkiJump.consts.BOOSTER.strength * (difference/100));

        this.body.y = this.body.y - strength;
        this.body.x = this.body.x + strength;
        console.log(difference);
        console.log(strength);
    }

    if (this.body.x > SkiJump.consts.BRAKING_AREA_START && this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        this.body.y -= 0.2;
    }
};

SkiJump.Jumper.prototype.inJumpArea = function() {
    return this.body.x >= SkiJump.consts.JUMP_AREA_START && 
           this.body.x <= SkiJump.consts.JUMP_AREA_END;
};
