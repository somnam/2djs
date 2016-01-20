define(function() {
    "use strict";

    // Inherit from given parent constructor.
    function inherit(child, parent) {
        // Only instance, not class properties are actually inherited.
        var subclass       = function() {};
        subclass.prototype = parent.prototype;
        child.prototype    = new subclass;
    };

    return {
        inherit: inherit,
    };
});
