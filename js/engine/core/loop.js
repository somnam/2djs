define(function() {
    var fps  = 30,          // Frames per second.
        mpf  = 1000 / fps;  // Milleseconds per frame.


    function Loop() {
        this.previousTime = null;
        this.lagTime      = null;
        this.isRunning    = false;
    };

    Loop.prototype.run = function(timestamp) {
        if (!this.isRunning) return;

        // Set up next call to run.
        var that = this;
        requestAnimationFrame(function() { that.run() });

        // Compute elapsed time since last run() was executed.
        var currentTime = Date.now(),
            elapsedTime = currentTime - this.previousTime;
        this.previousTime = currentTime;
        this.lagTime     += elapsedTime;

        // Update the game the appropriate number of times.
        // Update only every Milliseconds per frame.
        // If lag larger then update frames, update until caught up.
        while ((this.lagTime >= mpf) && this.isRunning) {
            this.update();
            this.lagTime -= mpf;
        }

        this.draw();
    };

    Loop.prototype.start = function() {
        // Reset frame time.
        this.previousTime = Date.now();
        this.lagTime      = 0.0;
        this.isRunning    = true;

        var that = this;
        requestAnimationFrame(function() { that.run() });
    };

    return Loop;
});
