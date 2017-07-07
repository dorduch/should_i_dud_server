//@flow
var networkService = require('./network');


function getCloudCoverage (lat, lon, time) {
  return networkService.getHistoryWeather ({lat: lat, lon: lon, time: time}).then (res => {
    const cloudCoverage = res.data.daily.data[0].cloudCover;
    return cloudCoverage;
  });
}

module.exports = {
  getCloudCoverage: getCloudCoverage,
}
