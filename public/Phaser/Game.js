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

        const creepYOffset = 15;
        setInterval(function () {
            _this.game.enemies.factory(_this.spawnCreepsAt.x, _this.spawnCreepsAt.y + creepYOffset,
                UNIT_TYPES.CREEP1, _this.checkPoints);
        }, 1000);


        this.game.canBuild = false;
        this.game.buildState = false;
        this.game.invisiblePath.children.forEach(function (invisiblePath) {
            invisiblePath.inputEnabled = true;
            invisiblePath.events.onInputOver.add(function () {
                if (_this.game.buildState) {
                    if (_this.game.cursorType = CURSOR_TYPE.TURRET) {
                        _this.game.cursorType = CURSOR_TYPE.TURRET_RED;
                    }
                    _this.game.canBuild = false;
                }
            }, this);

            invisiblePath.events.onInputOut.add(function () {
                if (_this.game.buildState) {
                    if (_this.game.cursorType = CURSOR_TYPE.TURRET_RED) {
                        _this.game.cursorType = CURSOR_TYPE.TURRET;
                    }
                    _this.game.canBuild = true;
                }
            }, this);
        });

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
            enemy.onUpdate(_this.map.objects['objectsLayer'][6]);
        });
        //updates buildings
        this.game.buildings.forEach(function (building) {
            building.onUpdate(_this.game.bullets);
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
        this.map = this.game.add.tilemap('sample2');
        this.map.addTilesetImage('32x32_map_tile v3.1 [MARGINLESS]', 'gameTiles');
        //background and layers
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.path = this.map.createLayer('path');
        this.map.setCollisionBetween(1, 2000, true, 'backgroundLayer');
        this.map.setCollisionBetween(1, 2000, true, 'path');
        //objects from tile map
        this.spawnCreepsAt = this.map.objects['objectsLayer'][0];
        this.destinationForCreeps = this.map.objects['objectsLayer'][1];
        //resize world
        this.backgroundlayer.resizeWorld();
        this.game.world.setBounds(0, 0, 800, 750);
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
        //on mouse down event
        var xOffset,
            yOffset,
            buildingType;
        if (this.game.input.activePointer.leftButton.isDown && this.game.canBuild && !this.buffers.pressed.is) {//yo Yoda
            switch (this.game.cursorType) {
                case CURSOR_TYPE.TURRET:
                    xOffset = 22 + this.game.camera.x;
                    yOffset = 31 + this.game.camera.y;
                    buildingType = BUILDING_TYPES.TURRET;
                    break;
                default:
                    break;
            }
            if (Building.prototype.canBuild(this.game.player.gold, Turret.prototype.MONEY_COST)) {
                BuildingsFactory(
                    this.game,
                    this.game.input.x + xOffset,
                    this.game.input.y + yOffset,
                    this.game.player,
                    buildingType
                );
                this.game.player.gold -= Turret.prototype.MONEY_COST;
            } else {
                alert('Not enought gold');
            }

            this.game.buildState = false;
            this.game.canBuild = false;
            this.game.cursorType = CURSOR_TYPE.NORMAL;
            buffer(this.buffers.pressed, 400, this.game);
        }
    };

    return RedPlanetGame.Game;
})();
