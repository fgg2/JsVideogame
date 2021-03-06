// ==========
// TERRAIN STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

//initial landscape values
var g_landscape = [];
var bound = 15;
var xShift = 0;


var terrain = {


rememberResets: function () {
    // Remember my reset positions
    this.reset_landscape = this.landscape;
},


render: function(ctx, ls, frame) {

    ctx.fillStyle = "#228B22";
    var i = 0;
    ctx.beginPath();
    ctx.moveTo(0, ls[0]);

    for (i in ls) {
        ctx.lineTo(i, ls[i]);
    }

    ctx.lineTo(frame.width, frame.height);
    ctx.lineTo(0, frame.height);

    ctx.closePath();
    ctx.fill();
},

initlandScape: function(f, bound, xShift, frame) {

    var ls = [];

    var x = -bound + xShift;

    for (var i = 0; i < frame.width; i++) {
        var y = f(x);
        y += frame.height/2;
        ls.push(y);

        x += ((2*bound)/frame.width);
    }

    return ls;
},

bombLandscape: function(x, radius, tankhit) {
    var explosionRadius = radius;
    if (tankhit) {
        explosionRadius *= 2;
    }

    entityManager._explosions.push(new Explosion({
            cx : x,
            cy : g_landscape[Math.floor(x)],
            radius : explosionRadius
        }));

    x = Math.floor(x);
    radius = Math.floor(radius);

    var diff = x - radius;

    var ratio = -1, step = 1/radius;

    for (var i = diff; i < 2*radius + diff; i++) {

        //if the explosion radius goes outside of the map then ignore
        if (i < 0 || i > g_canvas.length){
          continue;
        }

        g_landscape[util.clamp(i)] += util.sinAcos(ratio, radius);
        ratio += step;
    }
}


}
