import * as PIXI from "pixi.js";
import Settings from "../Settings";

function HealthBar(stage) {
  PIXI.Container.call(this);
  stage.addChild(this);

  this.setInitialState();
}

HealthBar.prototype = Object.create(PIXI.Container.prototype);

HealthBar.prototype.setInitialState = function () {
  const borderWidth = Settings.HEALTH_BAR_BORDER;

  this.addChild(
    this.createBar(
      0,
      0,
      Settings.HEALTH_BAR_WIDTH,
      Settings.HEALTH_BAR_HEIGHT,
      0x000000,
      borderWidth,
      0xffffff
    )
  );
  this.outer = this.addChild(
    this.createBar(
      borderWidth,
      borderWidth,
      Settings.HEALTH_BAR_WIDTH - borderWidth,
      Settings.HEALTH_BAR_HEIGHT - borderWidth,
      0x19bb26
    )
  );
};

HealthBar.prototype.createBar = function (
  x,
  y,
  width,
  height,
  color,
  borderWidth,
  borderColor
) {
  const graphic = new PIXI.Graphics();
  graphic.lineStyle(borderWidth, borderColor, 1);
  graphic.beginFill(color);
  graphic.drawRect(x, y, width, height);
  graphic.endFill();
  return graphic;
};

HealthBar.prototype.update = function (percent) {
  TweenMax.to(this.outer, 1, {
    width:
      percent > 0
        ? Settings.HEALTH_BAR_WIDTH * percent - Settings.HEALTH_BAR_BORDER
        : 0,
  });
};

export default HealthBar;
