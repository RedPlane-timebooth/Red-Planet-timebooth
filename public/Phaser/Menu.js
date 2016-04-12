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
        this.load.image('bunker', '/assets/images/Bunker.png');
        this.load.image('barracks', '/assets/images/Barracks.png');
    };

    RedPlanetGame.Menu.prototype.create = function create() 
    {
        this.background = this.game.add.sprite(0,0,'marsMap');
        this.game.world.setBounds(0, 0, 1920, 1080);

        this.game.player = this.game.player || {};
        this.game.player.level = this.game.player.level || null;
        this.game.player.bonusObjects = this.game.player.bonusObjects || null;

        var playerData = {},
            jsonDataDecoded = $.parseJSON(jsonData);
         playerData.id = jsonDataDecoded.user.id;
         playerData.name = jsonDataDecoded.user.name;
         playerData.level = this.game.player.level || jsonDataDecoded.user.level;
         playerData.bonusObjects = this.game.player.bonusObjects || jsonDataDecoded.items;

        this.game.player = new Player(playerData.id, playerData.name, playerData.level,
            playerData.bonusObjects);
        this.game.level = this.game.player.level;
        this.game.nextLevel = 2;
        
        var level1 = this.game.add.sprite(435, 240, 'pylon'),
            level2 = this.game.add.sprite(690, 305, 'bunker'),
            level3 = this.game.add.sprite(870, 400, 'barracks');

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

        if(this.game.player.level > 1){
            level2.inputEnabled = true;
            level2.tint = 0xffffff;
        } else {
            level2.tint = 0x2a2a2a;
        }
        level2.events.onInputDown.add( function() {
            //this.state.start('Level2');
            this.state.start('Work');
        }, this);
        level2.events.onInputOver.add( function() {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);
        level2.events.onInputOut.add( function() {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }, this);

        if(this.game.player.level > 2){
            level3.inputEnabled = true;
            level3.tint = 0xffffff;
        } else {
            level3.tint = 0x2a2a2a;
        }
        level3.events.onInputDown.add( function() {
            this.state.start('Work');
        }, this);
        level3.events.onInputOver.add( function() {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);
        level3.events.onInputOut.add( function() {
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
