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
  drawHorizontalBorders.call(this);
};

AliensFactory.prototype.setInitialState = function () {
  this.y = Settings.ALIENS_INITIAL_Y_POSITION;
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

  // this.subscribeShooting();
};

AliensFactory.prototype.createAlien = function (i, iconIndex) {
  const alien = new Alien(this, iconIndex);

  alien.x = (i % this.itemsPerRow) * (alien.width + Settings.ALIEN_H_MARGIN);
  alien.y = Math.floor(i / this.itemsPerRow) * Settings.ALIEN_VERTICAL_MARGIN;

  return alien;
};

AliensFactory.prototype.moveAliensGrid = function () {
  // return null;
  const tm = TweenMax.to(this, 10, {
    x: Settings.CANVAS_WIDTH - this.width - Settings.ALIENS_INITIAL_X_POSITION,
    ease: Power0.easeNone,
    yoyoEase: true,
    onRepeat: () => {
      //this.y += 5;
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
  const child = isNaN(hitItem) ? hitItem : this.getChildAt(hitItem);
  this.removeChild(child);

  const aliensAboveHit = this.children.filter((elem) => elem.x === child.x);
  if (aliensAboveHit.length) {
    aliensAboveHit[0].canShoot = true;
  } else {
    if (isFirstColumn(child)) {
      //this.gridMove.kill();
      this.shiftLeftAlienGrid();
    }

    if (this.gridMove) {
      updateFromTo.call(this.gridMove, {
        x: Settings.CANVAS_WIDTH - this.width - Settings.ALIENS_INITIAL_X_POSITION * 2,
      });
      // this.gridMove.updateFromTo({
      //   x: Settings.CANVAS_WIDTH - this.width - Settings.ALIENS_INITIAL_X_POSITION * 2,
      // });
    }
  }
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

AliensFactory.prototype.destroy = function () {
  this.removeAliensGrid();
  this.parent.removeChild(this);
};

// ----- helpers
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isFirstColumn(node) {
  return node.x === 0;
}

function drawHorizontalBorders() {
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

AliensFactory.prototype.shiftLeftAlienGrid = function () {
  if (!this.children.length) {
    return;
  }

  while (this.topLeftAlien().x !== 0) {
    const mostLeftAlienX = this.topLeftAlien().x;
    console.log(this.x);
    // this.x -= mostLeftAlienX - 5;

    this.children.map((c) => {
      if (c instanceof Alien) {
        c.x -= c.width + Settings.ALIEN_H_MARGIN;
      }
    });
  }
  this.calculateBounds(); // does this do something??
};

AliensFactory.prototype.topLeftAlien = function () {
  return this.children[this.children.length - 1];
};

export default AliensFactory;

// TweenMax.prototype.updateFromTo = function (vars) {
function updateFromTo(vars) {
  var self = this,
    p;
  for (p in vars) {
    self.vars[p] = vars[p];
  }

  var pt = self._firstPT;
  while (pt) {
    pt.c = vars.x;
    pt.s = Settings.ALIENS_INITIAL_X_POSITION;
    pt = pt._next;
  }
  return self;
}
