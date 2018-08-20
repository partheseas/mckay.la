window.pushAll = function ( data ) {
  Object.keys( girls ).forEach( function ( name ) {
    let girl = girls[ name ]

    girl.get( unique.name, data )
  })
}

window.pushTo = function ( girl, data ) {
  girls[ girl ].get( unique.name, data )
}

window.get = function ( girl, data ) {
  console.log( girl + " says:", data ) //document.write( data )
}
