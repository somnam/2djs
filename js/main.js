"use strict";

// Require.js allows us to configure shortcut alias
require.config({ // {{{
    baseUrl: 'js/',
    paths: {
        text: 'node_modules/text/text',
    },
}); // }}}

require([
    // Initialize the game.
    'game',
], function(Game) {
    Game.initialize();
});
