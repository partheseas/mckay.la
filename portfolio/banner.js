import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer
} from 'three';

window.addEventListener( 'DOMContentLoaded', () => {
  const banner = document.querySelector( '#banner' );
  const canvas = document.querySelector( '#display' );
  const renderer = new WebGLRenderer({
    canvas
  });

  function aspect() {
    const box = banner.getBoundingClientRect();
    const height = box.height;
    const width = box.width;
    renderer.setSize( width, height );

    return width / height;
  }

  const scene = new Scene();
  const camera = new PerspectiveCamera( 50, aspect(), 0.1, 1000 );
  
  window.addEventListener( 'resize', () => {
    camera.aspect = aspect();
    camera.updateProjectionMatrix();
    renderer.render( scene, camera );
  });

  function makeCube( size ) {
    const geometry = new BoxGeometry( size, size, size );
    // const material = new MeshLambertMaterial();
    const material = new MeshNormalMaterial();
    const cube = new Mesh( geometry, material );
    scene.add( cube );

    return cube;
  }

  // function makeSphere( size ) {
  //   const geometry = new SphereGeometry( size );
  //   // const material = new MeshLambertMaterial({
  //   //   color: 0xa300ff
  //   // });
  //   const material = new MeshNormalMaterial();
  //   const cube = new Mesh( geometry, material );
  //   scene.add( cube );

  //   return cube;
  // }

  // for ( let i = 0; i < 100; i++ ) {
  //   const each = makeSphere( 1 );
  //   each.position.x = i * 4;
  //   each.position.z = -50;
  // }

  const a = makeCube( 6 );
  const b = makeCube( 6 );
  b.rotation.x = b.rotation.y = b.rotation.z = Math.PI / 4;
  
  camera.position.z = 5;

  // const controls = new OrbitControls( camera );

  function render() {
    // Update scene geometry
    a.rotation.x += 0.004;
    a.rotation.y += 0.004;
    b.rotation.x -= 0.005;
    b.rotation.y -= 0.005;
    // controls.update();
    renderer.render( scene, camera );

    // Request next frame
    requestAnimationFrame( render );
  }

  // Expose canvas element and being loop
  banner.style.backgroundColor = 'transparent';
  render();
});
