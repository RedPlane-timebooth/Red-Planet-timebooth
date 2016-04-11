var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Defeat = (function iife(parent) {
    'use strict';

    RedPlanetGame.Defeat = function () {
        parent.call(this);
    };

    RedPlanetGame.Defeat.prototype = Object.create(parent.prototype);
    RedPlanetGame.Defeat.prototype.constructor = RedPlanetGame.Defeat;

    RedPlanetGame.Defeat.prototype.preload = function preload() {
        this.load.image('defeat', '/assets/images/defeat.png');
    };

    RedPlanetGame.Defeat.prototype.create = function create() {
        this.background = this.game.add.sprite(0,0,'defeat');
        this.background.width = gameWidth;
        this.background.height = gameHeight;

        this.onExitPromptText = this.game.add.text(this.goldX, this.goldY, 'You loose!!!',
            {font: "32px Algerian", fill: '#C0C0C0'}
        );
        this.onExitPromptText.x = gameWidth / 2 - 100;
        this.onExitPromptText.y = gameHeight / 2 - 100;

        this.yesButton = new WorldObject(this.game, gameWidth / 2, gameHeight / 2, 'buttons', 8);
        this.yesButton.inputEnabled = true;
        this.yesButton.events.onInputDown.add(function exit() {
            this.game.state.start(this.game.player.lastPlayed);
        }, this);

        this.yesButton.events.onInputOver.add(function () {
                this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);
        this.yesButton.events.onInputOut.add(function () {
                this.game.cursorType = CURSOR_TYPE.NORMAL;
        }, this);

        this.noButton = new WorldObject(this.game, gameWidth / 2, gameHeight / 2 + 50, 'buttons', 27);
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

    RedPlanetGame.Defeat.prototype.update = function create() {
        this.game.canvas.style.cursor = this.game.cursorType;
    };
    
    return RedPlanetGame.Defeat;
}(Phaser.State));
