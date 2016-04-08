var UnitsPoolFactory = (function iife(parent) {
    'use strict';

    const UNITS_COUNT = 150;
    const marine = {
        spriteName: 'marine',
        animationsStartRow: 5,
        animationsEndRow: 12,
        goldReward: 50,
        speed: 3,
        scale: 1,
        health: 100,
        defence: 8,
        isAir: false,
        deathSpriteArray: [221, 222, 223, 224, 225, 226, 227]
    };
    const zealot = {
        spriteName: 'zealot',
        animationsStartRow: 6,
        animationsEndRow: 13,
        goldReward: 65,
        speed: 5,
        scale: 1,
        health: 120,
        defence: 14,
        isAir: false,
        deathSpriteArray: [221, 222, 223, 224, 225, 226, 227]
    };
    const dragoon = {
        spriteName: 'dragoon',
        animationsStartRow: 7,
        animationsEndRow: 15,
        goldReward: 80,
        speed: 4,
        scale: 1,
        health: 200,
        defence: 10,
        isAir: false,
        deathSpriteArray: [409, 410, 411, 412, 413, 414, 415]
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
            default:
                alert('FATAL ERROR')
        }
    };

    return UnitsPoolFactory;
}(Phaser.Group));