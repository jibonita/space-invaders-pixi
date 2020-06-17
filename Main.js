function Main() {
    const canvas = document.getElementById("game-canvas");
    canvas.width = Settings.CANVAS_WIDTH;
    canvas.height = Settings.CANVAS_HEIGHT;

    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(
        Settings.CANVAS_WIDTH,
        Settings.CANVAS_HEIGHT,
        {
            view: canvas,
        }
    );

    this.loadSpriteSheet();
    this.displayWelcomeScene();

    // window.requestID = requestAnimationFrame(this.update.bind(this));
}

const ticker = new PIXI.ticker.Ticker();
ticker.stop();
// ticker.add((delta) => {
//   console.log("delta:", delta);
// });
ticker.start();

Main.prototype.update = function (delta) {
    if (this.gameScene) {
        // this.gameScene.move(this.gameScene.figure);
    }

    window.requestID = requestAnimationFrame(this.update.bind(this));

    // stop ticker after some seconds
    // console.log("update tick");
    // if (delta > 1500) {
    //   cancelAnimationFrame(window.requestID);
    // }

    this.renderer.render(this.stage);
};

Main.prototype.loadSpriteSheet = function () {
    PIXI.loader
        .add("icons", Settings.SPRITESHEET)
        .load(this.onAssetsLoaded.bind(this));
};

Main.prototype.onAssetsLoaded = function (loader, resources) {
    // temp here. Skip Welcome screen
    this.displayGameScene();

    window.requestID = requestAnimationFrame(this.update.bind(this));
};

Main.prototype.displayWelcomeScene = function () {
    this.welcomeScene = new WelcomeScene(this.stage);
    document.addEventListener("start-click", () => {
        this.displayGameScene();
    });
};

Main.prototype.displayGameScene = function () {
    this.gameScene = new GameScene(this.stage);
    this.welcomeScene.visible = false;
};
