# Fullscreen and resizing

- `window.innerWidth && window.innerHeight` = 100vw && 100vh
- We need to update sizes to resize the window

  - width and height
  - camera aspect ratio i.e. `camera.aspect = sizes.width / sizes.height`
    - Must use `camera.updateProjectionMatrix()` if we are updating the camera aspect ratio
  - Renderer i.e. `renderer.setSize(sizes.width, sizes.height)`

  ```tsx
  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
  });
  ```

- Pixel ratio
  - 1 pr
  - 2 pr(4 times more pixels to render)
  - 3 pr(9 times more pixels to render)
- 2-pixel ratio is enough, limit the pixel ratio to 2 for better performance `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));`
  - we can put this code on resize function, people with multiple screens can have different pixel ratios and this will check for it
- We can go to full screen with `requestFullscreen()` on canvas and exit with `document.exitFullscreen()`
  - For safari use `webkitReequestFullscreen()` and `webkitExitFullscreen()`
