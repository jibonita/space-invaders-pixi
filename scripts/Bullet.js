function Bullet(stage) {
    const texture = PIXI.utils.TextureCache["bullet.png"];
    const figure = PIXI.Sprite.call(this, texture);
    stage.addChild(figure);
}

Bullet.prototype = Object.create(PIXI.Sprite.prototype);
