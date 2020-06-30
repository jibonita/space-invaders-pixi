import WelcomeScene from "./scenes/WelcomeScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

const sceneClasses = {
  WelcomeScene,
  GameScene,
  GameOverScene,
};

function DynamicClass(className, opts) {
  return new sceneClasses[className](opts);
}

export default DynamicClass;
