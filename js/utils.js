
///////////////////////////////////////////////////////////////
// time utils

function date() {
    return new Date();
}

function time() {
    return date().getTime();
}

function now() {
    return Date.now();
}

function timeStr(date) {
    var h = zeropad(date.getHours());
    var m = zeropad(date.getMinutes());
    var s = zeropad(date.getSeconds());
    return h + ':' + m + ':' + s;
}

///////////////////////////////////////////////////////////////
// string utils

function zeropad(n, count) {
    count = count || 2;
    return ('0'.repeat(count)+n).slice(-count);
}

///////////////////////////////////////////////////////////////
// math utils

function round(x, places) {
    var mult = Math.pow(10, places);
    return Math.round(x * mult) / mult;
}

