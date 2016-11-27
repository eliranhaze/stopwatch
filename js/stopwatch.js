TIMING_RATE = 17; // ms

function Stopwatch(observer) {
    this.init();
    this.observer = observer;
}

Stopwatch.prototype.start = function() {
    if (!this.started) {
        this.started = true;
        this.absStart = now();
        this.go();
    }
}

Stopwatch.prototype.pause = function() {
    if (this.started && !this.paused) {
        this.ms += this.current();
        this.clearTimer();
        this.paused = true; // must be last
    }
}

Stopwatch.prototype.resume = function() {
    if (this.started && this.paused) {
        this.go();
    }
}

Stopwatch.prototype.go = function() {
    this.paused = false;
    this.currentStart = now();
    this.timer();
}

Stopwatch.prototype.stop = function() {
    if (this.started) {
        this.init();
        this.notify();
        this.clearTimer();
    }
}

Stopwatch.prototype.init = function() {
    this.paused = false;
    this.started = false;
    this.absStart = 0;
    this.currentStart = 0;
    this.ms = 0;
    this.receipt = null;
}

Stopwatch.prototype.current = function() {
    if (this.started && !this.paused) {
        return now() - this.currentStart;
    }
    return 0;
}

Stopwatch.prototype.total = function() {
    return this.ms + this.current();
}

Stopwatch.prototype.timer = function() {
    if (this.started && !this.paused) {
        this.notify();
        // set next execution and bind this method to fix context
        this.receipt = setTimeout(this.timer.bind(this), TIMING_RATE);
    }
}

Stopwatch.prototype.clearTimer = function() {
    clearTimeout(this.receipt);
}

Stopwatch.prototype.notify = function() {
    var ms = zeropad(this.total() % 1000, 3);
    this.observer(this.toString(), ms);
}

Stopwatch.prototype.toString = function() {
    var sec = Math.floor(this.total() / 1000);
    var h = Math.floor(sec / 60 / 60);
    var m = Math.floor((sec - (h * 60 * 60)) / 60);
    var s = sec - (h * 60 * 60) - (m * 60);
    return zeropad(h) + ':' + zeropad(m) + ':' + zeropad(s);
}
