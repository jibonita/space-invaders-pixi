function GameOverScene(params) {
  ReportScene.call(this, {
    headingMsg: `Game Over!  ${params.message}  Player score: ${params.score}`,
    btnLabel: "Play Again",
  });

  this.sceneName = "gameOver";
}

// function GameOverScene(stage, params) {
//   ReportScene.call(this, stage, {
//     headingMsg: `Game Over!  ${params.message}  Player score: ${params.score}`,
//     btnLabel: "Play Again",
//   });
// }

GameOverScene.prototype = Object.create(ReportScene.prototype);

GameOverScene.prototype.destroy = function () {
  this.visible = false;
};
