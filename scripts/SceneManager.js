function SceneManager() {
  PIXI.Container.call(this);

  this.sceneContainer = new PIXI.Container();
  this.addChild(this.sceneContainer);

  this.activeScene = null;

  this.listen();
}

SceneManager.prototype = Object.create(PIXI.Container.prototype);

SceneManager.prototype.listen = function () {
  document.addEventListener(
    Settings.EVENT_ACTIVATE_SCENE,
    this.onActivateScene.bind(this)
  );
  document.addEventListener(
    Settings.EVENT_CLEAN_SCENE,
    this.onCleanScene.bind(this)
  );

  document.dispatchEvent(
    new CustomEvent(Settings.EVENT_ACTIVATE_SCENE, {
      detail: { screen: Settings.START_SCENE },
    })
  );
};

SceneManager.prototype.onActivateScene = function (e) {
  document.dispatchEvent(new Event(Settings.EVENT_CLEAN_SCENE));

  const screen = e.detail.screen;
  const scene = screen.charAt(0).toUpperCase() + screen.slice(1) + "Scene";
  const options = e.detail.options ? e.detail.options : null;

  this.activeScene = new DynamicClass(scene, options);
  this.sceneContainer.addChild(this.activeScene);
};

SceneManager.prototype.onCleanScene = function (e) {
  if (this.activeScene) {
    this.activeScene.destroy();
  }
};
