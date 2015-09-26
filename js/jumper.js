SkiJump.Jumper = function(game, x, y, key) {
    this.game = game;

    Phaser.Sprite.call(this, game, x, y, key, 0);
};

SkiJump.Jumper.prototype = Object.create(Phaser.Sprite.prototype);
SkiJump.Jumper.prototype.constructor = SkiJump.Jumper;

SkiJump.Jumper.prototype.create = function() {
    this.anchor.setTo(0.5, 0);
};

SkiJump.Jumper.prototype.update = function() {
    
};