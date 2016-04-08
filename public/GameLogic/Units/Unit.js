var Unit = (function iife(parent) {
    'use strict';

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
    }

    Unit.prototype = Object.create(parent.prototype);
    Unit.prototype.constructor = Unit;

    /**
     * 
     * @param x
     * @param y
     * @param checkPoints
     * @param spriteName
     * @param animateMovement
     * @param animationsStartRow
     * @param animationsEndRow
     * @param goldReward
     * @param speed
     * @param scale
     * @param health
     * @param defence
     * @param isAir
     * @param animateDeath
     * @param deathSpriteArray
     */
    Unit.prototype.init = function init
        (
        x, y, checkPoints, spriteName,
        animateMovement, animationsStartRow, animationsEndRow,
        goldReward, speed, scale, health, defence, isAir,
        animateDeath, deathSpriteArray
        )
    {

        validator.validateIfNumber(x, spriteName + ' x');
        validator.validateIfNumber(y, spriteName + ' y');
        validator.validateIfNumber(speed, spriteName + ' speed');
        validator.validateIfNumber(goldReward, spriteName + ' goldReward');
        validator.validateIfNumber(animationsStartRow, spriteName + ' animationsStartRow');
        validator.validateIfNumber(animationsEndRow, spriteName + ' animationsEndRow');
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
        this.maxHealth = health;
        this.setHealth(health);
        this.defence = defence;
        this.isAir = isAir;
        this.walked = 0;
        this.body.setSize(32, 32);
        this.checkPoints = checkPoints;
        this.animateMovement = animateMovement;
        this.animateMovement(checkPoints[0], animationsStartRow, animationsEndRow);
        this.animateDeath = animateDeath;
        this.deathSpriteArray = deathSpriteArray;

        var currentCheckPoint = 0,
            _this = this;
        this.tweens = [];
        checkPoints.forEach(function(checkPoint, i){
            var tween = _this.game.add.tween(_this).to( { x: checkPoint.x, y: checkPoint.y }, _this.calculateTimeForTween(i));
            tween.onComplete.add(function() {
                if(checkPoints[i + 1]){
                    _this.animateMovement(checkPoints[i + 1], animationsStartRow, animationsEndRow);
                }
            }, _this);
            _this.tweens.push(tween);
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

        this.inputEnabled = true;

        this.events.onInputOver.add(this.onInputOver, this);
        this.events.onInputOut.add(this.onInputOut, this);
        this.events.onInputDown.add(this.showDialog, this);
    };

    Unit.prototype.takeHit = function takeHit(bullet, player) {
        var calculateHitDamage = bullet.damage - (bullet.damage * this.defence) / 100;
        this.damage(calculateHitDamage);
        if(this.health <= 0){
            player.gold += this.goldReward;
            player.killed += 1;
        }
    };
    Unit.prototype.onUpdate = function onUpdate() {
        this.walked++;
    };
    Unit.prototype.kill = function kill() {
        this.tweens.forEach(function(tween){
            tween.stop();
        });
        var dieObject = new WorldObject(this.game, this.x, this.y, this.key);
        this.animateDeath.call(dieObject, this.deathSpriteArray);
        parent.prototype.kill.call(this);
    };
    Unit.prototype.calculateTimeForTween = function(destination) {
        if(destination == 0){
            return this.game.physics.arcade.distanceBetween(this, this.checkPoints[destination]) * (100 / this.speed);
        } else {
            return this.game.physics.arcade.distanceBetween(this.checkPoints[destination - 1], this.checkPoints[destination]) * (100 / this.speed);
        }
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
