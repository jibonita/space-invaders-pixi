function GameScene(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.loadPlayersShips();
}

GameScene.prototype = Object.create(PIXI.Container.prototype);

GameScene.prototype.loadPlayersShips = function () {
  this.player = new Player(this);

  this.invaders = new AliensFactory(this);

  //   this.initPlayerPosition();
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

  // console.log(obj.position.x);
  // console.log(obj.x);
};

GameScene.prototype.initPlayerPosition = function () {
  TweenMax.to(this.player, 1, {
    x: Settings.PLAYER_INITIAL_POSITION,
    ease: Power1.easeIn,
    onComplete: () => {
      ticker.add(this.move.bind(this, this.player));

      this.getSampleBulletFromPlayer();

      this.getSampleBulletFromTop();
    },
  });
};
/// helpers

// function getSampleBulletFromPlayer() {
GameScene.prototype.getSampleBulletFromPlayer = function () {
  const bullet = new Bullet(this);
  bullet.position.x = (this.player.width - bullet.width) / 2 + this.player.x;
  bullet.position.y =
    Settings.CANVAS_HEIGHT - this.player.height - bullet.height - 5;

  TweenMax.to(bullet, 1, {
    y: -bullet.height,
    onComplete: () => {
      //console.log("Bullet finished trajectory");
    },
  });
};

GameScene.prototype.getSampleBulletFromTop = function () {
  const bullet = new Bullet(this);
  bullet.position.x = (this.player.width - bullet.width) / 2 + this.player.x;
  bullet.position.y = Settings.CANVAS_HEIGHT - bullet.height;

  // when alien bullet
  bullet.anchor.set(1);
  bullet.rotation = Math.PI;

  const tm = TweenMax.from(bullet, 1, {
    y: -bullet.height,
    onUpdate: () => {
      if (checkCollision(tm.target, this.player)) {
        console.log("Boom");
        this.removeChild(tm.target);
        tm.kill();
      }
    },
    onComplete: () => {
      this.removeChild(tm.target);
      console.log("Bullet finished trajectory");
    },
  });
};

function checkCollision(missile, target) {
  const [mStart, mEnd] = [missile.x, missile.x + missile.width];
  const [tStart, tEnd] = [target.x, target.x + target.width];

  return (
    missile.y + missile.height > target.y &&
    ((mStart > tStart && mStart < tEnd) || (mEnd > tStart && mEnd < tEnd))
  );
}
