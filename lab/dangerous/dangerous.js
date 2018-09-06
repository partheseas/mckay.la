let modal = {
    show( time ) {
        modal.title.innerHTML = time ? "You took " + time + " seconds c:" : "You lost :c"
        modal.button.innerHTML = time ? "Yay c:" : "Aww :c"
        modal.wrapper.style.display = 'block'
    },

    close() {
        modal.wrapper.style.display = "none"
    }
}

let grid = null

document.addEventListener( 'DOMContentLoaded', function () {
  modal.wrapper = document.getElementById( 'floating' )
  modal.element = document.getElementById( 'modal' )
  modal.title = document.getElementById( 'modal-title' )
  modal.button = document.getElementById( 'modal-okay' )
  modal.closeButton = document.getElementById( 'modal-close' )
  let gridElement = document.getElementById( 'grid' )

  modal.button.addEventListener( 'click', () => {
    gridElement.innerHTML = ''
    grid = new Grid()
    grid.render( gridElement )
    modal.close()
  })

  modal.closeButton.addEventListener( 'click', () => {
    modal.close()

    let restart = document.createElement( 'button' )
    restart.innerHTML = 'New game'
    document.body.appendChild( restart )

    restart.addEventListener( 'click', () => {
      gridElement.innerHTML = ''
      grid = new Grid()
      grid.render( gridElement )
      document.body.removeChild( restart )
    })
  })

  gridElement.addEventListener( 'click', event => {
    let mine = event.target
    let isMine = mine.getAttribute( 'data-mine' )

    if ( !grid.disabled ) {
      if ( isMine === 'true' && mine.className === 'default' ) {
        grid.disabled = true
        mine.className = 'explosion'
        setTimeout( modal.show, 1000 )
      } else if ( isMine === 'false' ) {
        let x = parseInt( mine.getAttribute( 'data-x' ) )
        let y = parseInt( mine.getAttribute( 'data-y' ) )
        grid.check( x, y )
      }
    }
  })

  gridElement.addEventListener( 'contextmenu', event => {
    let mine = event.target

    if ( !grid.disabled ) {
      switch ( mine.className ) {
        case "default":
          mine.className = "marked"
          break
        case "marked":
          mine.className = "question"
          break
        case "question":
          mine.className = "default"
          break
      }
    }

    event.preventDefault()
    return false
  })

  grid = new Grid()
  grid.render( gridElement )
})

class Grid {
  constructor() {
    this.layout = []

    this.height = 12
    this.width = 12
    this.mines = 20

    for ( let row = 0; row < this.height; row++ ) {
      this.layout[ row ] = []
      for ( let column = 0; column < this.width; column++ ) {
        this.layout[ row ][ column ] = {
          checked: false,
          mine: false
        }
      }
    }

    for ( let mine = 0; mine < this.mines; mine++ ) {
      let x = Math.floor( Math.random() * this.width )
      let y = Math.floor( Math.random() * this.height )

      this.layout[ x ][ y ].mine ? mine-- : this.layout[ x ][ y ].mine = true
    }

    // Do this last, so setup time doesn't count against the player
    this.start = new Date()
  }

  point( x, y ) {
    return this.layout[ x ] && this.layout[ x ][ y ]
  }

  touchingPoints( x, y ) {
    return [ [x-1, y-1], [x, y-1], [x+1, y-1],
             [x-1, y  ],           [x+1, y  ],
             [x-1, y+1], [x, y+1], [x+1, y+1] ].filter( point => {
               let [ x, y ] = point
               return this.point( x, y ) && !this.point( x, y ).checked
    })
  }

  render( gridElement ) {
    this.layout.forEach( ( row, x ) => {
      let rowElement = document.createElement( 'tr' )
      gridElement.appendChild( rowElement )

      row.forEach( ( location, y ) => {
        let locationElement = document.createElement( 'td' )

        locationElement.className = 'default'

        locationElement.setAttribute( 'data-mine', location.mine )
        locationElement.setAttribute( 'data-x', x )
        locationElement.setAttribute( 'data-y', y )

        rowElement.appendChild( locationElement )

        location.element = locationElement
      })
    })

    this._gridElement = gridElement
  }

  check( checkX, checkY ) {
    let location = this.layout[ checkX ][ checkY ]

    let points = this.touchingPoints( checkX, checkY )
    let surroundingMines = 0

    points.forEach( point => {
      let [ x, y ] = point
      this.layout[ x ][ y ].mine && surroundingMines++
    } )

    location.checked = true
    location.element.className = 'checked'
    if ( surroundingMines ) location.element.innerHTML = surroundingMines
    else {
      points.forEach( point => {
        let [ x, y ] = point
        this.check( x, y )
      })
    }

    if ( !this.layout.some( ( row, x ) => {
      return row.some( ( location, y ) => {
        return !location.checked && !location.mine
      })
    }) ) {
      let finish = new Date()
      let time = Math.round( (finish.getTime() - this.start.getTime()) / 1000 )

      modal.show( time )
    }
  }
}
