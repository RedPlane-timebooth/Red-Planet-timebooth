var BuildingsFactory = (function iife() {
    'use strict';
    /**
     * 
     * @param game
     * @param x
     * @param y
     * @param player
     * @param building
     * @constructor
     */
    function BuildingsFactory(game, x, y, player, building) {
        switch (building) {
            case BUILDING_TYPES.TURRET:
                if(Building.prototype.canBuild(player.gold, Turret.prototype.MONEY_COST)){
                    return new Turret(game, x, y, player);
                } else {
                    game.ui.textNotification(centralTextPossX + game.camera.x, centralTextPossY + game.camera.y, 'Not enought gold!!!', 'red', 1500, true);
                    break;
                }
            case BUILDING_TYPES.TANK:
                if(Building.prototype.canBuild(player.gold, Tank.prototype.MONEY_COST)){
                    return new Tank(game, x, y, player);
                } else {
                    game.ui.textNotification(centralTextPossX + game.camera.x, centralTextPossY + game.camera.y, 'Not enought gold!!!', 'red', 1500, true);
                    break;
                }
            case BUILDING_TYPES.SNIPER:
                if(Building.prototype.canBuild(player.gold, Sniper.prototype.MONEY_COST)){
                    return new Sniper(game, x, y, player);
                } else {
                    game.ui.textNotification(centralTextPossX + game.camera.x, centralTextPossY + game.camera.y, 'Not enought gold!!!', 'red', 1500, true);
                    break;
                }
        }
    }

    return BuildingsFactory;
}());