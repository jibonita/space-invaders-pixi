function ScoreBar(stage) {
  PIXI.Text.call(
    this,
    "Score: 0",
    new PIXI.TextStyle({
      fill: "#ffffff",
    })
  );
  stage.addChild(this);

  this.setInitialState();
}

ScoreBar.prototype = Object.create(PIXI.Text.prototype);

ScoreBar.prototype.setInitialState = function () {};

ScoreBar.prototype.update = function (score) {
  this.text = "Score: " + score;
};
