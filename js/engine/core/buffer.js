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
    function Buffer(webgl) {
        // Store webgl context in instance.
        this._webgl = webgl;

        // Create a buffer on the webgl context for vertex positions.
        _initSquareVertexBuffer.apply(this);
    };

    function _initSquareVertexBuffer() {
        // Create a buffer on the webgl context for our vertex positions.
        this.squareVertexBuffer = this._webgl.createBuffer();

        //  Activate VertexBuffer.
        this._webgl.bindBuffer(
            this._webgl.ARRAY_BUFFER, 
            this.squareVertexBuffer
        );

        // Load vertices into the buffer.
        this._webgl.bufferData(
            this._webgl.ARRAY_BUFFER,
            new Float32Array(squareVertices),
            this._webgl.STATIC_DRAW
        );
    };

    return Buffer;
});
