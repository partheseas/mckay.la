let startTimeout = function ( shouldFail ) {
  return new Promise( ( pass, fail ) => {
    setTimeout( shouldFail ? fail : pass, 3000 )
  })
}

async function main_async( shouldFail ) {
  try {
    await startTimeout( shouldFail )
    console.log('3 seconds awaited')
  } catch ( error ) {
    console.log('3 seconds caught')
  }
}

function main_then( shouldFail ) {
  startTimeout( shouldFail )
    .then( () => console.log('3 seconds "then"d') )
    .catch( () => console.error( '3 seconds "catch"d'))
}

main_async( false )
main_then( false )
main_async( true )
main_then( true )
