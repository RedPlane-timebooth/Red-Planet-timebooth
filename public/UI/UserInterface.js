var UserInterface = (function iife() {
    'use strict';
    const DIALOG_X = 280;
    const DIALOG_Y = 480;

    function UserInterface(game) {
        this.game = game;
        var _this = this;
        this.background = this.game.add.sprite(0, 0, 'tConsole');

        //gold
        this.goldX = 65;
        this.goldY = 460;
        this.gold = this.game.add.text(this.goldX, this.goldY, this.game.player.gold,
            {font: "24px Algerian", fill: '#FFD700'}
        );
        this.goldImage = new WorldObject(this.game, 0, 0, 'goldIcon');
        this.goldImage.scale.setTo(0.5, 0.5);

        //killed
        this.killedX = 65;
        this.killedY = 520;
        this.killed = this.game.add.text(this.killedX, this.killedY, 'K: ' + this.game.player.gold,
            {font: "24px Algerian", fill: 'white'}
        );
        this.skeletonImage = new WorldObject(this.game, 0, 0, 'skeletonIcon');
        this.skeletonImage.scale.setTo(0.15, 0.15);

        //hover message
        this.hover = this.game.add.text(0, 0, '',
            {font: "14px Algerian", fill: '#FFD700'}
        );
        this.hover.text = '';
        this.hover.width = 250;
        this.showHover = false;
        this.hoverX = 0;
        this.hoverY = 0;

        //turret build
        this.turretX = DIALOG_X + 375 + 57 + 57;
        this.turretY = DIALOG_Y - 12;
        this.turret = new WorldObject(_this.game, this.game.input.activePointer.x, this.game.input.activePointer.x,
            'turretBuild', 0);
        this.turret.scale.setTo(48 / this.turret.width, 42 / this.turret.height);
        this.turret.inputEnabled = true;
        this.turret.events.onInputDown.add(function onBuildTower1() {
            this.game.lastPressed = this.game.time.now;
            this.game.currentBuilding = _this.game.add.sprite(_this.game.input.activePointer.x,
                _this.game.input.activePointer.y, 'turret', 0);
            this.game.physics.enable(_this.game.currentBuilding, Phaser.Physics.ARCADE);
            this.game.currentBuilding.anchor.setTo(0.5);
            this.game.buildState = true;
            this.game.cursorType = CURSOR_TYPE.NONE;
            this.game.currentBuilding.body.setSize(5, 5)
        }, this);
        this.turret.events.onInputOver.add(function () {
            this.hover.text = "$80";
            this.hoverY = this.upgradeButtonRangeY - 15;
            this.hoverX = this.upgradeButtonRangeX + 70;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.turret.events.onInputOut.add(removeHover, this);

        //tank build
        this.tankX = DIALOG_X + 375 + 57;
        this.tankY = DIALOG_Y - 12;
        this.tank = new WorldObject(_this.game, this.game.input.activePointer.x, this.game.input.activePointer.x,
            'tank', 0);
        this.tank.scale.setTo(48 / this.tank.width, 42 / this.tank.height);
        this.tank.inputEnabled = true;
        this.tank.events.onInputDown.add(function onBuildTower1() {
            this.game.lastPressed = this.game.time.now;
            this.game.currentBuilding = this.game.add.sprite(this.game.input.activePointer.x,
                this.game.input.activePointer.y, 'tank');
            this.game.physics.enable(this.game.currentBuilding, Phaser.Physics.ARCADE);
            this.game.currentBuilding.anchor.setTo(0.5);
            this.game.buildState = true;
            this.game.cursorType = CURSOR_TYPE.NONE;
            this.game.currentBuilding.body.setSize(5, 5)
        }, this);
        this.tank.events.onInputOver.add(function () {
            this.hover.text = "$300";
            this.hoverY = this.upgradeButtonRangeY - 15;
            this.hoverX = this.upgradeButtonRangeX + 70;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.tank.events.onInputOut.add(removeHover, this);

        //sniper build
        this.ghost = new WorldObject(_this.game, this.game.input.activePointer.x, this.game.input.activePointer.x,
            'ghostButton', 0);
        this.ghost.inputEnabled = true;
        this.ghostX = DIALOG_X + 375;
        this.ghostY = DIALOG_Y - 12;
        this.ghost.events.onInputDown.add(function onBuildTower1() {
            this.game.lastPressed = this.game.time.now;
            this.game.currentBuilding = this.game.add.sprite(this.game.input.activePointer.x,
                this.game.input.activePointer.y, 'sniper');
            this.game.physics.enable(this.game.currentBuilding, Phaser.Physics.ARCADE);
            this.game.currentBuilding.anchor.setTo(0.5);
            this.game.buildState = true;
            this.game.cursorType = CURSOR_TYPE.NONE;
            this.game.currentBuilding.body.setSize(5, 5)
        }, this);
        this.ghost.events.onInputOver.add(function () {
            this.hover.text = "$400";
            this.hoverY = this.upgradeButtonRangeY - 15;
            this.hoverX = this.upgradeButtonRangeX + 70;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.ghost.events.onInputOut.add(removeHover, this);

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
            this.hoverX = this.upgradeButtonRangeX + 70;
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
            this.hoverX = this.upgradeButtonRangeX + 70;
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
            this.hoverX = this.upgradeButtonRangeX + 70;
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
        this.dialog.healthBar = new WorldObject(this.game, DIALOG_X + 90, DIALOG_Y + 5, 'healthBar', 0);
        this.dialog.healthBar.scale.setTo(0.5, 0.5);
        this.dialog.healthBar.visible = false;
        this.dialog.attackIcon = new WorldObject(this.game, DIALOG_X + 50, DIALOG_Y + 5, 'attackIcon');
        this.dialog.attackIcon.scale.setTo(0.20, 0.20);
        this.dialog.attackIcon.visible = false;
        this.dialog.rangeIcon = new WorldObject(this.game, DIALOG_X + 50, DIALOG_Y + 35, 'rangeIcon');
        this.dialog.rangeIcon.scale.setTo(0.2, 0.2);
        this.dialog.rangeIcon.visible = false;
        this.dialog.timeIcon = new WorldObject(this.game, DIALOG_X + 50, DIALOG_Y + 60, 'timeIcon');
        this.dialog.timeIcon.scale.setTo(0.20, 0.20);
        this.dialog.timeIcon.visible = false;
        this.dialog.speedIcon = new WorldObject(this.game, 0, 0, 'speed');
        this.dialog.speedIcon.scale.setTo(0.25, 0.25);
        this.dialog.speedIcon.visible = false;
        this.dialog.defenceIcon = new WorldObject(this.game, 0, 0, 'defence');
        this.dialog.defenceIcon.scale.setTo(0.02, 0.02);
        this.dialog.defenceIcon.visible = false;
        
        this.dialog.sellButton = new WorldObject(this.game, 0, 0, 'sellIcon');
        this.dialog.sellButton.scale.setTo(0.4);
        this.dialog.sellButton.inputEnabled = true;
        this.dialog.sellButton.events.onInputDown.add(function() {
            this.game.selected.sell();
        }, this);
        
        this.dialog.sellButton.events.onInputOver.add(function () {
            this.hover.text = "$" + this.game.selected.getSellPrice();
            this.hoverY = this.upgradeButtonRangeY - 15;
            this.hoverX = this.upgradeButtonRangeX + 70;
            this.showHover = true;
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.dialog.sellButton.events.onInputOut.add(removeHover, this);
        this.dialog.sellButton.visible = false;

        this.exitButton = new WorldObject(this.game, 100, 30, 'buttons', 19);
        this.exitButton.inputEnabled = true;
        this.exitButton.events.onInputDown.add(function exit() {
            this.yesButton.visible = true;
            this.noButton.visible = true;
            this.onExitPromptText.visible = true;
            this.game.bmd.cls();
            this.game.bmd.rect(0, 0, 2000, 2000, 'rgba(0, 0, 0, 0.5)');
        }, this);

        this.exitButton.events.onInputOver.add(function () {
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.exitButton.events.onInputOut.add(removeHover, this);

        this.onExitPromptText = this.game.add.text(this.goldX, this.goldY, 'Are you sure you want to exit?',
            {font: "32px Algerian", fill: '#C0C0C0'}
        );

        this.yesButtonX = gameWidth / 2;
        this.yesButtonY = gameHeight / 2;
        this.yesButton = new WorldObject(this.game, gameWidth / 2, gameHeight / 2, 'buttons', 27);
        this.yesButton.inputEnabled = true;
        this.yesButton.events.onInputDown.add(function exit() {
            this.game.state.start('Menu');
        }, this);

        this.yesButton.events.onInputOver.add(function () {
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.yesButton.events.onInputOut.add(removeHover, this);

        this.noButtonX = gameWidth / 2;
        this.noButtonY = gameHeight / 2 - 50;
        this.noButton = new WorldObject(this.game, gameWidth / 2, gameHeight / 2, 'buttons', 7);
        this.noButton.inputEnabled = true;
        this.noButton.events.onInputDown.add(function exit() {
            this.yesButton.visible = false;
            this.noButton.visible = false;
            this.onExitPromptText.visible = false;
            this.game.bmd.cls();
        }, this);

        this.noButton.events.onInputOver.add(function () {
            if (!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);
        this.noButton.events.onInputOut.add(removeHover, this);
        this.yesButton.visible = false;
        this.noButton.visible = false;
        this.onExitPromptText.visible = false;

        this.notification = this.game.add.text(0, 0, '');
        this.notification.exists = false;
    }

    UserInterface.prototype.update = function update(xOffset, yOffset) {
        this.background.x = xOffset;
        this.background.y = yOffset;
        this.background.bringToTop();
        this.turret.x = this.turretX + xOffset;
        this.turret.y = this.turretY + yOffset;
        this.turret.bringToTop();
        if(this.yesButton.visible){
            this.yesButton.x = this.yesButtonX +  xOffset;
            this.yesButton.y = this.yesButtonY + yOffset;
            this.yesButton.bringToTop();
            this.noButton.x = this.noButtonX + xOffset;
            this.noButton.y = this.noButtonY + yOffset;
            this.noButton.bringToTop();
            this.onExitPromptText.x = this.noButtonX - 250 + xOffset;
            this.onExitPromptText.y = this.noButtonY - 100 + yOffset;
            this.onExitPromptText.bringToTop();
        }
        this.exitButton.x = 100 + xOffset;
        this.exitButton.y = 30 + yOffset;
        this.exitButton.bringToTop();
        this.tank.x = this.tankX + xOffset;
        this.tank.y = this.tankY + yOffset;
        this.tank.bringToTop();
        this.ghost.x = this.ghostX + xOffset;
        this.ghost.y = this.ghostY + yOffset;
        this.ghost.bringToTop();
        this.gold.x = this.goldX + xOffset;
        this.gold.y = this.goldY + yOffset;
        this.gold.bringToTop();
        this.goldImage.x = this.goldX + xOffset - 30;
        this.goldImage.y = this.goldY + yOffset + 10;
        this.goldImage.bringToTop();
        this.killed.x = this.killedX + xOffset;
        this.killed.y = this.killedY + yOffset;
        this.killed.bringToTop();
        this.skeletonImage.x = this.killedX + xOffset - 30;
        this.skeletonImage.y = this.killedY + yOffset + 10;
        this.skeletonImage.bringToTop();
        if (this.dialog.tower.show) {
            this.dialog.tower.sprite.x = DIALOG_X - 60 + xOffset;
            this.dialog.tower.sprite.y = DIALOG_Y + 20 + yOffset;
            this.dialog.tower.sprite.bringToTop();
            this.dialog.sellButton.x = DIALOG_X - 30 + xOffset;
            this.dialog.sellButton.y = DIALOG_Y + 100 + yOffset;
            this.dialog.sellButton.bringToTop();
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
            this.dialog.unit.sprite.x = DIALOG_X - 15 + xOffset;
            this.dialog.unit.sprite.y = DIALOG_Y + 60 + yOffset;
            this.dialog.unit.sprite.bringToTop();
            this.dialog.unit.health.x = DIALOG_X + 70 + xOffset;
            this.dialog.unit.health.y = DIALOG_Y + 20 + yOffset;
            this.dialog.unit.health.bringToTop();
            this.dialog.unit.speed.x = DIALOG_X + 150 + xOffset;
            this.dialog.unit.speed.y = DIALOG_Y + 90 + yOffset;
            this.dialog.unit.speed.bringToTop();
            this.dialog.unit.defence.x = DIALOG_X + 70 + xOffset;
            this.dialog.unit.defence.y = DIALOG_Y + 90 + yOffset;
            this.dialog.unit.defence.bringToTop();

            this.dialog.healthBar.x = DIALOG_X + 110 + xOffset;
            this.dialog.healthBar.y = DIALOG_Y + 50 + yOffset;
            this.dialog.healthBar.bringToTop();
            this.dialog.speedIcon.x = DIALOG_X + 130 + xOffset;
            this.dialog.speedIcon.y = DIALOG_Y + 96 + yOffset;
            this.dialog.speedIcon.bringToTop();
            this.dialog.defenceIcon.x = DIALOG_X  + 50 + xOffset;
            this.dialog.defenceIcon.y = DIALOG_Y + 96 + yOffset;
            this.dialog.defenceIcon.bringToTop();
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
                {font: "18px Algerian", fill: 'darkgray'}
            );
            this.dialog.tower.range = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 65, '' + dialog.range,
                {font: "18px Algerian", fill: 'darkgray'}
            );
            this.dialog.tower.speed = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 105, '' + dialog.fireSpeed + '/s',
                {font: "18px Algerian", fill: 'darkgray'}
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
            this.dialog.sellButton.visible = true;
        }
        if (dialog.infoType === 'unit') {
            var healthPercent = ((dialog.health / dialog.maxHealth) * 100);
            var frame = 0;
            switch(false){
                case !(healthPercent == 100):
                    frame = 0;
                    break;
                case !(healthPercent > 90):
                    frame = 1;
                    break;
                case !(healthPercent > 80):
                    frame = 2;
                    break;
                case !(healthPercent > 70):
                    frame = 3;
                    break;
                case !(healthPercent > 60):
                    frame = 4;
                    break;
                case !(healthPercent > 50):
                    frame = 5;
                    break;
                case !(healthPercent > 40):
                    frame = 6;
                    break;
                case !(healthPercent > 30):
                    frame = 7;
                    break;
                case !(healthPercent > 20):
                    frame = 8;
                    break;
                case !(healthPercent > 10):
                    frame = 9;
                    break;
                case !(healthPercent < 10):
                    frame = 10;
                    break;
            }
            this.dialog.healthBar.frame = frame;
            this.dialog.unit.show = true;
            this.dialog.unit.sprite = this.game.add.sprite(DIALOG_X, DIALOG_Y, dialog.spriteKey, 0);
            this.dialog.unit.sprite.anchor.setTo(0.5);
            this.dialog.unit.health = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 25,
                Math.round(dialog.health * 100) / 100 + " / " + dialog.maxHealth,
                {font: "18px Algerian", fill: 'darkgray'}
            );
            this.dialog.unit.speed = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 65, '' + dialog.speed,
                {font: "18px Algerian", fill: 'darkgray'}
            );
            this.dialog.unit.defence = this.game.add.text(DIALOG_X + 160, DIALOG_Y + 105, dialog.defence + "%",
                {font: "18px Algerian", fill: 'darkgray'}
            );
            this.dialog.healthBar.visible = true;
            this.dialog.speedIcon.visible = true;
            this.dialog.defenceIcon.visible = true;
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
            this.dialog.sellButton.visible = false;
        } else if (this.dialog.unit.show) {
            this.dialog.unit.show = false;
            this.dialog.unit.sprite.visible = false;
            this.dialog.unit.health.visible = false;
            this.dialog.unit.speed.visible = false;
            this.dialog.unit.defence.visible = false;
            this.dialog.healthBar.visible = false;
            this.dialog.speedIcon.visible = false;
            this.dialog.defenceIcon.visible = false;
        }
    };

    UserInterface.prototype.textNotification = function (x, y, text, color, time, blinky) {
        if (!this.notification.exists) {
            this.notification = this.game.add.text(x, y, text,
                {font: "32px Algerian", fill: color}
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