// Attribute keyword identifies data that changes for every vertex position.
attribute vec3 squareVertexPosition;
// Used to transform the vertex position.
uniform mat4 modelTransform;
void main(void) {
    gl_Position = modelTransform * vec4(squareVertexPosition, 1.0);
}
