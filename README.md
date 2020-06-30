# space-invaders-pixi

Space Invaders game w/ PixiJS &amp; Greensock

- The player should be able to control his ship using the keyboard arrow keys and fire bullets using the space key.
- The player`s ship should only move on the horizontal axis and must not move beyond the bounds of the screen.
- The player's bullets start from the position that the player's ship was when the space key was pressed and move up in the vertical axis.
- The enemy ships are aligned in a grid and move together on the horizontal axis. The enemy ships should not move beyond the screen bounds.
- The enemies should randomly fire bullets from their current position and the bullets should move down in the vertical axis. Only enemies that do not have other enemy in their line of fire should be able to fire bullets.
- There should be a horizontal bar at the top of the screen that represents the health of the player, and a label that represents the score of the player.
- If a player bullet hits an enemy ship, the enemy ship disappears and the score should be updated with an animation from the current score value to the new score value.
- If an enemy bullet hits the player's ship the health of the player should be decreased with an animation as well.
- When the player's health gets to zero or all enemies have been killed the game ends and a menu screen should be shown with a play again button, which when pressed resets the game and sends the player to the main play area.
- The player should not "die" from one hit. Its health should get from 100 to 0 in a couple of hits.
- When an enemy is destroyed some kind of explosion animation should be played at the position the enemy was when it was hit (the explosion should not move together with the rest of the enemies). You can use something like this.
- When a bullet hits an enemy or the player the bullet disappears.

## Run in dev mode

1. npm install

webpack watch:

### npm run watch

start with webpack-dev-server:

2. ### npm start
