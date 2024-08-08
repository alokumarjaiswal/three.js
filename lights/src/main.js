import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.set(2, 2, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.rotateSpeed = 0.5;

const material = new THREE.MeshPhysicalMaterial();
material.roughness = 0.3;

// cube
const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const cubeMesh = new THREE.Mesh(cubeGeometry, material);
scene.add(cubeMesh);
cubeMesh.position.set(0, 0, 0.3);

// sphere
const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
scene.add(sphereMesh);
sphereMesh.position.set(0.5, 0.5, 0.3);

// torus
const torusGeometry = new THREE.TorusGeometry(0.2, 0.05, 16, 100);
const torusMesh = new THREE.Mesh(torusGeometry, material);
scene.add(torusMesh);
torusMesh.position.set(-0.5, -0.5, 0.3);

// plane
const planeGeometry = new THREE.PlaneGeometry(2, 2);
const planeMesh = new THREE.Mesh(planeGeometry, material);
scene.add(planeMesh);

// diamond
const diamondGeometry = new THREE.CylinderGeometry(0, 0.1, 0.2, 4, 1);
const diamondMesh = new THREE.Mesh(diamondGeometry, material);
scene.add(diamondMesh);
diamondMesh.position.set(0, 0, 1);
diamondMesh.rotateX(-Math.PI / 2);

// lights
// directional light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
directionalLight.position.set(1, 0, 1);
scene.add(directionalLight);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.07);
scene.add(ambientLight);

// hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
hemisphereLight.position.set(0, 0, 1);
scene.add(hemisphereLight);

// point light
const pointLight = new THREE.PointLight(0xff9000, 0.5, 0.5, 0.5);
pointLight.position.set(0, 0, 0.1);
scene.add(pointLight);

// rect area light
const rectAreaLightOne = new THREE.RectAreaLight(0x4e00ff, 1, 1, 1);
rectAreaLightOne.position.set(0, 0, 0.3);
rectAreaLightOne.lookAt(0, 0, 0);

const rectAreaLightTwo = new THREE.RectAreaLight(0x00ff00, 1, 1, 1);
rectAreaLightTwo.position.set(0.3, 0.3, 0.3);
rectAreaLightTwo.lookAt(0, 0, 0);

const rectAreaLightThree = new THREE.RectAreaLight(0xff0000, 1, 1, 1);
rectAreaLightThree.position.set(-0.3, -0.3, 0.3);
rectAreaLightThree.lookAt(0, 0, 0);

scene.add(rectAreaLightOne, rectAreaLightTwo, rectAreaLightThree);

// spot light
const spotLight = new THREE.SpotLight(0xff00ff, 0.5, 9, Math.PI * 0.1, 0, 2);
spotLight.position.set(1, -1, 1);
scene.add(spotLight);

spotLight.target.position.set(0, 0, 0);
scene.add(spotLight.target);

