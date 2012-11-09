( function( window ) {

"use strict";

var Rect = window.Rect2D;

var r1 = new Rect({
  x: 40,
  y: 160,
  width: 250,
  height: 100
});

var r2 = new Rect({
  x: 60,
  y: 30,
  width: 140,
  height: 200
});

var freeRects = r2.getMaximalFreeRects( r1 );

// console.log( r1.intersects( r2 ) );
// console.log( freeRects );

// -------------------------- canvas -------------------------- //

var w = 400;
var h = 400;
var ctx;

window.onload = function() {
  var canvas = document.getElementsByTagName('canvas')[0];

  canvas.width = w;
  canvas.height = h;

  ctx = canvas.getContext('2d');

  ctx.fillStyle = 'hsla(240, 100%, 50%, 0.3)';

  getRects();

  // renderRect( r1 );
  // renderRect( r2 );
  //
  // // render free frects
  // ctx.fillStyle = 'hsla(0, 100%, 50%, 0.5)';
  // freeRects.forEach( renderRect );

};

function renderRect( rect ) {
  // var hue = Math.floor( Math.random() * 360 );
  // ctx.fillStyle = 'hsla( ' + hue + ', 100%, 50%, 0.3)';
  ctx.fillRect( rect.x, rect.y, rect.width, rect.height );

  ctx.strokeRect( rect.x + 0.5, rect.y + 0.5, rect.width, rect.height );
  // ctx.
}

var rects;

var getRects = getTestingRects;

function getRandomRects() {
  rects = [];
  var rect, x, y;
  var i = 0;
  while ( i++ < 10 ) {
    x = Math.floor( Math.random() * w / 10 ) * 10;
    y = Math.floor( Math.random() * h / 10 ) * 10;
    rect = new Rect({
      x: x,
      y: y,
      width: Math.floor( Math.random() * ( w - x ) / 10 + 1 ) * 10,
      height: Math.floor( Math.random() * ( h - y ) / 10 + 1 ) * 10
    });
    rects.push( rect );
  }

  console.log( rects );
  renderRects()

}

function getTestingRects() {
  rects = [];

  rects.push( new Rect({
    x: 20,
    y: 20,
    width: 100,
    height: 100
  }));

  rects.push( new Rect({
    x: 200,
    y: 20,
    width: 100,
    height: 100
  }));

  rects.push( new Rect({
    x: 20,
    y: 140,
    width: 100,
    height: 100
  }));

  rects.push( new Rect({
    x: 20,
    y: 20,
    width: 70,
    height: 25
  }));

  // rects.push( new Rect({
  //   x: 5,
  //   y: 5,
  //   width: 300,
  //   height: 120
  // }));

  rects.push( new Rect({
    x: 100,
    y: 100,
    width:  120,
    height: 120
  }));

  rects.push( new Rect({
    x: 40,
    y: 160,
    width:  40,
    height: 60
  }));

  console.log('get rects: ', rects);
  renderRects();
}

function renderRects() {
  ctx.fillStyle = 'white';
  ctx.fillRect( 0, 0, w, h );
  ctx.fillStyle = 'hsla( 220, 100%, 50%, 0.4)';
  rects.forEach( renderRect );
}

var mergeRects = window.mergeRects = function() {
  // clone rects
  var testRects = rects.slice(0);

  testRects.forEach( function( rect, i ) {
    // clone rects we're testing, remove this rect
    var compareRects = testRects.slice(0);
    // do not compare with self
    compareRects.splice( i, 1 );
    // compare this rect with others
    var removedCount = 0;
    compareRects.forEach( function( compareRect, j ) {
      // if this rect contains another,
      // remove that rect from test collection
      var indexAdjust = i > j ? 0 : 1;
      if ( rect.contains( compareRect ) ) {
        // console.log( 'current test rects:' + testRects.length, testRects );
        // console.log( i, j, indexAdjust, rect, compareRect );
        testRects.splice( j + indexAdjust - removedCount, 1 );
        removedCount++;
      }
    });
  });

  rects = testRects;
  renderRects();
};

window.getRects = getRects;

})( window );
