import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshNormalMaterial( { wireframe: true } );

// cube
const cubeGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2, 2, 2, 2 );
const cubeMesh = new THREE.Mesh(cubeGeometry, material);
scene.add(cubeMesh);
cubeMesh.position.set(-3, 0, 0);

// cuboid
const cuboidGeometry = new THREE.BoxGeometry( 0.2, 0.3, 0.4, 2, 2, 2 );
const cuboidMesh = new THREE.Mesh(cuboidGeometry, material);
scene.add(cuboidMesh);
cuboidMesh.position.set(3, 0, 0);

// sphere
const sphereGeometry = new THREE.SphereGeometry( 0.2, 32, 32 );
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
scene.add(sphereMesh);
sphereMesh.position.set(0, 0, -3);

// capsule
const capsuleGeometry = new THREE.CapsuleGeometry( 0.1, 0.2, 8, 16 );
const capsuleMesh = new THREE.Mesh(capsuleGeometry, material);
scene.add(capsuleMesh);
capsuleMesh.position.set(0, 0, 3);

// circle
const circleGeometry = new THREE.CircleGeometry( 0.2, 32 );
const circleMesh = new THREE.Mesh(circleGeometry, material);
scene.add(circleMesh);
circleMesh.position.set(0, -3, 0);

// cone
const coneGeometry = new THREE.ConeGeometry( 0.2, 0.4, 32, 32, true, 0, Math.PI * 2 );
const coneMesh = new THREE.Mesh(coneGeometry, material);
scene.add(coneMesh);
coneMesh.position.set(0, 3, 0);

// cylinder
const cylinderGeometry = new THREE.CylinderGeometry( 0.2, 0.2, 0.4, 32, 32 , true, 0, Math.PI * 2 );
const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
scene.add(cylinderMesh);
cylinderMesh.position.set(-3, 3, 0);

// edges
const cubeEdges = new THREE.EdgesGeometry( cubeGeometry );
const cubeLine = new THREE.LineSegments( cubeEdges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( cubeLine );
cubeLine.position.set(0, 3, -3);

const cylinderEdges = new THREE.EdgesGeometry( cylinderGeometry );
const cylinderLine = new THREE.LineSegments( cylinderEdges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( cylinderLine );
cylinderLine.position.set(3, 3, 3);

// extrude
const length = 0.2, width = 0.2;

const shape = new THREE.Shape();
shape.moveTo( 0, 0 );
shape.lineTo( 0, width );
shape.lineTo( length, width );
shape.lineTo( length, 0 );
shape.lineTo( 0, 0 );

const extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2
};

const extrudeGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
const extrudeMesh = new THREE.Mesh( extrudeGeometry, material );
scene.add( extrudeMesh );
extrudeMesh.position.set(3, 0, 3);

// lathe
const points = [];
for ( let i = 0; i < 10; i ++ ) {
    points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}

const latheGeometry = new THREE.LatheGeometry( points );
const latheMesh = new THREE.Mesh( latheGeometry, material );
// scene.add( latheMesh );

// plane
const planeGeometry = new THREE.PlaneGeometry( 10, 10 );
const planeMesh = new THREE.Mesh(planeGeometry, material);
// scene.add(planeMesh);

// ring
const ringGeometry = new THREE.RingGeometry( 0.2, 0.4, 32 );
const ringMaterial = new THREE.MeshBasicMaterial( { wireframe: true, side: THREE.DoubleSide } );
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
scene.add(ringMesh);
ringMesh.position.set(3, -3, 0);

// shape
const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const shapeGeometry = new THREE.ShapeGeometry( heartShape );
const shapeMesh = new THREE.Mesh(shapeGeometry, material);
// scene.add(shapeMesh);
shapeMesh.position.set(-3, -3, 0);

// torus
const torusGeometry = new THREE.TorusGeometry( 0.2, 0.04, 16, 100, Math.PI * 2 );
const torusMesh = new THREE.Mesh(torusGeometry, material);
scene.add(torusMesh);
torusMesh.position.set(3, 3, 0);

// torus knot
const torusKnotGeometry = new THREE.TorusKnotGeometry( 0.2, 0.04, 100, 16 );
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material);
scene.add(torusKnotMesh);
torusKnotMesh.position.set(-3, -3, 0);

