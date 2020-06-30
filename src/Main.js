import * as PIXI from "pixi.js";
import sound from "pixi-sound";
import Settings from "./scripts/Settings";
import CollisionDispatcher from "./scripts/CollisionDispatcher";
import SceneManager from "./scripts/SceneManager";
import GameScene from "./scripts/scenes/GameScene";
import Bullet from "./scripts/data/Bullet";
import Explosion from "./scripts/data/Explosion";

function Main() {
  const canvas = document.getElementById("game-canvas");
  canvas.width = Settings.CANVAS_WIDTH;
  canvas.height = Settings.CANVAS_HEIGHT;

  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    Settings.CANVAS_WIDTH,
    Settings.CANVAS_HEIGHT,
    {
      view: canvas,
    }
  );

  this.collisionDispatcher = new CollisionDispatcher();

  this.loadResources().then(() => {
    this.sceneManager = new SceneManager();
    this.stage.addChild(this.sceneManager);

    ticker.start();
    ticker.add(this.update, this);
  });

  this.attachEventListeners();
}

Main.prototype.update = function (delta) {
  if (this.sceneManager.activeScene instanceof GameScene) {
    this.gameScene = this.sceneManager.activeScene;

    const bullets = this.gameScene.children.filter((e) => e instanceof Bullet);

    this.collisionDispatcher.checkforHitPlayer(
      this.gameScene.player,
      bullets.filter((b) => !b.isPlayerBullet)
    );

    this.collisionDispatcher.checkInvadersWalkUponPlayer(
      this.gameScene.player,
      this.gameScene.invaders
    );

    const healthBar = this.gameScene.statistics.healthBar;
    if (healthBar) {
      healthBar.update(this.gameScene.player.alpha);
    }

    const invaderShooters = this.gameScene.invaders.getShooters();
    this.collisionDispatcher.checkforHitAlien(
      bullets.filter((b) => b.isPlayerBullet),
      invaderShooters
    );

    bullets
      .filter((bullet) => bullet.isDestroyed)
      .forEach((bullet) => bullet.parent.removeChild(bullet));

    invaderShooters
      .filter((alien) => alien.isDestroyed)
      .forEach((alien) => {
        this.gameScene.player.score +=
          Settings.PLAYER_POINTS_ADDED_FOR_KILLED_ALIEN;
        alien.parent.deleteAlien(alien);
        // COMMENT: May be dispatch event 'explode' here??
        new Explosion(
          this.gameScene,
          alien.x + this.gameScene.invaders.x,
          alien.y + this.gameScene.invaders.y
        );
        PIXI.sound.play("explode");
        this.gameScene.statistics.scoreBar.update(this.gameScene.player.score);
      });

    if (this.gameScene.player.health <= 0) {
      this.setGameOver({ message: "Invaders won!" });
    } else if (!this.gameScene.invaders.children.length) {
      this.setGameOver({ message: "Player won!" });
    }
  }

  this.renderer.render(this.stage);
};

Main.prototype.loadResources = function () {
  return new Promise((resolve, reject) => {
    PIXI.loader
      .add("icons", Settings.SPRITESHEET)
      .add("sound", Settings.SPRITESHEET_SOUND)
      .add("explosion", Settings.EXPLOSION_SPRITE)
      .add("enter", Settings.SOUND_GAME_ENTER)
      .add("shoot", Settings.SOUND_BULLET_FIRE)
      .add("explode", Settings.SOUND_EXPLOSION)
      .load(resolve);
  });
};

Main.prototype.setGameOver = function (params) {
  document.dispatchEvent(
    new CustomEvent(Settings.EVENT_ACTIVATE_SCENE, {
      detail: {
        screen: "gameOver",
        options: {
          ...params,
          score: this.gameScene.player.score,
        },
      },
    })
  );
};

Main.prototype.attachEventListeners = function () {
  document.addEventListener("fire", (e) => {
    e.detail.bullet.fire(e.detail.toY);
    PIXI.sound.play("shoot");
  });
};

window.onload = function () {
  window.ticker = new PIXI.ticker.Ticker();

  const main = new Main();
};
