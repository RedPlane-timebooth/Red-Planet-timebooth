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
    const BULLET_TYPE = BULLET_TYPES.BULLET;

    function Tank(game, x, y, player) {
        parent.call(this, game, x, y, spriteSheetLevel1, START_FRAME, player,
            BULLET_TYPE, FIRE_DAMAGE, FIRE_SPEED, SCALE, RANGE,
            FIRE_DAMAGE_UPGRADE_COST, FIRE_SPEED_UPGRADE_COST, RANGE_UPGRADE_COST);

        this.animations.add('build', [1, 2, 3, 4, 5, 6], 3, false);
        this.animations.play('build');

         //this.head = new WorldObject(this.game, this.x, this.y - 15, 'tankUp', 18);
         // this.head.animations.add('buildUp', [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36
         // ,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,
         // 71,72,74,4,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102], 100, false);
         // this.head.animations.play('buildUp').onComplete.add(function(){
         //     this.fullyBuild = true;
         // }, this);
        this.fullyBuild = true;
    }

    Tank.prototype = Object.create(parent.prototype);
    Tank.prototype.constructor = Turret;

    Tank.prototype.MONEY_COST = MONEY_COST;

    Tank.prototype.fire = function fire() {
        this.game.missileShoot = this.game.add.audio('missileShoot');
        this.game.missileShoot.play();
        parent.prototype.fire.call(this);
    };

    return Tank;
}(Tower));