var Player = (function iife() {
    'use strict';

    /**
     *
     * @param id
     * @param username
     * @param gold
     * @param killed
     * @param experience
     * @constructor
     */
    function Player(id, username, gold, killed, experience, bonusObject) {

        id = id || 0;
        gold = gold || 0;
        killed = killed || 0;
        experience = experience || 0;
        bonusObject = bonusObject || {};

        validator.validateIfNumber(id, 'Player id');
        validator.validateIfString(username, 'Player username');
        validator.validateIfNumber(gold, 'Player gold');
        validator.validateIfNumber(killed, 'Player killed');
        validator.validateIfNumber(experience, 'Player experience');
        validator.validateIfObject(bonusObject, 'Player bonusObject');

        this.id = id;
        this.gold = gold;
        this.killed = killed;
        this.experience = experience;
    }

    return Player;
}());
