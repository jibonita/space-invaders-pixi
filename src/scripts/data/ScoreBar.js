import * as PIXI from "pixi.js";

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

ScoreBar.prototype.setInitialState = function () {
  this.score = 0;
};

ScoreBar.prototype.update = function (score) {
  const tm = TweenMax.to(this, 0.3, {
    score,
    roundProps: {
      score: 1,
    },
    onUpdate: function () {
      tm.target.text = "Score: " + tm.target.score;
    },
  });
};

export default ScoreBar;
