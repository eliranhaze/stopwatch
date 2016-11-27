var btnStart = $('#start');
var btnClear = $('#clear');
var pTime = $('#time');
var pMs = $('#ms');
var details = $('#details');
var sum = $('#sum');

// TODO: store stuff with localStorage
$(document).ready(function() {
    btnStart.one('click', start);
    btnClear.on('click', clear);
    btnStart.on('click', function() {
        btnStart.blur();
    });
    btnClear.on('click', function() {
        btnClear.blur();
    });
});

function observer(text, ms) {
    pTime.text(text);
    pMs.text(ms);
}
var sw = new Stopwatch(observer);

function start() {
    sw.start();
    btnStart.text('pause'); 
    btnStart.one('click', pause);
    updPct();
    details.html(timeStr(date()));
}

function pause() {
    sw.pause();
    btnStart.text('resume'); 
    btnStart.one('click', resume);
    updPct();
    details.html(details.html() + '-' + timeStr(date()));
}

function updPct() {
    var abs = now() - sw.absStart;
    var total = sw.total();
    var pct = round(100 * (total / abs), 1);
    sum.text('pct: ' + pct + '%');
}

function resume() {
    sw.resume();
    btnStart.text('pause'); 
    btnStart.one('click', pause);
    updPct();
    details.html(details.html() + '<br>' + timeStr(date()));
}

function clear() {
    sw.stop();
    btnStart.text('start'); 
    btnStart.one('click', start);
    btnStart.off('click', pause);
    btnStart.off('click', resume);
    details.text('');
    sum.text('');
}
