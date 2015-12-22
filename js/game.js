define([
    'engine/core/webgl',
    'engine/core/buffer',
    'engine/core/shader',
    'engine/renderable',
], function(WebGL, Buffer, Shader, Renderable) {
    "use strict";

    function _draw(webgl, buffer, shader) { // {{{
        // Describe the characteristic of the vertex position attribute.
        shader.initSquareVertexPosition(buffer.squareVertexBuffer);

        // Create renderable squares.
        var whiteSquare = new Renderable(webgl.GL, shader),
            redSquare   = new Renderable(webgl.GL, shader);

        // Clear canvas.
        webgl.clear(0.0, 0.8, 0.0, 1.0);

        // Draw squares.
        // - white square
        whiteSquare.color = [1, 1, 1, 1];
        whiteSquare.initIdentityTransform(
            [-0.25, 0.25, 0.0],
            0.2,
            [1.2, 1.2, 1.0]
        );
        whiteSquare.draw();
        // - red square
        redSquare.color = [1, 0, 0, 1];
        redSquare.initIdentityTransform(
            [0.25, -0.25, 0.0],
            // Rotate the square by 45 degrees.
            -0.785,
            [0.4, 0.4, 1.0]
        );
        redSquare.draw();
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
                _draw(webgl, buffer, shader);
            }
        }, // }}}
    };
});
