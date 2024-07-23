import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

// axes helper
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const group = new THREE.Group();
scene.add( group );

const cubeA = new THREE.Mesh(
    new THREE.BoxGeometry( 1, 1, 1 ),
    new THREE.MeshBasicMaterial( { color: 'crimson' } )
);
group.add( cubeA );

const cubeB = new THREE.Mesh(
    new THREE.BoxGeometry( 1, 1, 1 ),
    new THREE.MeshBasicMaterial( { color: 'lime' } )
);
cubeB.position.x = -2;
group.add( cubeB );

const cubeC = new THREE.Mesh(
    new THREE.BoxGeometry( 1, 1, 1 ),
    new THREE.MeshBasicMaterial( { color: 'dodgerblue' } )
);
cubeC.position.x = 2;
group.add( cubeC );

group.position.y = 2;
group.scale.set( 2, 0.5, 0.5 );
group.rotation.set( Math.PI / 4, Math.PI / 4, 0 );

const material = new THREE.MeshBasicMaterial( { color: 'crimson' } );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// cube.position.x = 1;
// cube.position.y = 1;
// cube.position.z = 3;

cube.position.set( 6, 2, 3 );

// cube.scale.x = 2;
// cube.scale.y = 0.5;
// cube.scale.z = 0.5;

cube.scale.set( 2, 0.5, 0.5 );

cube.rotation.reorder( 'YXZ' ); // default is 'XYZ'

// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;

cube.rotation.set( Math.PI / 4, Math.PI / 4, 0 );

// camera.position.z = 10;
camera.position.set( 10, 10, 10 );
// camera.lookAt( cube.position );
camera.lookAt( scene.position );

renderer.render( scene, camera );