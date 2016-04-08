var UserInterface = (function iife() {
    'use strict';
    const DIALOG_X = 220;
    const DIALOG_Y = 470;

    function UserInterface(game) {
        this.game = game;
        var _this = this;
        //gold

        this.background = this.game.add.sprite(0, 449, 'uiBackground', 0);

        this.goldX = 650;
        this.goldY = 470;
        this.gold = this.game.add.text(this.goldX , this.goldY, 'G: ' + this.game.player.gold,
            {font: "24px Arial", fill: '#FFD700'}
        );

        //killed
        this.killedX = 650;
        this.killedY = 500;
        this.killed = this.game.add.text(this.killedX, this.killedY, 'K: ' + this.game.player.gold,
            {font: "24px Arial", fill: '#ff00ff'}
        );

        //turret build
        this.turretX = 85;
        this.turretY = 480;
        this.turret = new WorldObject(_this.game, 0, 0, 'turret', 0);
        this.turret.scale.setTo(0.7);
        this.turret.inputEnabled = true;
        this.turret.events.onInputDown.add(onClickButtonTower1, this);
        function onClickButtonTower1() {
            _this.game.cursorType = CURSOR_TYPE.TURRET;
            _this.game.buildState = true;
            _this.game.canBuild = false;
            _this.game.time.events.add(1000, function () {
                _this.game.canBuild = true
            }, this);
        }
        this.turret.events.onInputOver.add(function () {
            if(!this.game.buildState) {
                this.game.cursorType = CURSOR_TYPE.POINTER;
            }
        }, this);

        this.turret.events.onInputOut.add(function () {
            if(!this.game.buildState){
                this.game.cursorType = CURSOR_TYPE.NORMAL;
            }
        }, this);

        //upgrade button for tower range
        this.upgradeButtonRangeX = 500;
        this.upgradeButtonRangeY = 525;
        this.upgradeButtonRange = new WorldObject(_this.game, 0, 0, 'upgradeButton', 0);
        this.upgradeButtonRange.scale.setTo(0.1);
        this.upgradeButtonRange.inputEnabled = true;
        this.upgradeButtonRange.events.onInputDown.add(onClickButtonUpgradeButtonRange, this);
        function onClickButtonUpgradeButtonRange() {
            if(_this.game.player.gold > _this.game.selected.getRangeUpgradeCost()){
                _this.game.player.gold -= _this.game.selected.getRangeUpgradeCost();
                _this.game.selected.upgrade('range');
            } else {
                alert('not enought gold' + _this.game.selected.getRangeUpgradeCost())
            }

            _this.game.selected.showDialog();
        }
        this.upgradeButtonRange.events.onInputOver.add(function () {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);
        this.upgradeButtonRange.events.onInputOut.add(function () {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }, this);
        this.upgradeButtonRange.visible = false;

        //upgrade button for tower fire damage
        this.upgradeButtonFireDamageX = 500;
        this.upgradeButtonFireDamageY = 480;
        this.upgradeButtonFireDamage = new WorldObject(_this.game, 0, 0, 'upgradeButton', 0);
        this.upgradeButtonFireDamage.scale.setTo(0.1);
        this.upgradeButtonFireDamage.inputEnabled = true;
        this.upgradeButtonFireDamage.events.onInputDown.add(onClickButtonUpgradeButtonFireDamage, this);
        function onClickButtonUpgradeButtonFireDamage() {
            //TODO: and if tower is upgradable
            if(_this.game.player.gold > _this.game.selected.getFireDamageUpgradeCost()){
                _this.game.player.gold -= _this.game.selected.getFireDamageUpgradeCost();
                _this.game.selected.upgrade('fireDamage');
            } else {
                alert('not enought gold' + _this.game.selected.getFireDamageUpgradeCost())
            }

            _this.game.selected.showDialog();
        }
        this.upgradeButtonFireDamage.events.onInputOver.add(function () {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);
        this.upgradeButtonFireDamage.events.onInputOut.add(function () {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }, this);
        this.upgradeButtonFireDamage.visible = false;

        //upgrade button for tower fire speed
        this.upgradeButtonFireSpeedX = 500;
        this.upgradeButtonFireSpeedY = 555;
        this.upgradeButtonFireSpeed = new WorldObject(_this.game, 0, 0, 'upgradeButton', 0);
        this.upgradeButtonFireSpeed.scale.setTo(0.1);
        this.upgradeButtonFireSpeed.inputEnabled = true;
        this.upgradeButtonFireSpeed.events.onInputDown.add(onClickButtonUpgradeButtonFireSpeed, this);
        function onClickButtonUpgradeButtonFireSpeed() {
            if(_this.game.player.gold > _this.game.selected.getFireSpeedUpgradeCost()){
                _this.game.player.gold -= _this.game.selected.getFireSpeedUpgradeCost();
                _this.game.selected.upgrade('fireSpeed');
            } else {
                alert('not enought gold price is ' + _this.game.selected.getFireSpeedUpgradeCost())
            }

            _this.game.selected.showDialog();
        }
        this.upgradeButtonFireSpeed.events.onInputOver.add(function () {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);
        this.upgradeButtonFireSpeed.events.onInputOut.add(function () {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }, this);
        this.upgradeButtonFireSpeed.visible = false;

        this.dialog = {};
        this.dialog.tower = {};
        this.dialog.tower.show = false;
        this.dialog.unit = {};
        this.dialog.unit.show = false;
    }

    UserInterface.prototype.update = function update(xOffset, yOffset) {
        this.background.x = xOffset;
        this.background.y = yOffset + 449;
        this.turret.x = this.turretX + xOffset;
        this.turret.y = this.turretY + yOffset;
        this.gold.x = this.goldX + xOffset;
        this.gold.y = this.goldY + yOffset;
        this.killed.x = this.killedX + xOffset;
        this.killed.y = this.killedY + yOffset;
        if(this.dialog.tower.show){
            this.dialog.tower.sprite.x = DIALOG_X + xOffset;
            this.dialog.tower.sprite.y = DIALOG_Y + 20 + yOffset;
            this.dialog.tower.damage.x = DIALOG_X + 100 + xOffset;
            this.dialog.tower.damage.y = DIALOG_Y + yOffset;
            this.dialog.tower.range.x = DIALOG_X + 100 + xOffset;
            this.dialog.tower.range.y = DIALOG_Y + 40 + yOffset;
            this.dialog.tower.speed.x = DIALOG_X + 100 + xOffset;
            this.dialog.tower.speed.y = DIALOG_Y + 80 + yOffset;

            this.upgradeButtonRange.x = this.upgradeButtonRangeX + xOffset;
            this.upgradeButtonRange.y = this.upgradeButtonRangeY + yOffset;
            this.upgradeButtonFireDamage.x = this.upgradeButtonFireDamageX + xOffset;
            this.upgradeButtonFireDamage.y = this.upgradeButtonFireDamageY + yOffset;
            this.upgradeButtonFireSpeed.x = this.upgradeButtonFireSpeedX + xOffset;
            this.upgradeButtonFireSpeed.y = this.upgradeButtonFireSpeedY + yOffset;
        }
    };
    UserInterface.prototype.showDialog = function showDialog(dialog){
        this.dialog[dialog.infoType] = dialog;
        if(dialog.infoType === 'tower'){
            this.dialog.tower.show = true;
            this.dialog.tower.sprite = this.game.add.sprite(DIALOG_X, DIALOG_Y, dialog.spriteKey, 0);
            this.dialog.tower.damage = this.game.add.text(DIALOG_X + 100, DIALOG_Y, 'damage: ' + dialog.damage,
                {font: "24px Arial", fill: '#ff00ff'}
            );
            this.dialog.tower.range = this.game.add.text(DIALOG_X + 100, DIALOG_Y + 40, 'range: ' + dialog.range,
                {font: "24px Arial", fill: '#ff00ff'}
            );
            this.dialog.tower.speed = this.game.add.text(DIALOG_X + 100, DIALOG_Y + 80, 'speed: ' + dialog.fireSpeed + '/s',
                {font: "24px Arial", fill: '#ff00ff'}
            );
            this.upgradeButtonRange.visible = true;
            this.upgradeButtonFireDamage.visible = true;
            this.upgradeButtonFireSpeed.visible = true;
        }
    };

    UserInterface.prototype.hideDialog = function showDialog(){
        if(this.dialog.tower.show){
            this.dialog.tower.show = false;
            this.dialog.tower.sprite.visible = false;
            this.dialog.tower.damage.visible = false;
            this.dialog.tower.speed.visible = false;
            this.dialog.tower.range.visible = false;
            this.upgradeButtonRange.visible = false;
            this.upgradeButtonFireDamage.visible = false;
            this.upgradeButtonFireSpeed.visible = false;
        }
    };
    return UserInterface;
}());
