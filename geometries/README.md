# Geometry

- `BufferGeometry()`: This creates a new BufferGeometry object.
- Store position(vertices) in `Float32Array`
  - Vertices are points in 3d space (0, 0, 0 = vertices on the center of space)
- Create a position attribute that has vertices data and the number of components per vertex (3 in this case, because we're working with 3D coordinates: x, y, and z).
- Set the position attribute to geometry
  - `setAttribute('position', bufferAttribute)`
  - The position is the name and we are sending the position(bufferAttribute)
- Add material
- Add material and geometry to mesh then add mesh to the scene
