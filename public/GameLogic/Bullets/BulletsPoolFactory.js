var BulletsPoolFactory = (function iife(parent) {
    'use strict';

    const BulletCount = 100;
    const turretMissile = {
        spriteName: 'missile',
        bulletSpeed: 500,
        tracking: true,
        explosionType: 'missileExplosion',
        explosionSound: 'missileExplosion'
    };

    /**
     * 
     * @param game
     * @constructor
     */
    function BulletPoolFactory(game) {
        parent.call(this, game);
        for (var i = 0; i < BulletCount; i++) {
            this.add(new Bullet(game), true);
        }
    }

    BulletPoolFactory.prototype = Object.create(parent.prototype);
    BulletPoolFactory.prototype.constructor = BulletPoolFactory;

    /**
     * 
     * @param sourceX
     * @param sourceY
     * @param target
     * @param bulletType
     * @param damage
     */
    BulletPoolFactory.prototype.factory = function (sourceX, sourceY, target, bulletType, damage) {
        switch (bulletType) {
            case BULLET_TYPES.BULLET:
                this.getFirstExists(false).init(sourceX, sourceY, target,
                    turretMissile.spriteName, turretMissile.bulletSpeed, damage, turretMissile.tracking,
                    turretMissile.explosionType, turretMissile.explosionSound);
        }
    };

    return BulletPoolFactory;
}(Phaser.Group));
