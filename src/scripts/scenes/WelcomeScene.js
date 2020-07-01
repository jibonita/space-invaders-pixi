import ReportScene from "./ReportScene";

function WelcomeScene() {
  ReportScene.call(this, {
    headingMsg: "Welcome to Space Invaders Game!",
    btnLabel: "Start",
  });

  this.sceneName = "welcome";
}

WelcomeScene.prototype = Object.create(ReportScene.prototype);

WelcomeScene.prototype.destroy = function () {
  this.visible = false;
};

export default WelcomeScene;
