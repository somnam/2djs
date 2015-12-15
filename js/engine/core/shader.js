define([
    'text!glsl/square_vs.glsl',
    'text!glsl/color_fs.glsl',
],function(VertexShader, FragmentShader) {
    "use strict";

    function Shader(gl, vertexShaderId, fragmentShaderId) { // {{{
        this._gl = gl;

        this.vertexShader = _compileShader.call(
            this, VertexShader, this._gl.VERTEX_SHADER
        );

        this.fragmentShader = _compileShader.call(
            this, FragmentShader, this._gl.FRAGMENT_SHADER
        );

        _linkShaders.apply(this);
    }; // }}}

    function _compileShader(source, shaderType) { // {{{
        // Create the shader based on source type.
        var compiledShader = this._gl.createShader(shaderType);

        // Compile the shader.
        this._gl.shaderSource(compiledShader, source);
        this._gl.compileShader(compiledShader);

        // Check for errors.
        var compileStatus = this._gl.getShaderParameter(
            compiledShader,
            this._gl.COMPILE_STATUS
        );
        if (!compileStatus) {
            alert(
                'An error occurred when compiling the shader: ' +
                this._gl.getShaderInfoLog(compiledShader)
            );
        }

        return compiledShader;
    }; // }}}

    function _linkShaders() { // {{{
        // Link the shaders into a program.
        this.program = this._gl.createProgram();

        this._gl.attachShader(this.program, this.vertexShader);
        this._gl.attachShader(this.program, this.fragmentShader);
        this._gl.linkProgram(this.program);

        // Check for linking errors.
        var linkStatus = this._gl.getProgramParameter(
            this.program,
            this._gl.LINK_STATUS
        );
        if (!linkStatus) alert('Error linking shaders.');
    }; // }}}

    Shader.prototype.initSquareVertexPosition = function(squareVertexBuffer) { // {{{
        // Get a reference to SquareVertexPosition
        this.squareVertexPosition = this._gl.getAttribLocation(
            this.program, "aSquareVertexPosition"
        );

        // Activate the vertex buffer.
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, squareVertexBuffer);

        // Describe the characteristic of the vertex position attribute.
        this._gl.vertexAttribPointer(
            this.squareVertexPosition,
            // Each vertex element is a 3-float tuple (x, y, z)
            3,
            // Data type is FLOAT.
            this._gl.FLOAT,
            // ?? Are we using normalized vectors.
            false,
            // Number of bytes to skip in between elements.
            0,
            // Offsets to the first element.
            0
        );
    }; // }}}

    Shader.prototype.activateProgram = function() { // {{{
        this._gl.useProgram(this.program);

        // Enable the vertex position attribute.
        this._gl.enableVertexAttribArray(this.squareVertexPosition);
    }; // }}}

    return Shader;
});
