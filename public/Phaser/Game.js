var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Game = (function iife() {
    'use strict';
    var _this = null;

    RedPlanetGame.Game = function () {
        Phaser.State.call(this);
        _this = this;
    };

    RedPlanetGame.Game.prototype = Object.create(Phaser.State.prototype);
    RedPlanetGame.Game.prototype.constructor = RedPlanetGame.Game;

    RedPlanetGame.Game.prototype.create = function create() {
        this.buffers = {
            pressed: {
                is: false
            }
        };
        this.game.dialogOn = false;
        //A door for multyplayer
        this.players = [];
        this.game.player = new Player(1, 'Daniel', 1000);
        this.players.push(this.game.player);

        this.initMapLayersGroups();
        this.game.ui = new UserInterface(this.game);

        setInterval(function () {
            _this.game.enemies.factory(_this.spawnCreepsAt.x, _this.spawnCreepsAt.y,
                UNIT_TYPES.ZEALOT, _this.checkPoints);
        }, 5000);
        setInterval(function () {
            _this.game.enemies.factory(_this.spawnCreepsAt.x, _this.spawnCreepsAt.y,
                UNIT_TYPES.MARINE, _this.checkPoints);
        }, 2000);
        setInterval(function () {
            _this.game.enemies.factory(_this.spawnCreepsAt.x, _this.spawnCreepsAt.y,
                UNIT_TYPES.DRAGOON, _this.checkPoints);
        }, 8000);


        this.game.canBuild = false;
        this.game.buildState = false;
        this.game.cursorType = CURSOR_TYPE.NORMAL;
        this.game.canDestroyCircle = false;
    };

    RedPlanetGame.Game.prototype.update = function update() {
        this.game.canvas.style.cursor = this.game.cursorType;

        //on building state
        if (this.game.buildState) {
            this.onBuildState();
        }

        //Removes range cricle around tower when clicked somewhere else
        if (this.game.input.activePointer.isDown && this.game.cursorType == CURSOR_TYPE.NORMAL) {
             if (this.game.dialogOn && !this.buffers.pressed.is) {
                 buffer(this.buffers.pressed, 90, this.game);
                 this.game.circle.destroy();
                 this.game.ui.hideDialog();
                 this.game.canDestroyCircle = false;
                 this.game.dialogOn = false;
             }
        }

        this.followCamera();
        //check for collision between enemy and non-path layer
        this.game.physics.arcade.collide(this.game.enemies, this.backgroundlayer);
        //checks for collision between bullets and enemies
        this.game.physics.arcade.overlap(this.game.bullets, this.game.enemies, function (bullet, enemy) {
            enemy.takeHit(bullet, _this.game.player);
            bullet.kill(enemy);
        }, null, this);

        //updates enemies
        this.game.enemies.forEachExists(function (enemy) {
            enemy.onUpdate();
        });
        //updates buildings
        this.game.buildings.forEach(function (building) {
            building.onUpdate();
        });

        //updates (static) position of UI
        this.game.ui.update(this.game.camera.x, this.game.camera.y);
    };

    RedPlanetGame.Game.prototype.render = function render() {
        this.game.ui.gold.text = 'G: ' + this.game.player.gold;
        this.game.ui.killed.text = 'K: ' + this.game.player.killed;
    };

    RedPlanetGame.Game.prototype.initMapLayersGroups = function init() {
        //Tile map
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('badlands', 'gameTiles');
        //background and layers
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.map.setCollisionBetween(1, 2000, true, 'backgroundLayer');
        //objects from tile map
        this.spawnCreepsAt = this.map.objects['objectsLayer'][0];
        //resize world
        this.backgroundlayer.resizeWorld();
        this.game.world.setBounds(0, 0, 960, 790);
        //group
        this.game.enemies = new UnitsPoolFactory(this.game);
        this.game.buildings = this.game.add.group();//TODO: make buildings for each player
        this.game.bullets = new BulletsPoolFactory(this.game);
        this.game.invisiblePath = this.game.add.group();
        this.game.checkPoints = this.game.add.group();
        //creates invisible path for the towers to collide with (tiled path has bounds like the full map and it is useless)
        createInvisibleSpriteGroupFromMapObjects('path', this.map, 'objectsLayer', this.game, this.game.invisiblePath);
        this.game.physics.enable(this.game.invisiblePath, Phaser.Physics.ARCADE);
        //creates checkPoints for creeps
        this.checkPoints = createCheckPoints('checkPoint', this.map, 'objectsLayer');
    };

    RedPlanetGame.Game.prototype.followCamera = function followCamera() {
        //Camera follow cursor
        if (this.game.input.mousePointer.x > gameWidth - gameWidth / 10) {
            this.game.camera.x += 10;
        } else if (this.game.input.mousePointer.x <= 100) {
            this.game.camera.x -= 10
        }
        if (this.game.input.mousePointer.y > gameHeight - gameHeight / 10) {
            this.game.camera.y += 10;
        } else if (this.game.input.mousePointer.y <= 100) {
            this.game.camera.y -= 10;
        }
    };

    RedPlanetGame.Game.prototype.onBuildState = function onBuildState() {
        this.game.currentBuilding.x = this.game.input.activePointer.x;
        this.game.currentBuilding.y = this.game.input.activePointer.y;
        this.game.physics.arcade.overlap(this.game.currentBuilding, this.game.invisiblePath,
            this.onBuildingOverlap, null, this);
        this.game.physics.arcade.overlap(this.game.currentBuilding, this.game.buildings,
            this.onBuildingOverlap, null, this);

        //on mouse down event
        if (this.game.input.activePointer.leftButton.isDown && !this.buffers.pressed.is && this.game.canBuild) {//yo Yoda

            if (Building.prototype.canBuild(this.game.player.gold, Turret.prototype.MONEY_COST)) {
                BuildingsFactory(
                    this.game,
                    this.game.currentBuilding.x,
                    this.game.currentBuilding.y,
                    this.game.player,
                    this.game.currentBuilding.key
                );
                this.game.player.gold -= Turret.prototype.MONEY_COST;
            } else {
                alert('Not enought gold');
            }

            this.game.buildState = false;
            this.game.currentBuilding.destroy();
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }
        
        if (this.game.canBuild) {
            this.game.currentBuilding.tint = 0xffffff;
        }
        this.game.canBuild = true;
        buffer(this.buffers.pressed, 0, this.game);
    };

    RedPlanetGame.Game.prototype.onBuildingOverlap = function onBuildingOverlap() {
        this.game.canBuild = false;
        this.game.currentBuilding.tint = 0xff0000;
    };

    return RedPlanetGame.Game;
})();
