function GameOverScene(params) {
  ReportScene.call(this, {
    headingMsg: `Game Over!  ${params.message}  Player score: ${params.score}`,
    btnLabel: "Play Again",
  });

  this.sceneName = "gameOver";
}

GameOverScene.prototype = Object.create(ReportScene.prototype);

GameOverScene.prototype.destroy = function () {
  this.visible = false;
};
