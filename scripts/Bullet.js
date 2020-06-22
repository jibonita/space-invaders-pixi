function Bullet(stage) {
  const texture = PIXI.utils.TextureCache["bullet.png"];
  PIXI.Sprite.call(this, texture);
  stage.addChild(this);

  this.setInitialState();
}

Bullet.prototype = Object.create(PIXI.Sprite.prototype);

Bullet.prototype.setInitialState = function () {
  this.scale.set(0.5);
  this.vx = 0;
  this.lifeCost = Settings.BULLET_LIFE_COST;
  this.isDestroyed = false;
  this.isPlayerBullet = false;
};
