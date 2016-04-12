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
    function Player(id, username, level, bonusObject) {
        bonusObject = bonusObject || [];

        validator.validateIfNumber(id, 'Player id');
        validator.validateIfString(username, 'Player username');
        validator.validateIfNumber(level, 'Player level');
        validator.validateIfObject(bonusObject, 'Player bonus objects');
        
        this.id = id;
        this.gold = 0;
        this.killed = 0;
        this.bonusObjects = bonusObject;
        this.level = level;
    }

    return Player;
}());
