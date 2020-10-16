import * as PIXI from "pixi.js";

function Alien(stage, index) {
  const texture = PIXI.utils.TextureCache[`alien${index}.png`];
  PIXI.Sprite.call(this, texture);
  stage.addChild(this);

  this.setInitialState();
}

Alien.prototype = Object.create(PIXI.Sprite.prototype);

Alien.prototype.setInitialState = function () {
  this.scale.set(0.5);
  this.canShoot = false;
  this.isDestroyed = false;
};

Alien.prototype.imageName = function () {
  return this.texture.textureCacheIds;
};

export default Alien;
