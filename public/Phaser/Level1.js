var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Level1 = (function iife(parent) {
    'use strict';

    var _this = null;
    RedPlanetGame.Level1 = function () {
        parent.call(this);
        _this = this;
    };

    RedPlanetGame.Level1.prototype = Object.create(parent.prototype);
    RedPlanetGame.Level1.prototype.constructor = RedPlanetGame.Level1;

    RedPlanetGame.Level1.prototype.preload = function preload() {
        this.load.tilemap('level1', '/assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('marine', '/assets/creeps/marine.png', 64, 64, 238);
        this.load.spritesheet('zealot', '/assets/creeps/zealot.png', 128, 128, 238);
        this.load.spritesheet('ultralisk', '/assets/creeps/ultralisk.png', 128, 128, 272);
        this.load.spritesheet('dragoon', '/assets/creeps/dragoon.png', 96, 96, 425);
    };

    RedPlanetGame.Level1.prototype.create = function create() {
        parent.prototype.create.call(this);
        var _this = this;
        this.initMapLayersGroups('level1');
        this.game.player.gold = 100000;

        var xOffset = -50,
            creepsCounter = 0;
        setTimeout(function () {
            _this.firstWave = setInterval(function () {
                _this.game.enemies.factory(_this.spawnCreepsAt.x + xOffset, _this.spawnCreepsAt.y,
                    UNIT_TYPES.MARINE, _this.checkPoints);
                xOffset *= -1;
                creepsCounter++;
                if (creepsCounter == 20) {
                    clearInterval(_this.firstWave);
                    creepsCounter = 0;
                }
            }, 2000);
        }, 10000);

        setTimeout(function () {
            _this.secondWave = setInterval(function () {
                _this.game.enemies.factory(_this.spawnCreepsAt.x + xOffset, _this.spawnCreepsAt.y,
                    UNIT_TYPES.ZEALOT, _this.checkPoints);
                xOffset *= -1;
                creepsCounter++;
                if (creepsCounter == 16) {
                    clearInterval(_this.secondWave);
                    creepsCounter = 0;
                }
            }, 3000);
        }, 70000);

        setTimeout(function () {
            _this.thirdWave = setInterval(function () {
                _this.game.enemies.factory(_this.spawnCreepsAt.x + xOffset, _this.spawnCreepsAt.y,
                    UNIT_TYPES.DRAGOON, _this.checkPoints);
                xOffset *= -1;
                creepsCounter++;
                if (creepsCounter == 10) {
                    clearInterval(_this.thirdWave);
                    creepsCounter = 0;
                }
            }, 3600);
        }, 140000);

        setTimeout(function () {
            _this.forthWave = setInterval(function () {
                _this.game.enemies.factory(_this.spawnCreepsAt.x + xOffset, _this.spawnCreepsAt.y,
                    UNIT_TYPES.ULTRALISK, _this.checkPoints);
                xOffset *= -1;
                creepsCounter++;
                if (creepsCounter == 6) {
                    clearInterval(_this.forthWave);
                    creepsCounter = 0;
                }
            }, 4000);
        }, 200000);
        this.game.bmd = this.game.make.bitmapData(960, 790);
        this.game.bmd.addToWorld();
    };
    RedPlanetGame.Level1.prototype.shutdown = function shutdown() {
        clearInterval(this.firstWave);
        clearInterval(this.secondWave);
        clearInterval(this.thirdWave);
        clearInterval(this.forthWave);
        alert('Level over send data to server');
    };
    return RedPlanetGame.Level1;
}(RedPlanetGame.Game));
