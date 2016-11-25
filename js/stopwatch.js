
function Stopwatch(observer) {
    this.started = false;
    this.paused = false;
    this.date = null;
    this.t1 = 0;
    this.ms = 0;
    this.receipt = null;
    this.observer = observer;
}

Stopwatch.prototype.start = function() {
    if (!this.started) {
        this.started = true;
        this.go();
        this.date = new Date();
        console.log('started at ' + this.t1);
    }
}

Stopwatch.prototype.pause = function() {
    console.log('pausing');
    if (this.started && !this.paused) {
        this.paused = true;
        this.ms += this.current();
        this.clearTimer();
    }
}

Stopwatch.prototype.resume = function() {
    console.log('resuming');
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
    console.log('timer: ' + this.started + ',' + this.paused + ' ' + this);
    if (this.started && !this.paused) {
        this.notify();
        // set next execution and bind this method to fix context
        this.receipt = setTimeout(this.timer.bind(this), 500);
    }
}

Stopwatch.prototype.clearTimer = function() {
    clearTimeout(this.receipt);
}

Stopwatch.prototype.notify = function() {
    this.observer(this.toString());
}

Stopwatch.prototype.toString = function() {
   var sec = Math.floor(this.total() / 1000);
   var h = Math.floor(sec / 60 / 60);
   var m = Math.floor((sec - (h * 60 * 60)) / 60);
   var s = sec - (h * 60 * 60) - (m * 60);
   return str(h) + ':' + str(m) + ':' + str(s);
}

function str(n) {
    if (n < 10) {
        return '0'+n;
    }
    return n.toString();
}

function now() {
    return Date.now();
}
