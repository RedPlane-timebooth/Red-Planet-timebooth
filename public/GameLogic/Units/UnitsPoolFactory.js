var UnitsPoolFactory = (function iife(parent) {
    'use strict';

    const UnitsCount = 150;
    const marine = {
        spriteName: 'marine',
        animateMovement: animateMoveGlobal,
        goldReward: 50,
        speed: 3,
        scale: 1,
        health: 100,
        defence: 8,
        isAir: false
    };
    const zealot = {
        spriteName: 'zealot',
        animateMovement: animateMoveGlobal,
        goldReward: 65,
        speed: 5,
        scale: 1,
        health: 120,
        defence: 14,
        isAir: false
    };
    const dragoon = {
        spriteName: 'dragoon',
        animateMovement: animateMoveGlobal,
        goldReward: 80,
        speed: 4,
        scale: 1,
        health: 200,
        defence: 10,
        isAir: false
    };
    
    function UnitsPoolFactory(game) {
        parent.call(this, game);
        for (var i = 0; i < UnitsCount; i++) {
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
                this.getFirstExists(false).init(x, y, checkPoints,
                    marine.spriteName, marine.animateMovement, marine.goldReward, marine.speed, marine.scale, marine.health,
                    marine.defence, marine.isAir);
                break;
            case UNIT_TYPES.ZEALOT:
                this.getFirstExists(false).init(x, y, checkPoints,
                    zealot.spriteName, zealot.animateMovement, zealot.goldReward, zealot.speed, zealot.scale, zealot.health,
                    zealot.defence, zealot.isAir);
                break;
            case UNIT_TYPES.DRAGOON:
                this.getFirstExists(false).init(x, y, checkPoints,
                    dragoon.spriteName, dragoon.animateMovement, dragoon.goldReward, dragoon.speed, dragoon.scale, dragoon.health,
                    dragoon.defence, dragoon.isAir);
                break;
            default:
                alert('FATAL ERROR')
        }
    };

    return UnitsPoolFactory;
}(Phaser.Group));