define(['matrix'], function(Matrix) {
    "use strict";

    function _defineCoordinateSystem() { /// {{{
        var viewMatrix      = Matrix.mat4.create(),
            projMatrix      = Matrix.mat4.create(),
            // View-Projection matrix.
            viewportMatrix  = Matrix.mat4.create(),
            hViewportWidth  = (0.5 * this.worldSpaceWidth),
            // Width-to-height aspect ratio of the WC must match that of the
            // viewport for the squares to show up proportionally.
            hViewportHeight = (hViewportWidth *
                               // Viewport aspect ratio.
                               (this.viewportSize[1] / this.viewportSize[0]));

        // Define the view and projection matrix.

        // Defines the center of WC to be looked at.
        Matrix.mat4.lookAt(viewMatrix,
            this.worldSpaceCenter.concat(10), // Camera position.
            this.worldSpaceCenter.concat(0),  // Look at position.
            [0, 1, 0]                       // Orientation.
        );
        // Defines the distance from the center position to the left and right
        // boundaries to be 10 units and to the top and bottom boundaries to
        // be 5 units away.
        Matrix.mat4.ortho(projMatrix,
           -hViewportWidth,   // Distance fron center to left of WC.
            hViewportWidth,   // Distance fron center to right of WC.
           -hViewportHeight,  // Distance fron center to bottom of WC.
            hViewportHeight,  // Distance fron center to top of WC.
           0,                 // Z-distance to near plane.
           1000               // Z-distance to far plane.
       );

       // Concatenate view and projection matrix to form the View-Projection
       // operator.
       Matrix.mat4.multiply(viewportMatrix, projMatrix, viewMatrix);

       return viewportMatrix;
    }; // }}}

    function Camera (webgl) {
        this._webgl = webgl
        this._gl    = webgl.GL;
    };

    Camera.prototype.init = function(params) { // {{{
        for (var param in params) {
            this[param] = params[param];
        }

        return this;
    }; // }}}

    Camera.prototype.setupViewport = function() { // {{{
        var viewportParams = this.viewportPosition.concat(this.viewportSize);

        // Set the canvas background.
        this._webgl.clear(this.canvasBackground);

        // Set the viewport area on canvas to be drawn.
        this._gl.viewport.apply(this._gl, viewportParams);

        // Set up the corresponding scissor area to limit clear area.
        this._gl.scissor.apply(this._gl, viewportParams);

        // Enable the scissor area.
        this._gl.enable(this._gl.SCISSOR_TEST);

        // Set viewport color.
        this._webgl.clear(this.viewportBackground);

        // Since the testing is computationally expensive, it is disabled
        // immediately after use.
        this._gl.disable(this._gl.SCISSOR_TEST);

        // Define the World Coordinate System
        return _defineCoordinateSystem.apply(this);
    }; // }}}

    return Camera;
});
