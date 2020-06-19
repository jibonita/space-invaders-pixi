function AliensFactory(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.itemsPerRow = 5;
  this.itemRows = 5;

  this.initAliensGrid();
}

AliensFactory.prototype = Object.create(PIXI.Container.prototype);

AliensFactory.prototype.initAliensGrid = function () {
  this.fillAliens();

  this.establichShooters();

  this.setInitialPlayerPosition();

  this.moveAliensGrid();

  //   setTimeout(() => {
  //     //   this.deleteAlien(3);
  //     this.shoot(this.children[2]);
  //     setTimeout(() => {
  //       this.shoot(this.children[2]);
  //     }, 4000);
  //   }, 4000);
};

AliensFactory.prototype.fillAliens = function () {
  const total = this.itemsPerRow * this.itemRows;

  for (let i = 0; i < total; i++) {
    const alien = this.createAlien(
      total - 1 - i,
      1 + Math.floor(i / this.itemsPerRow)
    );
    this.addChild(alien);
  }
};

AliensFactory.prototype.createAlien = function (i, iconIndex) {
  const alien = new Alien(this, iconIndex);

  alien.x = (i % this.itemsPerRow) * (alien.width + Settings.ALIEN_H_MARGIN);
  alien.y = Math.floor(i / this.itemsPerRow) * Settings.ALIEN_VERTICAL_MARGIN;

  return alien;
};

AliensFactory.prototype.setInitialPlayerPosition = function () {
  this.x = Settings.ALIENS_INITIAL_X_POSITION;
  this.y = Settings.ALIENS_INITIAL_Y_POSITION;
};

AliensFactory.prototype.moveAliensGrid = function () {
  const tm = TweenMax.to(this, 3, {
    x: Settings.CANVAS_WIDTH - this.width - Settings.ALIENS_INITIAL_X_POSITION,
    ease: Power0.easeNone,
    yoyoEase: true,
    onRepeat: () => {
      this.y += 10;
    },
    onUpdate: () => {
      if (checkCollision(this, this.parent.player)) {
        this.visible = false;
        this.unsubscribeShooting();
        tm.kill();
      }
    },
  }).repeat(-1);

  return tm;
};

AliensFactory.prototype.deleteAlien = function (hitItem) {
  const child = isNaN(hitItem) ? hitItem : this.getChildAt(hitItem);
  this.removeChild(child);

  const aliensAboveHit = this.children.filter((elem) => elem.x === child.x);
  if (aliensAboveHit.length) {
    aliensAboveHit[0].canShoot = true;
  }
  this.getShooters();
};

AliensFactory.prototype.shoot = function (alien) {
  if (this.children.length) {
    this.fireBullet(this.createBullet(alien));
  } else {
    this.unsubscribeShooting();
  }
};

AliensFactory.prototype.createBullet = function (alien) {
  const bullet = new Bullet(this.parent);
  bullet.position.x = this.x + alien.x + (alien.width - bullet.width) / 2;
  bullet.position.y = this.y + alien.y + alien.height - 5;
  bullet.anchor.set(1);
  bullet.rotation = Math.PI;
  return bullet;
};

AliensFactory.prototype.fireBullet = function (bullet) {
  const tm = TweenMax.to(bullet, 1, {
    y: Settings.CANVAS_HEIGHT,
    ease: Power0.easeNone,
    onUpdate: () => {
      if (checkCollision(tm.target, this.parent.player)) {
        console.log("Boom player ");
        this.parent.player.alpha -= 0.1;
        if (!this.parent.player.alpha) {
          console.log("Game Over. Invaders win");
        }
        this.parent.removeChild(tm.target);
        tm.kill();
      }
    },
    onComplete: () => {
      this.removeChild(tm.target);
      console.log("Bullet finished trajectory");
    },
  });
};

AliensFactory.prototype.establichShooters = function () {
  this.assignInitialShooters();

  this.subscribeShooting();
};

AliensFactory.prototype.subscribeShooting = function () {
  ticker.framesCount = 0;

  ticker.add(this.applyShot, this);
};

AliensFactory.prototype.applyShot = function (delta) {
  ticker.framesCount++;

  if (ticker.framesCount % Settings.ALIEN_SHOOT_FRAMES == 0) {
    const shooters = this.getShooters();
    const alienShooter = shooters[randomInt(0, shooters.length - 1)];
    this.shoot(alienShooter);
  }
};

AliensFactory.prototype.unsubscribeShooting = function () {
  ticker.remove(this.applyShot, this);
  // TODO: Pass some flag so that the screen changes

  console.log("Game Over");
};

AliensFactory.prototype.assignInitialShooters = function () {
  for (let i = 0; i < this.itemsPerRow; i++) {
    this.children[i].canShoot = true;
  }
};

AliensFactory.prototype.getShooters = function () {
  const shooters = this.children.filter((a) => a.canShoot);
  // console.log(...shooters.map((a) => a.imageName()));
  return shooters;
};

// ----- helpers
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
