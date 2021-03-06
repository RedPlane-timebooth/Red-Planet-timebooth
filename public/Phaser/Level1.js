var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Level1 = (function iife(parent) {
    'use strict';

    RedPlanetGame.Level1 = function () {
        parent.call(this);
    };

    RedPlanetGame.Level1.prototype = Object.create(parent.prototype);
    RedPlanetGame.Level1.prototype.constructor = RedPlanetGame.Level1;

    RedPlanetGame.Level1.prototype.preload = function preload() {
        this.load.tilemap('level1', '/assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('marine', '/assets/creeps/marine.png', 64, 64, 238);
        this.load.spritesheet('zealot', '/assets/creeps/zealot.png', 128, 128, 238);
        this.load.spritesheet('ultralisk', '/assets/creeps/ultralisk.png', 128, 128, 272);
        this.load.spritesheet('dragoon', '/assets/creeps/dragoon.png', 96, 96, 425);
        this.load.spritesheet('hydralisk', '/assets/creeps/hydralisk.png', 128, 128, 250);
        this.load.audio('level1', '/assets/sounds/level1.mp3');
    };
    RedPlanetGame.Level1.prototype.create = function create() {
        parent.prototype.create.call(this);
        this.initMapLayersGroups('level1');
        this.game.gold = 600;
        this.game.player.lastPlayed = 'Level1';
        this.game.bmd = this.game.make.bitmapData(960, 790);
        this.game.bmd.addToWorld();
        this.spawnCreeps(8, 0, 20000, UNIT_TYPES.MEDIC, this.spawnCreepsAt.x, this.spawnCreepsAt.y + 40,
            this.checkPoints2);
        this.spawnCreeps(20, 20000, 3000, UNIT_TYPES.MARINE, this.spawnCreepsAt.x, this.spawnCreepsAt.y + 40,
            this.checkPoints);
        this.spawnCreeps(20, 110000, 3500, UNIT_TYPES.ZEALOT, this.spawnCreepsAt.x, this.spawnCreepsAt.y + 40,
            this.checkPoints);
        this.spawnCreeps(20, 170000, 3500, UNIT_TYPES.DRAGOON, this.spawnCreepsAt.x, this.spawnCreepsAt.y + 40,
            this.checkPoints);
        this.spawnCreeps(10, 250000, 3500, UNIT_TYPES.ULTRALISK, this.spawnCreepsAt.x, this.spawnCreepsAt.y + 40,
            this.checkPoints);

        this.game.creeps = 78;
    };
    RedPlanetGame.Level1.prototype.spawnCreeps = function spawnCreeps
        (count, startTime, step, creepsType, x, y, checkPoints)
    {
        for (var i = 0; i < count; i++) {
            this.game.time.events.add(startTime + step * i, function () {
                this.game.enemies.factory(x, y, creepsType, checkPoints);
            }, this);
        }
    };
    return RedPlanetGame.Level1;
}(RedPlanetGame.Game));
