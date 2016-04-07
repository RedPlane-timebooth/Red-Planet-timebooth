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
    function Player(id, username, gold, bonusObject, level) {

        id = id || 0;
        gold = gold || 0;
        bonusObject = bonusObject || {};

        validator.validateIfNumber(id, 'Player id');
        validator.validateIfString(username, 'Player username');
        validator.validateIfNumber(gold, 'Player gold');
        //validator.validateIfNumber(killed, 'Player killed');
        //validator.validateIfNumber(experience, 'Player experience');
        validator.validateIfObject(bonusObject, 'Player bonusObject');

        this.id = id;
        this.gold = gold;
        this.killed = 0;
        this.experience = 0;
    }

    return Player;
}());
