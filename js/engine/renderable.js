define(['matrix'], function(Matrix) {
    "use strict";

    // Create an identity transform operator.
    var transformer = Matrix.mat4.create();

    function Renderable(gl, shader) {
        this._gl     = gl;
        this._shader = shader;
    };

    Renderable.prototype.initIdentityTransform = function(
        translateVec, rotateRad, scaleVec
    ) { // {{{
        // Reset properties.
        Matrix.mat4.identity(transformer);

        // Compute the square transform.
        Matrix.mat4.translate(
            transformer,
            transformer,
            Matrix.vec3.fromValues.apply(null, translateVec)
        );
        // Rotation is in radian.
        Matrix.mat4.rotateZ(transformer, transformer, rotateRad);

        Matrix.mat4.scale(
            transformer,
            transformer,
            Matrix.vec3.fromValues.apply(null, scaleVec)
        );
    }; // }}}

    Renderable.prototype.draw = function() {
        // Activate the shader program to use.
        this._shader.activateProgram(this.color);

        // Transform vertives using given matrix.
        this._shader.loadTransform(transformer);

        // Draw with the above settings.
        this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, 4);
    };

    return Renderable;
});
