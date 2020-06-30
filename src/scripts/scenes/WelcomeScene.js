import ReportScene from "./ReportScene";
import * as PIXI from "pixi.js";
import sound from "pixi-sound";

function WelcomeScene() {
  ReportScene.call(this, {
    headingMsg: "Welcome to Space Invaders Game!",
    btnLabel: "Start",
  });

  this.sceneName = "welcome";

  PIXI.sound.play("enter");
}

WelcomeScene.prototype = Object.create(ReportScene.prototype);

WelcomeScene.prototype.destroy = function () {
  this.visible = false;
};

export default WelcomeScene;
