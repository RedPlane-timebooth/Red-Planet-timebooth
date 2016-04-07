var Turret = (function iife(parent) {
    'use strict';

    const spriteSheetLevel1 = 'turret';
    const START_FRAME = 0;
    const MONEY_COST = 80;
    const FIRE_DAMAGE = [
        20, 40, 80, 160, 400
    ];
    const FIRE_SPEED = [
        2500, 2300, 2000, 1600, 1200
    ];
    const RANGE = [
        60, 70, 85, 100, 120
    ];
    const FIRE_DAMAGE_UPGRADE_COST = [
        80, 200, 440, 890
    ];
    const FIRE_SPEED_UPGRADE_COST  = [
        80, 200, 440, 890
    ];
    const RANGE_UPGRADE_COST  = [
        80, 200, 440, 890
    ];
    
    const SCALE = 1;
    const BULLET_TYPE = BULLET_TYPES.BULLET;
    
    function Turret(game, x, y, player) {
        parent.call(this, game, x, y, spriteSheetLevel1, START_FRAME, player, 
            BULLET_TYPE, FIRE_DAMAGE, FIRE_SPEED, SCALE, RANGE,
            FIRE_DAMAGE_UPGRADE_COST, FIRE_SPEED_UPGRADE_COST, RANGE_UPGRADE_COST);
        this.exists = false;

        this.foundations = new WorldObject(this.game, this.x, this.y, 'turretFoundations', 0);
        this.foundations.animations.add('build', [0,1], 3, false);
        this.foundations.animations.play('build').onComplete.add(function() {
            this.foundations.destroy();
            this.exists = true;
            this.head = new WorldObject(this.game, this.x, this.y - 15, 'turretUp', 7);
            this.head.exists = false;
            this.game.time.events.add(1000, function(){
                this.head.exists = true;
                this.head.animations.add('turnAround', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 40, true);
                this.head.animations.play('turnAround');
                this.fullyBuild = true;
            }, this);

            this.animations.add('build', [1, 2], 1, false);
            this.animations.play('build');
        }, this);
    }

    Turret.prototype = Object.create(parent.prototype);
    Turret.prototype.constructor = Turret;

    Turret.prototype.MONEY_COST = MONEY_COST;

    Turret.prototype.fire = function fire() {
        this.game.missileShoot = this.game.add.audio('missileShoot');
        this.game.missileShoot.play();
        parent.prototype.fire.call(this);
        this.game.time.events.add(300, function(){
            if(this.nextTarget) {
                this.game.bullets.factory(this.x - 10, this.y - 30, this.nextTarget, this.bulletType,
                    this.getFireDamage());
            }
        }, this);
    };
    
    return Turret;
}(Tower));