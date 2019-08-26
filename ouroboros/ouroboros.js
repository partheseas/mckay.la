const snakeColor = '#edad62';
const backgroundColor = '#a1e868';
const nibbleColor = '#f79055';

let canvas;
let _2d;
let board = {};
let snake;
let direction;

function RNDM_RG( min, max ) {
    return Math.floor( ( Math.random() * ( ( max + 1 ) - min ) ) + min );
}

function v2( x, y ) {
  return { x: x, y: y };
}

function v2Add( a, b ) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
}

function v2Sub( a, b ) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}

function setup() {
  canvas = document.querySelector( '#screen' )
  _2d = canvas.getContext( '2d' );

  setSize();
  startGame();

  canvas.addEventListener( 'click', startGame );

  let initialX = null;
  let initialY = null;

  canvas.addEventListener( 'touchstart', touch => {
    initialX = touch.touches[0].clientX;
    initialY = touch.touches[0].clientY;

    touch.preventDefault();
    return false;
  })

  canvas.addEventListener( 'touchmove', touch => {
    if ( board.currentGame ) {
      touch.preventDefault();
      return false;
    }
  })

  canvas.addEventListener( 'touchend', touch => {
    if ( board.currentGame ) {
      let diffX = touch.changedTouches[0].clientX - initialX;
      let diffY = touch.changedTouches[0].clientY - initialY;

      if ( Math.abs( diffX ) > Math.abs( diffY ) ) {
        if ( diffX > 50 ) right();
        else if ( diffX < -50 ) left();
        else space();
      } else {
        if ( diffY > 50 ) down();
        else if ( diffY < -50 ) up();
        else space();
      }

      touch.preventDefault();
      return false;
    }
    
    else {
      space();
      touch.preventDefault();
      return false;
    }
  })
}

function setSize() {
  const dpr = window.devicePixelRatio || 1;
  const bounds = canvas.getBoundingClientRect();

  canvas.width = bounds.width * dpr;
  canvas.height = bounds.height * dpr;

  _2d.scale( bounds.width / 100 * dpr, bounds.height / 100 * dpr );

  board.gridSize = 14; // + 1 because 0 counts

  const fragments = ( board.gridSize + 1 ) * 6 + 1;
  board.cubeSize = 100 / fragments * 5;
  board.padding = 100 / fragments;

  _2d.fillStyle = backgroundColor;
  _2d.fillRect( 0, 0, 100, 100 );
}

function randomNibble() {
  const nibble = board.nibble = v2(
    RNDM_RG( 0, board.gridSize ),
    RNDM_RG( 0, board.gridSize )
  );

  const collision = snake.some( pos =>
    pos.x === nibble.x && pos.y === nibble.y
  );

  collision ? randomNibble() : drawNibble();
}

function drawNibble() {
  const nibblePosition = v2(
    board.nibble.x * ( board.cubeSize + board.padding ),
    board.nibble.y * ( board.cubeSize + board.padding )
  );

  _2d.fillStyle = nibbleColor;
  _2d.fillRect(
    nibblePosition.x + board.padding,
    nibblePosition.y + board.padding,
    board.cubeSize,
    board.cubeSize
  );
}

function drawSnake() {
  snake.forEach( coords => {
    const nextTilePosition = v2(
      coords.x * ( board.cubeSize + board.padding ),
      coords.y * ( board.cubeSize + board.padding )
    );

    _2d.fillStyle = snakeColor;
    _2d.fillRect(
      nextTilePosition.x + board.padding,
      nextTilePosition.y + board.padding,
      board.cubeSize,
      board.cubeSize
    );
  })
}

function startGame() {
  // Handle pausing
  if ( snake ) {
    if ( board.currentGame ) {
      document.body.style.overflow = 'unset';
      clearInterval( board.currentGame );
      board.currentGame = null;
    } else {
      document.body.style.overflow = 'hidden';
      board.currentGame = setInterval( update, 300 );
    }
    return;
  }

  // Game setup
  const middle = Math.ceil( board.gridSize / 2 );
  const center = v2( middle, middle );

  // Draw the background
  _2d.fillStyle = backgroundColor;
  _2d.fillRect( 0, 0, 100, 100 );

  // Create and draw the snake
  direction = [ v2(1,0), v2(-1,0), v2(0,1), v2(0,-1) ][RNDM_RG(0, 3)];
  snake = [ v2Add( center, direction ), center, v2Sub( center, direction ) ];
  drawSnake();

  // Draw the nibble
  randomNibble();
}

function update() {
  // Add the direction magnitude to the snakes head to determine the next tile
  // position logically and on the screen.
  const nextTile = v2Add( snake[0], direction );
  const nextTilePosition = v2(
    nextTile.x * ( board.cubeSize + board.padding ),
    nextTile.y * ( board.cubeSize + board.padding )
  );
  let ateTheNibble = false;

  // If the snakes head is on the nibble, don't draw over the tail for one
  // frame, so that it will be one tile longer. If we didn't eat the nibble, we
  // want to pop the tail off so that we don't report overlap when there shouldn't
  // actually be any.
  if ( nextTile.x === board.nibble.x && nextTile.y === board.nibble.y ) {
    ateTheNibble = true;
  } else {
    const oldTile = snake.pop();
    const oldTilePosition = v2(
      oldTile.x * ( board.cubeSize + board.padding ),
      oldTile.y * ( board.cubeSize + board.padding )
    );

    _2d.fillStyle = backgroundColor;
    _2d.fillRect(
      oldTilePosition.x + board.padding / 2,
      oldTilePosition.y + board.padding / 2,
      board.cubeSize + board.padding,
      board.cubeSize + board.padding
    );
  }

  // If the head will be touching any other pieces once it moves..
  const overlap = snake.some( coords => coords.x === nextTile.x && coords.y === nextTile.y );
  // ..or if you went over the edge, then you died! Restarting!
  if ( overlap
    || nextTile.x > board.gridSize || nextTile.x < 0
    || nextTile.y > board.gridSize || nextTile.y < 0
  ) {
    clearInterval( board.currentGame );
    snake = board.currentGame = null;

    return startGame();
  }

  // We didn't die, so move the snake and draw the head
  snake.unshift( nextTile );
  _2d.fillStyle = snakeColor;
  _2d.fillRect(
    nextTilePosition.x + board.padding,
    nextTilePosition.y + board.padding,
    board.cubeSize,
    board.cubeSize
  );

  // Now that the snakes collision map is finalized for the frame, we can
  // safely place the nibble.
  if ( ateTheNibble ) randomNibble();
}

function immediateUpdate() {
  clearInterval( board.currentGame );
  update();
  board.currentGame = setInterval( update, 300 );
}

function space() {
  startGame();
}

function up() {
  direction = v2( 0, -1 );
  immediateUpdate();
}

function down() {
  direction = v2( 0, 1 );
  immediateUpdate();
}

function left() {
  direction = v2( -1, 0 );
  immediateUpdate();
}

function right() {
  direction = v2( 1, 0 );
  immediateUpdate();
}

window.addEventListener( 'DOMContentLoaded', setup )
window.addEventListener( 'resize', () => {
  setSize();
  drawSnake();
  drawNibble();
})

window.addEventListener( 'keydown', key => {
  if ( key.keyCode === 32 ) {
    space();
    key.preventDefault();
    return false;
  }

  if ( board.currentGame ) {
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

    key.preventDefault();
    return false;
  }
})
