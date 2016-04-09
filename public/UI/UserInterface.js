var UserInterface = (function iife() {
    'use strict';
    const DIALOG_X = 280;
    const DIALOG_Y = 480;

    function UserInterface(game) {
        this.game = game;
        var _this = this;
        this.background = this.game.add.sprite(0, 0, 'uiBackground', 0);

        //gold
        this.goldX = 650;
        this.goldY = 500;
        this.gold = this.game.add.text(this.goldX, this.goldY, 'G: ' + this.game.player.gold,
            {font: "24px Arial", fill: '#FFD700'}
        );

        //killed
        this.killedX = 650;
        this.killedY = 550;
        this.killed = this.game.add.text(this.killedX, this.killedY, 'K: ' + this.game.player.gold,
            {font: "24px Arial", fill: '#ff00ff'}
        );

        //hover message
        this.hover = this.game.add.text(0, 0, '',
            {font: "14px Arial", fill: '#12FFFF'}
        );
        this.hover.text = '';
        this.showHover = false;
        this.hoverX = 0;
        this.hoverY = 0;

        //turret build
        this.turretX = 85;
        this.turretY = 480;
        this.turret = this.game.add.button(this.turretX, this.turretY, 'turretBuild', function onBuildTower1() {
            this.game.currentBuilding = _this.game.add.sprite(_this.game.input.activePointer.x,
                _this.game.input.activePointer.y, 'turret', 0);
            this.game.physics.enable(_this.game.currentBuilding, Phaser.Physics.ARCADE);
            this.game.currentBuilding.anchor.setTo(0.5);
            this.game.buildState = true;
            this.game.cursorType = CURSOR_TYPE.NONE;
            this.game.currentBuilding.body.setSize(5, 5)
        }, this);
        this.turret.onInputOver.add(function () {
            this.hover.text = "Turret is the cheapest \ntower in the game \n" +
                "it shoots two rockets \nand has tiny splash damage\n     $80";
            this.hoverY = this.turretY - 140;
            this.hoverX = this.turretX - 50;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.turret.onInputOut.add(removeHover, this);

        //tank build
        this.tankX = 30;
        this.tankY = 520;
        this.tank = this.game.add.button(this.tankX, this.tankY, 'tank', function onBuildTower1() {
            this.game.currentBuilding = this.game.add.sprite(this.game.input.activePointer.x,
                this.game.input.activePointer.y, 'tank');
            this.game.physics.enable(this.game.currentBuilding, Phaser.Physics.ARCADE);
            this.game.currentBuilding.anchor.setTo(0.5);
            this.game.buildState = true;
            this.game.cursorType = CURSOR_TYPE.NONE;
            this.game.currentBuilding.body.setSize(5, 5)
        }, this);
        this.tank.onInputOver.add(function () {
            this.hover.text = "Tank is a great tower. \nIt makes large splash damage \n" +
                "has great attack and nice range.\nVery effective against \nmultiple enemies. \n     $300";
            this.hoverY = _this.tankY - 200;
            this.hoverX = _this.tankX;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.tank.onInputOut.add(removeHover, this);

        //sniper build
        this.ghostX = 45;
        this.ghostY = 480;
        this.ghost = this.game.add.button(this.ghostX, this.ghostY, 'ghostButton', function onBuildTower1() {
            this.game.currentBuilding = this.game.add.sprite(this.game.input.activePointer.x,
                this.game.input.activePointer.y, 'sniper');
            this.game.physics.enable(this.game.currentBuilding, Phaser.Physics.ARCADE);
            this.game.currentBuilding.anchor.setTo(0.5);
            this.game.buildState = true;
            this.game.cursorType = CURSOR_TYPE.NONE;
            this.game.currentBuilding.body.setSize(5, 5)
        }, this);
        this.ghost.onInputOver.add(function () {
            this.hover.text = "Sniper is the most powerful\ntower in the game.\nSnipers have chance to make" +
                "\nheadshot for 2.5x damage\nVery effective against enemies\nwith much health\n     $400";
            this.hoverY = _this.ghostY - 180;
            this.hoverX = _this.ghostX - 15;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.ghost.onInputOut.add(removeHover, this);

        //upgrade button for tower range
        this.upgradeButtonRangeX = DIALOG_X + 190;
        this.upgradeButtonRangeY = DIALOG_Y + 60;
        this.upgradeButtonRange = new WorldObject(_this.game, 0, 0, 'upgradeButton', 0);
        this.upgradeButtonRange.scale.setTo(0.1);
        this.upgradeButtonRange.inputEnabled = true;
        this.upgradeButtonRange.events.onInputDown.add(onClickButtonUpgradeButtonRange, this);
        function onClickButtonUpgradeButtonRange() {
            if (_this.game.player.gold > _this.game.selected.getRangeUpgradeCost()) {
                _this.game.player.gold -= _this.game.selected.getRangeUpgradeCost();
                _this.game.selected.upgrade('range');
                _this.hover.text = "$" + _this.game.selected.getRangeUpgradeCost() +
                    "\n+" + _this.dialog.tower.getAdditionRange;
            } else {
                _this.textNotification(centralTextPossX + _this.game.camera.x, centralTextPossY + _this.game.camera.y,
                    'Not enought gold!!!', 'red', 1500, true);
            }

            _this.game.selected.showDialog();
        }

        this.upgradeButtonRange.events.onInputOver.add(function () {
            this.hover.text = "$" + this.game.selected.getRangeUpgradeCost() +
                "\n+" + this.dialog.tower.getAdditionRange;
            this.hoverY = this.upgradeButtonRangeY - 15;
            this.hoverX = this.upgradeButtonRangeX + 63;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.upgradeButtonRange.events.onInputOut.add(removeHover, this);
        this.upgradeButtonRange.visible = false;

        //upgrade button for tower fire damage
        this.upgradeButtonFireDamageX = DIALOG_X + 190;
        this.upgradeButtonFireDamageY = DIALOG_Y + 25;
        this.upgradeButtonFireDamage = new WorldObject(_this.game, 0, 0, 'upgradeButton', 0);
        this.upgradeButtonFireDamage.scale.setTo(0.1);
        this.upgradeButtonFireDamage.inputEnabled = true;
        this.upgradeButtonFireDamage.events.onInputDown.add(onClickButtonUpgradeButtonFireDamage, this);
        function onClickButtonUpgradeButtonFireDamage() {
            //TODO: and if tower is upgradable
            if (_this.game.player.gold > _this.game.selected.getFireDamageUpgradeCost()) {
                _this.game.player.gold -= _this.game.selected.getFireDamageUpgradeCost();
                _this.game.selected.upgrade('fireDamage');
                _this.hover.text = "$" + _this.game.selected.getFireDamageUpgradeCost()
                    + "\n+" + _this.dialog.tower.getAdditionFireDamage;
            } else {
                _this.textNotification(centralTextPossX + _this.game.camera.x, centralTextPossY + _this.game.camera.y,
                    'Not enought gold!!!', 'red', 1500, true);
            }
            _this.game.selected.showDialog();
        }

        this.upgradeButtonFireDamage.events.onInputOver.add(function () {
            this.hover.text = "$" + this.game.selected.getFireDamageUpgradeCost()
                + "\n+" + this.dialog.tower.getAdditionFireDamage;
            this.hoverY = this.upgradeButtonRangeY - 15;
            this.hoverX = this.upgradeButtonRangeX + 63;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.upgradeButtonFireDamage.events.onInputOut.add(removeHover, this);
        this.upgradeButtonFireDamage.visible = false;

        //upgrade button for tower fire speed
        this.upgradeButtonFireSpeedX = DIALOG_X + 190;
        this.upgradeButtonFireSpeedY = DIALOG_Y + 95;
        this.upgradeButtonFireSpeed = new WorldObject(_this.game, 0, 0, 'upgradeButton', 0);
        this.upgradeButtonFireSpeed.scale.setTo(0.1);
        this.upgradeButtonFireSpeed.inputEnabled = true;
        this.upgradeButtonFireSpeed.events.onInputDown.add(onClickButtonUpgradeButtonFireSpeed, this);
        function onClickButtonUpgradeButtonFireSpeed() {
            if (_this.game.player.gold > _this.game.selected.getFireSpeedUpgradeCost()) {
                _this.game.player.gold -= _this.game.selected.getFireSpeedUpgradeCost();
                _this.game.selected.upgrade('fireSpeed');
                _this.hover.text = "$" + _this.game.selected.getFireSpeedUpgradeCost()
                    + "\n+" + _this.dialog.tower.getAdditionFireSpeed;
            } else {
                _this.textNotification(centralTextPossX + _this.game.camera.x, centralTextPossY + _this.game.camera.y,
                    'Not enought gold!!!', 'red', 1500, true);
            }
            _this.game.selected.showDialog();
        }

        this.upgradeButtonFireSpeed.events.onInputOver.add(function () {
            this.hover.text = "$" + this.game.selected.getFireSpeedUpgradeCost()
                + "\n+" + this.dialog.tower.getAdditionFireSpeed;
            this.hoverY = this.upgradeButtonRangeY - 15;
            this.hoverX = this.upgradeButtonRangeX + 63;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.upgradeButtonFireSpeed.events.onInputOut.add(removeHover, this);
        this.upgradeButtonFireSpeed.visible = false;

        //dialog for towers
        this.dialog = {};
        this.dialog.tower = {};
        this.dialog.tower.show = false;
        this.dialog.unit = {};
        this.dialog.unit.show = false;
        this.dialog.attackIcon = new WorldObject(this.game, DIALOG_X + 50, DIALOG_Y + 5, 'attackIcon');
        this.dialog.attackIcon.scale.setTo(0.20, 0.20);
        this.dialog.attackIcon.visible = false;
        this.dialog.rangeIcon = new WorldObject(this.game, DIALOG_X + 50, DIALOG_Y + 35, 'rangeIcon');
        this.dialog.rangeIcon.scale.setTo(0.07, 0.07);
        this.dialog.rangeIcon.visible = false;
        this.dialog.timeIcon = new WorldObject(this.game, DIALOG_X + 50, DIALOG_Y + 60, 'timeIcon');
        this.dialog.timeIcon.scale.setTo(0.20, 0.20);
        this.dialog.timeIcon.visible = false;

        this.notification = this.game.add.text(0, 0, '');
        this.notification.exists = false;
    }

    UserInterface.prototype.update = function update(xOffset, yOffset) {
        this.background.bringToTop();
        this.background.x = xOffset;
        this.background.y = yOffset;
        this.turret.x = this.turretX + xOffset;
        this.turret.y = this.turretY + yOffset;
        this.turret.bringToTop();
        this.tank.x = this.tankX + xOffset;
        this.tank.y = this.tankY + yOffset;
        this.tank.bringToTop();
        this.ghost.x = this.ghostX + xOffset;
        this.ghost.y = this.ghostY + yOffset;
        this.ghost.bringToTop();
        this.gold.x = this.goldX + xOffset;
        this.gold.y = this.goldY + yOffset;
        this.gold.bringToTop();
        this.killed.x = this.killedX + xOffset;
        this.killed.y = this.killedY + yOffset;
        this.killed.bringToTop();
        if (this.dialog.tower.show) {
            this.dialog.tower.sprite.x = DIALOG_X - 60 + xOffset;
            this.dialog.tower.sprite.y = DIALOG_Y + 30 + yOffset;
            this.dialog.tower.sprite.bringToTop();
            this.dialog.tower.damage.x = DIALOG_X + 90 + xOffset;
            this.dialog.tower.damage.y = DIALOG_Y + 15 + yOffset;
            this.dialog.tower.damage.bringToTop();
            this.dialog.tower.range.x = DIALOG_X + 90 + xOffset;
            this.dialog.tower.range.y = DIALOG_Y + 50 + yOffset;
            this.dialog.tower.range.bringToTop();
            this.dialog.tower.speed.x = DIALOG_X + 90 + xOffset;
            this.dialog.tower.speed.y = DIALOG_Y + 85 + yOffset;
            this.dialog.tower.speed.bringToTop();
            this.dialog.attackIcon.x = DIALOG_X + 50 + xOffset;
            this.dialog.attackIcon.y = DIALOG_Y + 24 + yOffset;
            this.dialog.attackIcon.bringToTop();
            this.dialog.rangeIcon.x = DIALOG_X + 50 + xOffset;
            this.dialog.rangeIcon.y = DIALOG_Y + 60 + yOffset;
            this.dialog.rangeIcon.bringToTop();
            this.dialog.timeIcon.x = DIALOG_X + 50 + xOffset;
            this.dialog.timeIcon.y = DIALOG_Y + 96 + yOffset;
            this.dialog.timeIcon.bringToTop();

            if (this.dialog.tower.upgrades.range < 4) {
                this.upgradeButtonRange.x = this.upgradeButtonRangeX + xOffset;
                this.upgradeButtonRange.y = this.upgradeButtonRangeY + yOffset;
                this.upgradeButtonRange.bringToTop();
            }
            if (this.dialog.tower.upgrades.fireDamage < 4) {
                this.upgradeButtonFireDamage.x = this.upgradeButtonFireDamageX + xOffset;
                this.upgradeButtonFireDamage.y = this.upgradeButtonFireDamageY + yOffset;
                this.upgradeButtonFireDamage.bringToTop();
            }
            if (this.dialog.tower.upgrades.fireSpeed < 4) {
                this.upgradeButtonFireSpeed.x = this.upgradeButtonFireSpeedX + xOffset;
                this.upgradeButtonFireSpeed.y = this.upgradeButtonFireSpeedY + yOffset;
                this.upgradeButtonFireSpeed.bringToTop();
            }
        } else if (this.dialog.unit.show) {
            this.dialog.unit.sprite.x = DIALOG_X - 60 + xOffset;
            this.dialog.unit.sprite.y = DIALOG_Y + 30 + yOffset;
            this.dialog.unit.sprite.bringToTop();
            this.dialog.unit.health.x = DIALOG_X + 90 + xOffset;
            this.dialog.unit.health.y = DIALOG_Y + 50 + yOffset;
            this.dialog.unit.health.bringToTop();
            this.dialog.unit.speed.x = DIALOG_X + 90 + xOffset;
            this.dialog.unit.speed.y = DIALOG_Y + 100 + yOffset;
            this.dialog.unit.speed.bringToTop();
            this.dialog.unit.defence.x = DIALOG_X + 90 + xOffset;
            this.dialog.unit.defence.y = DIALOG_Y + 15 + yOffset;
            this.dialog.unit.defence.bringToTop();
        }

        this.hover.x = this.hoverX + xOffset;
        this.hover.y = this.hoverY + yOffset;
        if (this.showHover) {
            this.hover.bringToTop();
        }
    };
    UserInterface.prototype.showDialog = function showDialog(dialog) {
        this.dialog[dialog.infoType] = dialog;
        if (dialog.infoType === 'tower') {
            this.dialog.tower.show = true;
            this.dialog.tower.sprite = this.game.add.sprite(DIALOG_X, DIALOG_Y, dialog.spriteKey, 0);
            this.dialog.tower.damage = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 25, '' + dialog.damage,
                {font: "18px Arial", fill: 'darkgray'}
            );
            this.dialog.tower.range = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 65, '' + dialog.range,
                {font: "18px Arial", fill: 'darkgray'}
            );
            this.dialog.tower.speed = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 105, '' + dialog.fireSpeed + '/s',
                {font: "18px Arial", fill: 'darkgray'}
            );

            if (this.dialog.tower.upgrades.range < 4) {
                this.upgradeButtonRange.visible = true;
            }
            if (this.dialog.tower.upgrades.fireDamage < 4) {
                this.upgradeButtonFireDamage.visible = true;
            }
            if (this.dialog.tower.upgrades.fireSpeed < 4) {
                this.upgradeButtonFireSpeed.visible = true;
            }

            this.dialog.attackIcon.visible = true;
            this.dialog.rangeIcon.visible = true;
            this.dialog.timeIcon.visible = true;
        }
        if (dialog.infoType === 'unit') {
            this.dialog.unit.show = true;
            this.dialog.unit.sprite = this.game.add.sprite(DIALOG_X, DIALOG_Y, dialog.spriteKey, 0);
            this.dialog.unit.health = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 25, '' + dialog.health,
                {font: "18px Arial", fill: 'darkgray'}
            );
            this.dialog.unit.speed = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 65, '' + dialog.speed,
                {font: "18px Arial", fill: 'darkgray'}
            );
            this.dialog.unit.defence = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 105, '' + dialog.defence,
                {font: "18px Arial", fill: 'darkgray'}
            );

            //this.dialog.attackIcon.visible = true;
            //this.dialog.rangeIcon.visible = true;
            //this.dialog.timeIcon.visible = true;
        }
    };
    UserInterface.prototype.hideDialog = function showDialog() {
        if (this.dialog.tower.show) {
            this.dialog.tower.show = false;
            this.dialog.tower.sprite.visible = false;
            this.dialog.tower.damage.visible = false;
            this.dialog.tower.speed.visible = false;
            this.dialog.tower.range.visible = false;
            this.upgradeButtonRange.visible = false;
            this.upgradeButtonFireDamage.visible = false;
            this.upgradeButtonFireSpeed.visible = false;
            this.dialog.attackIcon.visible = false;
            this.dialog.rangeIcon.visible = false;
            this.dialog.timeIcon.visible = false;
        } else if (this.dialog.unit.show) {
            this.dialog.unit.show = false;
            this.dialog.unit.sprite.visible = false;
            this.dialog.unit.health.visible = false;
            this.dialog.unit.speed.visible = false;
            this.dialog.unit.defence.visible = false;
            // this.dialog.attackIcon.visible = false;
            // this.dialog.rangeIcon.visible = false;
            // this.dialog.timeIcon.visible = false;
        }
    };

    UserInterface.prototype.textNotification = function (x, y, text, color, time, blinky) {
        if (!this.notification.exists) {
            this.notification = this.game.add.text(x, y, text,
                {font: "32px Arial", fill: color}
            );
            if (blinky) {
                for (var i = 1; i < time / 250; i++) {
                    this.game.time.events.add(250 * i, function () {
                        this.notification.visible = !this.notification.visible;
                    }, this);
                }
            }
            this.game.time.events.add(time + 300, function () {
                this.notification.destroy();
            }, this);
        }
    };
    return UserInterface;
}());

function removeHover() {
    this.hover.text = '';
    this.showHover = false;
    this.hoverX = 0;
    this.hoverY = 0;
    if (!this.game.buildState) {
        this.game.cursorType = CURSOR_TYPE.NORMAL;
    }
}