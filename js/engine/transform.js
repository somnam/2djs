define(['matrix'], function(Matrix) {
    "use strict";

    function Transform(position, rotation, scale) {
        this._position = Matrix.vec2.fromValues.apply(
            null,
            position ? position : [0, 0]
        );

        this._scale = Matrix.vec2.fromValues.apply(
            null,
            scale ? scale : [1, 1]
        );

        this._rotation = rotation || 0.0;

        // Create an identity transform operator.
        this._matrix = Matrix.mat4.create();
    };

    Transform.prototype.setRotationInRad(radians) {
        if (!radians) return

        while (radians > (2 * Math.PI)) {
            radians -= (2 * Math.PI);
        }

        this._rotation = radians;
    };

    Transform.prototype.setRotationInDeg(degrees) {
        this.setRotationInRad(degrees * (Math.PI / 180.0));
    };

    Transform.prototype.buildMatrix = function() {
        // Reset properties.
        Matrix.mat4.identity(this._matrix);

        // Compute the square translation.
        // Note: for now z is always at 0.0.
        this._position.push(0.0);
        Matrix.mat4.translate(
            this._matrix,
            this._matrix,
            Matrix.vec3.fromValues.apply(null, this._position)
        );
        // Concatenate with rotation. Note: Rotation is in radian.
        Matrix.mat4.rotateZ(this._matrix, this._matrix, this._rotation);

        // Concatenate with scaling.
        // Note: for now z is always at 1.0.
        this._scale.push(1.0);
        Matrix.mat4.scale(
            this._matrix,
            this._matrix,
            Matrix.vec3.fromValues.apply(null, this._scale)
        );

        return._matrix;
    };

    return Transform;
});
