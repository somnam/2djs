// Sets the precision for floating point computation.
precision mediump float;
// Used to transform the vertex position.
// A uniform variable is constant for all the vertices.
uniform vec4 pixelColor;
void main(void) {
    gl_FragColor = pixelColor;
}

