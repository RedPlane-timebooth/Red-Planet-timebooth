RedPlanetGame.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameCanvas');
RedPlanetGame.game.state.add('Boot', RedPlanetGame.Boot);
RedPlanetGame.game.state.add('Preload', RedPlanetGame.Preload);
RedPlanetGame.game.state.add('Menu', RedPlanetGame.Menu);
RedPlanetGame.game.state.add('Game', RedPlanetGame.Game);
RedPlanetGame.game.state.add('Level1', RedPlanetGame.Level1);
RedPlanetGame.game.state.start('Boot');