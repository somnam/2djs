"use strict";

// Require.js allows us to configure shortcut alias
require.config({ // {{{
    baseUrl: 'js/',
    paths: {},
}); // }}}

require([
    // Initialize the game.
    'game',
], function(Game) {
    Game.initialize();
});
