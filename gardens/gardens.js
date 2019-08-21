function playground1() {
  const inputElement = document.querySelector( '#input' );
  const outputElement = document.querySelector( '#output' );
  const garden = gardens.createScope().configure({
    stream: {
      write( data ) {
        outputElement.innerHTML += data;
      }
    },
    outputType: 'html'
  });

  const state = {
    a: true,
    b: 4,
    c: 'lorem',
    d: {
      ipsum: [ 1, 2, 3 ]
    },
    e: false
  };

  const input = [
    `garden.log( 'Hello there' );`,
    `garden.success( 'Done!' );\n`,
    `garden.configure({\n  verbose: true\n});\ngarden.debug( 'state:', state );\n`,
    `garden.time();`,
    `garden.timeEnd();\n`,
    `garden.configure({\n  displayTime: true\n});`,
    `garden.fail( 'Oh no! :(' );\n`,
    `const { debug } = garden.bound();\ndebug( 'Shorter calls!' );\n`,
    `const scoped = garden.createScope( 'lib' );\nscoped.log( 'Logging from lib' );`
  ];

  let timingPosition = 0;
  const timingChunk = 43;

  inputElement.innerHTML += '\n\n';

  input.forEach( line => {
    line += '\n';
    for ( let i = 0; i < line.length; i++ ) {
      setTimeout(
        () => {
          inputElement.innerHTML += line[ i ];
        },
        timingPosition
      );
      timingPosition += timingChunk;
    }

    setTimeout(
      new Function(
        'garden',
        'state',
        line
      ),
      timingPosition,
      garden,
      state
    );
    timingPosition += 300;
  });
}

playground1();
