const express = require ('express');
var cors = require ('cors');

const app = express ();
var weatherService = require ('./services/weather');
app.use (cors ());

function getCloudCoverage (req, res) {
  weatherService
    .getCloudCoverage (req.query.lat, req.query.lon, req.query.time)
    .then (function (result) {
      res.send (result.toString ());
    });
  return res;
}

app.get ('/cloudcoverage', getCloudCoverage);
var port = process.env.PORT || 8080;
app.listen (port, function () {
  console.log ('Example app listening on port 3000!');
});
