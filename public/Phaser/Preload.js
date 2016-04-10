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

            this.load.tilemap('level1', '/assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('gameTiles', '/assets/images/badlands.png');

            this.load.spritesheet('marine', '/assets/creeps/marine.png', 64, 64, 238);
            this.load.spritesheet('zealot', '/assets/creeps/zealot.png', 128, 128, 238);
            this.load.spritesheet('ultralisk', '/assets/creeps/ultralisk.png', 128, 128, 272);
            this.load.spritesheet('dragoon', '/assets/creeps/dragoon.png', 96, 96, 425);
            
            this.load.spritesheet('turret', '/assets/buildings/towers/turret/turret.png', 64, 64, 3);
            this.load.spritesheet('sniper', '/assets/buildings/towers/sniper/ghost.png', 64, 64, 238);
            this.load.spritesheet('smoke', '/assets/buildings/towers/sniper/smoke.png', 84, 84, 8);
            
            this.load.spritesheet('turretFoundations', '/assets/buildings/towers/turret/turretFoundations.png', 64, 64, 2);
            this.load.spritesheet('turretUp', '/assets/buildings/towers/turret/turretUp.png', 64, 32, 17);
            this.load.spritesheet('tankFoundations', '/assets/buildings/towers/tank/tankFoundations.png', 72, 64, 6);
            this.load.spritesheet('tankUp', '/assets/buildings/towers/tank/tankUp.png', 128, 128, 102);
            
            this.load.spritesheet('missileExplosion', '/assets/buildings/towers/turret/explosion.png', 36, 59, 10);
            this.load.spritesheet('splashExplosion', '/assets/buildings/towers/tank/explosion2.png', 256, 256, 48);
            this.load.spritesheet('bloodExplosion', '/assets/buildings/towers/sniper/blood.png', 192, 192, 15);

            this.load.spritesheet('healthBar', '/assets/images/health.png', 323, 50, 11);

            this.load.image('missile', '/assets/buildings/towers/turret/missile.png');
            this.load.image('turretBuild', '/assets/buildings/towers/turret/turretBuild.png');
            this.load.image('tank', '/assets/buildings/towers/tank/tank.png');
            this.load.image('ghostButton', '/assets/buildings/towers/sniper/ghostButton.png');
            this.load.image('uiBackground', '/assets/images/tConsole.png');
            this.load.image('select', '/assets/images/select.png');
            this.load.image('upgradeButton', '/assets/images/upgradeIcon.png');
            this.load.image('attackIcon', '/assets/images/attackIcon.png');
            this.load.image('timeIcon', '/assets/images/timeIcon.png');
            this.load.image('rangeIcon', '/assets/images/rangeIcon.png');
            this.load.image('goldIcon', '/assets/images/gold.png');
            this.load.image('skeletonIcon', '/assets/images/skeleton.png');
            this.load.image('defence', '/assets/images/defence.png');
            this.load.image('speed', '/assets/images/speed.png');
            
            this.load.audio('missileShoot', '/assets/buildings/towers/turret/missileShoot.mp3');
            this.load.audio('missileExplosion', '/assets/buildings/towers/turret/missileExplosion.mp3');
            this.load.audio('shoot', '/assets/buildings/towers/sniper/shoot.mp3');

        },
        create: function () {
            this.state.start('Game');
        }
    };

    return RedPlanetGame.Preload;
})();

