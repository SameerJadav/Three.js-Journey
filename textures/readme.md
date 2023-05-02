# Textures

This happens under the hood:

```javascript
const image = new Image();
image.src = '/textures/door/color.jpg';
const texture = new t.Texture(image);
image.onload = () => {
  texture.needsUpdate = true;
};
```
