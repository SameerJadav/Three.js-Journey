import './style.css';
import * as t from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

// Sizes
const sizes = {
  width: 600,
  height: 400,
};

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

// Group
const group = new t.Group();
scene.add(group);

const cube1 = new t.Mesh(
  new t.BoxGeometry(1, 1, 1),
  new t.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new t.Mesh(
  new t.BoxGeometry(1, 1, 1),
  new t.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -1;
group.add(cube2);

const cube3 = new t.Mesh(
  new t.BoxGeometry(1, 1, 1),
  new t.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 1;
group.add(cube3);

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

// Orbit controls
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

/**Animation
 * gsap.to(group.position, { duration: 1, delay: 1, y: 2 });
 * gsap.to(group.position, { duration: 1, delay: 2, y: 0 });
 */

const animate = () => {
  /**
   * Change the posiotoin of camera
   * camera.position.x = cursor.x * 10;
   * camera.position.y = cursor.y * 10;
   */

  /**
   * Rotate the camera
   * camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
   * camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
   * camera.position.y = cursor.y * 3;
   */

  // Update controls
  control.update();
  camera.lookAt(group.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
