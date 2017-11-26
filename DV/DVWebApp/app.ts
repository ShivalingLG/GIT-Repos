import debug = require('debug');
import express = require('express');
import path = require('path');
//import vwejs = require('ejs');

var app = express();

var bodyParser = require('body-parser');//parsing post request
//parsers
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//call rest API
var Client = require('node-rest-client').Client;
var httpRestclient = new Client();

import routes from './routes/index';
import admin from './routes/admin';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//app.engine('html', vwejs.renderFile);
app.set("view engine", "vash");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3456);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
