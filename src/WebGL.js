"use strict";

var gLib;
if (!gLib) { gLib = {}; }

gLib.GL = function () { //
    var _GL     = null,
        _canvas = null;

    var initSquareVertexBuffer = function() {
        // Create a buffer on the webgl context for our vertex positions.
        var squareVertexBuffer = _GL.createBuffer();

        // Define vertices for the square.
        var squareVertices = [
            0.5,  0.5, 0.0,
            -0.5, 0.5, 0.0,
            0.5,  -0.5, 0.0,
            -0.5, -0.5, 0.0
        ];

        //  Activate VertexBuffer.
        _GL.bindBuffer(_GL.ARRAY_BUFFER, squareVertexBuffer);

        // Load vertices into the buffer.
        _GL.bufferData(
            _GL.ARRAY_BUFFER,
            new Float32Array(squareVertices),
            _GL.STATIC_DRAW
        );

        return squareVertexBuffer;
    };


    var compileShader = function(scriptId, shaderType) {
        // Get shader source from html.
        var source = document.getElementById(scriptId).firstChild.textContent;

        // Create the shader based on source type.
        var compiledShader = _GL.createShader(shaderType);
        // Compile the shader.
        _GL.shaderSource(compiledShader, source);
        _GL.compileShader(compiledShader);

        // Check for errors.
        if (!_GL.getShaderParameter(compiledShader, _GL.COMPILE_STATUS))
            alert(
                'An error occurred when compiling the shader: ' +
                _GL.getShaderInfoLog(compiledShader)
            );

        return compiledShader;
    };

    var initSimpleShaders = function() {
        // Load and compile the vertex and fragment shaders.
        var vertexShader   = compileShader('VertexShader', _GL.VERTEX_SHADER),
            fragmentShader = compileShader('FragmentShader', _GL.FRAGMENT_SHADER);

        // Link the shaders into a program.
        var shaderProgram = _GL.createProgram();
        _GL.attachShader(shaderProgram, vertexShader);
        _GL.attachShader(shaderProgram, fragmentShader);
        _GL.linkProgram(shaderProgram);

        // Check for linking errors.
        if (!_GL.getProgramParameter(shaderProgram, _GL.LINK_STATUS))
            alert('Error linking shaders.');

        return shaderProgram;
    };

    var initSquareVertexPosition = function(shaderProgram, squareVertexBuffer) {
        // Get a reference to SquareVertexPosition
        var squareVertexPosition = _GL.getAttribLocation(
            shaderProgram, "aSquareVertexPosition"
        );

        // Activate the vertex buffer.
        _GL.bindBuffer(_GL.ARRAY_BUFFER, squareVertexBuffer);

        // Describe the characteristic of the vertex position attribute.
        _GL.vertexAttribPointer(
            squareVertexPosition,
            // Each vertex element is a 3-float tuple (x, y, z)
            3,
            // Data type is FLOAT.
            _GL.FLOAT,
            // ?? Are we using normalized vectors.
            false,
            // Number of bytes to skip in between elements.
            0,
            // Offsets to the first element.
            0
        );

        return squareVertexPosition;
    };

    return {
        isSupported: function() { // {{{
            var isSupported = false;

            var dummyCanvas = document.createElement('canvas');
            if (dummyCanvas.getContext) {
                var context = dummyCanvas.getContext('2d');
                isSupported = !!(typeof context.fillText === 'function');
            }

            return isSupported;
        }, // }}}

        canvas: function(width, height, id) { // {{{
            var canvas = document.createElement('canvas');
            canvas.id  = id;
            canvas.width = (width || 0);
            canvas.height = (height || 0);

            document.body.appendChild(canvas);

            return canvas;
        }, // }}}

        initializeGL: function(width, height, id) { // {{{
            _canvas = this.canvas(width, height, id);

            _GL = (
                _canvas.getContext('webgl')
                || _canvas.getContext('experimental-webgl')
            );
        }, // }}}

        drawSquare: function() { // {{{
            // Initialize the vertex buffer.
            var squareVertexBuffer = initSquareVertexBuffer();

            // Load ad compile the vertex fragment shaders.
            var shaderProgram        = initSimpleShaders(),
                squareVertexPosition = initSquareVertexPosition(
                    shaderProgram, squareVertexBuffer
                );

            // Clear canvas.
            _GL.clearColor(0.0, 0.8, 0.0, 1.0);
            _GL.clear(_GL.COLOR_BUFFER_BIT);

            // Activate the shader program to use.
            _GL.useProgram(shaderProgram);

            // Enable the vertex position attribute.
            _GL.enableVertexAttribArray(squareVertexPosition);

            // Draw with the above settings.
            _GL.drawArrays(_GL.TRIANGLE_STRIP, 0, 4);
        }, // }}}
    };
}(); // }}}

function doGLDraw() {
    if (gLib.GL.isSupported()) {
        gLib.GL.initializeGL(640, 480, 'GLCanvas');
        gLib.GL.drawSquare();
    }
}
