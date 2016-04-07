var Unit = (function iife(parent) {
    'use strict';

    const MOVE_ANIMATION_LENGTH = 10;
    const START_X = 0;
    const START_Y = 0;

    /**
     * 
     * @param game
     * @constructor
     */
    function Unit(game) {
        parent.call(this, game, START_X, START_Y);
        this.exists = false;
        
        this.inputEnabled = true;
        this.events.onInputDown.add(this.showDialog, this);
        this.events.onInputOver.add(function() {
            if(!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.events.onInputOut.add(function() {
            if(!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.NORMAL;
            }
        }, this);
    }

    Unit.prototype = Object.create(parent.prototype);
    Unit.prototype.constructor = Unit;

    /**
     * 
     * @param x
     * @param y
     * @param checkPoints
     * @param spriteName
     * @param moveAnimationLength
     * @param goldReward
     * @param speed
     * @param scale
     * @param health
     * @param defence
     * @param isAir
     */
    Unit.prototype.init = function init(x, y, checkPoints, spriteName, moveAnimationLength, goldReward, speed, scale, health, defence, isAir) {
        validator.validateIfNumber(x, spriteName + ' x');
        validator.validateIfNumber(y, spriteName + ' y');
        validator.validateIfNumber(moveAnimationLength, spriteName + ' moveAnimationLength');
        validator.validateIfNumber(speed, spriteName + ' speed');
        validator.validateIfNumber(goldReward, spriteName + ' goldReward');
        validator.validateIfNumber(speed, spriteName + ' speed');
        validator.validateIfNumber(scale, spriteName + ' scale');
        validator.validateIfNumber(health, spriteName + ' health');
        validator.validateIfNumber(defence, spriteName + ' defence');
        validator.validateIfBool(isAir, spriteName + ' isAir');
        
        this.reset(x, y);
        this.key = spriteName;
        this.loadTexture(spriteName, 0);
        this.goldReward = goldReward;
        this.speed = speed;
        this.scale.setTo(scale);
        this.setHealth(health);
        this.defence = defence;
        this.isAir = isAir;
        this.animations.add('move');
        this.animations.play('move', MOVE_ANIMATION_LENGTH, true);
        this.walked = 0;
        this.body.setSize(32, 32);

        //define unit movement based on checkpoints with Phaser tween system ( I prefer events and promises over watchers )
        var currentCheckPoint = 0,
            _this = this;
        this.tweens = [];
        checkPoints.forEach(function(checkPoint){
            _this.tweens.push(_this.game.add.tween(_this).to( { x: checkPoint.x, y: checkPoint.y }, _this.calculateTimeForTween(checkPoint)));
            currentCheckPoint++;
        });
        for (var i = 0; i < currentCheckPoint - 1; i++) {
            this.tweens[i].chain(this.tweens[i + 1]);
        }
        this.tweens[0].start();
        this.tweens[currentCheckPoint - 1].onComplete.add(function onEndReach() {
            //alert('reached end');
            this.kill();
        }, this);
    };

    Unit.prototype.takeHit = function takeHit(bullet, player) {
        var calculateHitDamage = bullet.damage - (bullet.damage * this.defence) / 100;
        this.damage(calculateHitDamage);
        if(this.health <= 0){
            this.kill();
            player.gold += this.goldReward;
            player.killed += 1;
        }
    };
    Unit.prototype.onUpdate = function onUpdate() {
        this.walked++;
    };
    Unit.prototype.kill = function kill() {
        parent.prototype.kill.call(this);
        this.tweens.forEach(function(tween){
            tween.stop();
        });
    };
    Unit.prototype.calculateTimeForTween = function(destination) {
        return this.game.physics.arcade.distanceBetween(this, destination) * (100 / this.speed);
    };
    Unit.prototype.getPersonalInfo = function getPersonalInfo() {
        var info = parent.prototype.getPersonalInfo.call(this);
        info.health = this.health;
        info.speed = this.speed;
        info.defence = this.defence;
        info.infoType = 'unit';
        return info;
    };
    Unit.prototype.showDialog = function showPersonalInfo() {
        parent.prototype.showDialog.call(this);
    };

    return Unit;
}(WorldObject));
