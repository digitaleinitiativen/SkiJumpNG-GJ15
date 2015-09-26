(function(global) {
    var consts = {
        WIDTH: 2048,
        HEIGHT: 2048,
        BRAKING_AREA_START: 1800,
        JUMP_AREA_START: 285,
        JUMP_AREA_END: 360,
        BOOST_FACTOR: 5,
        PIXEL_TO_METER: 0.2,
        BOOSTER:{
            'startPositions': [550, 900],
            'width': 16,
            'area': 30,
            'strength': 2
        }
    };

    Phaser.InputHandler = true;

    SkiJump = global.SkiJump || {
        consts: consts,
        game: new Phaser.Game(consts.WIDTH / 3, consts.HEIGHT / 5, Phaser.AUTO, 'game')
    };

    global.SkiJump = SkiJump;

    // disable browser events
    window.addEventListener('keydown', function(event) {
        if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }

        if (event.keyCode === 13) {
            global.SkiJump.game.state.start('Playing');
        }
    }, false);
})(this)
