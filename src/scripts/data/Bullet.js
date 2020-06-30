import * as PIXI from "pixi.js";
import sound from "pixi-sound";
import Settings from "../Settings";

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

Bullet.prototype.fire = function (toY) {
  PIXI.sound.play("shoot");

  const tm = TweenMax.to(this, 1, {
    y: toY,
    ease: Power0.easeNone,
    onUpdate: () => {
      if (this.isDestroyed) {
        tm.kill();
      }
    },
  });
};

export default Bullet;
