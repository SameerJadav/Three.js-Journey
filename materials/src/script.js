import * as t from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

/** Debug */
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new t.Scene();

/**
 * Texture
 */
const textureLoader = new t.TextureLoader();
const cubeTextureLoader = new t.CubeTextureLoader();

// Door
const alpha = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusion = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
);
const color = textureLoader.load('/textures/door/color.jpg');
const height = textureLoader.load('/textures/door/height.jpg');
const metalness = textureLoader.load('/textures/door/metalness.jpg');
const normal = textureLoader.load('/textures/door/normal.jpg');
const roughness = textureLoader.load('/textures/door/roughness.jpg');

// Gradient
const gradient3 = textureLoader.load('/textures/gradients/3.jpg');
gradient3.generateMipmaps = false;
gradient3.magFilter = t.NearestFilter;
gradient3.minFilter = t.NearestFilter;

// Matcaps
const matcaps4 = textureLoader.load('textures/matcaps/4.png');

// Environment
const environment = cubeTextureLoader.load([
  'textures/environmentMaps/0/px.jpg',
  'textures/environmentMaps/0/nx.jpg',
  'textures/environmentMaps/0/py.jpg',
  'textures/environmentMaps/0/ny.jpg',
  'textures/environmentMaps/0/pz.jpg',
  'textures/environmentMaps/0/nz.jpg',
]);
/**
 * Objects
 */

/** Mesh basic material 
const material = new t.MeshBasicMaterial();
material.transparent = true;
material.opacity = 0.5;
material.alphaMap = alpha;
*/

/** Mesh normal material 
const material = new t.MeshNormalMaterial();
material.flatShading = true;
*/

/** Mesh matcap material 
const material = new t.MeshMatcapMaterial();
material.matcap = matcaps4;
*/

/** Mesh depth material 
const material = new t.MeshDepthMaterial();
*/

/** Mesh lambert material
const material = new t.MeshPhongMaterial();
material.shininess = 100;
material.specular = new t.Color(0xff0000);
*/

/** Mesh toon material 
const material = new t.MeshToonMaterial();
material.gradientMap = gradient3;
*/

/** Mesh standard material 
const material = new t.MeshStandardMaterial();
material.roughness = 1;
material.metalness = 0;
material.map = color;
material.aoMap = ambientOcclusion;
material.aoMapIntensity = 1;
material.displacementMap = height;
material.displacementScale = 0.05;
material.metalnessMap = metalness;
material.roughnessMap = roughness;
material.normalMap = normal;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = alpha;
*/

const material = new t.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environment;

gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);

const sphere = new t.Mesh(new t.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

const plane = new t.Mesh(new t.PlaneGeometry(1, 1, 100, 100), material);

const torus = new t.Mesh(new t.TorusGeometry(0.3, 0.2, 64, 128), material);
torus.position.x = 1.5;

sphere.geometry.setAttribute(
  'uv2',
  new t.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
plane.geometry.setAttribute(
  'uv2',
  new t.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
torus.geometry.setAttribute(
  'uv2',
  new t.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(torus, sphere, plane);

/**
 * Lights
 */
const ambientLight = new t.AmbientLight(0xffffff, 0.5);

const pointLight = new t.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);

scene.add(ambientLight, pointLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new t.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new t.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new t.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
