var Player = (function iife() {
    'use strict';

    /**
     *
     * @param id
     * @param username
     * @param gold
     * @param bonusObject
     * @param level
     * @constructor
     */
    function Player(id, username, gold, level, bonusObject) {

        id = id || 0;
        gold = gold || 0;
        bonusObject = bonusObject || {};

        validator.validateIfNumber(id, 'Player id');
        validator.validateIfString(username, 'Player username');
        validator.validateIfNumber(gold, 'Player gold');
        validator.validateIfObject(bonusObject, 'Player bonusObject');

        this.id = id;
        this.gold = gold;
        this.killed = 0;
        this.bonusPoints = 0;
        this.bonusObjects = bonusObject;
        this.level = level;
    }

    return Player;
}());
