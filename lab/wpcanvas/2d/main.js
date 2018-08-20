var _2d = document.getElementById( 'screen' ).getContext( '2d' );
var frame = 0;

document.getElementById( 'switcher' ).style.setProperty( 'display', 'none' )

function draw() {
  frame++
  _2d.fillStyle = '#2d32a4'
  _2d.fillRect( 100, 100, 500, 500 )

  requestAnimationFrame( draw )
}

requestAnimationFrame( draw )
