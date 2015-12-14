define([
    'engine/core/webgl',
    'engine/core/buffer',
    'engine/core/shader',
], function(WebGL, Buffer, Shader) {
    "use strict";

    function _drawSquare(webgl, buffer, shader) { // {{{
        // Describe the characteristic of the vertex position attribute.
        var squareVertexPosition = shader.initSquareVertexPosition(
            buffer.squareVertexBuffer
        );

        // Clear canvas.
        webgl.clear(0.0, 0.8, 0.0, 1.0);

        // Activate the shader program to use.
        webgl.GL.useProgram(shader.program);

        // Enable the vertex position attribute.
        webgl.GL.enableVertexAttribArray(squareVertexPosition);

        // Draw with the above settings.
        webgl.GL.drawArrays(webgl.GL.TRIANGLE_STRIP, 0, 4);
    }; // }}}

    return {
        initialize: function() { // {{{
            if (WebGL.isSupported()) {
                var webgl  = new WebGL(640, 480, 'GLCanvas');

                // Initialize the vertex buffer.
                var buffer = new Buffer(webgl.GL);

                // Load ad compile the vertex fragment shaders.
                var shader = new Shader(
                    webgl.GL, 'VertexShader', 'FragmentShader'
                );

                // Draw square ;).
                _drawSquare(webgl, buffer, shader);
            }
        }, // }}}
    };
});
