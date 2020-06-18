function AliensFactory(stage) {
    PIXI.Container.call(this);
    stage.addChild(this);

    this.fillAliens();
}

AliensFactory.prototype = Object.create(PIXI.Container.prototype);

AliensFactory.prototype.fillAliens = function () {
    //const alien = new Alien(this, 1);
    const itemsPerRow = 5;

    for (let i = 0; i < 25; i++) {
        const alien = new Alien(this, 1 + Math.floor(i / itemsPerRow));
        // const alien = new Alien(this, randomInt(1, 7));
        alien.x = (i % itemsPerRow) * (alien.width + Settings.ALIEN_MARGIN);
        alien.y = Math.floor(i / itemsPerRow) * 50;
        this.addChild(alien);
    }

    setTimeout(() => {
        const child = this.getChildAt(9);
        const p = this.removeChild(child);

        console.log(p);
    }, 2000);

    // const tm = TweenMax.fromTo(
    //   this,
    //   3,
    //   { x: 50 },
    //   {
    //     x: Settings.CANVAS_WIDTH - this.width - 50,
    //     ease: Power0.easeNone,
    //     yoyoEase: true,
    //   }
    // ).repeat(-1);
};

AliensFactory.prototype.deleteAliensLine = function () { };
AliensFactory.prototype.addAliensLine = function () { };
// ----- helpers
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
