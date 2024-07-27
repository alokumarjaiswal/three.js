import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.z = 7;  

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
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
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

const doorColorTexture = textureLoader.load('textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('textures/door/alpha.jpg');
const doorHeightTexture = textureLoader.load('textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg');
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg');

const gradientTexture = textureLoader.load('textures/gradients/5.jpg');
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const matcapTexture = textureLoader.load('textures/matcaps/8.png');

// environment map
const environmentMapTexture = cubeTextureLoader.load([
    'textures/environmentMaps/4/px.png',
    'textures/environmentMaps/4/nx.png',
    'textures/environmentMaps/4/py.png',
    'textures/environmentMaps/4/ny.png',
    'textures/environmentMaps/4/pz.png',
    'textures/environmentMaps/4/nz.png',
]);

// Create a material
// 1. mesh basic material
// const material = new THREE.MeshBasicMaterial( { color: 'crimson', map: doorColorTexture } );

// material.map = doorColorTexture;

// material.color.set('green');
// material.color = new THREE.Color('green');
// material.color.set(0xff0000);
// material.color = new THREE.Color('rgb(255, 0, 0)');
// material.color = new THREE.Color('hsl(0, 100%, 50%)');
// material.color = new THREE.Color('#ff0000');
// material.color = new THREE.Color('#f');

// material.wireframe = true;

// material.opacity = 0.5;

// material.transparent = true;

// material.alphaMap = doorAlphaTexture;

// material.side = THREE.FrontSide;
// material.side = THREE.BackSide;
// material.side = THREE.DoubleSide;

// 2. mesh normal material
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.side = THREE.DoubleSide;

// 3. mesh matcap material
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// material.flatShading = true;
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;

// 4. mesh depth material - adjust camera near and far if not visible
// const material = new THREE.MeshDepthMaterial();
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.side = THREE.DoubleSide;

// 5. mesh lambert material
// const material = new THREE.MeshLambertMaterial();
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.side = THREE.DoubleSide;
// material.flatShading = true;
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;

// 6. mesh phong material
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);
// material.flatShading = true;
// material.opacity = 0.5;
// material.transparent = true;

// 7. mesh toon material
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// 8. mesh standard material
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45;
// material.roughness = 0.65;
// material.map = doorColorTexture;
// material.side = THREE.DoubleSide;
// material.flatShading = true;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1.5;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.displacementBias = -0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.1, 0.1);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// 9. mesh physical material
// const material = new THREE.MeshPhysicalMaterial();
// material.metalness = 0.45;
// material.roughness = 0.65;
// material.map = doorColorTexture;
// material.side = THREE.DoubleSide;
// material.flatShading = true;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1.5;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.displacementBias = -0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.1, 0.1);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// environment map using mesh standard material
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;

// 10. points material
// const material = new THREE.PointsMaterial(); // later

// 11. shader and raw shader material
// later

// 12. line basic material
const lineBasicMaterial = new THREE.LineBasicMaterial();
lineBasicMaterial.color = new THREE.Color('crimson');
lineBasicMaterial.linewidth = 10;
lineBasicMaterial.linecap = 'round';
lineBasicMaterial.linejoin = 'round';
lineBasicMaterial.dashSize = 0.1;
lineBasicMaterial.gapSize = 0.1;
lineBasicMaterial.transparent = true;
lineBasicMaterial.opacity = 0.5;

// 13. line dashed material
const lineDashedMaterial = new THREE.LineDashedMaterial();
lineDashedMaterial.color = new THREE.Color('crimson');
lineDashedMaterial.linewidth = 10;
lineDashedMaterial.scale = 2;
lineDashedMaterial.dashSize = 0.1;
lineDashedMaterial.gapSize = 0.1;
lineDashedMaterial.transparent = true;
lineDashedMaterial.opacity = 0.5;

// sprite material
const spriteMaterial = new THREE.SpriteMaterial();
spriteMaterial.map = doorColorTexture;
spriteMaterial.color = new THREE.Color('green');

// torus
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material);
scene.add(torus);
torus.position.x = -4;
// does it work without this? - yes, i dunno
torus.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(torus.geometry.attributes.uv.array, 2));

// sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
scene.add(sphere);
// does it work without this? - yes, i dunno
sphere.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(sphere.geometry.attributes.uv.array, 2));

// plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
scene.add(plane);
plane.position.x = 4;
console.log(plane.geometry.attributes);
// does it work without this? - yes, i dunno
plane.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2));

// line
const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]), lineBasicMaterial);
scene.add(line);

