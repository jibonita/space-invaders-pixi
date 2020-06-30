import * as PIXI from "pixi.js";
import Settings from "../Settings";
import HealthBar from "./HealthBar";
import ScoreBar from "./ScoreBar";

function Statistics(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.basicTextStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 20,
    fill: "#ffffff",
  });

  this.loadBars();

  this.setInitialState();
}

Statistics.prototype = Object.create(PIXI.Container.prototype);

Statistics.prototype.setInitialState = function () {
  this.position.set(Settings.CANVAS_WIDTH / 2 - this.width / 2, 10);
};

Statistics.prototype.loadBars = function () {
  this.label = this.addChild(
    new PIXI.Text("Player health", this.basicTextStyle)
  );

  this.healthBar = new HealthBar(this);

  this.scoreBar = new ScoreBar(this);

  this.label.x = 0;
  this.healthBar.x = this.label.width + 10;
  this.scoreBar.x = this.label.width + this.healthBar.width + 50;
  this.scoreBar.style = this.basicTextStyle;
};

Statistics.prototype.destroy = function () {
  this.parent.removeChild(this);
};

export default Statistics;
