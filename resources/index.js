// # Hello there!
// If you're looking at this and wondering what it does, it's a
// simple hashing algorithm of sorts. Probably not crazy secure,
// and also total overkill for what it accomplishes, but it was
// just kind of fun to write. If you're curious about the code I
// use for the automatic/locking scrolling from the desktop version
// of the website, all of that code is below.
//
// All this does is load a script that changes things a little bit
// when I visit this webpage from my development server. If you manage
// to crack the password, it won't do anything because the script that
// this loads is not available on the public website.

function hash( digest ) {
  let running = 1
  let ent = parseInt( digest[ digest.length - 1 ], 36 )
  let current

  for ( position in digest ) {
    current = parseInt( digest[ position ], 36 )
    running *= current ** ent
    ent = current

    running %= 0xFFFF
  }

  return running
}

if ( localStorage.token ) {
  let key = localStorage.token

  if ( hash( key ) === 0xc3b4 ) {
    let secret = document.createElement( 'script' )
    secret.type = 'application/javascript'
    secret.src = `/lab/dev/${key}.js`
    document.head.appendChild( secret )
  }
}

// Here's the auto scrolling stuff

let mobile = navigator.userAgent.toLowerCase().includes( 'mobile' )
let wideEnough = window.innerWidth > 1000
let autoScrolling = false
let panel = null

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
