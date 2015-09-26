SkiJump.Jumper = function(game, x, y, key) {
    this.game = game;
    this.jumpPower = 0;

    Phaser.Sprite.call(this, game, x, y, key, 0);
};

SkiJump.Jumper.prototype = Object.create(Phaser.Sprite.prototype);
SkiJump.Jumper.prototype.constructor = SkiJump.Jumper;

SkiJump.Jumper.prototype.create = function() {
    this.animations.add('stand', [20], 1, false);
    this.anchor.setTo(0.5, 0);
};

SkiJump.Jumper.prototype.update = function() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACE)) {
        if (
            this.body.x >= SkiJump.consts.JUMP_AREA_START &&
            this.body.x <= SkiJump.consts.JUMP_AREA_END
        ) {
            this.jumpPower += 5;
        } else {
            this.jumpPower -= 5;
        }
    }
};