define(function() {
    "use strict";

    function Shader(webgl, vertexShaderId, fragmentShaderId) { // {{{
        this._webgl = webgl;

        this.vertexShader = _compileShader.call(
            this, 'VertexShader', this._webgl.VERTEX_SHADER
        );

        this.fragmentShader = _compileShader.call(
            this, 'FragmentShader', this._webgl.FRAGMENT_SHADER
        );

        _linkShaders.apply(this);
    }; // }}}

    function _compileShader(scriptId, shaderType) { // {{{
        // Get shader source from html.
        var source = document.getElementById(scriptId).firstChild.textContent;

        // Create the shader based on source type.
        var compiledShader = this._webgl.createShader(shaderType);

        // Compile the shader.
        this._webgl.shaderSource(compiledShader, source);
        this._webgl.compileShader(compiledShader);

        // Check for errors.
        var compileStatus = this._webgl.getShaderParameter(
            compiledShader,
            this._webgl.COMPILE_STATUS
        );
        if (!compileStatus) {
            alert(
                'An error occurred when compiling the shader: ' +
                this._webgl.getShaderInfoLog(compiledShader)
            );
        }

        return compiledShader;
    }; // }}}

    function _linkShaders() { // {{{
        // Link the shaders into a program.
        this.program = this._webgl.createProgram();

        this._webgl.attachShader(this.program, this.vertexShader);
        this._webgl.attachShader(this.program, this.fragmentShader);
        this._webgl.linkProgram(this.program);

        // Check for linking errors.
        var linkStatus = this._webgl.getProgramParameter(
            this.program,
            this._webgl.LINK_STATUS
        );
        if (!linkStatus) alert('Error linking shaders.');
    }; // }}}

    Shader.prototype.initSquareVertexPosition = function(squareVertexBuffer) { // {{{
        // Get a reference to SquareVertexPosition
        var squareVertexPosition = this._webgl.getAttribLocation(
            this.program, "aSquareVertexPosition"
        );

        // Activate the vertex buffer.
        this._webgl.bindBuffer(this._webgl.ARRAY_BUFFER, squareVertexBuffer);

        // Describe the characteristic of the vertex position attribute.
        this._webgl.vertexAttribPointer(
            squareVertexPosition,
            // Each vertex element is a 3-float tuple (x, y, z)
            3,
            // Data type is FLOAT.
            this._webgl.FLOAT,
            // ?? Are we using normalized vectors.
            false,
            // Number of bytes to skip in between elements.
            0,
            // Offsets to the first element.
            0
        );

        return squareVertexPosition;
    }; // }}}

    return Shader;
});
