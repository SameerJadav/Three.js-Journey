import * as t from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Textures
 */
const loadingManager = new t.LoadingManager();
const textureLoader = new t.TextureLoader(loadingManager);
const texture = textureLoader.load('/textures/minecraft.png');
texture.magFilter = t.NearestFilter;

/** Transformations

texture.rotation = Math.PI * 0.25;
texture.center.x = 0.5;
texture.center.y = 0.5;

texture.repeat.x = 2;
texture.repeat.y = 3;

texture.wrapS = t.RepeatWrapping;
texture.wrapT = t.RepeatWrapping;

texture.offset.x = 0.5;
texture.offset.y = 0.5;
*/

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new t.Scene();

/**
 * Object
 */
const geometry = new t.BoxGeometry(1, 1, 1);
const material = new t.MeshBasicMaterial({ map: texture });
const mesh = new t.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
