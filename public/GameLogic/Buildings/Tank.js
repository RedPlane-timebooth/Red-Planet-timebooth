var Tank = (function iife(parent) {
    'use strict';

    const spriteSheetLevel1 = 'tankFoundations';
    const START_FRAME = 6;
    const MONEY_COST = 300;
    const FIRE_DAMAGE = [
        50, 110, 250, 550, 1200
    ];
    const FIRE_SPEED = [
        4000, 3750, 3400, 3000, 2400
    ];
    const RANGE = [
        100, 120, 140, 165, 200
    ];
    const FIRE_DAMAGE_UPGRADE_COST = [
        300, 650, 1300, 4000
    ];
    const FIRE_SPEED_UPGRADE_COST = [
        300, 650, 440, 2800
    ];
    const RANGE_UPGRADE_COST = [
        300, 650, 1300, 2000
    ];

    const SCALE = 1;
    const BULLET_TYPE = BULLET_TYPES.SPLASH;

    function Tank(game, x, y, player) {
        parent.call(this, game, x, y, spriteSheetLevel1, START_FRAME, player,
            BULLET_TYPE, FIRE_DAMAGE, FIRE_SPEED, SCALE, RANGE,
            FIRE_DAMAGE_UPGRADE_COST, FIRE_SPEED_UPGRADE_COST, RANGE_UPGRADE_COST);

        this.animations.add('build', [1, 2, 3, 4, 5, 6], 3, false);
        this.animations.play('build');

         this.head = new WorldObject(this.game, this.x - 4, this.y - 16, 'tankUp', 18);
          this.head.animations.add('buildUp', [34, 51, 68, 85, 102], 2, false);
          this.head.animations.play('buildUp').onComplete.add(function(){
              this.fullyBuild = true;
          }, this);

        this.reversed = false;
    }

    Tank.prototype = Object.create(parent.prototype);
    Tank.prototype.constructor = Turret;

    Tank.prototype.MONEY_COST = MONEY_COST;
    
    Tank.prototype.rotateHeadTowardsTarget = function rotateHeadTowardsTarget() {
        if(this.nextTarget && this.lastFired === this.game.time.now){
            var rotation = this.calculateRotation(this.nextTarget);
            this.head.frame = rotation.spriteRow;
            if (rotation.reverseX && !this.reversed) {
                this.reverseHeadX();
            }
            if(!rotation.reverseX && this.reversed) {
                this.reverseHeadX();
            }
        }
    };
    Tank.prototype.reverseHeadX = function reverseHeadX(){
        this.head.scale.x *= -1;
        this.reversed = !this.reversed;
    };
    Tank.prototype.onUpdate = function onUpdate() {
        parent.prototype.onUpdate.call(this);
        
        this.rotateHeadTowardsTarget();
    };

    return Tank;
}(Tower));