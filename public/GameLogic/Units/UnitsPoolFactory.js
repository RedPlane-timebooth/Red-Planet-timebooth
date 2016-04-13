var UnitsPoolFactory = (function iife(parent) {
    'use strict';

    const UNITS_COUNT = 150;
    const marine = {
        spriteName: 'marine',
        animationsStartRow: 5,
        animationsEndRow: 12,
        goldReward: 40,
        speed: 3,
        scale: 1,
        health: 100,
        defence: 8,
        isAir: false,
        deathSpriteArray: [221, 222, 223, 224, 225, 226, 227],
        dialogSound: 'marine',
        deathSound: 'marineDeath',
        livesCount: 1
    };
    const zealot = {
        spriteName: 'zealot',
        animationsStartRow: 6,
        animationsEndRow: 13,
        goldReward: 50,
        speed: 5,
        scale: 1,
        health: 120,
        defence: 14,
        isAir: false,
        deathSpriteArray: [221, 222, 223, 224, 225, 226, 227],
        dialogSound: 'zealot',
        deathSound: 'zealotDeath',
        livesCount: 1
    };
    const dragoon = {
        spriteName: 'dragoon',
        animationsStartRow: 7,
        animationsEndRow: 15,
        goldReward: 70,
        speed: 4,
        scale: 1,
        health: 200,
        defence: 10,
        isAir: false,
        deathSpriteArray: [409, 410, 411, 412, 413, 414, 415],
        dialogSound: 'dragoon',
        deathSound: 'dragoonDeath',
        livesCount: 1
    };
    const ultralisk = {
        spriteName: 'ultralisk',
        animationsStartRow: 1,
        animationsEndRow: 9,
        goldReward: 220,
        speed: 4,
        scale: 1,
        health: 2000,
        defence: 20,
        isAir: false,
        deathSpriteArray: [256, 257, 258, 259, 260, 271, 272, 273, 274, 275],
        dialogSound: 'zerg',
        deathSound: 'zergDeath',
        livesCount: 2
    };
    const reaver = {
        spriteName: 'reaver',
        animationsStartRow: 1,
        animationsEndRow: 9,
        goldReward: 220,
        speed: 4,
        scale: 1,
        health: 2000,
        defence: 20,
        isAir: false,
        deathSpriteArray: [256, 257, 258, 259, 260, 271, 272, 273, 274, 275],
        dialogSound: 'zerg',
        deathSound: 'zergDeath',
        livesCount: 2
    };
    const medic = {
        spriteName: 'hydralisk',
        animationsStartRow: 6,
        animationsEndRow: 12,
        goldReward: 200,
        speed: 2,
        scale: 1,
        health: 250,
        defence: 2,
        isAir: false,
        deathSpriteArray: [221, 222, 223, 224, 225, 226, 227],
        dialogSound: 'marine',
        deathSound: 'marineDeath',
        livesCount: 1,
        specialFunction: function() {
            if(!this.timeStamp){
                this.healBuffer = 5000;
                this.timeStamp = this.game.time.now;
            }
            if(this.game.time.now > this.timeStamp + this.healBuffer){
                this.timeStamp = this.game.time.now;
                this.game.enemies.forEachExists(function (enemy) {
                    if (this.game.physics.arcade.distanceBetween(this, enemy) < 70) {
                        enemy.heal(100);
                    }
                }, this);

                if(!this.healAnimation){
                    this.healAnimation = new WorldObject(this.game, this.x - 10, this.y - 60, 'heal');
                    this.healAnimation.animations.add('heal', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 50,
                        false);
                } else {
                    this.healAnimation.reset(this.x - 10, this.y - 60);
                }
                this.healAnimation.animations.play('heal').onComplete.add(function(){
                    this.healAnimation.visible = false;
                }, this);
            }
        }
    };

    function UnitsPoolFactory(game) {
        parent.call(this, game);
        for (var i = 0; i < UNITS_COUNT; i++) {
            this.add(new Unit(game), true);
        }
    }

    UnitsPoolFactory.prototype = Object.create(parent.prototype);
    UnitsPoolFactory.prototype.constructor = UnitsPoolFactory;

    /**
     *
     * @param x
     * @param y
     * @param unitType
     * @param checkPoints
     */
    UnitsPoolFactory.prototype.factory = function (x, y, unitType, checkPoints) {
        switch (unitType) {
            case UNIT_TYPES.MARINE:
                this.getFirstExists(false).init(x, y, checkPoints, marine);
                break;
            case UNIT_TYPES.ZEALOT:
                this.getFirstExists(false).init(x, y, checkPoints, zealot);
                break;
            case UNIT_TYPES.DRAGOON:
                this.getFirstExists(false).init(x, y, checkPoints, dragoon);
                break;
            case UNIT_TYPES.ULTRALISK:
                this.getFirstExists(false).init(x, y, checkPoints, ultralisk);
                break;
            case 'medic':
                this.getFirstExists(false).init(x, y, checkPoints, medic);
                break;
            default:
                console.log('Unit not added to factory');
        }
    };

    return UnitsPoolFactory;
}(Phaser.Group));