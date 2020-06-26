function GameScene() {
  PIXI.Container.call(this);

  this.sceneContainer = new PIXI.Container();
  this.addChild(this.sceneContainer);

  // this.isLoaded = true;

  this.sceneName = "game";

  this.loadGameAssets();
}
// function GameScene(stage) {
//   PIXI.Container.call(this);
//   stage.addChild(this);

//   this.isLoaded = true;

//   this.sceneName = "game";

//   this.loadGameAssets();
// }

GameScene.prototype = Object.create(PIXI.Container.prototype);

GameScene.prototype.loadGameAssets = function () {
  this.player = new Player(this);

  this.invaders = new AliensFactory(this);

  this.bullets = [];

  this.statistics = new Statistics(this);

  this.sound = new Sound(this);

  this.init();
};

GameScene.prototype.init = function () {
  this.initPlayersPosition();
  this.sound.mute();
};

GameScene.prototype.initPlayersPosition = function () {
  PIXI.sound.play("enter");

  const tmPlayer = TweenMax.to(this.player, 1, {
    x: Settings.PLAYER_INITIAL_POSITION,
    ease: Power1.easeIn,
    onComplete: () => {
      ticker.add(this.move.bind(this, this.player));
      //this.getSampleBulletFromPlayer();
    },
  });

  const tmInvaders = TweenMax.to(this.invaders, 1, {
    x: Settings.ALIENS_INITIAL_X_POSITION,
    ease: Power1.easeIn,
    onComplete: () => {
      this.invaders.initMove();
    },
  });

  this.animations = [tmPlayer, tmInvaders];
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

GameScene.prototype.destroy = function () {
  this.parent.removeChild(this);

  this.player.destroy();
  this.invaders.destroy();
  this.statistics.destroy();
  this.sound.destroy();

  if (this.animations) {
    this.animations.forEach((a) => a.kill());
  }
};

/// helpers
GameScene.prototype.getSampleBulletFromPlayer = function () {
  this.player.fireBullet(this.player.createBullet());
};
