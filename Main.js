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

  this.loadSpriteSheet();
  this.displayWelcomeScene();

  ticker.start();
  ticker.add(this.update, this);
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

    if (this.gameScene.player.health <= 0) {
      this.setGameOver();
      // this.gameScene.isLoaded = false;
      // this.gameScene.invaders.removeAliensGrid();
      // console.log("Game Over. Invaders win");

      // this.displayGameOverScene();
    }

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
      });

    this.gameScene.statistics.scoreBar.update(this.gameScene.player.score);
  }

  this.renderer.render(this.stage);
};

Main.prototype.loadSpriteSheet = function () {
  PIXI.loader
    .add("icons", Settings.SPRITESHEET)
    .add("explosion", Settings.EXPLOSION_SPRITE)
    .load(this.onAssetsLoaded.bind(this));
};

Main.prototype.onAssetsLoaded = function (loader, resources) {
  // temp here. Put to skip Welcome screen
  //this.displayGameScene();
};

Main.prototype.displayWelcomeScene = function () {
  this.welcomeScene = new WelcomeScene(this.stage);
  document.addEventListener("start-click", () => {
    this.displayGameScene();
  });
};

Main.prototype.displayGameScene = function () {
  this.gameScene = new GameScene(this.stage);
  this.welcomeScene.visible = false;
  if (this.gameOverScene) this.gameOverScene.visible = false;
};

Main.prototype.displayGameOverScene = function () {
  this.gameOverScene = new GameOverScene(this.stage);
  this.gameScene.visible = false;
};

Main.prototype.setGameOver = function () {
  this.gameScene.isLoaded = false;
  this.gameScene.invaders.removeAliensGrid();
  this.gameScene.player.stopListen();
  console.log("Game Over. Invaders win");

  this.displayGameOverScene();
};
