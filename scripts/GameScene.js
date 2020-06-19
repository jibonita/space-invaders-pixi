function GameScene(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.loadPlayersShips();
}

GameScene.prototype = Object.create(PIXI.Container.prototype);

GameScene.prototype.loadPlayersShips = function () {
  this.player = new Player(this);

  this.invaders = new AliensFactory(this);

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

      this.getSampleBulletFromPlayer();
    },
  });
};

/// helpers
GameScene.prototype.getSampleBulletFromPlayer = function () {
  this.player.fireBullet(this.player.createBullet());
};

function checkCollision(missile, target) {
  const [mStartX, mEndX, mStartY, mEndY] = [
    missile.x,
    missile.x + missile.width,
    missile.y,
    missile.y + missile.height,
  ];
  const [tStartX, tEndX, tStartY, tEndY] = [
    target.x,
    target.x + target.width,
    target.y,
    target.y + target.height,
  ];

  return (
    mStartX < tEndX && mEndX > tStartX && mStartY < tEndY && mEndY > tStartY
  );
}
