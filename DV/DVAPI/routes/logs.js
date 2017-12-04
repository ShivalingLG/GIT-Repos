"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
//parsers
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//LOGGING
var winston = require('winston');
require('winston-mongodb');
var logger = new (winston.Logger)({
    transports: [
        //new (winston.transports.Console)(),
        //new (winston.transports.File)({ filename: 'somefile.log' })
        new (winston.transports.MongoDB)({ db: 'mongodb://localhost:27017/DVDB' })
    ]
});
exports.Log = function (logDataFromRequest) {
    logger.log(logDataFromRequest.level, 'Source : ' + logDataFromRequest.source + ' ; Message : ' + logDataFromRequest.message, logDataFromRequest.data);
};
//create methods to CRUD
router.get('/', function (req, res, next) {
    logger.query({}, function (err, results) {
        if (err) {
            res.json(err);
        }
        res.json(results);
    });
});
//insert logs
router.post('/', function (req, res, next) {
    var logDataFromRequest = req.body;
    /*{
        level: 'info',
    source:'Mobile App'
            message :'',
            data:{ }
            }*/
    logger.log(logDataFromRequest.level, 'Source : ' + logDataFromRequest.source + ' ; Message : ' + logDataFromRequest.message, logDataFromRequest.data);
    res.json('success');
});
exports.default = router;
//# sourceMappingURL=logs.js.map