var _2d;
var board = {};
var snake;
var direction;

function RNDM_RG(min, max, base) {
    return Math.floor( ( Math.random() * ( ( max + 1 ) - min ) ) + min )
}

function v2( x, y ) {
  return { x: x, y: y }
}

function v2Add( a, b ) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  }
}

function v2Sub( a, b ) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  }
}

function setup() {
  setSize()
  _2d = document.getElementById( 'screen' ).getContext( '2d' )
}

function setSize() {
  var screen = document.getElementById( 'screen' );
  screen.width = window.innerWidth
  screen.height = window.innerHeight

  board.outerSize = Math.min( window.innerHeight, window.innerWidth )
  board.innerSize = board.outerSize * 0.9;
  board.cubeSize = board.outerSize * 0.05;
  board.innerPadding = board.innerSize * 0.01;
  // The grid is actually "1 bigger" than this, because we start counting at 0
  board.gridSize = 14

  if ( window.innerHeight > window.innerWidth ) {
    board.widthMargin = window.innerWidth * 0.05;
    board.heightMargin = ((window.innerHeight - window.innerWidth) / 2) + board.widthMargin;
  } else if ( window.innerHeight < window.innerWidth ) {
    board.heightMargin = window.innerHeight * 0.05;
    board.widthMargin = ((window.innerWidth - window.innerHeight) / 2) + board.heightMargin;
  } else {
    board.widthMargin = board.heightMargin = window.innerHeight * 0.05;
  }
}

function randomNibble() {
  var nibble = board.nibble = v2( RNDM_RG( 0, board.gridSize ), RNDM_RG( 0, board.gridSize ) );
  var nibblePosition = v2( nibble.x * ( board.cubeSize + board.innerPadding ), nibble.y * ( board.cubeSize + board.innerPadding ) )

  var collisionFree = !snake.some( function ( pos ) {
    return pos.x === nibble.x && pos.y === nibble.y
  })

  if ( collisionFree ) {
    _2d.fillStyle = '#000000'
    _2d.fillRect( board.widthMargin + nibblePosition.x + board.innerPadding, board.heightMargin + nibblePosition.y + board.innerPadding, board.cubeSize, board.cubeSize )
  } else {
    randomNibble()
  }
}

function startGame() {
  var center = v2( Math.ceil(board.gridSize / 2), Math.ceil(board.gridSize / 2) );

  if ( !snake ) {
    direction = [ v2(1,0), v2(-1,0), v2(0,1), v2(0,-1) ][RNDM_RG(0, 3)];
    snake = [ v2Add( center, direction ), center, v2Sub( center, direction ) ];

    _2d.fillStyle = '#b4bbfa'
    _2d.fillRect( board.widthMargin, board.heightMargin,
      window.innerWidth - board.widthMargin * 2, window.innerHeight - board.heightMargin * 2 )

    randomNibble();

    snake.forEach( function ( coords ) {
      var nextTilePosition = v2( coords.x * ( board.cubeSize + board.innerPadding ), coords.y * ( board.cubeSize + board.innerPadding ) )

      _2d.fillStyle = '#2d32a4'
      _2d.fillRect( board.widthMargin + nextTilePosition.x + board.innerPadding, board.heightMargin + nextTilePosition.y + board.innerPadding, board.cubeSize, board.cubeSize )
    })

    board.currentGame = setInterval( update, 300 )
  } else {
    if ( board.currentGame ) {
      clearInterval( board.currentGame )
      board.currentGame = null
    } else {
      board.currentGame = setInterval( update, 300 )
    }
  }

  // Draw the base snake here
}

function update() {
  if ( !snake.fed ) {
    var oldTile = snake.pop();
    var oldTilePosition = v2( oldTile.x * ( board.cubeSize + board.innerPadding ), oldTile.y * ( board.cubeSize + board.innerPadding ) );
    _2d.fillStyle = '#b4bbfa'
    _2d.fillRect( board.widthMargin + oldTilePosition.x + board.innerPadding - 1, board.heightMargin + oldTilePosition.y + board.innerPadding - 1,
      board.cubeSize + 2, board.cubeSize + 2 )
  } else snake.fed = false

  var nextTile = v2Add( snake[0], direction );
  var nextTilePosition = v2( nextTile.x * ( board.cubeSize + board.innerPadding ), nextTile.y * ( board.cubeSize + board.innerPadding ) )

  var masturbating = snake.some( function ( coords ) {
    return coords.x === nextTile.x && coords.y === nextTile.y
  })

  if ( nextTile.x > board.gridSize || nextTile.x < 0 || nextTile.y > board.gridSize || nextTile.y < 0 || masturbating ) {
    clearInterval( board.currentGame )
    snake = board.currentGame = null

    startGame()
    return false
  }

  snake.unshift( nextTile )

  if ( nextTile.x === board.nibble.x && nextTile.y === board.nibble.y ) {
    snake.fed = true
    randomNibble()
  }

  _2d.fillStyle = '#2d32a4'
  _2d.fillRect( board.widthMargin + nextTilePosition.x + board.innerPadding, board.heightMargin + nextTilePosition.y + board.innerPadding, board.cubeSize, board.cubeSize )
  return true
}

function immediateUpdate() {
  clearInterval( board.currentGame )
  if ( update() ) board.currentGame = setInterval( update, 300 )
}

function space() {
  startGame()
}

function up() {
  direction = v2(0,-1)
  immediateUpdate()
}

function down() {
  direction = v2(0,1)
  immediateUpdate()
}

function left() {
  direction = v2(-1,0)
  immediateUpdate()
}

function right() {
  direction = v2(1,0)
  immediateUpdate()
}

window.addEventListener( 'DOMContentLoaded', setup )
window.addEventListener( 'resize', setSize )

window.addEventListener( 'keydown', function ( key ) {
  switch ( key.keyCode ) {
    case 32: space(); break;
    case 65:
    case 37: left();  break;
    case 87:
    case 38: up();    break;
    case 68:
    case 39: right(); break;
    case 83:
    case 40: down();  break;
  }
})
