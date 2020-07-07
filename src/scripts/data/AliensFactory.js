import * as PIXI from "pixi.js";
import TweenMax from "gsap";
import Settings from "../Settings";
import Alien from "./Alien";
import Bullet from "./Bullet";

function AliensFactory(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.itemsPerRow = Settings.ALIENS_GRID_ITEMS_PER_ROW;
  this.itemRows = Settings.ALIENS_GRID_ROWS;

  this.initAliensGrid();
}

AliensFactory.prototype = Object.create(PIXI.Container.prototype);

AliensFactory.prototype.initAliensGrid = function () {
  this.setInitialState();

  this.fillAliens();
};

AliensFactory.prototype.initMove = function () {
  this.establichShooters();

  this.gridMove = this.moveAliensGrid();

  // temp code
  drawMovementAreaBorders.call(this);
};

AliensFactory.prototype.setInitialState = function () {
  this.y = Settings.ALIENS_INITIAL_Y_POSITION;
  this.aliens = [];
};

AliensFactory.prototype.fillAliens = function () {
  this.addDummyLeftBoundSprite();

  const total = this.itemsPerRow * this.itemRows;

  for (let i = 0; i < total; i++) {
    const alien = this.createAlien(
      total - 1 - i,
      1 + (Math.floor(i / this.itemsPerRow) % Settings.ALIEN_AVAILABLE_PATTERNS)
    );
    this.addChild(alien);
    this.aliens.push(alien);
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

AliensFactory.prototype.moveAliensGrid = function () {
  //  return null;
  const tm = TweenMax.to(this, 5, {
    x: Settings.CANVAS_WIDTH - this.width - Settings.ALIENS_INITIAL_X_POSITION,
    ease: Power0.easeNone,
    yoyoEase: true,
    onRepeat: () => {
      // this.y += 5;
    },
  }).repeat(-1);

  return tm;
};

AliensFactory.prototype.removeAliensGrid = function () {
  if (this.gridMove) {
    this.gridMove.kill();
    this.unsubscribeShooting();
    for (let i = this.children.length - 1; i > -1; i--) {
      this.removeChild(this.children[i]);
    }
  }
};

AliensFactory.prototype.deleteAlien = function (hitItem) {
  this.leftpad.width = this.mostLeftX();

  // TODO::
  // this.removeAlien()
  // this.updateShooters()

  // const child = isNaN(hitItem) ? hitItem : this.getChildAt(hitItem);
  const child = isNaN(hitItem) ? hitItem : this.aliens[hitItem];
  this.aliens = this.aliens.filter((alien) => {
    return alien.x !== child.x || alien.y !== child.y;
  });
  this.removeChild(child);

  // const aliensAboveHit = this.children.filter((elem) => elem.x === child.x);
  const aliensAboveHit = this.aliens.filter((elem) => elem.x === child.x);
  if (aliensAboveHit.length) {
    aliensAboveHit[0].canShoot = true;
  } else {
    this.updateGridBounds(child);
  }
};

AliensFactory.prototype.shoot = function (alien) {
  // if (this.children.length) {
  if (this.aliens.length) {
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
    // this.shoot(alienShooter);
  }
};

AliensFactory.prototype.unsubscribeShooting = function () {
  ticker.remove(this.applyShot, this);
};

AliensFactory.prototype.assignInitialShooters = function () {
  for (let i = 0; i < this.itemsPerRow; i++) {
    // this.children[i].canShoot = true;
    this.aliens[i].canShoot = true;
  }
};

AliensFactory.prototype.getShooters = function () {
  const shooters = this.aliens.filter((a) => a.canShoot);
  // const shooters = this.children.filter((a) => a.canShoot);
  return shooters;
};

AliensFactory.prototype.destroy = function () {
  this.removeAliensGrid();
  this.parent.removeChild(this);
};

AliensFactory.prototype.updateGridBounds = function (removedColumn) {
  this.leftpad.width = this.mostLeftX();

  const left = Settings.ALIENS_INITIAL_X_POSITION - this.mostLeftX();
  const right =
    Settings.CANVAS_WIDTH - Settings.ALIENS_INITIAL_X_POSITION - this.width + this.mostLeftX();

  if (this.gridMove) {
    updateFromTo.call(this.gridMove, { xFrom: left, x: right - this.mostLeftX() });
  }
};

AliensFactory.prototype.mostLeftX = function () {
  return this.topLeftAlien() ? this.topLeftAlien().x : 0;
};

AliensFactory.prototype.topLeftAlien = function () {
  return this.aliens[this.aliens.length - 1];
  // return this.children[this.children.length - 1];
};

AliensFactory.prototype.addDummyLeftBoundSprite = function () {
  this.leftpad = new PIXI.Sprite(PIXI.utils.TextureCache[`alien0.png`]);
  this.leftpad.width = 0;
  this.leftpad.x = 0;
  this.addChild(this.leftpad);
};

// ----- helpers
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isFirstColumn(node) {
  return node.x < this.mostLeftX();
}

function drawMovementAreaBorders() {
  const graphic = new PIXI.Graphics();

  graphic.lineStyle(2, Settings.BUTTON_GREEN_LINE, 1);
  graphic.drawRect(
    Settings.ALIENS_INITIAL_X_POSITION,
    Settings.ALIENS_INITIAL_Y_POSITION,
    Settings.CANVAS_WIDTH - 2 * Settings.ALIENS_INITIAL_X_POSITION,
    this.height * 2
  );
  graphic.endFill();

  this.parent.addChild(graphic);
}

function updateFromTo(vars) {
  var self = this,
    curRatio = self.ratio,
    p;
  for (p in vars) {
    self.vars[p] = vars[p];
  }
  console.log("ratio:", curRatio, ", _time=", self._time, ", x=", self.vars.x);

  var inv = 1 / (1 - curRatio);
  var pt = self._firstPT;

  let before = { ...pt };
  let after = pt;
  console.log("s:", pt.s, ", c: ", pt.c);
  while (pt) {
    if (vars.x) {
      pt.c = vars.x - vars.xFrom;
    }
    if (vars.xFrom) {
      pt.s = vars.xFrom;
    }
    after = pt;
    console.log("After// s:", pt.s, ", c: ", pt.c);
    pt = pt._next;
  }

  const pointX = curRatio * before.c - before.s;
  console.log("before.c / self.duration : ", before.c, self.duration());
  const oldSpeed = before.c / self.duration();
  console.log("oldTime:", self.time());
  console.log("after.c / oldSpeed; = ", after.c, oldSpeed);
  const newDuration = after.c / oldSpeed;
  console.log("newDur: ", newDuration);

  // self.duration(newDuration);

  // console.log(self);
  // console.log("time: ", self.time());
  // console.log("progress: ", self.progress());

  //self.kill();
  return self;
}

export default AliensFactory;
