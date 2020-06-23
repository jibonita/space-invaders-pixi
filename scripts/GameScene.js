function GameScene(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.isLoaded = true;

  this.loadPlayersShips();
}

GameScene.prototype = Object.create(PIXI.Container.prototype);

GameScene.prototype.loadPlayersShips = function () {
  this.player = new Player(this);

  this.invaders = new AliensFactory(this);

  this.bullets = [];

  this.statistics = new Statistics(this);

  this.initPlayerPosition();
};

GameScene.prototype.move = (obj) => {
  obj.position.x += obj.vx;

  const leftBound = Settings.PLAYER_INITIAL_POSITION;
  const rightBound =
    Settings.CANVAS_WIDTH - Settings.PLAYER_INITIAL_POSITION - obj.width;

  if (obj.position.x < leftBound) {
    obj.position.x = leftBound;
  } else if (obj.position.x > rightBound) {
    obj.position.x = rightBound;
  }
};

GameScene.prototype.initPlayerPosition = function () {
  TweenMax.to(this.player, 1, {
    x: Settings.PLAYER_INITIAL_POSITION,
    ease: Power1.easeIn,
    onComplete: () => {
      ticker.add(this.move.bind(this, this.player));

      // this.getSampleBulletFromPlayer();
    },
  });
};

/// helpers
GameScene.prototype.getSampleBulletFromPlayer = function () {
  this.player.fireBullet(this.player.createBullet());
};
