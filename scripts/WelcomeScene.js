function WelcomeScene(stage) {
  ReportScene.call(this, stage, {
    headingMsg: "Welcome to Space Invaders Game!",
    btnLabel: "Start",
  });
}

WelcomeScene.prototype = Object.create(ReportScene.prototype);
