function CollisionDispatcher() {}

CollisionDispatcher.prototype.checkforHitPlayer = function (
  player,
  bulletsCollection
) {
  bulletsCollection.some((bullet) => {
    const isCollision = this.checkCollision(bullet, player);
    if (isCollision) {
      // console.log("Boom player ");
      player.updateHealth(-bullet.lifeCost);
      //bullet.parent.removeChild(bullet);
      bullet.isDestroyed = true;
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
  bulletsCollection,
  aliensCollection
) {
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
        // bullet.parent.removeChild(bullet);
        // alien.parent.deleteAlien(alien);
        alien.isDestroyed = true;
        bullet.isDestroyed = true;
      }
      return isCollision;
    });
  });
  // const aliensToKill = this.parent.invaders.getShooters();
  // aliensToKill.some((alien) => {
  //   const isCollision = checkCollision(bullet, {
  //     x: alien.x + this.parent.invaders.x,
  //     y: alien.y + this.parent.invaders.y,
  //     width: alien.width,
  //     height: alien.height,
  //   });
  //   if (isCollision) {
  //     bullet.parent.removeChild(bullet);
  //     this.parent.invaders.deleteAlien(alien);
  //     tm.kill();
  //   }
  //   return isCollision;
  // });
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

  return (
    mStartX < tEndX && mEndX > tStartX && mStartY < tEndY && mEndY > tStartY
  );
};
