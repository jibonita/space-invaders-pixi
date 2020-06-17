function Player(stage) {
    const texture = PIXI.utils.TextureCache["player.png"];
    const figure = PIXI.Sprite.call(this, texture);
    //   stage.addChild(figure);
    stage.addChild(this);

    this.setInitialPlayerPosition(figure);

    this.listen();
}

Player.prototype = Object.create(PIXI.Sprite.prototype);

Player.prototype.setInitialPlayerPosition = (spriteFigure) => {
    spriteFigure.height = 50;
    spriteFigure.width = 50;
    spriteFigure.position.x = 0;
    spriteFigure.position.y = Settings.CANVAS_HEIGHT - spriteFigure.height - 5;
    spriteFigure.vx = 0;
};

Player.prototype.listen = function () {
    let left = keyboard("ArrowLeft"),
        right = keyboard("ArrowRight"),
        space = keyboard("Space");

    left.press = () => {
        this.x -= 5;
        this.vx = -Settings.PLAYER_SPEED;
    };
    right.press = () => {
        this.x += 5;
        this.vx = Settings.PLAYER_SPEED;
    };
    space.press = () => {
        console.log("Bullet fired");
        //new Bullet();
    };

    left.release = () => {
        this.vx = 0;
    };
    right.release = () => {
        this.vx = 0;
    };
};
