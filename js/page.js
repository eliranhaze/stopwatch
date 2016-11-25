var btnStart = $('#start');
var btnClear = $('#clear');
var pTime = $('#time');
var details = $('#details');

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

function observer(text) {
    pTime.text(text);
}
var sw = new Stopwatch(observer);

function start() {
    sw.start();
    btnStart.text('pause'); 
    btnStart.one('click', pause);
    details.text(dateStr(sw.date));
}
function pause() {
    sw.pause();
    btnStart.text('resume'); 
    btnStart.one('click', resume);
}
function resume() {
    sw.resume();
    btnStart.text('pause'); 
    btnStart.one('click', pause);
}
function clear() {
    sw.stop();
    btnStart.text('start'); 
    btnStart.one('click', start);
    details.text('');
}

function dateStr(date) {
    var h = str(date.getHours());
    var m = str(date.getMinutes());
    var s = str(date.getSeconds());
    return h + ':' + m + ':' + s;
}
