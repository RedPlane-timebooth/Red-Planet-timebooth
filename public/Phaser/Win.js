var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Win = (function iife(parent) {
    'use strict';

    RedPlanetGame.Win = function () {
        parent.call(this);
    };

    RedPlanetGame.Win.prototype = Object.create(parent.prototype);
    RedPlanetGame.Win.prototype.constructor = RedPlanetGame.Win;

    RedPlanetGame.Win.prototype.preload = function preload() {
        this.load.image('win', '/assets/images/win.png');
        this.load.audio('skip', '/assets/sounds/skip.mp3');
        this.load.audio('banana', '/assets/sounds/banana.mp3');
    };

    RedPlanetGame.Win.prototype.create = function create() {
        var skip = this.game.add.audio('skip'),
            banana = this.game.add.audio('banana');

        this.background = this.game.add.sprite(0,0,'win');
        this.background.width = gameWidth;
        this.background.height = gameHeight;

        skip.onStop.add(function() {
            banana.play();
        }, this);
        this.onExitPromptText = this.game.add.text(gameWidth / 2 - 80, gameHeight / 2 - 170, 'You win!!!',
            {font: "32px Algerian", fill: '#ffd700'}
        );
        this.game.time.events.add(2000, function () {
            //skip.play();
            this.killedText = this.game.add.text(gameWidth / 2 - 150, gameHeight / 2 - 60, 'Killed:   ',
                {font: "32px Algerian", fill: '#ffd700'}
            );
        }, this);
        this.game.time.events.add(3900, function () {
            this.game.add.text(this.killedText.x + 200, this.killedText.y, "" +this.game.killed,
                {font: "32px Algerian", fill: '#ffd700'}
            );
        }, this);

        this.game.time.events.add(4200, function () {
            //skip.play();
            this.livesText = this.game.add.text(gameWidth / 2 - 150, gameHeight / 2 + 20, 'Lives:   ',
                {font: "32px Algerian", fill: '#ffd700'}
            );
        }, this);
        this.game.time.events.add(6200, function () {
            this.game.add.text(this.livesText.x + 200, this.livesText.y,"" + this.game.lives,
                {font: "32px Algerian", fill: '#ffd700'}
            );
        }, this);

        this.game.time.events.add(6600, function () {
            //skip.play();
            this.rewardText = this.game.add.text(gameWidth / 2 - 150, gameHeight / 2 + 100, 'Points:   ',
                {font: "32px Algerian", fill: '#ffd700'}
            );
        }, this);
        this.game.time.events.add(8500, function () {
            this.game.add.text(this.rewardText.x + 200, this.rewardText.y, "" + this.game.rewards,
                {font: "32px Algerian", fill: '#ffd700'}
            );
        }, this);

        this.noButton = new WorldObject(this.game, gameWidth / 2, gameHeight / 2 + 200, 'buttons', 26);
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

    RedPlanetGame.Win.prototype.update = function create() {
        this.game.canvas.style.cursor = this.game.cursorType;
    };

    return RedPlanetGame.Win;
}(Phaser.State));
