/*
 * GET users listing.
 */
import express = require('express');
var app = express();

//parsers
var bodyParser = require('body-parser');//parsing post request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const router = express.Router();
//call rest API
var Client = require('node-rest-client').Client;
var httpRestclient = new Client();

var ApiHostUrl = "http://localhost:1234/API/";

router.get('/', (req: express.Request, res: express.Response) => {

    httpRestclient.get(ApiHostUrl + "Associates", function (data, response) {

        res.render('admin', {

            Authors: data.length > 0 ? data[0].Authors : [],
            Contributors: data.length > 0 ? data[0].Contributors : []
        });
    });
});

router.post('/associates', (req: express.Request, res: express.Response, next) => {

    var args = {
        data: req.body,
        headers: { "Content-Type": "application/json" }
    };

    httpRestclient.post(ApiHostUrl + "Associates", args, function (data, response) {

        res.send(data);
    });
});

export default router;