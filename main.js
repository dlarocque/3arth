import './style.css'
import * as THREE from 'three'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 40;
camera.position.x = 0

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
const planetGeometry = new THREE.SphereGeometry(3, 24, 24);
const materialGeometry = new THREE.MeshStandardMaterial( {color: 0xff6347} );
const planet = new THREE.Mesh(planetGeometry, materialGeometry);

const redPlanetTexture = new THREE.TextureLoader().load('redplanet.jpeg');
const redPlanetGeometry = new THREE.SphereGeometry(5, 24, 24);
const redPlanetMaterial = new THREE.MeshBasicMaterial( { map: redPlanetTexture } );
const redPlanet = new THREE.Mesh(redPlanetGeometry, redPlanetMaterial);
redPlanet.position.x = 20
redPlanet.position.y = 20

scene.add(planet)
scene.add(redPlanet)

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

function animate() {
  requestAnimationFrame(animate);
  
  redPlanet.rotation.x += 0.001
  redPlanet.rotation.y += 0.003
  
  renderer.render(scene, camera);
}

animate();