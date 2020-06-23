function WelcomeScene(stage) {
  ReportScene.call(this, stage, {
    headingMsg: "Welcome to Space Invaders Game!",
    btnLabel: "Start",
  });

  //   stage.addChild(this);

  //   this.loadHeadingMessage();

  //   this.loadActionButton();
}

WelcomeScene.prototype = Object.create(ReportScene.prototype);

// WelcomeScene.prototype.loadActionButton = function () {
//   const button = new PIXI.Graphics();
//   this.drawButton(button, 5);
//   this.addChild(button);

//   button.position.x = (Settings.CANVAS_WIDTH - button.width) / 2;
//   button.position.y = (Settings.CANVAS_HEIGHT - button.height) / 2;

//   const font = this.drawText();
//   button.addChild(font);

//   button.interactive = true;
//   button.buttonMode = true;

//   button.on("mousedown", this.onStartGameClicked.bind(this));
//   button.on("mouseover", this.onStartGameHover.bind(this));
//   button.on("mouseout", this.onStartGameOut.bind(this));
// };

// WelcomeScene.prototype.onStartGameClicked = function (e) {
//   document.dispatchEvent(new Event("start-click"));
// };

// WelcomeScene.prototype.onStartGameHover = function (e) {
//   this.drawButton(e.currentTarget, 7);
// };

// WelcomeScene.prototype.onStartGameOut = function (e) {
//   this.drawButton(e.currentTarget, 5);
// };

// WelcomeScene.prototype.drawText = () => {
//   var style = new PIXI.TextStyle({
//     fontFamily: "Arial",
//     fontSize: 26,
//     fontStyle: "italic",
//     fontWeight: "bold",
//     fill: ["#ffffff", "#00ff99"], // gradient
//     stroke: "#4a1850",
//     strokeThickness: 5,
//     wordWrap: true,
//     wordWrapWidth: 440,
//   });

//   var font = new PIXI.Text("Start", style);
//   font.x = 25;

//   return font;
// };

// WelcomeScene.prototype.drawButton = function (graphic, border) {
//   graphic.lineStyle(border, Settings.BUTTON_GREEN_LINE, 1);
//   graphic.beginFill(0x650a5a);
//   graphic.drawRect(0, 0, 120, 40);
//   graphic.endFill();
// };

// WelcomeScene.prototype.loadHeadingMessage = function () {
//   let totalStrWidth = 100;
//   const str = "Welcome to Space Invaders Game!";
//   const strText = str.split("").map((ch, i) => {
//     const pixiText = new PIXI.Text(ch, { fill: "#ffffff" });
//     pixiText.position.x = totalStrWidth;
//     totalStrWidth += pixiText.width;
//     this.addChild(pixiText);
//     return pixiText;
//   });

//   //   TweenMax.staggerFrom(strText, 0.5, { x:-20, y:50 }, 0.1);
//   TweenMax.staggerFromTo(strText, 0.5, { y: -50 }, { y: 50 }, 0.1);
// };
