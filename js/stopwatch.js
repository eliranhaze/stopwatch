
function Stopwatch(observer) {
    this.started = false;
    this.paused = false;
    this.t1 = 0;
    this.ms = 0;
    this.receipt = null;
    this.observer = observer;
}

Stopwatch.prototype.start = function() {
    if (!this.started) {
        this.started = true;
        this.go();
    }
}

Stopwatch.prototype.pause = function() {
    if (this.started && !this.paused) {
        this.paused = true;
        this.ms += this.current();
        this.clearTimer();
    }
}

Stopwatch.prototype.resume = function() {
    if (this.started && this.paused) {
        this.go();
    }
}

Stopwatch.prototype.go = function() {
    this.paused = false;
    this.t1 = now();
    this.timer();
}

Stopwatch.prototype.stop = function() {
    if (this.started) {
        this.started = false;
        this.t1 = 0;
        this.ms = 0;
        this.notify();
        this.clearTimer();
    }
}

Stopwatch.prototype.current = function() {
    if (this.started) {
        return now() - this.t1;
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
        this.receipt = setTimeout(this.timer.bind(this), 17);
    }
}

Stopwatch.prototype.clearTimer = function() {
    clearTimeout(this.receipt);
}

Stopwatch.prototype.notify = function() {
    var ms = str(this.total() % 1000, 3);
    this.observer(this.toString(), ms);
}

Stopwatch.prototype.toString = function() {
    var sec = Math.floor(this.total() / 1000);
    var h = Math.floor(sec / 60 / 60);
    var m = Math.floor((sec - (h * 60 * 60)) / 60);
    var s = sec - (h * 60 * 60) - (m * 60);
    return str(h) + ':' + str(m) + ':' + str(s);
}

function str(n, count) {
    count = count || 2;
    return ('0'.repeat(count)+n).slice(-count);
}

function now() {
    return Date.now();
}
