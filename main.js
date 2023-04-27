import './style.css';
import * as t from 'three';

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
group.position.z = 0.5;
group.rotation.y = 0.5;
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

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

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
renderer.render(scene, camera);
