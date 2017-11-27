"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
var express = require("express");
var moment = require("moment");
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
//parsers
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//import the mongoose module
var mongoose = require('mongoose');
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'From Vachanas Page : MongoDB connection error:'));
//Define a schema
var Schema = mongoose.Schema;
var SomeModelSchema = new Schema({
    Message: {
        type: String,
        required: true
    },
    CreateTS: {
        type: Date,
        required: true
    }
});
// Compile model from schema
var LogsModel = mongoose.model('DVLogs', SomeModelSchema);
//create methods to CRUD
router.get('/', function (req, res, next) {

    LogsModel.find({}, 'Message CreateTS', function (error, result) {
        res.json(error == null ? result : error);
    });
});
//insert new vachana
router.post('/', function (req, res, next) {
    var messageFromRequest = req.body;

    var logsModelInstance = new LogsModel({
        Message: messageFromRequest,
        CreateTS: new Date()
    });
    logsModelInstance.save(function (error, result) {
        //if (error) return handleError(error);
        // saved!
        res.json(error == null ? result : error);
    });
});

exports.default = router;
//# sourceMappingURL=vachanas.js.map