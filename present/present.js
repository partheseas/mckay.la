let mobile = navigator.userAgent.toLowerCase().includes( 'mobile' )
let wideEnough = window.innerWidth > 1000
let autoScrolling = false
let panel = null

function setPanelValue() {
  panel = Math.round( window.scrollY / window.innerHeight )
}

function startAutoScrolling( toPanel, duration = 1000 ) {
  autoScrolling = true
  $( window ).scrollTo( toPanel * window.innerHeight, duration, { easing: 'easeOutExpo', onAfter: () => {
    autoScrolling = false
    setPanelValue()
    $( document ).trigger( 'present:panel-changed', [ panel ])
  }} )
}

if ( !mobile ) {
  $( document ).ready( () => {
    $( window ).keydown( event => {
      if ( !autoScrolling && wideEnough ) {
        switch ( event.keyCode ) {
          case 74:
          case 40:
            startAutoScrolling( ++panel, 500 )
            break;
          case 75:
          case 38:
            startAutoScrolling( --panel, 500 )
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
