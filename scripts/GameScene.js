function GameScene(stage) {
    PIXI.Container.call(this);
    stage.addChild(this);

    this.loadPlayersShips();
}

GameScene.prototype = Object.create(PIXI.Container.prototype);

GameScene.prototype.loadPlayersShips = function () {
    this.figure = new Player(this);

    const initPositionPlayer = 50;
    TweenMax.to(this.figure, 1, { x: initPositionPlayer });
};

GameScene.prototype.move = (obj) => {
    //if (obj.position.x < 250) {
    obj.position.x += obj.vx;
    //}
};
