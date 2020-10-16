import * as PIXI from "pixi.js";
import Settings from "../Settings";

function ReportScene(params) {
  PIXI.Container.call(this);

  this.sceneContainer = new PIXI.Container();
  this.addChild(this.sceneContainer);

  this.headingMessage = params.headingMsg;
  this.buttonLabel = params.btnLabel;

  this.sceneName = "report";

  this.loadHeadingMessage();

  this.loadActionButton();
}

ReportScene.prototype = Object.create(PIXI.Container.prototype);

ReportScene.prototype.loadActionButton = function () {
  const btnText = this.drawText();

  const button = new PIXI.Graphics();
  this.drawButton(button, 5);
  button.addChild(btnText);
  this.addChild(button);

  button.position.x = (Settings.CANVAS_WIDTH - button.width) / 2;
  button.position.y = (Settings.CANVAS_HEIGHT - button.height) / 2;

  button.interactive = true;
  button.buttonMode = true;

  button.on("mousedown", this.onStartGameClicked.bind(this));
  button.on("mouseover", this.onStartGameHover.bind(this));
  button.on("mouseout", this.onStartGameOut.bind(this));
};

ReportScene.prototype.onStartGameClicked = function (e) {
  document.dispatchEvent(
    new CustomEvent(Settings.EVENT_ACTIVATE_SCENE, {
      detail: { screen: "game" },
    })
  );
};

ReportScene.prototype.onStartGameHover = function (e) {
  this.drawButton(e.currentTarget, 7);
};

ReportScene.prototype.onStartGameOut = function (e) {
  this.drawButton(e.currentTarget, 5);
};

ReportScene.prototype.drawText = function () {
  const style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 26,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#ffffff", "#00ff99"], // gradient
    stroke: "#4a1850",
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440,
  });

  const font = new PIXI.Text(this.buttonLabel, style);
  font.x = 25;

  return font;
};

ReportScene.prototype.drawButton = function (graphic, border) {
  const btnLabelLetteWidth = 14;
  const btnWidth = this.buttonLabel.length * btnLabelLetteWidth;
  const btnPadding = 50;

  graphic.lineStyle(border, Settings.BUTTON_GREEN_LINE, 1);
  graphic.beginFill(0x650a5a);
  graphic.drawRect(0, 0, btnWidth + btnPadding, 40);
  graphic.endFill();
};

ReportScene.prototype.loadHeadingMessage = function () {
  const heading = new PIXI.Container();
  this.addChild(heading);

  let totalStrWidth = 0;
  const str = this.headingMessage;
  const strText = str.split("").map((ch, i) => {
    const pixiText = new PIXI.Text(ch, { fill: "#ffffff" });
    pixiText.position.x = totalStrWidth;
    totalStrWidth += pixiText.width;
    heading.addChild(pixiText);
    return pixiText;
  });

  heading.x = Settings.CANVAS_WIDTH / 2 - totalStrWidth / 2;
  TweenMax.staggerFromTo(strText, 0.5, { y: -50 }, { y: 50 }, 0.1);
};

export default ReportScene;
