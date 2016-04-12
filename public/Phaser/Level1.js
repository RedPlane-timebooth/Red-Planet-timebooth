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
        this.load.audio('level1', '/assets/sounds/level1.mp3');
    };
    RedPlanetGame.Level1.prototype.create = function create() {
        parent.prototype.create.call(this);
        this.initMapLayersGroups('level1');
        this.game.gold = 600;
        this.game.player.lastPlayed = 'Level1';
        this.xOffset = -32;
        this.game.bmd = this.game.make.bitmapData(960, 790);
        this.game.bmd.addToWorld();

        for(var i = 0; i < 20; i++) {
            this.game.time.events.add(i * 3500 + 2000, function () {
                this.game.enemies.factory(this.spawnCreepsAt.x + this.xOffset, this.spawnCreepsAt.y + 40,
                    UNIT_TYPES.MARINE, this.checkPoints);
                this.xOffset *= -1;
            }, this);
        }

        for(i = 20; i < 40; i++) {
            this.game.time.events.add(i * 3500 + 20000, function () {
                this.game.enemies.factory(this.spawnCreepsAt.x + this.xOffset, this.spawnCreepsAt.y,
                    UNIT_TYPES.ZEALOT, this.checkPoints);
                this.xOffset *= -1;
            }, this);
        }

        for(i = 40; i < 60; i++) {
            this.game.time.events.add(i * 3500 + 40000, function () {
                this.game.enemies.factory(this.spawnCreepsAt.x  + this.xOffset, this.spawnCreepsAt.y,
                    UNIT_TYPES.DRAGOON, this.checkPoints);
                this.xOffset *= -1;
            }, this);
        }
        for(i = 60; i < 70; i++) {
            this.game.time.events.add(i * 3500 + 50000, function () {
                this.game.enemies.factory(this.spawnCreepsAt.x  + this.xOffset, this.spawnCreepsAt.y,
                    UNIT_TYPES.ULTRALISK, this.checkPoints);
                this.xOffset *= -1;
            }, this);
        }
        
        this.game.creeps = 70;
    };
    return RedPlanetGame.Level1;
}(RedPlanetGame.Game));
