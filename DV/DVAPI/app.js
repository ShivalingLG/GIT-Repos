"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var express = require("express");
var vachanas = require("./routes/vachanas");
var associates = require("./routes/associates");
var logs = require("./routes/logs");
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
app.use('/API/Vachanas', vachanas.default);
app.use('/API/Associates', associates.default);
app.use('/API/Logs', logs.default);
app.set('port', process.env.PORT || 1234);
var server = app.listen(app.get('port'), function () {
    //debug('Express server listening on port ' + server.address().port);
    logs.Log({ level: 'info', source: 'DV Web API', message: 'Express server listening on port ', data: { portNum: server.address().port } });
});
//# sourceMappingURL=app.js.map