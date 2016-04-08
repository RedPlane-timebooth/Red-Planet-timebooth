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
                return new Turret(game, x, y, player);
            case BUILDING_TYPES.TANK:
                return new Tank(game, x, y, player);
        }
    }

    return BuildingsFactory;
}());