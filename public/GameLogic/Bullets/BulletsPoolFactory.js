var BulletsPoolFactory = (function iife(parent) {
    'use strict';

    const BulletCount = 100;
    const turretMissile = {
        spriteName: 'missile',
        bulletSpeed: 500,
        tracking: true,
        explosionType: 'missileExplosion',
        explosionSound: 'missileExplosion',
        directHit: false
    };
    const tankMissile = {
        spriteName: 'missile',
        bulletSpeed: 0,
        tracking: false,
        explosionType: 'splashExplosion',
        explosionSound: 'missileExplosion',
        directHit: true
    };
    const sniperBullet = {
        spriteName: 'missile',
        bulletSpeed: 0,
        tracking: false,
        explosionType: 'bloodExplosion',
        explosionSound: 'shoot',
        directHit: true
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
     * @param bonuses
     */
    BulletPoolFactory.prototype.factory = function (sourceX, sourceY, target, bulletType, damage, bonuses) {
        switch (bulletType) {
            case BULLET_TYPES.MISSILE:
                this.getFirstExists(false).init(sourceX, sourceY, target, damage, turretMissile, bonuses);
                break;
            case BULLET_TYPES.SPLASH:
                this.getFirstExists(false).init(sourceX, sourceY, target, damage, tankMissile, bonuses);
                break;
            case BULLET_TYPES.SNIPER:
                this.getFirstExists(false).init(sourceX, sourceY, target, damage, sniperBullet, bonuses);
                break;
        }
    };

    return BulletPoolFactory;
}(Phaser.Group));
