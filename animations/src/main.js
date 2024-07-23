import * as THREE from 'three';
import gsap from 'gsap-trial';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('white');
document.body.appendChild(renderer.domElement);

const geometry = new THREE.ConeGeometry( 1, 2, 32 );
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
const cone = new THREE.Mesh(geometry, material);
scene.add(cone);

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(scene.position);

// gsap
gsap.to(cone.position, { duration: 2, delay: 1, x: 2});
gsap.to(cone.position, { duration: 2, delay: 2, x: 0});
gsap.to(cone.position, { duration: 2, delay: 3, x: -2});
gsap.to(cone.position, { duration: 2, delay: 4, x: 0});

// clock
let time = Date.now();
const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);

  // calculate deltaTime
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // set transform
  // rotate the cone
  // cone.rotation.x = clock.getElapsedTime() * 2 * Math.PI;
  cone.rotation.y += deltaTime * 0.01;
  // cone.rotation.z += deltaTime * 0.01;

//   // position the cone
//   cone.position.x = Math.sin(clock.getElapsedTime()) * 2;
//   cone.position.y = Math.cos(clock.getElapsedTime()) * 2;
//   cone.position.z = Math.cos(clock.getElapsedTime()) * 2;

//   // scale the cone
//   cone.scale.x = Math.sin(clock.getElapsedTime()) + 1;
//   cone.scale.y = Math.sin(clock.getElapsedTime()) + 1;
//   cone.scale.z = Math.sin(clock.getElapsedTime()) + 1;

  renderer.render(scene, camera);
};
animate();