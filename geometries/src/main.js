import './style.css';
import * as t from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);

  // Check for pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Full-screen
window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Scene
const scene = new t.Scene();

/**
 * Axes helper
 *
 * const axesHelper = new t.AxesHelper();
 * scene.add(axesHelper);
 */

/**
 * Position and scale are Vector3
 * Rotation is Euler
 * We can use set method on both
 *.set(x, y, z)
 *
 * mesh.position.set(0.7, -0.6, 1);
 * mesh.scale.set(0.5, 0.25, 1.5);
 * mesh.rotation.set(1, 0.5, 3.14156);
 */

// Create geometry by own
const geometry = new t.BufferGeometry();
const position = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttribute = new t.BufferAttribute(position, 3);
geometry.setAttribute('position', positionAttribute);
const material = new t.MeshBasicMaterial({ color: 0xe3d8f2, wireframe: true });
const mesh = new t.Mesh(geometry, material);
scene.add(mesh);

/** For creating random triangles
const count = 25;
const position = new Float32Array(count * 3 * 3);
for (let i = 0; i < position.length; i++) {
  position[i] = (Math.random() - 0.5) * 5;
}
*/

// Camera
const camera = new t.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new t.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Orbit controls
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

const animate = () => {
  // Update controls
  control.update();
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
