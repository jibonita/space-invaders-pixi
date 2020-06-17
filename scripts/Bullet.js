function Bullet(stage) {
    const texture = PIXI.utils.TextureCache["bullet.png"];
    PIXI.Sprite.call(this, texture);
    stage.addChild(this);

    this.setInitialPlayerPosition();
}

Bullet.prototype = Object.create(PIXI.Sprite.prototype);

Bullet.prototype.setInitialPlayerPosition = function () {
    // this.height = 35;
    // this.width = 30;
    this.scale.set(0.5);

    // this.position.x =
    //   (this.parent.player.width - this.width) / 2 + this.parent.player.x;
    // this.position.y =
    //   Settings.CANVAS_HEIGHT - this.parent.player.height - this.height - 5;
    this.vx = 0;
};
