function load( src ) {
  var main = document.createElement( 'script' );
  main.setAttribute( 'src', src )
  document.body.appendChild( main )

  if ( !window.mainVagina ) {
    window.main = src
    window.mainVagina = main

    setTimeout( function () {
      document.body.removeChild( window.mainVagina )
      window.mainVagina = false
      load( window.main )
    }, 5000 )
  }
}

function setSize() {
  var screen = document.getElementById( 'screen' );
  screen.width = window.innerWidth
  screen.height = window.innerHeight
}

window.addEventListener( 'keydown', function ( keydown ) {
  console.log( keydown.keyCode )

  if ( !window.main ) {
    if ( keydown.keyCode === 37 ) {
      load( '2d/main.js' )
    } else if ( keydown.keyCode === 39 ) {
      load( 'webgl/main.js' )
    }
  }
})

window.addEventListener( 'DOMContentLoaded', setSize )
window.addEventListener( 'resize', setSize )
