import * as PIXI from "pixi.js";
import Settings from "../Settings";
import Player from "../data/Player";
import AliensFactory from "../data/AliensFactory";
import Statistics from "../data/Statistics";
import Sound from "../data/Sound";

function GameScene() {
  PIXI.Container.call(this);

  this.sceneContainer = new PIXI.Container();
  this.addChild(this.sceneContainer);

  this.sceneName = "game";

  this.loadGameAssets();
}

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
  // this.sound.mute();
};

GameScene.prototype.initPlayersPosition = function () {
  const tmPlayer = TweenMax.to(this.player, 1, {
    x: Settings.PLAYER_INITIAL_POSITION,
    ease: Power1.easeIn,
    onComplete: () => {
      ticker.add(this.player.move.bind(this.player));
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

export default GameScene;
