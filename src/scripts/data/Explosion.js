import * as PIXI from "pixi.js";

function Explosion(stage, x, y) {
  const texture = [];
  for (let i = 0; i < 26; i++) {
    const textureFrame = PIXI.Texture.fromFrame("Explosion_Sequence_A " + (i + 1) + ".png");
    texture.push(textureFrame);
  }

  PIXI.extras.AnimatedSprite.call(this, texture);
  stage.addChild(this);

  this.setInitialState(x, y);

  this.play();
}

Explosion.prototype = Object.create(PIXI.extras.AnimatedSprite.prototype);

Explosion.prototype.setInitialState = function (x, y) {
  this.scale.set(0.15);
  this.x = x;
  this.y = y;
  this.animationSpeed = 1.5;
  this.loop = false;
};

export default Explosion;
