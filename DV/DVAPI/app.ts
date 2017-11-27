"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var express = require("express");

var vachanas_1 = require("./routes/vachanas");
var associates_1 = require("./routes/associates");
var logs_1 = require("./routes/logs");

var bodyParser = require('body-parser');
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
////import the mongoose module
var mongoose = require('mongoose');
////Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/DVDB';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

app.use('/API/Vachanas', vachanas_1.default);
app.use('/API/Associates', associates_1.default);
app.use('/API/Logs', logs_1.default);

app.set('port', process.env.PORT || 1234);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
//import debug = require('debug');
//import express = require('express');
//import path = require('path');
//import routes from './routes/index';
//import users from './routes/user';
//var app = express();
//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);
//app.use('/users', users);
//// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err['status'] = 404;
//    next(err);
//});
//// error handlers
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use((err: any, req, res, next) => {
//        res.status(err['status'] || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}
//// production error handler
//// no stacktraces leaked to user
//app.use((err: any, req, res, next) => {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});
//app.set('port', process.env.PORT || 3000);
//var server = app.listen(app.get('port'), function () {
//    debug('Express server listening on port ' + server.address().port);
//});
//# sourceMappingURL=app.js.map