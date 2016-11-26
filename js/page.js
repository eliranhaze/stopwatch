var btnStart = $('#start');
var btnClear = $('#clear');
var pTime = $('#time');
var pMs = $('#ms');
var details = $('#details');

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
    details.html(dateStr(date()));
}
function pause() {
    sw.pause();
    btnStart.text('resume'); 
    btnStart.one('click', resume);
    details.html(details.html() + '-' + dateStr(date()));
}
function resume() {
    sw.resume();
    btnStart.text('pause'); 
    btnStart.one('click', pause);
    details.html(details.html() + '<br>' + dateStr(date()));
}
function clear() {
    sw.stop();
    btnStart.text('start'); 
    btnStart.one('click', start);
    btnStart.off('click', pause);
    btnStart.off('click', resume);
    details.text('');
}

function dateStr(date) {
    var h = str(date.getHours());
    var m = str(date.getMinutes());
    var s = str(date.getSeconds());
    return h + ':' + m + ':' + s;
}

function date() {
    return new Date();
}
