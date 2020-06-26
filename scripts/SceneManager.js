function SceneManager() {
  PIXI.Container.call(this);

  this.sceneContainer = new PIXI.Container();
  this.addChild(this.sceneContainer);

  this.activeScene = null;

  this.listen();
}

SceneManager.prototype = Object.create(PIXI.Container.prototype);

SceneManager.prototype.listen = function () {
  document.addEventListener("activate_scene", this.onActivateScene.bind(this));
  document.addEventListener("clean_scene", this.onCleanScene.bind(this));

  document.dispatchEvent(
    new CustomEvent("activate_scene", { detail: { screen: "welcome" } })
  );
};

SceneManager.prototype.onActivateScene = function (e) {
  document.dispatchEvent(new Event("clean_scene"));

  const screen = e.detail.screen;
  const scene = screen.charAt(0).toUpperCase() + screen.slice(1) + "Scene";
  console.log(scene);

  const options = e.detail.options ? e.detail.options : null;

  this.activeScene = new DynamicClass(scene, options);
  this.sceneContainer.addChild(this.activeScene);
};

SceneManager.prototype.onCleanScene = function (e) {
  if (this.activeScene) {
    this.activeScene.destroy();
  }
};
