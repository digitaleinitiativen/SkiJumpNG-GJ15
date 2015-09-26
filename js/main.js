(function(global) {
    var consts = {
        WIDTH: 2048,
        HEIGHT: 2048
    };

    Phaser.InputHandler = true;

    SkiJump = global.SkiJump || {
        consts: consts,
        game: new Phaser.Game(consts.WIDTH / 2, consts.HEIGHT / 2, Phaser.AUTO, 'game')
    };

    global.SkiJump = SkiJump;
})(this)