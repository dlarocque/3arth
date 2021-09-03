import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 40;
camera.position.y = 3;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 12, 12);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

// Planet
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earthGeometry = new THREE.SphereGeometry(3, 24, 24);
const earthMaterial = new THREE.MeshStandardMaterial( { map: earthTexture } );
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

const marsTexture = new THREE.TextureLoader().load('redplanet.jpeg');
const marsGeometry = new THREE.SphereGeometry(5, 24, 24);
const marsMaterial = new THREE.MeshBasicMaterial( { map: marsTexture } );
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.x = 20;
mars.position.y = 20;

scene.add(earth);
scene.add(mars);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

scene.add(pointLight, ambientLight);

/*
 * Rotate the camera around the Y axis at (0,0,0)
 */
function rotateCameraY(camera, rotation) {
  const radians = rotation * (Math.PI / 180)
  const sin = Math.sin(radians);
  const cos = Math.cos(radians);

  const newX = camera.position.x * cos - camera.position.z * sin;
  const newZ = camera.position.x * sin + camera.position.z * cos;

  camera.position.x = newX;
  camera.position.z = newZ;
}

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.x += 0.0001;
  earth.rotation.y += 0.005;

  mars.rotation.x += 0.0001;
  mars.rotation.y += 0.002;

  rotateCameraY(camera, 0.1);
  
  renderer.render(scene, camera);
}

animate();