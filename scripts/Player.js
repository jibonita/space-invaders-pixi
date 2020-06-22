function Player(stage) {
  const texture = PIXI.utils.TextureCache["player.png"];
  PIXI.Sprite.call(this, texture);
  stage.addChild(this);

  this.health = Settings.PLAYER_INITIAL_HEALTH;

  this.setInitialPlayerPosition();

  this.listen();
}

Player.prototype = Object.create(PIXI.Sprite.prototype);

Player.prototype.setInitialPlayerPosition = function () {
  this.height = 50;
  this.width = 50;
  this.position.x = 0;
  this.position.y = Settings.CANVAS_HEIGHT - this.height - 5;
  this.vx = 0;
};

Player.prototype.listen = function () {
  let left = keyboard("ArrowLeft");
  left.press = () => {
    this.vx = -Settings.PLAYER_SPEED;
  };
  left.release = () => {
    this.vx = 0;
  };

  let right = keyboard("ArrowRight");
  right.press = () => {
    this.vx = Settings.PLAYER_SPEED;
  };
  right.release = () => {
    this.vx = 0;
  };

  let space = keyboard(" ");

  space.press = () => {
    // console.log("Bullet fired");

    this.fireBullet(this.createBullet());
  };
};

Player.prototype.createBullet = function (alien) {
  //this.x = 306.79999999999984;

  const bullet = new Bullet(this.parent);
  bullet.position.x = (this.width - bullet.width) / 2 + this.x;
  bullet.position.y = Settings.CANVAS_HEIGHT - this.height - bullet.height - 5;
  bullet.isPlayerBullet = true;

  return bullet;
};

Player.prototype.fireBullet = function (bullet) {
  const tm = TweenMax.to(bullet, 1, {
    y: -bullet.height,
    onUpdate: () => {
      // const aliensToKill = this.parent.invaders.getShooters();
      // aliensToKill.some((alien) => {
      //   const isCollision = checkCollision(bullet, {
      //     x: alien.x + this.parent.invaders.x,
      //     y: alien.y + this.parent.invaders.y,
      //     width: alien.width,
      //     height: alien.height,
      //   });
      //   if (isCollision) {
      //     console.log(bullet.parent);
      //     bullet.parent.removeChild(bullet);
      //     this.parent.invaders.deleteAlien(alien);
      //     tm.kill();
      //   }
      //   return isCollision;
      // });
      if (bullet.isDestroyed) {
        tm.kill();
      }
    },
    onComplete: () => {
      //bullet.parent.removeChild(bullet);
      //   console.log("Player bullet finished trajectory");
      //   console.log(tm.target.x);
      //   console.log("Player at x = ", this.x);
    },
  });
};

Player.prototype.updateHealth = function (cost) {
  this.health += cost;
  //** player alpha formula works in case player max life point are the initial ones
  this.alpha = this.health / Settings.PLAYER_INITIAL_HEALTH;
};
