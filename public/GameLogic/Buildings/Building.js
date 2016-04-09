var Building = (function iife(parent) {
    'use strict';
    
    function Building(game, x, y, spriteName, startFrame, player) {
        parent.call(this, game, x, y, spriteName, startFrame);
        
        this.game.buildings.add(this);
        this.playerId =  player.id;//door for multiplayer, keeping dependenci i
        this.fullyBuild = false;
        this.game.player.gold -= this.MONEY_COST;

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
        parent.prototype.destroy.call(this);
        this.game.player.gold += this.prototype.MONEY_COST * 0.8;
    };
    return Building;
}(WorldObject));