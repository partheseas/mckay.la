let _2d;
let board = {};
let snake;
let direction;

let snakeColor = '#edad62'
let backgroundColor = '#a1e868'
let nibbleColor = '#f79055'

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
  _2d = document.getElementById( 'screen' ).getContext( '2d' )
  setSize()
  startGame()
}

function setSize() {
  let screen = document.getElementById( 'screen' );
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

  _2d.fillStyle = backgroundColor
  _2d.fillRect( board.widthMargin, board.heightMargin,
    window.innerWidth - board.widthMargin * 2, window.innerHeight - board.heightMargin * 2 )
}

function randomNibble() {
  let nibble = board.nibble = v2( RNDM_RG( 0, board.gridSize ), RNDM_RG( 0, board.gridSize ) )

  let collision = snake.some( pos => {
    return pos.x === nibble.x && pos.y === nibble.y
  })

  collision ? randomNibble() : drawNibble()
}

function drawNibble() {
  let nibblePosition = v2( board.nibble.x * ( board.cubeSize + board.innerPadding ), board.nibble.y * ( board.cubeSize + board.innerPadding ) )

  _2d.fillStyle = nibbleColor
  _2d.fillRect( board.widthMargin + nibblePosition.x + board.innerPadding, board.heightMargin + nibblePosition.y + board.innerPadding, board.cubeSize, board.cubeSize )
}

function drawSnake() {
  snake.forEach( coords => {
    let nextTilePosition = v2( coords.x * ( board.cubeSize + board.innerPadding ), coords.y * ( board.cubeSize + board.innerPadding ) )

    _2d.fillStyle = snakeColor
    _2d.fillRect( board.widthMargin + nextTilePosition.x + board.innerPadding, board.heightMargin + nextTilePosition.y + board.innerPadding, board.cubeSize, board.cubeSize )
  })
}

function startGame() {
  // Handle pausing
  if ( snake ) {
    if ( board.currentGame ) {
      clearInterval( board.currentGame )
      board.currentGame = null
    } else {
      board.currentGame = setInterval( update, 300 )
    }
    return
  }

  // Game setup
  let center = v2( Math.ceil(board.gridSize / 2), Math.ceil(board.gridSize / 2) );

  // Draw the background
  _2d.fillStyle = backgroundColor
  _2d.fillRect( board.widthMargin, board.heightMargin,
    window.innerWidth - board.widthMargin * 2, window.innerHeight - board.heightMargin * 2 )

  // Create and draw the snake
  direction = [ v2(1,0), v2(-1,0), v2(0,1), v2(0,-1) ][RNDM_RG(0, 3)];
  snake = [ v2Add( center, direction ), center, v2Sub( center, direction ) ];
  drawSnake()

  // Draw the nibble
  randomNibble()
}

function update() {
  // Add the direction magnitude to the snakes head to determine the next tile
  // position logically and on the screen.
  let nextTile = v2Add( snake[0], direction );
  let nextTilePosition = v2( nextTile.x * ( board.cubeSize + board.innerPadding ), nextTile.y * ( board.cubeSize + board.innerPadding ) )
  let ateTheNibble = false;

  // If the snakes head is on the nibble, don't draw over the tail for one
  // frame, so that it will be one tile longer. If we didn't eat the nibble, we
  // want to pop the tail off so that we don't report overlap when there shouldn't
  // actually be any.
  if ( nextTile.x === board.nibble.x && nextTile.y === board.nibble.y ) {
    ateTheNibble = true
  } else {
    let oldTile = snake.pop();
    let oldTilePosition = v2( oldTile.x * ( board.cubeSize + board.innerPadding ), oldTile.y * ( board.cubeSize + board.innerPadding ) );
    _2d.fillStyle = backgroundColor
    _2d.fillRect( board.widthMargin + oldTilePosition.x + board.innerPadding - 2, board.heightMargin + oldTilePosition.y + board.innerPadding - 2,
      board.cubeSize + 4, board.cubeSize + 4 )
  }

  // If the head will be touching any other pieces once it moves..
  let overlap = snake.some( coords => coords.x === nextTile.x && coords.y === nextTile.y )
  // ..or if you went over the edge, then you died! Restarting!
  if ( nextTile.x > board.gridSize || nextTile.x < 0 || nextTile.y > board.gridSize || nextTile.y < 0 || overlap ) {
    clearInterval( board.currentGame )
    snake = board.currentGame = null

    return startGame()
  }

  // We didn't die, so move the snake and draw the head
  snake.unshift( nextTile )
  _2d.fillStyle = snakeColor
  _2d.fillRect( board.widthMargin + nextTilePosition.x + board.innerPadding, board.heightMargin + nextTilePosition.y + board.innerPadding, board.cubeSize, board.cubeSize )

  // Now that the snakes collision map is finalized for the frame, we can
  // safely place the nibble.
  if ( ateTheNibble ) randomNibble()
}

function immediateUpdate() {
  clearInterval( board.currentGame )
  update()
  board.currentGame = setInterval( update, 300 )
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
window.addEventListener( 'click', startGame )
window.addEventListener( 'resize', () => {
  setSize()
  drawSnake()
  drawNibble()
})

window.addEventListener( 'keydown', key => {
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

let initialX = null
let initialY = null

window.addEventListener( 'touchstart', touch => {
  initialX = touch.touches[0].clientX
  initialY = touch.touches[0].clientY

  touch.preventDefault()
  return false
})

window.addEventListener( 'touchend', touch => {
  let diffX = touch.changedTouches[0].clientX - initialX
  let diffY = touch.changedTouches[0].clientY - initialY

  if ( Math.abs( diffX ) > Math.abs( diffY ) ) {
    if ( diffX > 50 ) right()
    else if ( diffX < -50 ) left()
    else space()
  } else {
    if ( diffY > 50 ) down()
    else if ( diffY < -50 ) up()
    else space()
  }

  touch.preventDefault()
  return false
})
