define(function() {
    "use strict";

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


    WebGL.prototype.clear = function(color) { // {{{
        this.GL.clearColor.apply(this.GL, color);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT);
    }; // }}}

    return WebGL;
});
