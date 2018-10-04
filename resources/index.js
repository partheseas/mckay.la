// This variable is used to fix the terrible awful way that iOS handles
// the shrinking address bar when you scroll down on a page.
let mobile = navigator.userAgent.toLowerCase().includes( 'mobile' )
let wideEnough = window.innerWidth > 1000
let autoScrolling = false
let panel = null

if ( !mobile ) {
  $( document ).ready( () => {
    $( window ).keydown( event => {
      if ( !autoScrolling ) {
        switch ( event.keyCode ) {
          case 74:
          case 40:
            startAutoScrolling( ++panel )
            break;
          case 75:
          case 38:
            startAutoScrolling( --panel )
            break;
        }
      }
    })
  })

  $( document ).scroll( () => {
    setPanelValue()

    if ( !autoScrolling && wideEnough ) {
      if ( window.scrollY > panel * window.innerHeight + 100 ) {
        startAutoScrolling( ++panel )
      } else if ( window.scrollY < panel * window.innerHeight - 100 ) {
        startAutoScrolling( --panel )
      }
    }
  })

  $( window ).resize( () => {
    wideEnough = window.innerWidth > 1000
    if ( Math.abs( window.scrollY - panel * window.innerHeight ) > 100 ) {
      startAutoScrolling( panel )
    }
  })
}

function setPanelValue() {
  panel = Math.round( window.scrollY / window.innerHeight )
}

function startAutoScrolling( toPanel ) {
  autoScrolling = true
  $( window ).scrollTo( toPanel * window.innerHeight, 1000, { easing: 'easeOutExpo', onAfter: () => {
    setPanelValue()
    setTimeout( () => autoScrolling = false, 100 )
  }} )
}
