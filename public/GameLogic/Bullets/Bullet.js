var Bullet = (function iife(parent) {
    'use strict';
    const x = 0;
    const y = 0;

    /**
     * 
     * @param game
     * @constructor
     */
    function Bullet(game) {
        parent.call(this, game, x, y);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;
    }

    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;

    /**
     * 
     * @param x
     * @param y
     * @param target
     * @param damage
     * @param bulletType
     */
    Bullet.prototype.init = function fire(x, y, target, damage, bulletType) {
        validator.validateIfNumber(x, bulletType.spriteName + ' x');
        validator.validateIfNumber(y, bulletType.spriteName + ' y');
        validator.validateIfString(bulletType.spriteName, bulletType.spriteName + ' spriteName');
        validator.validateIfNumber(bulletType.bulletSpeed, bulletType.spriteName + ' speed');
        validator.validateIfNumber(damage, bulletType.spriteName + ' damage');
        validator.validateIfBool(bulletType.tracking, bulletType.spriteName + ' tracking');

        if(target){
            this.reset(x, y);
            this.key = bulletType.spriteName;
            this.loadTexture(bulletType.spriteName, 0);
            this.visible = bulletType.visible;
            this.damage = damage;
            this.tracking = bulletType.tracking;

            this.rotation = this.game.physics.arcade.angleBetween(this, target);
            this.game.physics.arcade.velocityFromAngle(this.rotation, bulletType.bulletSpeed, this.body.velocity);
            this.game.physics.arcade.moveToObject(this, target, bulletType.bulletSpeed);
            this.explosionType = bulletType.explosionType;
            this.explosionSound = this.game.add.audio(bulletType.explosionSound);
        }
    };

    Bullet.prototype.kill = function kill(enemy) {
        parent.prototype.kill.call(this);
        if(enemy){
            //TODO: refactor to explosion pool
            this.game.time.events.add(100, function(){
                this.explosionSound.play();
            }, this);
            var explosion = new WorldObject(this.game, enemy.x, enemy.y, this.explosionType);
            explosion.animations.add('explode');
            explosion.animations.play('explode', 25, false).onComplete.add(function() {
                explosion.destroy();
            });
        }
    };
    
    return Bullet;
}(WorldObject));
