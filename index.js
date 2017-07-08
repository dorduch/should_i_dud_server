const express = require ('express');
var cors = require ('cors');

const app = express ();
var weatherService = require ('./services/weather');
var locationService = require ('./services/location');
app.use (cors ());

function getCloudCoverage (req, res) {
  weatherService
    .getCloudCoverage (req.query.lat, req.query.lon, req.query.time, req.query.hours)
    .then (function (result) {
      res.send (JSON.stringify(result));
    });
  return res;
}

function getAddress (req, res) {
  locationService
    .getAddress (req.query.lat, req.query.lon,)
    .then (function (result) {
      res.send (result.toString());
    });
  return res;
}


app.get ('/cloudcoverage', getCloudCoverage);
app.get ('/getAddress', getAddress);
var port = process.env.PORT || 8080;
app.listen (port, function () {
  console.log ('Example app listening on port'+port);
});
