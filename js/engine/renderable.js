define([
    'engine/transform',
    'matrix',
], function(Transform, Matrix) {
    "use strict";

    function Renderable(gl, shader) {
        this._gl        = gl;
        this._shader    = shader;
        this._transform = new Transform();
    };

    Renderable.prototype.init = function(params) {
        for (var param in params) {
            this[param] = params[param];
        }

        // Initialize identity transform object.
        this._transform.init(this.position, this.scale, this.rotation);

        return this;
    };

    Renderable.prototype.draw = function() { // {{{
        // Activate the shader program to use.
        this._shader.activateProgram(this.color, this.viewport);

        var identityTransform = this._transform.makeIdentityTransform();

        // Transform vertives using given matrix.
        this._shader.loadTransform(identityTransform);

        // Draw with the above settings.
        this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, 4);
    }; // }}}

    return Renderable;
});
