import * as PIXI from "pixi.js";
import TweenMax from "gsap";
import Settings from "../Settings";
import Util from "../utils/Util";
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
  const child = this.removeAlienFromGrid(hitItem);

  // TODO:: put the code below in this.updateShootersAndBounds()
  const aliensAboveHit = this.aliens.filter((elem) => elem.x === child.x);
  if (aliensAboveHit.length) {
    aliensAboveHit[0].canShoot = true;
  } else {
    this.updateGridBounds(child);
  }
};

AliensFactory.prototype.shoot = function (alien) {
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
    const alienShooter = shooters[Util.randomInt(0, shooters.length - 1)];
    this.shoot(alienShooter);
  }
};

AliensFactory.prototype.unsubscribeShooting = function () {
  ticker.remove(this.applyShot, this);
};

AliensFactory.prototype.assignInitialShooters = function () {
  for (let i = 0; i < this.itemsPerRow; i++) {
    this.aliens[i].canShoot = true;
  }
};

AliensFactory.prototype.getShooters = function () {
  const shooters = this.aliens.filter((a) => a.canShoot);
  return shooters;
};

AliensFactory.prototype.destroy = function () {
  this.removeAliensGrid();
  this.parent.removeChild(this);
};

AliensFactory.prototype.updateGridBounds = function (removedColumn) {
  const direction = +this.gridMove.data.dir;
  if (Util.isFirstColumn.call(this, removedColumn) && direction === Settings.DIR_LEFT) {
    const left = Settings.ALIENS_INITIAL_X_POSITION - this.mostLeftX();
    this.gridMove = this.calculateSpeed(left, direction);
  }

  if (Util.isLastColumn.call(this, removedColumn) && direction === Settings.DIR_RIGHT) {
    const right =
      Settings.CANVAS_WIDTH - Settings.ALIENS_INITIAL_X_POSITION - this.width + this.mostLeftX();
    this.gridMove = this.calculateSpeed(right, direction);
  }
};

AliensFactory.prototype.moveAliensGrid = function () {
  const initialGridTrayectoryLength =
    Settings.CANVAS_WIDTH -
    Settings.ALIENS_LEFT_RIGHT_MARGIN -
    this.width -
    Settings.ALIENS_INITIAL_X_POSITION;
  this.initialGridSpeed = initialGridTrayectoryLength / Settings.ALIENS_INITIAL_GRID_MOVE_TIME;

  return this.moveAliensGridRec(
    Settings.CANVAS_WIDTH - this.width - Settings.ALIENS_INITIAL_X_POSITION,
    Settings.DIR_RIGHT,
    Settings.ALIENS_INITIAL_GRID_MOVE_TIME
  );
};

AliensFactory.prototype.moveAliensGridRec = function (toX, dir, duration) {
  return TweenMax.to(this, duration, {
    x: toX,
    // y: "+=5",
    data: { dir },
    ease: Power0.easeNone,
    onComplete: () => {
      this.y += 5;

      toX = !dir
        ? Settings.ALIENS_INITIAL_X_POSITION - this.mostLeftX()
        : Settings.CANVAS_WIDTH - this.width - Settings.ALIENS_INITIAL_X_POSITION;

      const path = Math.abs(this.x - toX);
      duration = path / this.initialGridSpeed;

      this.gridMove = this.moveAliensGridRec(toX, !dir, duration);
    },
  });
};

AliensFactory.prototype.mostLeftX = function () {
  return this.topLeftAlien() ? this.topLeftAlien().x : 0;
};

AliensFactory.prototype.topLeftAlien = function () {
  return this.aliens[this.aliens.length - 1];
};

AliensFactory.prototype.addDummyLeftBoundSprite = function () {
  this.leftpad = new PIXI.Sprite(PIXI.utils.TextureCache[Settings.DUMMY_BLACK_SPRITE]);
  this.leftpad.width = 25;
  this.leftpad.x = 0;
  this.addChild(this.leftpad);
};

AliensFactory.prototype.removeAlienFromGrid = function (hitItem) {
  const child = isNaN(hitItem) ? hitItem : this.aliens[hitItem];
  this.aliens = this.aliens.filter((alien) => {
    return alien.x !== child.x || alien.y !== child.y;
  });
  this.removeChild(child);

  return child;
};

AliensFactory.prototype.calculateSpeed = function (value, direction) {
  const animation = this.gridMove;

  const curToX = animation.vars.x;
  const addnlS = Math.abs(value - curToX);

  const curS = Math.abs(animation._firstPT.c);
  const passedS = animation.progress() * curS;

  const timeLeft = (curS - passedS + addnlS) / this.initialGridSpeed;

  animation.kill();
  return this.moveAliensGridRec(value, direction, timeLeft);
};

export default AliensFactory;
