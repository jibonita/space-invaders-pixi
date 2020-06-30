import * as PIXI from "pixi.js";
import sound from "pixi-sound";

function Sound(stage) {
  const cache = PIXI.utils.TextureCache;
  this.textures = [cache["sound-off.png"], cache["sound-on.png"]];
  this.isSoundOn = true;

  PIXI.Sprite.call(this, this.textures[+this.isSoundOn]);
  stage.addChild(this);

  this.setInitialState();

  this.on("mousedown", this.toggle.bind(this));
}

Sound.prototype = Object.create(PIXI.Sprite.prototype);

Sound.prototype.setInitialState = function () {
  this.scale.set(0.3);
  this.position.set(5);
  this.interactive = true;
};

Sound.prototype.toggle = function () {
  const commands = ["muteAll", "unmuteAll"];
  this.isSoundOn = !this.isSoundOn;

  this.texture = this.textures[+this.isSoundOn];
  PIXI.sound[commands[+this.isSoundOn]]();
};

Sound.prototype.mute = function () {
  this.isSoundOn = true;
  this.toggle();
};

Sound.prototype.destroy = function () {
  this.parent.removeChild(this);
};

export default Sound;
