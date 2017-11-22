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
    TargetDate: {
        type: String,
        required: true
    },
    Vachana: {
        type: String,
        required: true
    },
    Summary: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Contributor: {
        type: String,
        required: true
    },
    CreateTS: {
        type: Date,
        required: true
    },
    UpdateTS: {
        type: Date,
        required: true
    }
});
// Compile model from schema
var VachanaModel = mongoose.model('Vachana', SomeModelSchema);
//create methods to CRUD
router.get('/', function (req, res, next) {
    //return all vachanas
    //return res.send("We can not server you everything! You need to order in a restaurant");
    var formattedDate = moment(new Date()).format('MMDDYYYY');
    VachanaModel.find({ TargetDate: formattedDate }, 'Vachana Summary Author Contributor', function (error, result) {
        res.json(error == null ? result : error);
    }).limit(1);
});
//insert new vachana
router.post('/', function (req, res, next) {
    var vachanaFromRequest = req.body;
    var vachanaModelInstance = new VachanaModel({
        TargetDate: moment(new Date(vachanaFromRequest.Date)).format('MMDDYYYY'),
        Vachana: vachanaFromRequest.Vachana != undefined ? vachanaFromRequest.Vachana.trim() : vachanaFromRequest.Vachana,
        Summary: vachanaFromRequest.Summary != undefined ? vachanaFromRequest.Summary.trim() : vachanaFromRequest.Summary,
        Author: vachanaFromRequest.Author != undefined ? vachanaFromRequest.Author.trim() : vachanaFromRequest.Author,
        Contributor: vachanaFromRequest.Contributor != undefined ? vachanaFromRequest.Contributor.trim() : vachanaFromRequest.Contributor,
        CreateTS: new Date(),
        UpdateTS: new Date()
    });
    vachanaModelInstance.save(function (error, result) {
        //if (error) return handleError(error);
        // saved!
        res.json(error == null ? result : error);
    });
});
//return one
router.route('/:date')
    .get(function (req, res, next) {
    //return vachana basedon date
    var formattedDate = moment(new Date(req.params.date)).format('MMDDYYYY');
    VachanaModel.findOne({ TargetDate: formattedDate }, 'Vachana Summary Author Contributor', function (error, result) {
        res.json(error == null ? result : error);
    });
});
router.route('/')
    .put(function (req, res, next) {
    //return vachana basedon date findOneAndUpdate():
    var vachanaFromRequest = req.body;
    var formattedDate = moment(new Date(vachanaFromRequest.Date)).format('MMDDYYYY');
    VachanaModel.findOneAndUpdate({ TargetDate: formattedDate }, {
        $set: {
            Vachana: vachanaFromRequest.Vachana.trim(),
            Summary: vachanaFromRequest.Summary.trim(),
            Author: vachanaFromRequest.Author.trim(),
            Contributor: vachanaFromRequest.Contributor.trim(),
            UpdateTS: new Date()
        }
    }, function (error, result) {
        res.json(error == null ? result : error);
    });
});
exports.default = router;
//# sourceMappingURL=vachanas.js.map