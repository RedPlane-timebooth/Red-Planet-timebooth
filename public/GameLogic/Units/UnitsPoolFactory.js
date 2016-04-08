var UnitsPoolFactory = (function iife(parent) {
    'use strict';

    const UnitsCount = 150;
    const marine = {
        spriteName: 'marine',
        animateMovement: animateMoveGlobal,
        animationsStartRow: 5,
        animationsEndRow: 12,
        goldReward: 50,
        speed: 3,
        scale: 1,
        health: 100,
        defence: 8,
        isAir: false,
        animateDeath: animateDeathGlobal,
        deathSpriteArray:  [221, 222, 223, 224, 225, 226, 227]
    };
    const zealot = {
        spriteName: 'zealot',
        animateMovement: animateMoveGlobal,
        animationsStartRow: 6,
        animationsEndRow: 13,
        goldReward: 65,
        speed: 5,
        scale: 1,
        health: 120,
        defence: 14,
        isAir: false,
        animateDeath: animateDeathGlobal,
        deathSpriteArray: [221, 222, 223, 224, 225, 226, 227]
    };
    const dragoon = {
        spriteName: 'dragoon',
        animateMovement: animateMoveGlobal,
        animationsStartRow: 7,
        animationsEndRow: 15,
        goldReward: 80,
        speed: 4,
        scale: 1,
        health: 200,
        defence: 10,
        isAir: false,
        animateDeath: animateDeathGlobal,
        deathSpriteArray:  [409, 410, 411, 412, 413, 414, 415]
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
                    marine.spriteName, marine.animateMovement, marine.animationsStartRow, marine.animationsEndRow,
                    marine.goldReward, marine.speed, marine.scale, marine.health, marine.defence, marine.isAir,
                    marine.animateDeath, marine.deathSpriteArray
                );
                break;
            case UNIT_TYPES.ZEALOT:
                this.getFirstExists(false).init(x, y, checkPoints,
                    zealot.spriteName, zealot.animateMovement, zealot.animationsStartRow, zealot.animationsEndRow,
                    zealot.goldReward, zealot.speed, zealot.scale, zealot.health, zealot.defence, zealot.isAir,
                    zealot.animateDeath, zealot.deathSpriteArray
                );
                break;
            case UNIT_TYPES.DRAGOON:
                this.getFirstExists(false).init(x, y, checkPoints,
                    dragoon.spriteName, dragoon.animateMovement, dragoon.animationsStartRow, dragoon.animationsEndRow,
                    dragoon.goldReward, dragoon.speed, dragoon.scale, dragoon.health, dragoon.defence, dragoon.isAir,
                    dragoon.animateDeath, dragoon.deathSpriteArray
                );
                break;
            default:
                alert('FATAL ERROR')
        }
    };

    return UnitsPoolFactory;
}(Phaser.Group));