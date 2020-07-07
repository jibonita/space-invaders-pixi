function CollisionDispatcher() {}

CollisionDispatcher.prototype.checkforHitPlayer = function (player, bulletsCollection) {
  bulletsCollection.some((bullet) => {
    const isCollision = this.checkCollision(bullet, player);
    if (isCollision) {
      player.updateHealth(-bullet.lifeCost);
      bullet.isDestroyed = true;
    }
    return isCollision;
  });
};

CollisionDispatcher.prototype.checkInvadersWalkUponPlayer = function (player, aliensGrid) {
  if (this.checkCollision(player, aliensGrid)) {
    player.updateHealth(-player.health);
  }
};

CollisionDispatcher.prototype.checkforHitAlien = function (bulletsCollection, aliensCollection) {
  const aliensToKill = aliensCollection;
  aliensToKill.forEach((alien) => {
    bulletsCollection.some((bullet) => {
      const alienCoords = {
        x: alien.x + alien.parent.x,
        y: alien.y + alien.parent.y,
        width: alien.width,
        height: alien.height,
      };
      const isCollision = this.checkCollision(bullet, alienCoords);

      if (isCollision) {
        alien.isDestroyed = true;
        bullet.isDestroyed = true;
      }
      return isCollision;
    });
  });
};

CollisionDispatcher.prototype.checkCollision = function (missile, target) {
  const [mStartX, mEndX, mStartY, mEndY] = [
    missile.x,
    missile.x + missile.width,
    missile.y,
    missile.y + missile.height,
  ];
  const [tStartX, tEndX, tStartY, tEndY] = [
    target.x,
    target.x + target.width,
    target.y,
    target.y + target.height,
  ];

  return mStartX < tEndX && mEndX > tStartX && mStartY < tEndY && mEndY > tStartY;
};

export default CollisionDispatcher;
