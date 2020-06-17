function Player(stage) {
    const texture = PIXI.utils.TextureCache["player.png"];
    PIXI.Sprite.call(this, texture);
    stage.addChild(this);

    this.setInitialPlayerPosition();

    this.listen();
}

Player.prototype = Object.create(PIXI.Sprite.prototype);

Player.prototype.setInitialPlayerPosition = function () {
    this.height = 50;
    this.width = 50;
    this.position.x = 0;
    this.position.y = Settings.CANVAS_HEIGHT - this.height - 5;
    this.vx = 0;
};

Player.prototype.listen = function () {
    // this.listenKey('ArrowLeft');
    // this.listenKey('ArrowRight');

    let left = keyboard("ArrowLeft");
    left.press = () => {
        this.vx = -Settings.PLAYER_SPEED;
    };
    left.release = () => {
        this.vx = 0;
    };

    let right = keyboard("ArrowRight");
    right.press = () => {
        this.vx = Settings.PLAYER_SPEED;
    };
    right.release = () => {
        this.vx = 0;
    };

    let space = keyboard(" ");

    space.press = () => {
        console.log("Bullet fired");
        //new Bullet();
    };
};
