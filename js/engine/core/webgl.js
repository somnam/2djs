define(['matrix'], function(Matrix) {
    "use strict";

    var viewportCoords = [
        20,  // X position of the bottom-left viewport corner.
        40,  // Y position of the bottom-left viewport corner.
        600, // Width of the viewport area.
        300, // Height of the viewport area.
    ];

    function _defineCoordinateSystem() { /// {{{
        var viewMatrix     = Matrix.mat4.create(),
            projMatrix     = Matrix.mat4.create(),
            // View-Projection matrix.
            viewportMatrix = Matrix.mat4.create();

        // Define the view and projection matrix.

        // Defines the center of WC to be looked at (20, 60).
        Matrix.mat4.lookAt(viewMatrix,
            [20, 60, 10], // Camera position.
            [20, 60, 0],  // Look at position.
            [0, 1, 0]     // Orientation.
        );
        // Defines the distance from the center position to the left and right
        // boundaries to be 10 units and to the top and bottom boundaries to
        // be 5 units away.
        Matrix.mat4.ortho(projMatrix,
            -10,    // Distance to left of WC.
             10,    // Distance to right of WC.
             -5,    // Distance to bottom of WC.
              5,    // Distance to top of WC.
              0,    // Z-distance to near plane.
           1000     // Z-distance to far plane.
       );

       // Concatenate view and projection matrix to form the View-Projection
       // operator.
       Matrix.mat4.multiply(viewportMatrix, projMatrix, viewMatrix);

       return viewportMatrix;
    }; // }}}


    function WebGL() { // {{{
        _createCanvas.apply(this, arguments);
        _initGL.apply(this);
    }; // }}}

    function _createCanvas(width, height, id) { // {{{
        var canvas    = document.createElement('canvas');
        canvas.id     = id;
        canvas.width  = (width || 0);
        canvas.height = (height || 0);

        document.body.appendChild(canvas);

        this._canvas = canvas;
    }; // }}}

    function _initGL() { // {{{
        this.GL = (
            this._canvas.getContext('webgl')
            || this._canvas.getContext('experimental-webgl')
        )
    }; // }}}

    WebGL.isSupported = function() { // {{{
        var isSupported = false;

        var dummyCanvas = document.createElement('canvas');
        if (dummyCanvas.getContext) {
            var context = dummyCanvas.getContext('2d');
            isSupported = !!(typeof context.fillText === 'function');
        }

        return isSupported;
    }; // }}}


    WebGL.prototype.clear = function() { // {{{
        this.GL.clearColor.apply(this.GL, arguments);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT);
    }; // }}}

    WebGL.prototype.initViewport = function() { // {{{
        // Clear canvas.
        this.clear(0.9, 0.9, 0.9, 1.0);

        // Set the viewport area on canvas to be drawn.
        this.GL.viewport.apply(this.GL, viewportCoords);

        // Set up the corresponding scissor area to limit clear area.
        this.GL.scissor.apply(this.GL, viewportCoords);

        // Enable, clear and disable the scissor area.
        this.GL.enable(this.GL.SCISSOR_TEST);
        this.clear(0.8, 0.8, 0.8, 1.0);
        // Since the testing is computationally expensive, it is disabled
        // immediately after use.
        this.GL.disable(this.GL.SCISSOR_TEST);

        // Define the World Coordinate System
        return _defineCoordinateSystem();
    }; // }}}

    return WebGL;
});
