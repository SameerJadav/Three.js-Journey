import './style.css';
import * as t from 'three';

// Scene
const scene = new t.Scene();

// Red cube
const geometry = new t.BoxGeometry(1, 1, 1);
const material = new t.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new t.Mesh(geometry, material);
scene.add(mesh);

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
