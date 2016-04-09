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
     * @param unitType
     */
    Unit.prototype.init = function init(x, y, checkPoints, unitType) {

        validator.validateIfNumber(x, unitType.spriteName + ' x');
        validator.validateIfNumber(y, unitType.spriteName + ' y');
        validator.validateIfNumber(unitType.speed, unitType.spriteName + ' speed');
        validator.validateIfNumber(unitType.goldReward, unitType.spriteName + ' goldReward');
        validator.validateIfNumber(unitType.animationsStartRow, unitType.spriteName + ' animationsStartRow');
        validator.validateIfNumber(unitType.animationsEndRow, unitType.spriteName + ' animationsEndRow');
        validator.validateIfNumber(unitType.speed, unitType.spriteName + ' speed');
        validator.validateIfNumber(unitType.scale, unitType.spriteName + ' scale');
        validator.validateIfNumber(unitType.health, unitType.spriteName + ' health');
        validator.validateIfNumber(unitType.defence, unitType.spriteName + ' defence');
        validator.validateIfBool(unitType.isAir, unitType.spriteName + ' isAir');

        this.reset(x, y);
        this.key = unitType.spriteName;
        this.loadTexture(unitType.spriteName, 0);

        this.goldReward = unitType.goldReward;
        this.speed = unitType.speed;
        this.scale.setTo(unitType.scale);
        this.maxHealth = unitType.health;
        this.setHealth(unitType.health);
        this.defence = unitType.defence;
        this.isAir = unitType.isAir;
        this.walked = 0;
        this.body.setSize(32, 32);
        this.checkPoints = checkPoints;
        this.animateMovement(checkPoints[0], unitType.animationsStartRow, unitType.animationsEndRow);
        this.deathSpriteArray = unitType.deathSpriteArray;

        var currentCheckPoint = 0,
            _this = this;
        this.tweens = [];
        checkPoints.forEach(function (checkPoint, i) {
            var tween = _this.game.add.tween(_this).to({
                x: checkPoint.x,
                y: checkPoint.y
            }, _this.calculateTimeForTween(i));
            tween.onComplete.add(function () {
                if (checkPoints[i + 1]) {
                    _this.animateMovement(checkPoints[i + 1], unitType.animationsStartRow, unitType.animationsEndRow);
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

        this.lastPoss = {x: this.x, y: this.y};
    };

    Unit.prototype.takeHit = function takeHit(bullet, player) {
        var calculateHitDamage = bullet.damage - (bullet.damage * this.defence) / 100;
        this.damage(calculateHitDamage);
        if (this.health <= 0) {
            player.gold += this.goldReward;
            player.killed += 1;
        }
        if(this.game.selected === this){
            this.showDialog();
        }
    };
    Unit.prototype.onUpdate = function onUpdate() {
        var distance = Math.sqrt(
            (this.x - this.lastPoss.x) * (this.x - this.lastPoss.x) +
            (this.y - this.lastPoss.y) * (this.y - this.lastPoss.y)
        );
        this.lastPoss = {x: this.x, y: this.y};
        this.walked += distance;
    };
    Unit.prototype.kill = function kill() {
        this.tweens.forEach(function (tween) {
            tween.stop();
        });
        this.animateDeath();
        parent.prototype.kill.call(this);
    };
    Unit.prototype.calculateTimeForTween = function (destination) {
        if (destination == 0) {
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
        if (this.game.dialogOn) {
            this.game.ui.hideDialog();
            this.game.dialogOn = false;
        }
        this.game.ui.showDialog(this.getPersonalInfo());
        this.game.dialogOn = true;
    };
    Unit.prototype.animateDeath = function animateDeathGlobal() {
        var dieObject = new WorldObject(this.game, this.x, this.y, this.key);
        dieObject.animations.add('death', this.deathSpriteArray, 10, false);
        dieObject.animations.play('death').onComplete.add(function () {
            dieObject.destroy();
        });
    };
    Unit.prototype.animateMovement = function animateMoveGlobal(destination, startRow, endRow) {
        var animationsArray = [],
            rotation;

        rotation = this.calculateRotation(destination);
        for (var i = startRow - 1; i < endRow; i++) {
            animationsArray.push(rotation.spriteRow + i * 17);
        }

        this.animations.add('move', animationsArray, 15, true);
        this.animations.play('move');

        if (rotation.reverseX) {
            this.scale.x *= -1;
        }
    };

    return Unit;
}(WorldObject));
