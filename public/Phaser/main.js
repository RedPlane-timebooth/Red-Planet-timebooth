RedPlanetGame.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameCanvas');
RedPlanetGame.game.state.add('Boot', RedPlanetGame.Boot);
RedPlanetGame.game.state.add('Preload', RedPlanetGame.Preload);
RedPlanetGame.game.state.add('Game', RedPlanetGame.Game);
RedPlanetGame.game.state.start('Boot');