import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface Point {
  x: number,
  y: number
}

interface Tile {
  checked: boolean,
  mine: boolean,
  point: Point,
  state: TileState,
  surroundingMines: number
}

type TileState = 'default' | 'marked' | 'question';

type Layout = Tile[][];

interface MinefieldProps {
  grid: Grid
}

const Minefield = ( { grid }: MinefieldProps ) => {
  const [ showModal, setShowModal ] = useState( true );

  const checkTile = tile => () => grid.checkLocation( tile );

  const toggleState = tile => {
    return event => {
      grid.rotateState( tile );
      event.preventDefault();
      return false;
    };
  };

  const startNewGame = () => {
    // Set this back to true so the modal will show on the next victory if it was dismissed.
    setShowModal( true );
    grid.buildLayout();
    grid.render();
  };

  const setProperty = prop => event => {
    const value = parseInt( event.target.value );
    if ( value > 1 ) {
      grid[ prop ] = value;
      startNewGame();
    }
  };

  return <>
    { grid.completed && showModal && <div id="floating">
      <div id="modal">
        <h1 id="modal-title">{
          grid.victory
            ? `You took ${(( grid.completed - grid.start ) / 1000).toFixed( 1 )} seconds c:`
            : `You blew up a mine :c`
        }</h1>
        <button id="modal-okay" onClick={startNewGame}>{
          grid.victory
            ? 'Yay c:'
            : 'Aww :c'
        }</button>
        <button id="modal-close" onClick={() => setShowModal( false )}>See it</button>
      </div>
    </div> }

    <table>
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        { grid.layout.map( ( column, x ) =>
          <tr key={`${x}`}>{
            column.map( ( tile, y ) => <td key={`${x}-${y}`}
              onClick={checkTile( tile )}
              onContextMenu={toggleState( tile )}
              className={`${tile.state} ${tile.checked ? 'checked' : ''} ${tile.mine ? 'mine' : ''}`}>{
              tile.surroundingMines || ''
            }</td> )
          }</tr>
        ) }
        { grid.completed && !showModal && <tr><td colSpan={grid.width} onClick={startNewGame}>New game</td></tr> }
      </tbody>
    </table>

    <section id="options">
      <label>Rows</label>
      <input type="number" value={grid.width} min="3" onChange={setProperty( 'width' )} />
      <label>Columns</label>
      <input type="number" value={grid.height} min="3" onChange={setProperty( 'height' )} />
      <label>Mines</label>
      <input type="number" value={grid.mines} min="1" onChange={setProperty( 'mines' )} />
    </section>
  </>
}

class Grid {
  layout: Layout;
  width: number = 12;
  height: number = 12;
  mines: number = 20;

  start: number;
  completed: number;
  victory: boolean;

  constructor() {
    this.buildLayout();
  }

  buildLayout() {
    this.layout = [];

    for ( let x = 0; x < this.width; x++ ) {
      this.layout[ x ] = [];
      
      for ( let y = 0; y < this.height; y++ ) {
        this.layout[ x ][ y ] = {
          checked: false,
          mine: false,
          point: { x, y },
          state: 'default',
          surroundingMines: 0
        };
      }
    }

    for ( let i = 0; i < this.mines; i++ ) {
      const x = Math.floor( Math.random() * this.width );
      const y = Math.floor( Math.random() * this.height );

      this.layout[ x ][ y ].mine
        ? i--
        : this.layout[ x ][ y ].mine = true;
    }

    // Reset the timing/completion properties before returning
    this.start = Date.now();
    this.completed = null;
    this.victory = false;
  }

  tile( point: Point ): Tile {
    return this.layout[ point.x ] && this.layout[ point.x ][ point.y ];
  }

  neighborTiles( tile: Tile ): Tile[] {
    const { x, y } = tile.point;
    const touching = [
      [ x - 1, y - 1 ], [ x, y - 1 ], [ x + 1, y - 1 ],
      [ x - 1, y     ],               [ x + 1, y     ],
      [ x - 1, y + 1 ], [ x, y + 1 ], [ x + 1, y + 1 ]
    ];

    // There might be positions in this array that don't exist
    // if the origin is on the edge of the board.
    return touching
      .map( ([ x, y ]) => this.tile({ x, y }) )
      .filter( location => location && !location.checked );
  }

  checkLocation( tile: Tile, skipRender?: boolean ) {
    const neighbors = this.neighborTiles( tile );
    const surroundingMines = neighbors.filter( neighbor => neighbor.mine ).length;

    // Mark the tile as checked before we start doing anything recursive
    tile.checked = true;

    // If it's a mine, we're done
    if ( tile.mine ) this.completed = Date.now();
    // If there aren't any mines surrounding the file, then we can check all
    // of them automatically to save the player a few clicks
    else if ( neighbors.length > 0 && surroundingMines === 0 ) {
      neighbors.forEach( tile => this.checkLocation( tile, true ) );
    }
    // Show how many mines surround the tile
    else tile.surroundingMines = surroundingMines;
    
    // Things that should not be done from recursive calls
    if ( !skipRender ) {
      const mysteries = this.layout.some(
        row => row.some( location => !location.checked && !location.mine )
      );  

      if ( !mysteries ) {
        this.completed = Date.now();
        this.victory = true;
      }

      this.render();
    }
  }

  rotateState( tile: Tile ) {
    if ( tile.state === 'default' ) tile.state = 'marked';
    else if ( tile.state === 'marked' ) tile.state = 'question';
    else if ( tile.state === 'question' ) tile.state = 'default';

    this.render();
  }

  render() {
    ReactDOM.render(
      <Minefield grid={this} />,
      document.querySelector( '#minefield' )
    );
  }
}

new Grid().render();
