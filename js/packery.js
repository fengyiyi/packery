/**
 * Packery v0.0.1
 * Bin-packing layout
 * by David DeSandro / Metafizzy
 */

( function( window ) {

'use strict';

var document = window.document;
var _Packery = window.Packery;
var Rect = _Packery.Rect;
var Packer = _Packery.Packer;
var getSize = window.getSize;

function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// -------------------------- Packery -------------------------- //

function Packery( element, options ) {
  this.element = element;

  // options
  this.options = {};
  for ( var prop in Packery.defaults ) {
    this.options[ prop ] = Packery.defaults[ prop ];
  }

  for( prop in options ) {
    this.options[ prop ] = options[ prop ];
  }

  // initial properties
  this.packer = new Packer();
  this._create();
  this._init();
}



Packery.defaults = {
  containerStyle: {
    position: 'relative'
  }
};

Packery.prototype._create = function() {
  this.reloadItems();

  var containerStyle = this.options.containerStyle;
  for ( var prop in containerStyle ) {
    this.element.style[ prop ] = containerStyle[ prop ];
  }

};

// goes through all children again and gets bricks in proper order
Packery.prototype.reloadItems = function() {
  // collection of item elements
  this.items = [];
  this._getItems( this.element.children );
},


Packery.prototype._getItems = function( elems ) {
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    elem.style.position = 'absolute';
    // addClass( item, 'masonry-brick' );
    this.items.push( elem );
  }
},

Packery.prototype.getSize = function() {

};

// ----- init ----- //

Packery.prototype._init = function() {
  var elemSize = getSize( this.element );
  this.packer.width = elemSize.innerWidth;
  this.packer.height = Number.POSITIVE_INFINITY;
  this.packer.reset();
  this.layoutItems( this.items );
};

Packery.prototype.layoutItems = function( items ) {
  for ( var i=0, len = items.length; i < len; i++ ) {
    // console.log( i );
    var item = items[i];
    this._layoutItem( item );
  }
};

Packery.prototype._layoutItem = function( item ) {
  // console.log( item );
  var size = getSize( item );
  var rect = new Rect({
    width: size.outerWidth,
    height: size.outerHeight
  });
  // pack the rect in the packer
  this.packer.pack( rect );
  // copy over position of packed rect to item element
  item.style.left = rect.x + 'px';
  item.style.top  = rect.y + 'px';
  // console.log( size, rect.x, rect.y );
};

// -----  ----- //

// back in global
Packery.Rect = Rect;
Packery.Packer = Packer;
window.Packery = Packery;

})( window );
