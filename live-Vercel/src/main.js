import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { gsap } from 'gsap-trial';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

// vercel 
// inject analytics
inject();

// inject speed insights
injectSpeedInsights();

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.set(0, 0, 5);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxDistance = 9;

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Load Texture
const matcapTexture = textureLoader.load('textures/matcaps/3.png'); 

// Material
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;

// Font Loader
const fontLoader = new FontLoader();

// Load Font
fontLoader.load('fonts/optimer_regular.typeface.json',
    // onLoad callback function
    ( font ) => {
        const textGeometry = new TextGeometry('>.<', {
            font: font,
            size: 0.3,
            depth: 0,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });

        textGeometry.center();

        const text = new THREE.Mesh(textGeometry, material);
        scene.add(text);
    }
);

// donuts & laddoos
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const laddooGeometry = new THREE.SphereGeometry(0.3, 32, 32);

for (let i = 0; i < 121; i++) {

    const scale = Math.random();

    const donut = new THREE.Mesh(donutGeometry, material);
    donut.position.x = (Math.random() - 0.5) * 11;
    donut.position.y = (Math.random() - 0.5) * 11;
    donut.position.z = (Math.random() - 0.5) * 11;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    donut.scale.set(scale, scale, scale);
    scene.add(donut);

    const laddo = new THREE.Mesh(laddooGeometry, material);
    laddo.position.x = (Math.random() - 0.5) * 11;
    laddo.position.y = (Math.random() - 0.5) * 11;
    laddo.position.z = (Math.random() - 0.5) * 11;
    laddo.rotation.x = Math.random() * Math.PI;
    laddo.rotation.y = Math.random() * Math.PI;
    laddo.scale.set(scale, scale, scale);
    scene.add(laddo);
}

// animate camera zoom-in
gsap.to(camera.position, { duration: 3,
    z: 2,
    ease: 'power3.inOut',
    onUpdate: () => camera.updateProjectionMatrix()
});

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// handling touch or click
let isTouchDevice = false;
document.addEventListener( 'dblclick', handleDoubleClick, false );

function handleDoubleClick( event ) {
    if ( !isTouchDevice ) {
        toggleFullscreen();
    }
}

// fullscreen
function toggleFullscreen() {
    const doc = document.documentElement;

    if (!document.fullscreenElement) {
        if (doc.requestFullscreen) {
            doc.requestFullscreen();
        } else if (doc.mozRequestFullScreen) { // Firefox
            doc.mozRequestFullScreen();
        } else if (doc.webkitRequestFullscreen) { // Chrome, Safari and Opera
            doc.webkitRequestFullscreen();
        } else if (doc.msRequestFullscreen) { // IE/Edge
            doc.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

// animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// username animation
document.addEventListener('DOMContentLoaded', () => {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff']; // Pride colors
    const spans = document.querySelectorAll('.username span');

    spans.forEach((span, index) => {
        gsap.to(span, {
            duration: 1,
            color: colors[index % colors.length],
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.1 // Stagger the animation for a waving effect
        });
    });
});