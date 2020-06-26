function WelcomeScene() {
  ReportScene.call(this, {
    headingMsg: "Welcome to Space Invaders Game!",
    btnLabel: "Start",
  });

  this.sceneName = "welcome";
}
// function WelcomeScene(stage) {
//   ReportScene.call(this, stage, {
//     headingMsg: "Welcome to Space Invaders Game!",
//     btnLabel: "Start",
//   });
// }

WelcomeScene.prototype = Object.create(ReportScene.prototype);

WelcomeScene.prototype.destroy = function () {
  this.visible = false;
};