// light helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.1);
scene.add(directionalLightHelper);

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1);
scene.add(hemisphereLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectAreaLightHelperOne = new RectAreaLightHelper(rectAreaLightOne);
scene.add(rectAreaLightHelperOne);

const rectAreaLightHelperTwo = new RectAreaLightHelper(rectAreaLightTwo);
scene.add(rectAreaLightHelperTwo);

const rectAreaLightHelperThree = new RectAreaLightHelper(rectAreaLightThree);
scene.add(rectAreaLightHelperThree);

// tweakpane
const pane = new Pane();

const tab = pane.addTab({ pages: [{ title: 'Normal' }, { title: 'Advanced' }] });

const cubeFolder = tab.pages[0].addFolder({ title: 'Cube', expanded: false });

cubeFolder.addBinding(cubeMesh, 'position', {  x: { min: -0.5, max: 0.5, step: 0.01, label: 'x' }, y: { min: -0.5, max: 0.5, step: 0.01, label: 'y' }, z: { min: -0.5, max: 0.5, step: 0.01, label: 'z' } });
cubeFolder.addBinding(cubeMesh, 'scale', { x: { min: 0, max: 2, step: 0.01, label: 'x' }, y: { min: 0, max: 2, step: 0.01, label: 'y' }, z: { min: 0, max: 2, step: 0.01, label: 'z' } });

tab.pages[0].addBlade({ view: 'separator' });

const sphereFolder = tab.pages[0].addFolder({ title: 'Sphere', expanded: false });

sphereFolder.addBinding(sphereMesh, 'position', {  x: { min: -0.5, max: 0.5, step: 0.01, label: 'x' }, y: { min: -0.5, max: 0.5, step: 0.01, label: 'y' }, z: { min: -0.5, max: 0.5, step: 0.01, label: 'z' } });
sphereFolder.addBinding(sphereMesh, 'scale', { x: { min: 0, max: 2, step: 0.01, label: 'x' }, y: { min: 0, max: 2, step: 0.01, label: 'y' }, z: { min: 0, max: 2, step: 0.01, label: 'z' } });

tab.pages[0].addBlade({ view: 'separator' });

const torusFolder = tab.pages[0].addFolder({ title: 'Torus', expanded: false });

torusFolder.addBinding(torusMesh, 'position', {  x: { min: -0.5, max: 0.5, step: 0.01, label: 'x' }, y: { min: -0.5, max: 0.5, step: 0.01, label: 'y' }, z: { min: -0.5, max: 0.5, step: 0.01, label: 'z' } });
torusFolder.addBinding(torusMesh, 'scale', { x: { min: 0, max: 2, step: 0.01, label: 'x' }, y: { min: 0, max: 2, step: 0.01, label: 'y' }, z: { min: 0, max: 2, step: 0.01, label: 'z' } });

tab.pages[0].addBlade({ view: 'separator' });

const diamondFolder = tab.pages[0].addFolder({ title: 'Diamond', expanded: false });

diamondFolder.addBinding(diamondMesh, 'position', {  x: { min: -0.5, max: 0.5, step: 0.01, label: 'x' }, y: { min: -0.5, max: 0.5, step: 0.01, label: 'y' }, z: { min: -0.5, max: 0.5, step: 0.01, label: 'z' } });
diamondFolder.addBinding(diamondMesh, 'scale', { x: { min: 0, max: 2, step: 0.01, label: 'x' }, y: { min: 0, max: 2, step: 0.01, label: 'y' }, z: { min: 0, max: 2, step: 0.01, label: 'z' } });

tab.pages[0].addBlade({ view: 'separator' });

tab.pages[0].addBinding({ removeHelpers: true }, 'removeHelpers', { label: 'Helpers' }).on('change', (value) => {
    if (value.value) {
        scene.add(directionalLightHelper, hemisphereLightHelper, pointLightHelper, spotLightHelper, rectAreaLightHelperOne, rectAreaLightHelperTwo, rectAreaLightHelperThree);
    } else {
        scene.remove(directionalLightHelper, hemisphereLightHelper, pointLightHelper, spotLightHelper, rectAreaLightHelperOne, rectAreaLightHelperTwo, rectAreaLightHelperThree);
    }
});

const materialFolder = tab.pages[1].addFolder({ title: 'Material', expanded: false });

materialFolder.addBinding(material, 'roughness', { min: 0, max: 1, step: 0.01, label: 'Roughness' });

const lightFolder = tab.pages[1].addFolder({ title: 'Light', expanded: false });

const directionalLightFolder = lightFolder.addFolder({ title: 'Directional Light', expanded: false });
directionalLightFolder.addBinding(directionalLight, 'color', { label: 'Color' });
directionalLightFolder.addBinding(directionalLight, 'intensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });

const ambientLightFolder = lightFolder.addFolder({ title: 'Ambient Light', expanded: false });
ambientLightFolder.addBinding(ambientLight, 'color', { label: 'Color' });
ambientLightFolder.addBinding(ambientLight, 'intensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });

const hemisphereLightFolder = lightFolder.addFolder({ title: 'Hemisphere Light', expanded: false });
hemisphereLightFolder.addBinding(hemisphereLight, 'color', { label: 'Color' });
hemisphereLightFolder.addBinding(hemisphereLight, 'groundColor', { label: 'Ground Color' });
hemisphereLightFolder.addBinding(hemisphereLight, 'intensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });

const pointLightFolder = lightFolder.addFolder({ title: 'Point Light', expanded: false });
pointLightFolder.addBinding(pointLight, 'color', { label: 'Color' });
pointLightFolder.addBinding(pointLight, 'intensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });
pointLightFolder.addBinding(pointLight, 'distance', { min: 0, max: 2, step: 0.01, label: 'Distance' });
pointLightFolder.addBinding(pointLight, 'decay', { min: 0, max: 2, step: 0.01, label: 'Decay' });

const rectAreaLightFolder = lightFolder.addFolder({ title: 'Rect Area Light', expanded: false });
rectAreaLightFolder.addBinding(rectAreaLightOne, 'color', { label: 'Color' });
rectAreaLightFolder.addBinding(rectAreaLightOne, 'intensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });
rectAreaLightFolder.addBinding(rectAreaLightOne, 'width', { min: 0, max: 2, step: 0.01, label: 'Width' });
rectAreaLightFolder.addBinding(rectAreaLightOne, 'height', { min: 0, max: 2, step: 0.01, label: 'Height' });

rectAreaLightFolder.addBlade({ view: 'separator' });

rectAreaLightFolder.addBinding(rectAreaLightTwo, 'color', { label: 'Color' });
rectAreaLightFolder.addBinding(rectAreaLightTwo, 'intensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });
rectAreaLightFolder.addBinding(rectAreaLightTwo, 'width', { min: 0, max: 2, step: 0.01, label: 'Width' });
rectAreaLightFolder.addBinding(rectAreaLightTwo, 'height', { min: 0, max: 2, step: 0.01, label: 'Height' });

rectAreaLightFolder.addBlade({ view: 'separator' });

rectAreaLightFolder.addBinding(rectAreaLightThree, 'color', { label: 'Color' });
rectAreaLightFolder.addBinding(rectAreaLightThree, 'intensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });
rectAreaLightFolder.addBinding(rectAreaLightThree, 'width', { min: 0, max: 2, step: 0.01, label: 'Width' });
rectAreaLightFolder.addBinding(rectAreaLightThree, 'height', { min: 0, max: 2, step: 0.01, label: 'Height' });

const spotLightFolder = lightFolder.addFolder({ title: 'Spot Light', expanded: false });
spotLightFolder.addBinding(spotLight, 'color', { label: 'Color' });
spotLightFolder.addBinding(spotLight, 'intensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });
spotLightFolder.addBinding(spotLight, 'distance', { min: 0, max: 2, step: 0.01, label: 'Distance' });
spotLightFolder.addBinding(spotLight, 'angle', { min: 0, max: Math.PI, step: 0.01, label: 'Angle' });
spotLightFolder.addBinding(spotLight, 'penumbra', { min: 0, max: 1, step: 0.01, label: 'Penumbra' });
spotLightFolder.addBinding(spotLight, 'decay', { min: 0, max: 2, step: 0.01, label: 'Decay' });

// resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// animate
function animate(time) {

    cubeMesh.rotation.x = time / 10000;
    cubeMesh.rotation.y = time / 5000;

    sphereMesh.rotation.x = time / 10000;
    sphereMesh.rotation.y = time / 5000;

    torusMesh.rotation.x = time / 10000;
    torusMesh.rotation.y = time / 5000;

    diamondMesh.rotation.y = time / 10000;

    controls.update();

    renderer.render(scene, camera);
}