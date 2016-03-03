define([
    'text!assets/levels/blue.json',
    'engine/core/webgl',
    'engine/core/buffer',
    'engine/core/shader',
    'engine/core/loop',
    'engine/renderable',
    'engine/camera',
    'util',
    'keyboard'
], function(Level, WebGL, Buffer, Shader, Loop, Renderable, Camera, Util, Keyboard) {
    "use strict";

    // Parse level config.
    Level = JSON.parse(Level);

    function _bindKeyEvents() {
        var self        = this,
            updateDelta = 0.05;

        Keyboard.bind('right', function() {
            self.squares[0].increasePositionBy(updateDelta, null);
        });
        Keyboard.bind('up', null, function() {
            self.squares[0].rotation += updateDelta;
        });
        Keyboard.bind('down', function() {
            self.squares[1].increaseSizeBy(updateDelta);
        });
    }

    function Game() {
        this.webgl    = null;
        this.buffer   = null;
        this.shader   = null;
        this.viewport = null;

        this.squares  = [];
    };

    // Inherit from Loop constructor.
    Util.inherit(Game, Loop);

    Game.prototype.initialize = function() { // {{{
        var self = this;

        // Skip when client doesn't support webgl.
        if (!WebGL.isSupported()) return;

        this.webgl  = new WebGL(640, 480, 'GLCanvas');

        // Initialize the vertex buffer.
        this.buffer = new Buffer(this.webgl.GL);

        // Load ad compile the vertex fragment shaders.
        this.shader = new Shader(
            this.webgl.GL, 'VertexShader', 'FragmentShader'
        );

        // Describe the characteristic of the vertex position attribute.
        this.shader.initSquareVertexPosition(this.buffer.squareVertexBuffer);

        // Prepare a viewport camera for the World Coordinate System.
        this.camera = new Camera(this.webgl).init(Level.camera);

        // Create the renderable objects.
        // Centre blue, slightly rotated 5x5 square.
        // Centre red, 2x2 square.
        Level.squares.forEach(function(squareConf) {
            squareConf.viewport = self.camera.viewport;
            self.squares.push(new Renderable(self.webgl.GL, self.shader).init(
                squareConf
            ));
        });

        // Append key events to squares.
        _bindKeyEvents.apply(this);

        return this;
    }; // }}}

    Game.prototype.update = function() {
        if (this.squares[0].position[0] > 30)
            this.squares[0].position = [10, 60];

        if (this.squares[1].size[0] > 5)
            this.squares[1].size = [2, 2];
    };

    Game.prototype.draw = function() {
        this.camera.setupViewport();
        this.squares.forEach(function(square) { square.draw() });
    };

    return Game;
});
