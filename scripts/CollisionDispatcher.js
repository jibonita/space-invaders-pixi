function CollisionDispatcher() {}

CollisionDispatcher.prototype.checkforHitPlayer = function (
  player,
  bulletsCollection
) {
  bulletsCollection.some((bullet) => {
    const isCollision = this.checkCollision(bullet, player);
    if (isCollision) {
      //console.log("Boom player ");
      player.updateHealth(-bullet.lifeCost);
      bullet.parent.removeChild(bullet);
    }
    return isCollision;
  });
};

CollisionDispatcher.prototype.checkInvadersWalkUponPlayer = function (
  player,
  aliensGrid
) {
  if (checkCollision(player, aliensGrid)) {
    player.updateHealth(-player.health);
  }
};

CollisionDispatcher.prototype.checkforHitAlien = function (
  playerBullet,
  aliensCollection
) {};

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

  return (
    mStartX < tEndX && mEndX > tStartX && mStartY < tEndY && mEndY > tStartY
  );
};
