import * as THREE from 'three'; // Import the three.js library

// Scene is the container for all objects in the scene
const scene = new THREE.Scene();

// Camera is the object that sees the scene from a certain perspective and angle of view (field of view) and renders it to the renderer object (which is the canvas element)
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );


// Renderer is the object that renders the scene to the canvas element (which is the domElement of the renderer object)
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement ); // domElement is the canvas element that the renderer uses to display the scene to us

// Geometry is the object that defines the shape of the object (cube, sphere, etc.) and its vertices, faces, etc.
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

// Material is the object that defines the color, texture, etc. of the object
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

// Mesh is the object that combines the geometry and material objects to create the object that we see in the scene
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// Function that animates the cube object by rotating it on the x and y axes by 0.01 radians each time the function is called
function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;


	renderer.render( scene, camera );

}