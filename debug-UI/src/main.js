import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';
import gsap from 'gsap-trial';

const params = {
    color: '#ff0055',
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.set(0, 0, 1);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial( { color: params.color, wireframe: true } );

// cube
const cubeGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const cubeMesh = new THREE.Mesh(cubeGeometry, material);
scene.add(cubeMesh);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.rotateSpeed = 0.5;

// tweakpane
const pane = new Pane();
pane.hidden = true;

const tab = pane.addTab({ pages: [ { title: 'Normal' }, { title: 'Advanced' } ] });

const cubeFolder = tab.pages[0].addFolder({ title: 'Cube', expanded: false });

const positionFolder = cubeFolder.addFolder({ title: 'Position' });
positionFolder.addBinding(cubeMesh, 'position', { x: { min: -0.5, max: 0.5, step: 0.01, label: 'x' }, y: { min: -0.5, max: 0.5, step: 0.01, label: 'y' }, z: { min: -0.5, max: 0.5, step: 0.01, label: 'z' } });

cubeFolder.addBlade( { view: 'separator' } )

const rotationFolder = cubeFolder.addFolder({ title: 'Rotation', expanded: false });
rotationFolder.addBinding(cubeMesh.rotation, 'x', { min: -Math.PI, max: Math.PI, step: 0.01, label: 'x' });
rotationFolder.addBinding(cubeMesh.rotation, 'y', { min: -Math.PI, max: Math.PI, step: 0.01, label: 'y' });
rotationFolder.addBinding(cubeMesh.rotation, 'z', { min: -Math.PI, max: Math.PI, step: 0.01, label: 'z' });

cubeFolder.addBlade( { view: 'separator' } )

const scaleFolder = cubeFolder.addFolder({ title: 'Scale', expanded: false });
scaleFolder.addBinding(cubeMesh.scale, 'x', { min: 0, max: 2, step: 0.01, label: 'x' });
scaleFolder.addBinding(cubeMesh.scale, 'y', { min: 0, max: 2, step: 0.01, label: 'y' });
scaleFolder.addBinding(cubeMesh.scale, 'z', { min: 0, max: 2, step: 0.01, label: 'z' });

cubeFolder.addBlade( { view: 'separator' } )

const cameraFolder = cubeFolder.addFolder({ title: 'Camera' });
cameraFolder.addBinding(camera.position, 'z', { min: -2, max: 2, step: 0.01, label: 'Distance' });

cubeFolder.addBlade( { view: 'separator' } )

const colorFolder = cubeFolder.addFolder({ title: 'Color' });
colorFolder.addBinding(params, 'color', { view: 'color', color: { alpha: true }, picker: 'popup'}).on('change', (value) => {
    material.color.set(value.value);
});
colorFolder.addBinding(material, 'opacity', { min: 0, max: 1, step: 0.01, label: 'Opacity' });
colorFolder.addBinding(material, 'transparent', { label: 'Transparent' });

cubeFolder.addBlade( { view: 'separator' } )

cubeFolder.addBinding( cubeMesh, 'visible', { label: 'Visible' } );

cubeFolder.addBlade( { view: 'separator' } )

cubeFolder.addBinding(material, 'wireframe', { label: 'Wireframe' });

// logging changes to the console
// pane.on('change', (ev) => {
//   console.log('changed: ' + JSON.stringify(ev.value));
// });

// exporting the current state
const state = pane.exportState();
// console.log(state);
// we can import the state back using pane.importState(state);

// animation of cube in advanced tab
const cubeAnimationFolder = tab.pages[1].addFolder({ title: 'Animation of Cube', expanded: true });

const btnX = cubeAnimationFolder.addButton({ label: 'x', title: 'Animate' });
btnX.on('click', () => {
    gsap.to(cubeMesh.rotation, { duration: 1, x: cubeMesh.rotation.x + Math.PI * 2, ease: 'power2.inOut' });
});

const btnY = cubeAnimationFolder.addButton({ label: 'y', title: 'Animate' });
btnY.on('click', () => {
    gsap.to(cubeMesh.rotation, { duration: 1, y: cubeMesh.rotation.y + Math.PI * 2, ease: 'power2.inOut' });
});

const btnZ = cubeAnimationFolder.addButton({ label: 'z', title: 'Animate' });
btnZ.on('click', () => {
    gsap.to(cubeMesh.rotation, { duration: 1, z: cubeMesh.rotation.z + Math.PI * 2, ease: 'power2.inOut' });
});

// debug UI visibility
// for desktop users
document.addEventListener('keydown', (e) => {
    if (e.key === 'h') {
        pane.hidden = !pane.hidden;
    }
});
// for mobile users
let lastTapTime = 0;
let tapCount = 0;
let tapTimer = null;
let isTouchDevice = false;

document.addEventListener('touchend', handleTouchEnd);
document.addEventListener('dblclick', handleDoubleClick);

function handleTouchEnd(event) {
    isTouchDevice = true;

    // Check if the target is within the Tweakpane UI
    if (event.target.closest('.tp-dfwv')) {
        return; // Ignore touch events on the Tweakpane UI
    }

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    lastTapTime = currentTime;

    if (tapLength < 500 && tapLength > 0) {
        tapCount++;
        clearTimeout(tapTimer); // Clear any pending tap timer

        tapTimer = setTimeout(() => {
            console.log(`Tap count: ${tapCount}, Event type: ${event.type}`); // Debugging line
            if (tapCount === 1) {
                // Handle single tap if needed
            } else if (tapCount === 2) {
                // Double-tap logic
                console.log("Toggling fullscreen");
                toggleFullscreen();
            } else if (tapCount === 3) {
                // Triple-tap logic
                pane.hidden = !pane.hidden;
            }
            tapCount = 0; // Reset tap count after handling
        }, 300); // Short delay to wait for possible triple tap
    } else {
        tapCount = 1; // Reset for a new tap sequence
    }
}

function handleDoubleClick(event) {
    if (!isTouchDevice) {
        console.log("Toggling fullscreen on double-click");
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
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
