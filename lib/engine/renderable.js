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

        return this;
    };

    Renderable.prototype.draw = function() { // {{{
        // Activate the shader program to use.
        this._shader.activateProgram(this.color, this.viewport);

        // Initialize identity transform object.
        this._transform.init(this.position, this.size, this.rotation);
        var identityTransform = this._transform.makeIdentityTransform();

        // Transform vertives using given matrix.
        this._shader.loadTransform(identityTransform);

        // Draw with the above settings.
        this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, 4);
    }; // }}}

    Renderable.prototype.increaseSizeBy = function(byValue) {
        if (!byValue) return;

        this.size[0] += byValue;
        this.size[1] += byValue;
    };

    Renderable.prototype.increasePositionBy = function(posX, posY) {
        if (posX !== null) this.position[0] += posX;
        if (posY !== null) this.position[1] += posY;
    };

    return Renderable;
});
