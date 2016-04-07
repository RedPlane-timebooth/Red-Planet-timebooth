var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Preload = (function iife() {
    'use strict';
    RedPlanetGame.Preload = function () {
        Phaser.State.call(this);
    };

    RedPlanetGame.Preload.prototype = Object.create(Phaser.State.prototype);
    RedPlanetGame.Preload.prototype.constructor = RedPlanetGame.Preload;

    RedPlanetGame.Preload.prototype = {
        preload: function () {
            //show loading screen
            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
            this.preloadBar.anchor.setTo(0.5);
            this.load.setPreloadSprite(this.preloadBar);
            
            this.load.spritesheet('creep1', '/assets/creeps/creep1.png', 81, 80, 14, 0.5);
            this.load.spritesheet('turret', '/assets/buildings/towers/turret/turret.png', 64, 64, 3);
            this.load.spritesheet('turretFoundations', '/assets/buildings/towers/turret/turretFoundations.png', 64, 64, 2);
            this.load.spritesheet('turretUp', '/assets/buildings/towers/turret/turretUp.png', 64, 32, 17);
            this.load.spritesheet('missileExplosion', '/assets/buildings/towers/turret/explosion.png', 36, 59, 10);
            this.load.audio('missileShoot', '/assets/buildings/towers/turret/missileShoot.mp3');
            this.load.audio('missileExplosion', '/assets/buildings/towers/turret/missileExplosion.mp3');
            this.load.image('missile', '/assets/buildings/towers/turret/missile.png');
            this.load.spritesheet('uiBackground', '/assets/images/uiBackground1.png', 800, 151, 1);
            this.load.image('upgradeButton', '/assets/images/upgrade-button.png');
            this.load.tilemap('sample2', '/assets/maps/sample2.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('gameTiles', '/assets/images/32x32_map_tile v3.1 [MARGINLESS].png');
        },
        create: function () {
            this.state.start('Game');
        }
    };

    return RedPlanetGame.Preload;
})();

