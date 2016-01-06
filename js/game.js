define([
    'engine/core/webgl',
    'engine/core/buffer',
    'engine/core/shader',
    'engine/renderable',
    'engine/camera',
], function(WebGL, Buffer, Shader, Renderable, Camera) {
    "use strict";

    // World Coordinate and Viewport params.
    var canvasBackground   = [0.9, 0.9, 0.9, 1.0],
        viewportBackground = [0.8, 0.8, 0.8, 1.0],
        // Coordinate values are in pixels.
        viewportCoords     = [
            20,  // X position of the bottom-left viewport corner.
            40,  // Y position of the bottom-left viewport corner.
            600, // Width of the viewport area.
            300, // Height of the viewport area.
        ],
        // Why (20, 60) and 20? What's the refence and scale here?
        viewportCenter     = [20, 60],
        viewportWidth      = 20;

    function _drawSquares(webgl, shader, viewport) { // {{{
        // Create renderable squares.
        var blueSquare        = new Renderable(webgl.GL, shader),
            redSquare         = new Renderable(webgl.GL, shader),
            topLeftSquare     = new Renderable(webgl.GL, shader),
            topRightSquare    = new Renderable(webgl.GL, shader),
            bottomRightSquare = new Renderable(webgl.GL, shader),
            bottomLeftSquare  = new Renderable(webgl.GL, shader);

        // Centre blue, slightly rotated 5x5 square.
        blueSquare.init({
            color:    [0.25, 0.25, 0.95, 1],
            position: [20, 60],
            scale:    [5, 5],
            rotation: 0.2,
            viewport: viewport,
        }).draw();

        // Centre red, 2x2 square.
        redSquare.init({
            color:    [1.0, 0.25, 0.25, 1.0],
            position: [20, 60],
            scale:    [2, 2],
            viewport: viewport,
        }).draw();

        // Corner squares.
        topLeftSquare.init({
            color:    [0.9, 0.1, 0.1, 1],
            position: [10, 65],
            viewport: viewport,
        }).draw();
        topRightSquare.init({
            color:    [0.1, 0.9, 0.1, 1],
            position: [30, 65],
            viewport: viewport,
        }).draw();
        bottomRightSquare.init({
            color:    [0.1, 0.1, 0.9, 1],
            position: [30, 55],
            viewport: viewport,
        }).draw();
        bottomLeftSquare.init({
            color:    [0.1, 0.1, 0.1, 1],
            position: [10, 55],
            viewport: viewport,
        }).draw();
    }; // }}}

    function _draw(webgl, buffer, shader) { // {{{
        // Describe the characteristic of the vertex position attribute.
        shader.initSquareVertexPosition(buffer.squareVertexBuffer);

        // Prepare a viewport for the World Coordinate System.
        var camera   = new Camera(webgl);
        var viewport = camera.init({
            canvasBackground:   canvasBackground,
            viewportBackground: viewportBackground,
            viewportCoords:     viewportCoords,
            viewportCenter:     viewportCenter,
            viewportWidth:      viewportWidth,
        }).setupViewport();

        // Draw squares.
        _drawSquares(webgl, shader, viewport);
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