// line dashed
const lineDashed = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 1, 0), new THREE.Vector3(10, 1, 0)]), lineDashedMaterial);
lineDashed.computeLineDistances();
scene.add(lineDashed);

// sprite
const sprite = new THREE.Sprite(spriteMaterial);
scene.add(sprite);
sprite.position.z = -50;
sprite.scale.set(100, 100, 100);

// tweaking materials
const pane = new Pane();

const tab = pane.addTab({ pages: [ { title: 'Normal' }, { title: 'Advanced' } ] });

const torusFolder = tab.pages[0].addFolder({ title: 'Torus', expanded: false });

const torusScaleFolder = torusFolder.addFolder({ title: 'Scale' });
torusScaleFolder.addBinding(torus, 'scale', { x: { min: 0, max: 2, step: 0.01, label: 'x' }, y: { min: 0, max: 2, step: 0.01, label: 'y' }, z: { min: 0, max: 2, step: 0.01, label: 'z' } });

const sphereFolder = tab.pages[0].addFolder({ title: 'Sphere', expanded: false });

const sphereScaleFolder = sphereFolder.addFolder({ title: 'Scale' });
sphereScaleFolder.addBinding(sphere, 'scale', { x: { min: 0, max: 2, step: 0.01, label: 'x' }, y: { min: 0, max: 2, step: 0.01, label: 'y' }, z: { min: 0, max: 2, step: 0.01, label: 'z' } });

const planeFolder = tab.pages[0].addFolder({ title: 'Plane', expanded: false });

const planeScaleFolder = planeFolder.addFolder({ title: 'Scale' });
planeScaleFolder.addBinding(plane, 'scale', { x: { min: 0, max: 2, step: 0.01, label: 'x' }, y: { min: 0, max: 2, step: 0.01, label: 'y' }, z: { min: 0, max: 2, step: 0.01, label: 'z' } });

const materialFolder = tab.pages[1].addFolder({ title: 'Material' });

const materialColorFolder = materialFolder.addFolder({ title: 'Color' });
materialColorFolder.addBinding(material, 'color', { view: 'color', color: { alpha: true }, picker: 'popup'}).on('change', (value) => {
    material.color.set(value.value);
});

const materialOpacityFolder = materialFolder.addFolder({ title: 'Opacity' });
materialOpacityFolder.addBinding(material, 'opacity', { min: 0, max: 1, step: 0.01, label: 'Opacity' });    

const materialTransparentFolder = materialFolder.addFolder({ title: 'Transparent' });
materialTransparentFolder.addBinding(material, 'transparent', { label: 'Transparent' });

const materialWireframeFolder = materialFolder.addFolder({ title: 'Wireframe' });
materialWireframeFolder.addBinding(material, 'wireframe', { label: 'Wireframe' });  

const materialMetalnessFolder = materialFolder.addFolder({ title: 'Metalness' });
materialMetalnessFolder.addBinding(material, 'metalness', { min: 0, max: 1, step: 0.01, label: 'Metalness' });

const materialRoughnessFolder = materialFolder.addFolder({ title: 'Roughness' });
materialRoughnessFolder.addBinding(material, 'roughness', { min: 0, max: 1, step: 0.01, label: 'Roughness' });

const materialAmbientOcclusionIntensityFolder = materialFolder.addFolder({ title: 'Ambient Occlusion Intensity' });
materialAmbientOcclusionIntensityFolder.addBinding(material, 'aoMapIntensity', { min: 0, max: 1, step: 0.01, label: 'Intensity' });

const materialDisplacementScaleFolder = materialFolder.addFolder({ title: 'Displacement Scale' });
materialDisplacementScaleFolder.addBinding(material, 'displacementScale', { min: 0, max: 1, step: 0.01, label: 'Scale' });

const materialNormalScaleFolder = materialFolder.addFolder({ title: 'Normal Scale' });
materialNormalScaleFolder.addBinding(material.normalScale, 'x', { min: 0, max: 1, step: 0.01, label: 'x' });
materialNormalScaleFolder.addBinding(material.normalScale, 'y', { min: 0, max: 1, step: 0.01, label: 'y' });

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// point light
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(0, 5, 5);
// scene.add(pointLight);

// point light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);

// resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
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
function animate( time ) {

    // sphere
    sphere.rotation.x = time / 5000;
    sphere.rotation.y = time / 10000;

    // torus
    torus.rotation.x = time / 5000;
    torus.rotation.y = time / 10000;

    // plane
    plane.rotation.x = time / 5000;
    plane.rotation.y = time / 10000;

    // update controls
    controls.update();

    // render
    renderer.render(scene, camera);
}