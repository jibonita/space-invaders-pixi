import * as PIXI from "pixi.js";
import Settings from "../Settings";
import keyboard from "../utils/keyboardCatcher";
import Bullet from "./Bullet";

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

  const escape = keyboard("Escape");
  escape.press = () => {
    this.health = 0;
  };

  this.listeners = [left, right, space];
};

Player.prototype.stopListen = function () {
  this.listeners.forEach((listener) => listener.unsubscribe());
};

Player.prototype.move = function () {
  this.position.x += this.vx;

  const leftBound = Settings.PLAYER_INITIAL_POSITION;
  const rightBound = Settings.CANVAS_WIDTH - Settings.PLAYER_INITIAL_POSITION - this.width;

  if (this.position.x < leftBound) {
    this.position.x = leftBound;
  } else if (this.position.x > rightBound) {
    this.position.x = rightBound;
  }
};

Player.prototype.createBullet = function (alien) {
  const bullet = new Bullet(this.parent);
  bullet.position.x = (this.width - bullet.width) / 2 + this.x;
  bullet.position.y = Settings.CANVAS_HEIGHT - this.height - bullet.height - 5;
  bullet.isPlayerBullet = true;

  return bullet;
};

Player.prototype.fireBullet = function (bullet) {
  document.dispatchEvent(new CustomEvent("fire", { detail: { bullet, toY: -bullet.height } }));
};

Player.prototype.updateHealth = function (cost) {
  this.health += cost;
  //** player alpha formula works in case player max life points are the initial ones
  this.alpha = this.health / Settings.PLAYER_INITIAL_HEALTH;
};

Player.prototype.destroy = function () {
  this.stopListen();
  this.visible = false;
  // this.parent.removeChild(this);
};

export default Player;
