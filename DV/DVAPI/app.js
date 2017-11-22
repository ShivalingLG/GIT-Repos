"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var express = require("express");
var vachanas_1 = require("./routes/vachanas");
var associates_1 = require("./routes/associates");
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
app.set('port', process.env.PORT || 1234);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
//# sourceMappingURL=app.js.map