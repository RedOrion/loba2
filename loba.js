'use strict';

var http = require('http'),
    ss = require('socketstream');

// Define a single-page client called 'main'
ss.client.define('loba', {
    view: 'loba.html',
    css:  ['loba.styl'],
    code: [
        'libs/lodash.js',
        'libs/jquery.js',
        'libs/handlebars.js',
        'libs/ember.js',
        'app'
    ],
    tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/', function(req, res) {
    res.serveClient('loba');
});

// Code Formatters
ss.client.formatters.add(require('ss-coffee'));
ss.client.formatters.add(require('ss-stylus'));

// Client side template engine
ss.client.templateEngine.use('ember');

// Minimize and pack assets if you type: SS_ENV=production node loba.js
if (ss.env === 'production') {
    ss.client.packAssets();
}

// Start the server
var server = http.Server(ss.http.middleware);
server.listen(3000);
ss.start(server);
