function AliensFactory(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.itemsPerRow = 5;
  this.itemRows = 5;

  this.initAliensGrid();
}

AliensFactory.prototype = Object.create(PIXI.Container.prototype);

AliensFactory.prototype.initAliensGrid = function () {
  this.setInitialState();

  this.fillAliens();

  this.establichShooters();

  this.gridMove = this.moveAliensGrid();
};

AliensFactory.prototype.fillAliens = function () {
  const total = this.itemsPerRow * this.itemRows;

  for (let i = 0; i < total; i++) {
    const alien = this.createAlien(
      total - 1 - i,
      1 + (Math.floor(i / this.itemsPerRow) % Settings.ALIEN_AVAILABLE_PATTERNS)
    );
    this.addChild(alien);
  }
};

AliensFactory.prototype.establichShooters = function () {
  this.assignInitialShooters();

  this.subscribeShooting();
};

AliensFactory.prototype.createAlien = function (i, iconIndex) {
  const alien = new Alien(this, iconIndex);

  alien.x = (i % this.itemsPerRow) * (alien.width + Settings.ALIEN_H_MARGIN);
  alien.y = Math.floor(i / this.itemsPerRow) * Settings.ALIEN_VERTICAL_MARGIN;

  return alien;
};

AliensFactory.prototype.setInitialState = function () {
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
  }).repeat(-1);

  return tm;
};

AliensFactory.prototype.removeAliensGrid = function () {
  this.gridMove.kill();
  this.unsubscribeShooting();
  for (let i = this.children.length - 1; i > -1; i--) {
    this.removeChild(this.children[i]);
  }
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
  document.dispatchEvent(
    new CustomEvent("fire", { detail: { bullet, toY: Settings.CANVAS_HEIGHT } })
  );

  // const tm = TweenMax.to(bullet, 1, {
  //   y: Settings.CANVAS_HEIGHT,
  //   onUpdate: () => {
  //     if (bullet.isDestroyed) {
  //       tm.kill();
  //     }
  //   },
  // });
};

AliensFactory.prototype.subscribeShooting = function () {
  ticker.framesCount = 0;

  ticker.add(this.applyShot, this);
};

AliensFactory.prototype.applyShot = function (delta) {
  ticker.framesCount++;

  if (ticker.framesCount % Settings.ALIEN_SHOOT_EACH_X_FRAMES == 0) {
    const shooters = this.getShooters();
    const alienShooter = shooters[randomInt(0, shooters.length - 1)];
    this.shoot(alienShooter);
  }
};

AliensFactory.prototype.unsubscribeShooting = function () {
  ticker.remove(this.applyShot, this);
};

AliensFactory.prototype.assignInitialShooters = function () {
  for (let i = 0; i < this.itemsPerRow; i++) {
    this.children[i].canShoot = true;
  }
};

AliensFactory.prototype.getShooters = function () {
  const shooters = this.children.filter((a) => a.canShoot);
  return shooters;
};

// ----- helpers
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
