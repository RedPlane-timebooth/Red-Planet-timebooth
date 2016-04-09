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
     * @param bonuses
     */
    Bullet.prototype.init = function fire(x, y, target, damage, bulletType, bonuses) {
        validator.validateIfNumber(x, bulletType.spriteName + ' x');
        validator.validateIfNumber(y, bulletType.spriteName + ' y');
        validator.validateIfString(bulletType.spriteName, bulletType.spriteName + ' spriteName');
        validator.validateIfNumber(bulletType.bulletSpeed, bulletType.spriteName + ' speed');
        validator.validateIfNumber(damage, bulletType.spriteName + ' damage');
        validator.validateIfBool(bulletType.tracking, bulletType.spriteName + ' tracking');
        this.bonuses = bonuses || {};
        this.bonuses.splash = this.bonuses.splash || false;
        this.bonuses.critical = this.bonuses.critical || false;
        if (target) {
            if (this.bonuses.critical) {
                this.damage = damage * this.bonuses.criticalStrike;
            } else {
                this.damage = damage
            }

            this.tracking = bulletType.tracking;
            this.explosionType = bulletType.explosionType;
            this.explosionSound = this.game.add.audio(bulletType.explosionSound);

            if (bulletType.directHit) {
                this.x = target.x;
                this.y = target.y;
                target.takeHit(this, this.game.player);
                if (!this.bonuses.splash) {
                    if(this.bonuses.critical && !bulletType.isAir){
                        this.kill(target, true);
                    } else {
                        this.kill(target, false);
                    }
                }
            } else {
                this.reset(x, y);
                this.key = bulletType.spriteName;
                this.loadTexture(bulletType.spriteName, 0);
                this.rotation = this.game.physics.arcade.angleBetween(this, target);
                this.game.physics.arcade.velocityFromAngle(this.rotation, bulletType.bulletSpeed, this.body.velocity);
                this.game.physics.arcade.moveToObject(this, target, bulletType.bulletSpeed);
            }

            if (this.bonuses.splash) {
                this.game.enemies.forEachExists(function (enemy) {
                    if (this.game.physics.arcade.distanceBetween(this, enemy) < bonuses.splashRadius) {
                        if (bulletType.directHit) {
                            if (enemy !== target) {
                                enemy.takeHit(this, this.game.player);
                            }
                        } else {
                            enemy.takeHit(this, this.game.player);
                        }
                    }
                }, this);
                this.kill(target, true);
            }
        }
    };

    Bullet.prototype.kill = function kill(enemy, explode) {
        parent.prototype.kill.call(this);
        if (enemy) {
            //TODO: refactor to explosion pool
            this.game.time.events.add(100, function () {
                this.explosionSound.play();
            }, this);
            if(explode){
                var explosion = new WorldObject(this.game, enemy.x, enemy.y, this.explosionType);
                if (this.bonuses.splash) {
                    explosion.scale.setTo(this.bonuses.splashRadius * 2 / explosion.width,
                        this.bonuses.splashRadius * 2 / explosion.height);
                }
                explosion.animations.add('explode');
                explosion.animations.play('explode', 50, false).onComplete.add(function () {
                    explosion.destroy();
                });
            }
        }
    };

    return Bullet;
}(WorldObject));
