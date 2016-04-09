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
    };
    WorldObject.prototype.onInputOver = function() {
        if(!this.game.buildState) {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }
    };
    WorldObject.prototype.onInputOut = function() {
        if(!this.game.buildState) {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }
    };
    WorldObject.prototype.calculateRotation = function calculateRotation(destination) {
        var angleBetween = Math.round((this.game.physics.arcade.angleBetween(this, destination) * 90) / 21) + 8,
            spriteRow,
            reverseX;

        //MAGIC DO NOT TOUCH!!!
        if (0 < angleBetween && angleBetween <= 15) {
            spriteRow = angleBetween;
            reverseX = false;
        }
        else {
            switch (angleBetween) {
                case -5:
                    spriteRow = 7;
                    reverseX = true;
                    break;
                case -4:
                    spriteRow = 6;
                    reverseX = true;
                    break;
                case -3:
                    spriteRow = 5;
                    reverseX = true;
                    break;
                case -2:
                    spriteRow = 4;
                    reverseX = true;
                    break;
                case -1:
                    spriteRow = 3;
                    reverseX = true;
                    break;
                case 0:
                    spriteRow = 2;
                    reverseX = true;
                    break;
                case 21:
                    spriteRow = 8;
                    reverseX = true;
                    break;
                case 20:
                    spriteRow = 9;
                    reverseX = true;
                    break;
                case 19:
                    spriteRow = 10;
                    reverseX = true;
                    break;
                case 18:
                    spriteRow = 11;
                    reverseX = true;
                    break;
                case 17:
                    spriteRow = 12;
                    reverseX = true;
                    break;
                case 16:
                    spriteRow = 13;
                    reverseX = true;
                    break;
            }
        }

        return {
            spriteRow: spriteRow,
            reverseX: reverseX
        }
    };

    return WorldObject;
}(Phaser.Sprite));
