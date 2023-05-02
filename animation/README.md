# Animations

Normal animation will be different on every device because of different framerates

Use the clock to sync animation on all devices

```tsx
const clock = new t.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  mesh.roatation.x = elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

animate();
```
