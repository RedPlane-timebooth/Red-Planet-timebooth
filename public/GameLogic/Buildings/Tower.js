var Tower = (function iife(parent) {
    'use strict';
    var nextTarget = null;

    function Tower(game, x, y, spriteName, startFrame, player,
                   bulletType, fireDamage, fireSpeed, scale, range,
                   fireDamageUpgradeCost, fireSpeedUpgradeCost, rangeUpgradeCost) {
        parent.call(this, game, x, y, spriteName, startFrame, player);

        validator.validateIfString(bulletType, this.constructor + ' bulletType');
        validator.validateIfUndefined(fireDamage, this.constructor + ' fireDamage');
        validator.validateIfUndefined(fireSpeed, this.constructor + ' fireSpeed');
        validator.validateIfNumber(scale, this.constructor + ' scale');
        validator.validateIfUndefined(range, this.constructor + ' range');
        validator.validateIfUndefined(fireDamageUpgradeCost, this.constructor + ' fireDamageUpgradeCost');
        validator.validateIfUndefined(fireSpeedUpgradeCost, this.constructor + ' fireSpeedUpgradeCost');
        validator.validateIfUndefined(rangeUpgradeCost, this.constructor + ' rangeUpgradeCost');

        this.bulletType = bulletType;
        this.fireDamage = fireDamage;
        this.fireSpeed = fireSpeed;
        this.scale.setTo(scale);
        this.range = range;
        this.fireDamageUpgradeCost = fireDamageUpgradeCost;
        this.fireSpeedUpgradeCost = fireSpeedUpgradeCost;
        this.rangeUpgradeCost = rangeUpgradeCost;
        this.nextTarget = null;
        this.bonuses = null;
        this.buffers = {
            fired: {
                is: false
            },
            searchedForTarget: {
                is: false
            }
        };
        this.lastFired = this.game.time.now;
        this.upgrades = {
            fireSpeed: 0,
            fireDamage: 0,
            range: 0
        };

        this.getFireDamage = function getFireDamage() {
            return this.fireDamage[this.upgrades.fireDamage];
        };
        this.getFireSpeed = function getFireSpeed() {
            return this.fireSpeed[this.upgrades.fireSpeed];
        };
        this.getRange = function getRange() {
            return this.range[this.upgrades.range];
        };
        this.getFireDamageUpgradeCost = function getFireDamageUpgradeCost() {
            return this.fireDamageUpgradeCost[this.upgrades.fireDamage];
        };
        this.getFireSpeedUpgradeCost = function getFireSpeedUpgradeCost() {
            return this.fireSpeedUpgradeCost[this.upgrades.fireSpeed];
        };
        this.getRangeUpgradeCost = function getRangeUpgradeCost() {
            return this.rangeUpgradeCost[this.upgrades.range];
        };
        this.getSellPrice = function getSellPrice() {
            return this.MONEY_COST * 0.8;
        }
    }

    Tower.prototype = Object.create(parent.prototype);
    Tower.prototype.constructor = Tower;

    Tower.prototype.fire = function fire() {
        this.lastFired = this.game.time.now;
        this.game.bullets.factory(this.x, this.y - 30, this.nextTarget, this.bulletType,
            this.getFireDamage(), this.bonuses);
    };
    Tower.prototype.findTarget = function findTarget() {
        if (!this.buffers.searchedForTarget.is) {
            nextTarget = null;
            this.game.enemies.forEachExists(function (enemy) {
                if (this.game.physics.arcade.distanceBetween(this, enemy) < this.getRange() + 10) {
                    if (nextTarget === null || nextTarget.walked < enemy.walked) {
                        nextTarget = enemy;
                    }
                }
            }, this);
            this.nextTarget = nextTarget;
            buffer(this.buffers.searchedForTarget, 250, this.game);
        }
    };
    Tower.prototype.onUpdate = function onUpdate() {
        if (this.fullyBuild) {
            this.findTarget();
            if (this.nextTarget && !this.buffers.fired.is) {
                this.fire();
                buffer(this.buffers.fired, this.getFireSpeed(), this.game);
            }
        }
    };
    Tower.prototype.getPersonalInfo = function getPersonalInfo() {
        var info = parent.prototype.getPersonalInfo.call(this);
        info.damage = this.getFireDamage();
        info.fireSpeed = Math.round((1000 / this.fireSpeed[this.upgrades.fireSpeed]) * 100) / 100;
        info.range = this.getRange();
        info.infoType = 'tower';
        info.fireDamageUpgradeCost = this.getFireDamageUpgradeCost();
        info.fireSpeedUpgradeCost = this.getFireSpeedUpgradeCost();
        info.rangeUpgradeCost = this.getRangeUpgradeCost();
        info.getAdditionFireDamage = this.fireDamage[this.upgrades.fireDamage + 1] - this.getFireDamage();
        info.getAdditionFireSpeed = Math.round((1000 / this.fireSpeed[this.upgrades.fireSpeed + 1] - info.fireSpeed) * 100) / 100;
        info.getAdditionRange = this.range[this.upgrades.range + 1] - this.getRange();
        info.upgrades = this.upgrades;
        return info;
    };
    Tower.prototype.showDialog = function showPersonalInfo() {
        parent.prototype.showDialog.call(this);
        if (this.game.dialogOn) {
            this.game.bmd.cls();
            this.game.ui.hideDialog();
            this.game.dialogOn = false;
        }
        this.game.ui.showDialog(this.getPersonalInfo());

        var gradient = this.game.bmd.context.createRadialGradient(this.x, this.y, 5, this.x, this.y, this.getRange());
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 255, 80, 0.3)');
        this.game.bmd.cls();
        this.game.bmd.circle(this.x, this.y, this.getRange(), gradient);
        this.game.dialogOn = true;
    };
    Tower.prototype.upgrade = function upgrade(type) {
        if (this.upgrades[type] < 4) {
            this.upgrades[type]++;
        } else {
            console.log('Cant upgrade');
        }
    };
    Tower.prototype.destroy = function destroy() {
        this.game.ui.hideDialog();
        this.game.bmd.cls();
        this.game.canDestroyCircle = false;
        this.game.dialogOn = false;
        parent.prototype.destroy.call(this);
    };
    return Tower;
}(Building));