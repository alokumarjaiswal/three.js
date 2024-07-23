import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
// const camera = new THREE.OrthographicCamera(window.innerWidth / - 300, window.innerWidth / 300, window.innerHeight / 300, window.innerHeight / - 300, 0.1, 8.660254037844387);
const camera = new THREE.OrthographicCamera(-2 * aspectRatio, 2 * aspectRatio, 2, -2, 0.1, 8.660254037844387);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.TorusKnotGeometry( 1, 0.4, 100, 16 );
const material = new THREE.MeshBasicMaterial( { color: '#C0C0C0' } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

// cursor
const cursor = {
  x: 0,
  y: 0
};

// mousemove event
window.addEventListener('mousemove', (event) => {

  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = - (event.clientY / window.innerHeight - 0.5);

});

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// clock
const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);

  torusKnot.rotation.x = clock.getElapsedTime();
  // torusKnot.rotation.y = clock.getElapsedTime();

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5;
  // camera.position.y = cursor.y * 10;
  // camera.lookAt(scene.position);

  // update controls
  controls.update();

  renderer.render(scene, camera);
};
animate();

console.log(camera.position.length());  // 8.660254037844387