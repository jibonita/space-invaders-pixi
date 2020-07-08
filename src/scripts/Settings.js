import { settings } from "pixi.js/lib/core";

function Settings() {}

Settings.BUTTON_GREEN_LINE = 0x00ff99;
Settings.BUTTON_YELLOW_LINE = 0xfeeb77;
Settings.CANVAS_WIDTH = 700;
Settings.CANVAS_HEIGHT = 500;
Settings.START_SCENE = "game"; //"welcome";
Settings.SPRITESHEET = "./src/resources/icons-sheet.json";
Settings.SPRITESHEET_SOUND = "./src/resources/sound-on-off.json";
Settings.EXPLOSION_SPRITE = "./src/resources/explosion.json";
Settings.DUMMY_BLACK_SPRITE = "alien6.png";

Settings.SOUND_GAME_ENTER = "./src/resources/sound/enter.mp3";
Settings.SOUND_BULLET_FIRE = "./src/resources/sound/bullet-shot.mp3";
Settings.SOUND_EXPLOSION = "./src/resources/sound/explosion2.mp3";

Settings.PLAYER_INITIAL_POSITION = 50;
Settings.PLAYER_SPEED = 10.7;
Settings.PLAYER_INITIAL_HEALTH = 500; //100;
Settings.PLAYER_POINTS_ADDED_FOR_KILLED_ALIEN = 15;

Settings.ALIENS_INITIAL_X_POSITION = 50;
Settings.ALIENS_INITIAL_Y_POSITION = 100;
Settings.ALIENS_LEFT_RIGHT_MARGIN = Settings.ALIENS_INITIAL_X_POSITION;
Settings.ALIENS_GRID_ITEMS_PER_ROW = 5; //8
Settings.ALIENS_GRID_ROWS = 2; //   5;
Settings.ALIENS_INITIAL_GRID_MOVE_TIME = 3; //5;

Settings.ALIEN_H_MARGIN = 30;
Settings.ALIEN_VERTICAL_MARGIN = 35;
Settings.ALIEN_AVAILABLE_PATTERNS = 7;
Settings.ALIEN_SHOOT_EACH_X_FRAMES = 20;

Settings.BULLET_LIFE_COST = 10;

Settings.HEALTH_BAR_WIDTH = 150;
Settings.HEALTH_BAR_HEIGHT = 20;
Settings.HEALTH_BAR_BORDER = 1;

Settings.EVENT_ACTIVATE_SCENE = "activate_scene";
Settings.EVENT_CLEAN_SCENE = "clean_scene";

Settings.DIR_RIGHT = 0;
Settings.DIR_LEFT = 1;

export default Settings;
