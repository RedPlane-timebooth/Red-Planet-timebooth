var Sniper = (function iife(parent) {
    'use strict';

    const spriteSheetLevel1 = 'sniper';
    const START_FRAME = 203;
    const MONEY_COST = 400;
    const FIRE_DAMAGE = [
        1000, 1500, 2000, 2500, 3000
    ];
    const FIRE_SPEED = [
        8000, 7000, 6000, 5000, 4000
    ];
    const RANGE = [
        200, 230, 260, 300, 350
    ];
    const FIRE_DAMAGE_UPGRADE_COST = [
        400, 800, 1300, 4000
    ];
    const FIRE_SPEED_UPGRADE_COST = [
        400, 800, 1300, 3200
    ];
    const RANGE_UPGRADE_COST = [
        400, 800, 1300, 2300
    ];
    const SCALE = 1;
    const BULLET_TYPE = BULLET_TYPES.SNIPER;
    var nextTarget = null;

    function Sniper(game, x, y, player) {
        parent.call(this, game, x, y, spriteSheetLevel1, START_FRAME, player,
            BULLET_TYPE, FIRE_DAMAGE, FIRE_SPEED, SCALE, RANGE,
            FIRE_DAMAGE_UPGRADE_COST, FIRE_SPEED_UPGRADE_COST, RANGE_UPGRADE_COST);

        this.fullyBuild = true;
        this.reversed = false;
        this.bonuses = {
            critical: true,
            criticalChance: 0.2,
            criticalStrike: 2.5
        };
        this.smoke = new WorldObject(this.game, this.x, this.y, 'smoke', 7);
        this.smoke.animations.add('fire', [0, 1,2,3,4,5,6,7], 30, false);
    }

    Sniper.prototype = Object.create(parent.prototype);
    Sniper.prototype.constructor = Turret;

    Sniper.prototype.MONEY_COST = MONEY_COST;

    Sniper.prototype.rotateHeadTowardsTarget = function rotateHeadTowardsTarget() {
        if(this.nextTarget && this.lastFired === this.game.time.now){
            var rotation = this.calculateRotation(this.nextTarget);
            this.animations.add('shoot', [rotation.spriteRow, rotation.spriteRow + 12*17, rotation.spriteRow + 11*17], 15);
            this.animations.play('shoot').onComplete.add(function () {
                this.frame = rotation.spriteRow + 11*17;
                parent.prototype.onUpdate.call(this);
            }, this);
            if (rotation.reverseX && !this.reversed) {
                this.reverse();
            }
            if(!rotation.reverseX && this.reversed) {
                this.reverse();
            }
        }
    };
    Sniper.prototype.reverse = function reverse(){
        this.scale.x *= -1;
        this.reversed = !this.reversed;
    };
    Sniper.prototype.onUpdate = function onUpdate() {
        parent.prototype.onUpdate.call(this);

        this.rotateHeadTowardsTarget();
    };
    Sniper.prototype.fire = function fire() {
        this.bonuses.critical = Math.random() < this.bonuses.criticalChance;
        if(this.bonuses.critical){
            this.game.ui.textNotification(this.x - 50, this.y - 50, 'Headshot!!!', 'red', 2000, true);
        }
        parent.prototype.fire.call(this);
        this.smoke.animations.play('fire');
    };
    Sniper.prototype.findTarget = function findTarget() {
        if (!this.buffers.searchedForTarget.is) {
            nextTarget = null;
            this.game.enemies.forEachExists(function (enemy) {
                if (this.game.physics.arcade.distanceBetween(this, enemy) < this.getRange() + 10) {
                    if (nextTarget === null || nextTarget.health < enemy.health) {
                        nextTarget = enemy;
                    }
                }
            }, this);
            this.nextTarget = nextTarget;
            buffer(this.buffers.searchedForTarget, 250, this.game);
        }
    };
    return Sniper;
}(Tower));