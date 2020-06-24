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

  this.loadResources();
  this.displayWelcomeScene();

  ticker.start();
  ticker.add(this.update, this);

  this.attachEventListeners();
}

Main.prototype.update = function (delta) {
  if (this.gameScene && this.gameScene.isLoaded) {
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
        new Explosion(
          this.gameScene,
          alien.x + this.gameScene.invaders.x,
          alien.y + this.gameScene.invaders.y
        );
        this.gameScene.statistics.scoreBar.update(this.gameScene.player.score);
      });

    if (this.gameScene.player.health <= 0) {
      this.setGameOver({ message: "Invaders won!" });
    } else if (!invaderShooters.length) {
      this.setGameOver({ message: "Player won!" });
    }
  }

  this.renderer.render(this.stage);
};

Main.prototype.loadResources = function () {
  PIXI.loader
    .add("icons", Settings.SPRITESHEET)
    .add("explosion", Settings.EXPLOSION_SPRITE)
    .load(this.onAssetsLoaded.bind(this));
};

Main.prototype.onAssetsLoaded = function (loader, resources) {
  // temp here. Put to skip Welcome screen
  // this.displayGameScene();
};

Main.prototype.displayWelcomeScene = function () {
  this.welcomeScene = new WelcomeScene(this.stage);
};

Main.prototype.displayGameScene = function () {
  this.gameScene = new GameScene(this.stage);
  this.welcomeScene.visible = false;
  if (this.gameOverScene) this.gameOverScene.visible = false;
};

Main.prototype.displayGameOverScene = function (params) {
  this.gameOverScene = new GameOverScene(this.stage, params);
  this.gameScene.visible = false;
};

Main.prototype.setGameOver = function (params) {
  this.gameScene.isLoaded = false;
  this.gameScene.invaders.removeAliensGrid();
  this.gameScene.player.stopListen();

  this.displayGameOverScene({
    ...params,
    score: this.gameScene.player.score,
  });
};

Main.prototype.attachEventListeners = function () {
  document.addEventListener("start-click", () => {
    this.displayGameScene();
  });

  document.addEventListener("fire", (e) => {
    this.fireBullet(e.detail.bullet, e.detail.toY);
  });
};

Main.prototype.fireBullet = function (bullet, toY) {
  const tm = TweenMax.to(bullet, 1, {
    y: toY,
    ease: Power0.easeNone,
    onUpdate: () => {
      if (bullet.isDestroyed) {
        tm.kill();
      }
    },
  });
};
