function GameScene(stage) {
    PIXI.Container.call(this);
    stage.addChild(this);

    this.loadPlayersShips();
}

GameScene.prototype = Object.create(PIXI.Container.prototype);

GameScene.prototype.loadPlayersShips = function () {
    this.player = new Player(this);

    TweenMax.to(this.player, 1, {
        x: Settings.PLAYER_INITIAL_POSITION,
        ease: Power1.easeIn,
        onComplete: () => {
            ticker.add(this.move.bind(this, this.player));

            const bullet = new Bullet(this);
            bullet.position.x =
                (this.player.width - bullet.width) / 2 + this.player.x;
            bullet.position.y =
                Settings.CANVAS_HEIGHT - this.player.height - bullet.height - 5;

            TweenMax.to(bullet, 1, {
                y: -bullet.height,
                onComplete: () => {
                    //console.log("Bullet finished trayectory");
                },
            });
        },
    });
};

GameScene.prototype.move = (obj) => {
    obj.position.x += obj.vx;

    const leftBound = Settings.PLAYER_INITIAL_POSITION;
    const rightBound =
        Settings.CANVAS_WIDTH - Settings.PLAYER_INITIAL_POSITION - obj.width;

    if (obj.position.x < leftBound) {
        obj.position.x = leftBound;
    } else if (obj.position.x > rightBound) {
        obj.position.x = rightBound;
    }

    // console.log(obj.position.x);
    // console.log(obj.x);
};
