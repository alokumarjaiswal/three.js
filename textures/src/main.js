import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.set(0, 0, 5);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
document.body.appendChild(renderer.domElement);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// loading manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
loadingManager.onLoad = function ( ) {
    console.log( 'Loading complete!');
}
loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

// texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);

// color texture
const colorTexture = textureLoader.load('textures/door/color.jpg');

// alpha texture
const alphaTexture = textureLoader.load('textures/door/alpha.jpg');

// height texture
const heightTexture = textureLoader.load('textures/door/height.jpg');

// normal texture
const normalTexture = textureLoader.load('textures/door/normal.jpg');

// ambient occlusion texture
const ambientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg');

// metalness texture
const metalnessTexture = textureLoader.load('textures/door/metalness.jpg');

// roughness texture
const roughnessTexture = textureLoader.load('textures/door/roughness.jpg');

// minecraft texture - diamond block
const minecraftTexture = textureLoader.load('textures/minecraft.png');

// checkerbord - 8x8 pixels
const checkerboardTexture = textureLoader.load('textures/checkerboard-8x8.png');

// checkerbord - 1024x1024 pixels - moire pattern
const checkerboardLargeTexture = textureLoader.load('textures/checkerboard-1024x1024.png');

// // tranformation of textures
// // repeat
// colorTexture.repeat.set(2, 3);
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// // offset
// colorTexture.offset.set(0.5, 0.5);

// // rotation
// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.set(0.5, 0.5);

// filtering and mipmapping
// minification filter
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;

alphaTexture.generateMipmaps = false;
alphaTexture.minFilter = THREE.NearestFilter;

ambientOcclusionTexture.generateMipmaps = false;
ambientOcclusionTexture.minFilter = THREE.NearestFilter;

minecraftTexture.generateMipmaps = false;
minecraftTexture.minFilter = THREE.NearestFilter;

checkerboardTexture.generateMipmaps = false;
checkerboardTexture.minFilter = THREE.NearestFilter;

checkerboardLargeTexture.generateMipmaps = false;
checkerboardLargeTexture.minFilter = THREE.NearestFilter;

// magnification filter
colorTexture.magFilter = THREE.NearestFilter;
alphaTexture.magFilter = THREE.NearestFilter;
ambientOcclusionTexture.magFilter = THREE.NearestFilter;    
// checkerboardTexture.magFilter = THREE.NearestFilter;
minecraftTexture.magFilter = THREE.NearestFilter;
checkerboardLargeTexture.magFilter = THREE.NearestFilter;

// material
const doorMaterial = new THREE.MeshBasicMaterial({ map: colorTexture,
    alphaMap: alphaTexture, aoMap: ambientOcclusionTexture,
    side: THREE.DoubleSide,
    transparent: true, alphaTest: 0.5, aoMapIntensity: 1
});

const checkerboardMaterial = new THREE.MeshBasicMaterial({ map: checkerboardTexture });

const checkerboardLargeMaterial = new THREE.MeshBasicMaterial({ map: checkerboardLargeTexture });

const minecraftMaterial = new THREE.MeshBasicMaterial({ map: minecraftTexture });

// door cube
const doorGeometry = new THREE.BoxGeometry();
const door = new THREE.Mesh(doorGeometry, doorMaterial);
scene.add(door);

// minecraft cube
const minecraftGeometry = new THREE.BoxGeometry();
const minecraftDiamondBlock = new THREE.Mesh(minecraftGeometry, minecraftMaterial);
scene.add(minecraftDiamondBlock);
minecraftDiamondBlock.position.x = -5;

// sphere
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
const sphere = new THREE.Mesh(sphereGeometry, checkerboardLargeMaterial);
scene.add(sphere);
sphere.position.x = 5;

// torus
const torusGeometry = new THREE.TorusGeometry(1.5, 0.2, 64, 128);
const torus = new THREE.Mesh(torusGeometry, checkerboardMaterial);
scene.add(torus);
torus.position.x = 5;

// torusknot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
const torusKnot = new THREE.Mesh(torusKnotGeometry, minecraftMaterial);
scene.add(torusKnot);
torusKnot.position.x = -5;

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

// resize
window.addEventListener('resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );

});

// animate
const animate = function () {

    requestAnimationFrame(animate);
    
    // door
    door.rotation.x += 0.01;
    door.rotation.y += 0.01;

    // sphere
    sphere.rotation.x += 0.01;
    sphere.rotation.y += -0.01;

    // torus
    torus.rotation.x += 0.01;

    // torusknot
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    
    // controls update
    controls.update();
    
    renderer.render(scene, camera);

};
animate();