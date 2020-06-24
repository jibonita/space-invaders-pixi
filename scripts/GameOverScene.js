function GameOverScene(stage, params) {
  ReportScene.call(this, stage, {
    headingMsg: `Game Over!  ${params.message}  Player score: ${params.score}`,
    btnLabel: "Play Again",
  });
}

GameOverScene.prototype = Object.create(ReportScene.prototype);
