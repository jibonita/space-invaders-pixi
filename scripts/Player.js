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
};

Player.prototype.listen = function () {
    let left = keyboard("ArrowLeft"),
        right = keyboard("ArrowRight"),
        space = keyboard("Space");

    left.press = () => {
        this.x -= 5;
    };
    right.press = () => {
        // this.x += 5;
        this.vx = 0.5;
    };
    space.press = () => {
        //new Bullet();
    };
    //   right.release = () => {
    //     if (!left.isDown && cat.vy === 0) {
    //       cat.vx = 0;
    //     }
    //   };
};

//----------------------------------------------------
function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    //The `downHandler`
    key.downHandler = (event) => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = (event) => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler; //.bind(key);
    const upListener = key.upHandler; //.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}
