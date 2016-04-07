var WorldObject = (function iife(parent) {
    'use strict';

    /**
     * 
     * @param game
     * @param x
     * @param y
     * @param spriteName
     * @param startFrame
     * @constructor
     */
    function WorldObject(game, x, y, spriteName, startFrame) {
        spriteName = spriteName || null;
        startFrame = startFrame || 0;
        validator.validateIfObject(game, this.constructor.name + ' game');
        validator.validateIfNumber(x, this.constructor.name + ' x');
        validator.validateIfNumber(y, this.constructor.name + ' y');
        //validator.validateIfString(spriteName, this.constructor.name + ' spriteName');
        validator.validateIfNumber(startFrame, this.constructor.name + ' frames');

        parent.call(this, game, x, y, spriteName, startFrame);

        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
    }

    WorldObject.prototype = Object.create(parent.prototype);
    WorldObject.prototype.constructor = WorldObject;

    WorldObject.prototype.getPersonalInfo = function showPersonalInfo() {
        return {
            spriteKey: this.key
        }
    };
    WorldObject.prototype.showDialog = function showPersonalInfo() {
        this.game.selected = this;
        console.log(this.getPersonalInfo());
    };

    return WorldObject;
}(Phaser.Sprite));
