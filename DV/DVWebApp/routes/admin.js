"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET users listing.
 */
var express = require("express");
var app = express();
//parsers
var bodyParser = require('body-parser'); //parsing post request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var router = express.Router();
//call rest API
var Client = require('node-rest-client').Client;
var httpRestclient = new Client();
var ApiHostUrl = "http://localhost:1234/API/";
router.get('/', function (req, res) {
    httpRestclient.get(ApiHostUrl + "Associates", function (data, response) {
        res.render('admin', {
            Authors: data.length > 0 ? data[0].Authors : [],
            Contributors: data.length > 0 ? data[0].Contributors : []
        });
    });
});
router.post('/associates', function (req, res, next) {
    var args = {
        data: req.body,
        headers: { "Content-Type": "application/json" }
    };
    httpRestclient.post(ApiHostUrl + "Associates", args, function (data, response) {
        res.send(data);
    });
});
exports.default = router;
//# sourceMappingURL=admin.js.map