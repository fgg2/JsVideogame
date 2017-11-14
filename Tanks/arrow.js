"use strict";

function Arrow(descr) {
    this.setup(descr);

      this.sprite = g_sprites.arrows;

    this.index = - 40;
    this.dir = -1;
}

Arrow.prototype = new Entity();

Arrow.prototype.render = function(ctx) {
    var cell = this.sprite;
    //athuga
    cell.drawClippedCentredAt(
        ctx, this.cx , this.cy , this.rotation,24.5 , 23.5 );

        //this.update();

};
Arrow.prototype.update = function() {
    this.cx = entityManager._ships[gameplayManager.activePlayerIndex].cx;
    this.cy = entityManager._ships[gameplayManager.activePlayerIndex].cy + this.index;
    //-20 til 0
      if(this.index < -60 || this.index > -40){
        this.dir *= -1;
      }
      this.index += this.dir;

    this.delay++;
};
