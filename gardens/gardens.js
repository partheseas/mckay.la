

function playground1() {
  const inputElement = document.querySelector( '#input' );
  const outputElement = document.querySelector( '#output' );
  const garden = gardens.createScope().configure({
    stream: {
      write( data ) {
        outputElement.innerHTML += data;
      }
    },
    outputType: 'html',
    verbose: true
  })

  const input = [
    `garden.log( 'Hello there' );`,
    `garden.success( 'Done!' );`,
    `garden.debug({ currentState: {} });`,
    `garden.time();`,
    `garden.timeEnd();`,
    `garden.configure({\n  displayTime: true\n});`,
    `garden.fail( 'Oh no! :(' );`,
    `const { debug } = garden.bound();\ndebug( 'Shorter calls!' );`,
    `const scoped = garden.createScope( 'lib' );\nscoped.log( 'Logging from lib' );`
  ];

  let timingPosition = 0;
  const timingChunk = 43;

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
      new Function( 'garden', line ),
      timingPosition,
      garden
    );
    timingPosition += 300;
  });
}

playground1();
