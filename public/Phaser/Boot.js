var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Boot = (function iife() {
    'use strict';
    RedPlanetGame.Boot = function () {
        Phaser.State.call(this);
    };

    RedPlanetGame.Boot.prototype = Object.create(Phaser.State.prototype);
    RedPlanetGame.Boot.prototype.constructor = RedPlanetGame.Boot;

//setting game configuration and loading the assets for the loading screen
    RedPlanetGame.Boot.prototype = {
        preload: function () {
            //assets we'll use in the loading screen
            this.load.image('preloadBar', '/assets/images/preloadBar.jpg');
        },
        create: function () {
            this.game.stage.backgroundColor = '#000';

            //scaling options
            //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //have the game centered horizontally
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;


            //physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.state.start('Preload');
        }
    };
    return RedPlanetGame.Boot;
})();

