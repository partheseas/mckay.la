let currentSet = []

function init( count ) {
  for ( let i = 0; i < count; i++ ) {
    currentSet.push({
      locked: false,
      value: 0
    })
  }
}

function setTable() {
  let table = document.getElementById( 'table' )
  table.innerHTML = ''

  currentSet.forEach( dice => {
    if ( !dice.locked ) dice.value = Math.ceil( Math.random() * 6 )

    let diceView = document.createElement( 'div' )

    diceView.addEventListener( 'click', () => {
      dice.locked = !dice.locked
      diceView.className = dice.locked ? 'locked' : 'unlocked'
    })

    diceView.className = dice.locked ? 'locked' : 'unlocked'

    let text = document.createElement( 'span' )
    text.innerHTML = dice.value

    diceView.appendChild( text )
    table.appendChild( diceView )
  })
}

document.addEventListener( 'DOMContentLoaded', () => {
  init( 10 )
  document.getElementById( 'roller' ).addEventListener( 'click', () => {
    setTable( 10 )
  })
})
