"use strict";

// Require.js allows us to configure shortcut alias
require.config({ // {{{
    baseUrl: 'lib/',
    paths: {
        assets: '../assets',
        text: 'node_modules/text/text',
        matrix: 'node_modules/gl-matrix/dist/gl-matrix-min',
        keyboard: 'node_modules/keyboardjs/dist/keyboard.min'
    },
}); // }}}

require([
    // Initialize the game.
    'game',
], function(Game) {
    var game = new Game().initialize();
    if (game) game.start();
});
