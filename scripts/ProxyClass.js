const sceneClasses = {
  WelcomeScene,
  GameScene,
  GameOverScene,
};

function DynamicClass(className, opts) {
  return new sceneClasses[className](opts);
}
