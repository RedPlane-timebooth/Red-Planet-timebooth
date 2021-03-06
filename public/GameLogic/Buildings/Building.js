var Building = (function iife(parent) {
    'use strict';
    
    function Building(game, x, y, spriteName, startFrame) {
        parent.call(this, game, x, y, spriteName, startFrame);
        
        this.game.buildings.add(this);
        this.fullyBuild = false;
        this.game.gold -= this.MONEY_COST;

        this.inputEnabled = true;
        this.events.onInputOver.add(this.onInputOver, this);
        this.events.onInputOut.add(this.onInputOut, this);
        this.events.onInputDown.add(this.showDialog, this);
    }

    Building.prototype = Object.create(parent.prototype);
    Building.prototype.constructor = Building;

    Building.prototype.canBuild = function canBuild(playerMoney, moneyCost) {
        return playerMoney >= moneyCost;
    };
    Building.prototype.sell = function destroy() {
        this.game.gold += this.getSellPrice();
        this.destroy();
    };
    return Building;
}(WorldObject));