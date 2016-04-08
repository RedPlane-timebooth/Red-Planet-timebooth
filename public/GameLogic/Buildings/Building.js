var Building = (function iife(parent) {
    'use strict';
    
    function Building(game, x, y, spriteName, startFrame, player) {
        parent.call(this, game, x, y, spriteName, startFrame);
        
        this.game.buildings.add(this);
        this.playerId =  player.id;
        this.fullyBuild = false;

        this.invisibleChild = this.game.add.sprite(this.x - this.width, this.y - this.height, 'turret', 0);
        this.invisibleChild.inputEnabled = true;
        this.invisibleChild.alpha = 0.0;
        this.invisibleChild.events.onInputOver.add(this.onBuildingOver, this);
        this.invisibleChild.events.onInputOut.add(this.onBuildingOut, this);
        this.invisibleChild.events.onInputDown.add(this.showDialog, this);
    }

    Building.prototype = Object.create(parent.prototype);
    Building.prototype.constructor = Building;

    Building.prototype.canBuild = function canBuild(playerMoney, moneyCost) {
        return playerMoney >= moneyCost;
    };
    Building.prototype.onBuildingOver = function onBuildingOver() {
        if(this.game.buildState){
            if(this.game.cursorType = CURSOR_TYPE.TURRET){
                this.game.cursorType = CURSOR_TYPE.TURRET_RED;
            }
            this.game.canBuild = false;
        } else {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }
    };
    Building.prototype.onBuildingOut = function onBuildingOut() {
        if(this.game.buildState){
            if(this.game.cursorType = CURSOR_TYPE.TURRET_RED){
                this.game.cursorType = CURSOR_TYPE.TURRET;
            }
            this.game.canBuild = true;
        } else {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }
    };
    Building.prototype.showDialog = function showDialog() {
        parent.prototype.showDialog.call(this);
    };
    Building.prototype.sell = function destroy() {
        parent.prototype.destroy.call(this);
        this.invisibleChild.destroy();
        this.game.player.gold += this.prototype.MONEY_COST * 0.8;
    };
    return Building;
}(WorldObject));