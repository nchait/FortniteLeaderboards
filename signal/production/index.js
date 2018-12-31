// This file is simply used to relay get requests from the website. 
// All real information is held there.

const express = require("express");
const request = require('request');
const app = express(); 
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    next();
});

app.use('/api', router);
router.route('/FortniteAPI/username/:parameters')
    .get(function(req, res) {
        url = 'https://fortnite-public-api.theapinetwork.com/prod09/users/id?username='+req.params.parameters
        request(url, { json: true }, (err, resp, body) => {
            if (err) 
                { return console.log(err); }
            console.log(body)
            res.send(body);
        });
    });
    
router.route('/FortniteAPI/stats/:parameters')
    .get(function(req, res) {
        url = 'https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?'+req.params.parameters
        request(url, { json: true }, (err, resp, body) => {
            if (err) 
                { return console.log(err); }
            console.log(body)
            res.send(body);
        });
    });
router.route('/FortniteStats/:parameters')
    .get(function(req, res) {
        url = 'https://fortnitestats.net/?'+req.params.parameters
        request(url, { json: true }, (err, resp, body) => {
            if (err) 
                { return console.log(err); }
            console.log(body)
            res.send(body);
        });
    });

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);