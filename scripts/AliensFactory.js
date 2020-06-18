function AliensFactory(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.itemsPerRow = 5;
  this.itemRows = 5;
  this.activeLineColorIndex = 0;

  this.fillAliens();
}

AliensFactory.prototype = Object.create(PIXI.Container.prototype);

AliensFactory.prototype.fillAliens = function () {
  const total = this.itemsPerRow * this.itemRows;

  for (let i = 0; i < total; i++) {
    const alien = this.createAlien(
      total - 1 - i,
      1 + Math.floor(i / this.itemsPerRow)
    );
    this.addChild(alien);
  }
  this.activeLineColorIndex = this.itemRows + 1;
  //console.clear();

  for (let i = 0; i < this.itemsPerRow; i++) {
    this.children[i].canShoot = true;
  }
  const shooters = this.children.filter((a) => a.canShoot);
  console.log(shooters);

  //   setTimeout(() => {
  //     this.addAliensLine();
  //     setTimeout(() => {
  //       this.addAliensLine();
  //       setTimeout(() => {
  //         this.addAliensLine();
  //         setTimeout(() => {
  //           this.addAliensLine();
  //           setTimeout(() => {
  //             this.addAliensLine();
  //             setTimeout(() => {
  //               this.addAliensLine();
  //               setTimeout(() => {
  //                 this.addAliensLine();
  //                 // for (let i = 0; i < 5; i++) {
  //                 //   this.removeChildAt(0);
  //                 // }
  //                 // console.log(this.getBounds());
  //               }, 2000);
  //             }, 2000);
  //           }, 2000);
  //         }, 2000);
  //       }, 2000);
  //     }, 2000);
  //   }, 2000);

  //   const tm = TweenMax.fromTo(
  //     this,
  //     3,
  //     { x: 50 },
  //     {
  //       x: Settings.CANVAS_WIDTH - this.width - 50,
  //       ease: Power0.easeNone,
  //       yoyoEase: true,
  //     }
  //   ).repeat(-1);
};

AliensFactory.prototype.createAlien = function (i, iconIndex) {
  const alien = new Alien(this, iconIndex);

  alien.x = (i % this.itemsPerRow) * (alien.width + Settings.ALIEN_H_MARGIN);
  alien.y = Math.floor(i / this.itemsPerRow) * Settings.ALIEN_VERTICAL_MARGIN;

  //console.log(...alien.texture.textureCacheIds, [alien.x, alien.y]);

  return alien;
};

AliensFactory.prototype.addAliensLine = function () {
  TweenMax.staggerTo(this.children, 0.5, {
    y: `+=${Settings.ALIEN_VERTICAL_MARGIN}`,
    onCompleteAll: () => {},
  });

  for (let i = 0; i < this.itemsPerRow; i++) {
    const alien = this.createAlien(i, 1 + this.activeLineColorIndex);
    this.addChild(alien);
  }

  this.updateActiveLineColorIndex();
};

AliensFactory.prototype.deleteAlien = function () {};

AliensFactory.prototype.updateActiveLineColorIndex = function () {
  this.activeLineColorIndex =
    (this.activeLineColorIndex + 1) % Settings.AVAILABLE_ALIEN_PATTERNS;
};

// ----- helpers
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