// tube
class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

const path = new CustomSinCurve( 10 );
const tubeGeometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
const tubeMesh = new THREE.Mesh( tubeGeometry, material )
// scene.add( tubeMesh )
tubeMesh.position.set( 0, 0, -5 )

// wireframe
const tubeWireframe = new THREE.WireframeGeometry( tubeGeometry );

const tubeLine = new THREE.LineSegments( tubeWireframe );
tubeLine.material.depthTest = false;
tubeLine.material.opacity = 0.25;
tubeLine.material.transparent = true;
// scene.add( tubeLine );

// buffer
const triangleGeometry = new THREE.BufferGeometry();

const count = 50;

const positions = new Float32Array( count * 3 * 3 );

for ( let i = 0; i < count * 3 * 3; i ++ ) {

    positions[ i ] = (Math.random() - 0.5) * 4;

}

triangleGeometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

const triangleMaterial = new THREE.MeshBasicMaterial( { color: 'crimson', wireframe: false } );

const triangleMesh = new THREE.Mesh( triangleGeometry, triangleMaterial );
scene.add( triangleMesh );

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
});

// fullscreen
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
     else {
        if (renderer.domElement.requestFullscreen) {
            renderer.domElement.requestFullscreen();
        } else if (renderer.domElement.webkitRequestFullscreen) {
            renderer.domElement.webkitRequestFullscreen();
        }
    }
});

function animate(time) {

    // cube
    cubeMesh.rotation.x = time / 2000;
    cubeMesh.rotation.y = time / 1000;

    // cuboid
    cuboidMesh.rotation.x = time / 2000;
    cuboidMesh.rotation.y = time / 1000;

    // sphere
    sphereMesh.rotation.x = time / 2000;
    sphereMesh.rotation.y = time / 1000;

    // capsule
    capsuleMesh.rotation.x = time / 2000;
    capsuleMesh.rotation.y = time / 1000;

    // circle
    circleMesh.rotation.x = time / 2000;
    circleMesh.rotation.y = time / 1000;

    // cone
    coneMesh.rotation.x = time / 2000;
    coneMesh.rotation.y = time / 1000;

    // cylinder
    cylinderMesh.rotation.x = time / 2000;
    cylinderMesh.rotation.y = time / 1000;

    // edges
    cubeLine.rotation.x = time / 2000;
    cubeLine.rotation.y = time / 1000;

    cylinderLine.rotation.x = time / 2000;
    cylinderLine.rotation.y = time / 1000;

    // extrude
    extrudeMesh.rotation.x = time / 2000;
    extrudeMesh.rotation.y = time / 1000;

    // lathe
    latheMesh.rotation.x = time / 2000;
    latheMesh.rotation.y = time / 1000;

    // plane
    planeMesh.rotation.x = time / 2000;
    planeMesh.rotation.y = time / 1000;

    // ring
    ringMesh.rotation.x = time / 2000;
    ringMesh.rotation.y = time / 1000;

    // shape
    shapeMesh.rotation.x = time / 2000;
    shapeMesh.rotation.y = time / 1000;

    // torus
    torusMesh.rotation.x = time / 2000;
    torusMesh.rotation.y = time / 1000;

    // torus knot
    torusKnotMesh.rotation.x = time / 2000;
    torusKnotMesh.rotation.y = time / 1000;

    // tube
    tubeMesh.rotation.x = time / 2000;
    tubeMesh.rotation.y = time / 1000;

    // wireframe
    tubeLine.rotation.x = time / 2000;
    tubeLine.rotation.y = time / 1000;

    // controls update
    controls.update();

    renderer.render(scene, camera);

}
