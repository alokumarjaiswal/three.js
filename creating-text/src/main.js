import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { Text } from 'troika-three-text';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// css2d renderer
const css2dRenderer = new CSS2DRenderer();
css2dRenderer.setSize( window.innerWidth, window.innerHeight );
css2dRenderer.domElement.style.position = 'absolute';
css2dRenderer.domElement.style.top = 0;
document.body.appendChild( css2dRenderer.domElement );

// css3d renderer
const css3dRenderer = new CSS3DRenderer();
css3dRenderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( css3dRenderer.domElement );

// sphere geometry
const geometry = new THREE.SphereGeometry( 1, 32, 32 );

// material
const material = new THREE.MeshBasicMaterial( { color: 'yellow' } );

// mesh
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// label object
const label = document.createElement( 'div' );
label.className = 'label1';
label.textContent = 'Hello, CSS2D!';
label.style.marginTop = '-1em';
const labelObj = new CSS2DObject( label );
labelObj.position.set( 0, 1, 0 );
sphere.add( labelObj );

// CSS3D object
const element = document.createElement( 'div' );
element.className = 'label2';
element.textContent = 'Hello, CSS3D!';  
const object = new CSS3DObject( element );
object.position.set( 0, 0, 0 );
scene.add( object );

// create text mesh
const text = new Text();
text.text = 'Hello, Troika!';
text.fontSize = 10;
text.position.set( 0, 0, 0 );
text.color = 'red';
text.anchorX = 'center';
text.anchorY = 'middle';

text.sync(() => {
    scene.add(mesh);
});


camera.position.z = 60;

function animate() {

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;

    renderer.render( scene, camera );
    css2dRenderer.render( scene, camera );

}

function objAnimate() {

    requestAnimationFrame( objAnimate );

    object.rotation.x += 0.01;

    css3dRenderer.render( scene, camera );

}
objAnimate();