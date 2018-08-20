window.addEventListener( "DOMContentLoaded", () => {
  gridElement = document.getElementById( 'sudoku' )
  submit = document.getElementById( 'submit' )

  function cleanGrid() {
    while ( gridElement.children.length ) gridElement.removeChild( gridElement.children[ 0 ] )

    for ( let square = 0; square < 9; square++ ) {
      squareElement = document.createElement( 'div' )
      squareElement.className = 'section'

      for ( let bubble = 0; bubble < 9; bubble++ ) {
        bubbleElement = document.createElement( 'input' )
        squareElement.appendChild( bubbleElement )
      }

      gridElement.appendChild( squareElement )
    }
  }

  cleanGrid()

  function parseGrid() {
    let grid = [ [], [], [], [], [], [], [], [], [] ]
    Array.from( gridElement.children ).forEach( ( section, s ) => {
      Array.from( section.children ).forEach( ( square, i ) => {
        if ( !square.value ) return
        x = (s % 3) * 3 + i % 3
        y = ( s - (s%3) ) + ( i - (i%3) ) / 3
        grid[ x ][ y ] = parseInt( square.value )
      } )
    })

    game = new Sudoku( grid )
    game.solve()

    console.log( game.board.map( column => column.map( bubble => bubble.answer ) ) )
  }

  submit.addEventListener( 'click', parseGrid )
})



class Sudoku {
  constructor( grid ) {
    this.board = grid.map( ( column, x ) => {
      return column.map( ( input, y ) => {
        return input ?
          new Answer( input ) :
          null
      })
    })
    // this.board[ x ] = []
    // for ( let y = 0; y < 9; y++ ) {
    //   if ( grid[ x ][ y ] ) this.board[ x ][ y ] = new Answer( grid[ x ][ y ] )
    //   else this.board[ x ][ y ] = new
    // }

    this.board.forEach( ( column, x ) => {
      column.forEach( ( bubble, y ) => {
        if ( bubble == null ) this.board[ x ][ y ] = new Bubble( this.getSection( x, y ), this.getColumn( x ), this.getRow( y ) )
      })
    })
  }

  setPoint( x, y, z ) {
    this.board[ x ][ y ].value = 0
  }

  getSection( x, y ) {
    let b = this.board
    [ x, y ] = [ x - (x%3), y - (y%3) ]
    let [ x1, x2, x3 ] = [ x * 3, x * 3 + 1, x * 3 + 2 ]
    let [ y1, y2, y3 ] = [ y * 3, y * 3 + 1, y * 3 + 2 ]

    return filterContents( b[ x1 ][ y1 ], b[ x2 ][ y1 ], b[ x3 ][ y1 ],
                           b[ x1 ][ y2 ], b[ x2 ][ y2 ], b[ x3 ][ y2 ],
                           b[ x1 ][ y3 ], b[ x2 ][ y3 ], b[ x3 ][ y3 ] )
  }

  getColumn( x ) {
    return this.board[ x ]
  }

  getRow( y ) {
    return this.board.map( x => x[ y ] )
  }

  getPossibilities( x, y ) {
    section = this.getSection( x, y )
    column = this.getColumn( x )
    row = this.getRow( y )
  }

  solve() {
    let solving = true
    this.board.forEach( ( column, x ) => {
      return column.forEach( ( bubble, y ) => {
        if ( !bubble.answer ) {
          if ( bubble.possibilities.length === 1 ) {
            this.board[ x ][ y ] = new Answer( bubble.possibilities[ 0 ] )
            return true
          }

          if ( true ) { }
          // Something to prove that this square is the only one in the section, row, or column that can fit
        }
      })
    })

    do {
      this.solve()
    } while ( solving === true )
  }
}

function filterContents( ...content ) {
  let contains = []
  content.forEach( item => {
    if ( item && !this.contains.includes( item ) ) this.contains.push( item )
  })
  return contains
}

class Answer {
  constructor( value ) {
    this.answer = value
  }
}

class Bubble {
  constructor( section, column, row ) {
    this.refresh( section, column, row )
  }

  refresh( section, column, row ) {
    this.possibilities = []
    for ( let option = 1; option <= 9; option++ ) {
      if ( !section.map( bubble => bubble.answer ).includes( option )
           && !row.map( bubble => bubble.answer ).includes( option )
           && !column.map( bubble => bubble.answer ).includes( option ) ) this.possibilities.push( option )
    }

    return this.possibilities
  }
}
