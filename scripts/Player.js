function Player(stage) {
  const texture = PIXI.utils.TextureCache["player.png"];
  PIXI.Sprite.call(this, texture);
  stage.addChild(this);

  this.setInitialState();

  this.listen();
}

Player.prototype = Object.create(PIXI.Sprite.prototype);

Player.prototype.setInitialState = function () {
  this.height = 50;
  this.width = 50;
  this.position.x = 0;
  this.position.y = Settings.CANVAS_HEIGHT - this.height - 5;
  this.vx = 0;
  this.health = Settings.PLAYER_INITIAL_HEALTH;
  this.score = 0;
};

Player.prototype.listen = function () {
  const left = keyboard("ArrowLeft");
  left.press = () => (this.vx = -Settings.PLAYER_SPEED);
  left.release = () => (this.vx = 0);

  const right = keyboard("ArrowRight");
  right.press = () => (this.vx = Settings.PLAYER_SPEED);
  right.release = () => (this.vx = 0);

  const space = keyboard(" ");
  space.press = () => {
    this.fireBullet(this.createBullet());
  };
};

Player.prototype.createBullet = function (alien) {
  const bullet = new Bullet(this.parent);
  bullet.position.x = (this.width - bullet.width) / 2 + this.x;
  bullet.position.y = Settings.CANVAS_HEIGHT - this.height - bullet.height - 5;
  bullet.isPlayerBullet = true;

  return bullet;
};

Player.prototype.fireBullet = function (bullet) {
  const tm = TweenMax.to(bullet, 1, {
    y: -bullet.height,
    onUpdate: () => {
      if (bullet.isDestroyed) {
        tm.kill();
      }
    },
    onComplete: () => {
      bullet.parent.removeChild(bullet);
    },
  });
};

Player.prototype.updateHealth = function (cost) {
  this.health += cost;
  //** player alpha formula works in case player max life point are the initial ones
  this.alpha = this.health / Settings.PLAYER_INITIAL_HEALTH;
};
