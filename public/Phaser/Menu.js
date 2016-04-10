var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Menu = (function iife(parent) {
    'use strict';

    var _this = null;
    RedPlanetGame.Menu = function () {
        parent.call(this);
        _this = this;
    };

    RedPlanetGame.Menu.prototype = Object.create(parent.prototype);
    RedPlanetGame.Menu.prototype.constructor = RedPlanetGame.Menu;

    RedPlanetGame.Menu.prototype.preload = function preload() {
        this.load.image('marsMap', '/assets/images/marsMap.jpg');
        this.load.image('pylon', '/assets/images/Pylon.png');
    };

    RedPlanetGame.Menu.prototype.create = function create() {
        this.background = this.game.add.sprite(0,0,'marsMap');
        this.game.world.setBounds(0, 0, 1920, 1080);
        this.game.player = new Player(1, 'Daniel', 0);
        var level1 = this.game.add.sprite(472, 322, 'pylon');

        level1.inputEnabled = true;
        level1.events.onInputDown.add( function() {
            this.state.start('Level1');
        }, this);
        level1.events.onInputOver.add( function() {
                this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);
        level1.events.onInputOut.add( function() {
                this.game.cursorType = CURSOR_TYPE.NORMAL;
        }, this);
    };

    RedPlanetGame.Menu.prototype.update = function create() {
        this.game.canvas.style.cursor = this.game.cursorType;
        this.followCamera();
    };

    RedPlanetGame.Menu.prototype.followCamera = function followCamera() {
        //Camera follow cursor
        //console.log('x', this.game.input.mousePointer.x);
        //console.log('y', this.game.input.mousePointer.y);
        if (this.game.input.mousePointer.x > gameWidth - gameWidth / 15) {
            this.game.camera.x += 10;
        } else if (this.game.input.mousePointer.x <= 100) {
            this.game.camera.x -= 10
        }
        if (this.game.input.mousePointer.y > gameHeight - gameHeight / 15) {
            this.game.camera.y += 10;
        } else if (this.game.input.mousePointer.y <= 100) {
            this.game.camera.y -= 10;
        }
    };

    return RedPlanetGame.Menu;
}(Phaser.State));
