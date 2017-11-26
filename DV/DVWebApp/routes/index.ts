/*
 * GET home page.
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

    //get authors and contributors
    httpRestclient.get(ApiHostUrl + "Associates", function (data, response) {

        if (data.length < 1 || data[0].Authors.length < 1 || data[0].Contributors < 1) {

            res.redirect('/admin');

        } else {

            res.render('index', {

                Authors: data[0].Authors,
                Contributors: data[0].Contributors
            });
        }
    });

});

router.get('/vachana', (req: express.Request, res: express.Response) => {

    //call API & send response
    res.send({

        Date: new Date(),
        Vachana: "",
        Summary: "",
        Author: "",
        Contributor: ""
    });
});

router.get('/vachana/:date', (req: express.Request, res: express.Response) => {

    var args = {
        path: { date: req.params.date }
    };

    //call API send response
    httpRestclient.get(ApiHostUrl + "Vachanas/${date}", args, function (data, response) {

        res.send(data);
    });
});

router.post('/vachana', (req: express.Request, res: express.Response) => {

    var args = {
        data: req.body,
        headers: { "Content-Type": "application/json" }
    };

    httpRestclient.post(ApiHostUrl + "Vachanas", args, function (data, response) {

        res.send(data);
    });
});

router.put('/vachana', (req: express.Request, res: express.Response) => {

    var args = {
        data: req.body,
        headers: { "Content-Type": "application/json" }
    };

    httpRestclient.put(ApiHostUrl + "Vachanas", args, function (data, response) {

        res.send(data);
    });
});


export default router;