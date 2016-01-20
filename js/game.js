define([
    'engine/core/webgl',
    'engine/core/buffer',
    'engine/core/shader',
    'engine/core/loop',
    'engine/renderable',
    'engine/camera',
    'util',
], function(WebGL, Buffer, Shader, Loop, Renderable, Camera, Util) {
    "use strict";

    // World Coordinate and Viewport params.
    var canvasBackground   = [0.9, 0.9, 0.9, 1.0],
        viewportBackground = [0.8, 0.8, 0.8, 1.0],
        // Coordinate values are in pixels.
        viewportPosition   = [
            20,  // X position of the bottom-left viewport corner.
            40,  // Y position of the bottom-left viewport corner.
        ],
        viewportSize       = [
            600, // Width of the viewport area.
            300, // Height of the viewport area.
        ],
        // Why (20, 60) and 20? What's the refence and scale here?
        worldSpaceCenter   = [20, 60],
        worldSpaceWidth    = 20;

    var updateDelta = 0.05;

    function Game() {
        this.webgl    = null;
        this.buffer   = null;
        this.shader   = null;
        this.viewport = null;

        this.blueSquare = null;
        this.redSquare  = null;
    };

    // Inherit from Loop constructor.
    Util.inherit(Game, Loop);

    Game.prototype.initialize = function() { // {{{
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
        this.camera = new Camera(this.webgl).init({
            canvasBackground:   canvasBackground,
            viewportBackground: viewportBackground,
            viewportPosition:   viewportPosition,
            viewportSize:       viewportSize,
            worldSpaceCenter:   worldSpaceCenter,
            worldSpaceWidth:    worldSpaceWidth
        });

        // Create the renderable objects.

        // Centre blue, slightly rotated 5x5 square.
        this.blueSquare = new Renderable(this.webgl.GL, this.shader).init({
            color:    [0.25, 0.25, 0.95, 1],
            position: [10, 60],
            size:     [5, 5],
            rotation: 0.2,
            viewport: this.camera.viewport,
        });

        // Centre red, 2x2 square.
        this.redSquare = new Renderable(this.webgl.GL, this.shader).init({
            color:    [1.0, 0.25, 0.25, 1.0],
            position: [20, 60],
            size:     [2, 2],
            viewport: this.camera.viewport,
        });

        return this;
    }; // }}}

    Game.prototype.update = function() {
        if (this.blueSquare.position[0] > 30) {
            this.blueSquare.position = [10, 60];
        }
        this.blueSquare.increasePositionBy(updateDelta, null);
        this.blueSquare.rotation += updateDelta;

        if (this.redSquare.size[0] > 5) {
            this.redSquare.size = [2, 2];
        }
        this.redSquare.increaseSizeBy(updateDelta);
    };

    Game.prototype.draw = function() {
        this.camera.setupViewport();
        this.blueSquare.draw();
        this.redSquare.draw();
    };

    return Game;
});
