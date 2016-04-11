var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Work = (function iife(parent) {
    'use strict';

    RedPlanetGame.Work = function () {
        parent.call(this);
    };

    RedPlanetGame.Work.prototype = Object.create(parent.prototype);
    RedPlanetGame.Work.prototype.constructor = RedPlanetGame.Defeat;

    RedPlanetGame.Work.prototype.preload = function preload() {
        this.load.image('work', '/assets/images/work.png');
    };

    RedPlanetGame.Work.prototype.create = function create() {
        this.background = this.game.add.sprite(0, -40,'work');
        this.background.width = gameWidth;
        this.background.height = gameHeight;

        this.noButton = new WorldObject(this.game, gameWidth / 2, gameHeight / 2 + 270, 'buttons', 26);
        this.noButton.inputEnabled = true;
        this.noButton.events.onInputDown.add(function exit() {
            this.game.state.start('Menu');
        }, this);

        this.noButton.events.onInputOver.add(function () {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);
        this.noButton.events.onInputOut.add(function() {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }, this);
    };

    RedPlanetGame.Work.prototype.update = function create() {
        this.game.canvas.style.cursor = this.game.cursorType;
    };

    return RedPlanetGame.Work;
}(Phaser.State));
