define(function() {
    "use strict";

    // Define vertices for the square.
    var squareVertices = [
        0.5,  0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5,  -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    // Buffer constructor function.
    function Buffer(gl) {
        // Store gl context in instance.
        this._gl = gl;

        // Create a buffer on the gl context for vertex positions.
        _initSquareVertexBuffer.apply(this);
    };

    function _initSquareVertexBuffer() {
        // Create a buffer on the gl context for our vertex positions.
        this.squareVertexBuffer = this._gl.createBuffer();

        //  Activate VertexBuffer.
        this._gl.bindBuffer(
            this._gl.ARRAY_BUFFER, 
            this.squareVertexBuffer
        );

        // Load vertices into the buffer.
        this._gl.bufferData(
            this._gl.ARRAY_BUFFER,
            new Float32Array(squareVertices),
            this._gl.STATIC_DRAW
        );
    };

    return Buffer;
});
