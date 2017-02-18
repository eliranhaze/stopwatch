// stopwatch client id
var CLIENT_ID = '920239214134-9hgqb8jm5jdag9vpnuc1ohn7dljh3vql.apps.googleusercontent.com';

// api stuff
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

// intellecting spreadsheet id
var SPREADSHEET_ID = '1vdCniswTZHnMOgVZe3GS_tzvZtgctes1OkPKCD8LP4o';

var btnLogin = $('#login');
var btnLogout = $('#logout');
var btnUpdate = $('#update');
var txtTitle = $('#title');
var selType = $('#type');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        initUI();
    });
}

function initUI() {
    btnLogin.click(handleAuthClick);
    btnLogout.click(handleSignoutClick);
    btnUpdate.click(update);
    btnUpdate.on('click', function() {
        btnUpdate.blur();
    });
//    read('Art!B4:E', function(values) {
//        var titles = [];
//        for (i = 0; i < values.length; i++) {
//            var row = values[i];
//            if (row[3] != '1') { // not done
//                titles.push(row[1]);  // title
//            }
//        }
//        txtTitle.autocomplete({
//            source: titles
//        });
//    });
    read('Log!A2:C', function(values) {
        var titles = new Set();
        var currently = now();
        for (i = 0; i < values.length; i++) {
            var row = values[i];
            if (daysDiff(currently, parseDate(row[0])) < 14) {
                titles.add(row[2]);  // title
            }
        }
        txtTitle.autocomplete({
            source: Array.from(titles)
        });
    });
}

function clearForm() {
    txtTitle.val('');
    selType.removeAttr('selected');
}

function parseDate(str) {
    var spl = str.split('/');
    var d = spl[0];
    var m = parseInt(spl[1]) - 1; // zero indexed
    var y = '20' + spl[2];
    return new Date(y, m, d);
}

function daysDiff(date1, date2) {
    return (date1 - date2)/1000/60/60/24;
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        btnLogin.hide();
        btnLogout.show();
    } else {
        btnLogin.show();
        btnLogout.hide();
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function log(message) {
    console.log(message);
}

function update() {
    var type = selType.val();
    var name = txtTitle.val();
    var value = (sw.minutes()/60).toFixed(2);
    if (name == '' || value == 0) {
        log('not adding: ' + name + ', ' + value);
        return;
    }
    updateLog(type, name, value);
    clearForm();
}

function updateLog(type, name, value) {
    var row = [todayStr(), type, name, value];
    log('adding: ' + row);
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Log!A:D',
        values: [row],
        valueInputOption: 'USER_ENTERED',
    }).then(function(response) {
        var updates = JSON.parse(response.body)['updates'];
        log(updates);
        log('added ' + updates['updatedRows'] + ' rows at ' + updates['updatedRange']);
    }, handleError);
}

function read(range, then) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
    }).then(function(response) {
        log(response.body);
        var range = response.result;
        if (range.values.length > 0) {
            then(range.values);
        } else {
            log('No data found.');
        }
    }, handleError);
}

function handleError(response) {
    log('Error: ' + response.result.error.message);
}

