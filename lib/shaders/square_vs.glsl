// Attribute keyword identifies data that changes for every vertex position.
attribute vec3 squareVertexPosition;
// Used to transform the vertex position.
uniform mat4 modelTransform;
// View-Projection transform. It transforms the vertex positions
// from Model Space into World Space system.
uniform mat4 viewProjectionTransform;
void main(void) {
    // First operation transforms the vertex position from Model Space
    // to World Space. The second operation transforms from World Space
    // to the user-defined Normalized Device Coordinate.
    // The order of operations is important here.
    gl_Position = viewProjectionTransform * modelTransform * vec4(squareVertexPosition, 1.0);
}
