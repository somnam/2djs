// Attribute keyword identifies data that changes for every vertex position.
attribute vec3 aSquareVertexPosition;
void main(void) {
    gl_Position = vec4(aSquareVertexPosition, 1.0);
}
