define(['matrix'], function(Matrix) {
    "use strict";

    // Create an identity transform operator.
    var transformer = Matrix.mat4.create();

    function Transform() {};

    Transform.prototype.init = function(position, scale, rotation) {
        this._position = position
                       ? Matrix.vec2.fromValues.apply(null, position)
                       : null;

        this._scale = scale
                    ? Matrix.vec2.fromValues.apply(null, scale)
                    : null;

        this.setRotationInRad(rotation);
    };

    Transform.prototype.setRotationInRad = function(radians) {
        if (radians) {
            while (radians > (2 * Math.PI)) {
                radians -= (2 * Math.PI);
            }
        }

        this._rotation = radians;
    };

    Transform.prototype.setRotationInDeg = function(degrees) {
        this.setRotationInRad(degrees * (Math.PI / 180.0));
    };

    Transform.prototype.makeIdentityTransform = function() {
        // Reset properties.
        Matrix.mat4.identity(transformer);

        // Compute the square translation.
        if (this._position) {
            Matrix.mat4.translate(
                transformer,
                transformer,
                Matrix.vec3.fromValues(
                    this._position[0],
                    this._position[1],
                    // Note: for now z is always at 0.0.
                    0.0
                )
            );
        }

        // Concatenate with rotation. Note: Rotation is in radian.
        if (this._rotation) {
            Matrix.mat4.rotateZ(transformer, transformer, this._rotation);
        }

        // Concatenate with scaling.
        if (this._scale) {
            Matrix.mat4.scale(
                transformer,
                transformer,
                Matrix.vec3.fromValues(
                    this._scale[0],
                    this._scale[1],
                    // Note: for now z is always at 1.0.
                    1.0
                )
            );
        }

        return transformer;
    };

    return Transform;
});
