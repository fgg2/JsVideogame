"use strict"



var ai = {

  timer:  1000,

  runAI: function(destX, startVelX, direction, path,){
    //fær inn öll gildi frá ships sem þarf og kallar svo á hin föllinn með þeim
    //þá þarf bara eitt kall í ships
    //implementa seinast
    //timer?
    //óþarfi
    AIupdate(destX, startVelX, direction, path, timer);

  },

  getTarget: function(ship){

    var targetx = ship.playerNr + 1;
    targetx %= entityManager._ships.length;
    //AI will not aim at a dead player
    //will get fixed once we have a winner screen
    while(entityManager._ships[targetx]._isDeadNow){
      targetx++
      targetx = util.clampMinMax(targetx, 0, entityManager._ships.length);
    }

    return entityManager._ships[targetx].cx
  },

  AIMovement: function(AIpath, ship){
    /*movement of the AI */
    var thrust;
    if(AIpath === 0){
      /*generate 1 from 50*/
      //var num = Math.floor(Math.random()*100) + 1;
      var num = 150;
      /*50-50 that it will be a minus*/
      num *= Math.floor(Math.random()*2) == 1 ? 1 : -1
      AIpath = num;

    } else if(AIpath < 0){

      ship.updateRotation();
      thrust = -1;

      if ((ship.rotation < -50) || (ship.rotation > 50)) {

        thrust = ship.falldown(thrust);
      }

      if( ship.cx - ship.sprite.width / 2 + 10 > 0){
      ship.applyAccel(thrust);
          AIpath++;
    } else { AIpath = 150}


    } else if(AIpath > 0){

      ship.updateRotation();
      thrust = 1;

      if ((ship.rotation < -50) || (ship.rotation > 50)) {

        thrust = ship.falldown(thrust);
      }

      if(ship.cx + ship.sprite.width / 2 < g_canvas.width){
      ship.applyAccel(thrust);
      AIpath--;
    }else { AIpath = -150}

    }

    return AIpath;
  },

  AIrotation: function(AIdirection, ship){

    /*Rotation of the AI gun*/
    if (Math.floor(util.toDegrees(ship.gunrotation)) >= 180) {
      AIdirection = "left";
    }

    if (Math.floor(util.toDegrees(ship.gunrotation)) <= 0) {

      AIdirection = "right";
    }

    if (AIdirection === "left") {
      ship.gunrotation -= NOMINAL_ROTATE_RATE * 2;
    }

    if (AIdirection === "right") {
      ship.gunrotation += NOMINAL_ROTATE_RATE * 2;
    }

      ship.spriteGunRotation = util.toDegrees(ship.gunrotation) - 90;
      ship.spriteGunRotation += ship.rotation;
      return AIdirection;
  },

  AIupdate: function (destX, startVelX, direction, path){
    var ship = entityManager._ships[gameplayManager.activePlayerIndex];

    var targetx = this.getTarget(ship);
    if(this.timer < 0){
      console.log("ping")
      ship.maybeFireBullet();
      this.timer = 1000;
    }
    this.timer--;

        if (Math.floor(destX) < targetx && targetx - 20 < Math.floor(destX) || Math.floor(destX) < targetx && targetx + 20 < Math.floor(destX)) {
          //&& targetx - this.cx > 50 || this.cx - targetx > 50

          //console.log(Math.abs(targetx - entityManager._ships[gameplayManager.activePlayerNr].cx));
          if(Math.abs(targetx - ship.cx) < 50){
            console.log("dont shoot");
            //move and rotate instead
            destX += startVelX;
            destX = util.clamp(destX, ship);
            path = this.AIMovement(path, ship);
            direction = this.AIrotation(direction, ship);
            this.shipUpdate(destX, path, direction, ship);
            //change direction and run movement
          } else {
            ship.maybeFireBullet();
            this.timer = 1000;
          }

        } else {
          destX += startVelX;
          destX = util.clamp(destX, ship);
          path = this.AIMovement(path, ship);
          direction = this.AIrotation(direction, ship);
          this.shipUpdate(destX, path, direction, ship);

    }
  },

  shipUpdate: function(destX, path, direction, ship){

    //update all the variables in ship
    ship.destX = destX;
    ship.AIdirection = direction;
    ship.AIpath = path;
  }


}




//===================================
