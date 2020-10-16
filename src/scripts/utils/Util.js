function Util() {}

Util.randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Util.isFirstColumn = function (node) {
  return node.x < this.mostLeftX();
};

Util.isLastColumn = function (node) {
  return node.x > this.width;
};

// Util.calculateSpeed = function (value, direction) {
//   const animation = this.gridMove;

//   const curToX = animation.vars.x;
//   const addnlS = Math.abs(value - curToX);

//   const curS = Math.abs(animation._firstPT.c);
//   const passedS = animation.progress() * curS;

//   const timeLeft = (curS - passedS + addnlS) / this.initialGridSpeed;

//   animation.kill();
//   return this.moveAliensGridRec(value, direction, timeLeft);
// };

Util.drawMovementAreaBorders = function () {
  const graphic = new PIXI.Graphics();

  graphic.lineStyle(2, Settings.BUTTON_GREEN_LINE, 1);
  graphic.drawRect(
    Settings.ALIENS_INITIAL_X_POSITION,
    Settings.ALIENS_INITIAL_Y_POSITION,
    Settings.CANVAS_WIDTH - 2 * Settings.ALIENS_INITIAL_X_POSITION,
    this.height * 2
  );
  graphic.endFill();

  this.parent.addChild(graphic);
};

export default Util;
