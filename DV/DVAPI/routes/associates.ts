"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();
app.use(router);
//import the mongoose module
var mongoose = require('mongoose');
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'From Associates Page : MongoDB connection error:'));
//Define a schema
var Schema = mongoose.Schema;
var associatesModelSchema = new Schema({
    Authors: {
        type: [String],
        required: true
    },
    Contributors: {
        type: [String],
        required: true
    },
    Status: {
        type: Boolean,
        required: true
    },
    CreateTS: {
        type: Date,
        required: true
    }
});
// Compile model from schema
var AssociatesModel = mongoose.model('Associates', associatesModelSchema);
//create methods to CRUD
router.get('/', function (req, res, next) {
    AssociatesModel.find({ Status: true }, 'Authors Contributors', function (error, result) {
        res.json(error == null ? result : error);
    }).limit(1);
});
//insert new vachana
router.post('/', function (req, res, next) {
    AssociatesModel.updateMany({ Status: true }, { $set: { Status: false } }, function (error, result) {
        //if (error) return handleError(error);
        // saved!
        //res.json(error == null ? result : error);
    });
    var associatesFromRequest = req.body;
    var associatesModelInstance = new AssociatesModel({
        Authors: associatesFromRequest.Authors,
        Contributors: associatesFromRequest.Contributors,
        Status: true,
        CreateTS: new Date()
    });
    associatesModelInstance.save(function (error, result) {
        //if (error) return handleError(error);
        // saved!
        res.json(error == null ? result : error);
    });
});
exports.default = router;
//# sourceMappingURL=associates.js.map