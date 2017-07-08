//@flow
var networkService = require ('./network');
var moment = require ('moment');

function getAddress (lat, lon) {
  return networkService.getAddressByLocation (lat, lon).then (res => {
    if (res.data && res.data.results && res.data.results[0]) {
      return res.data.results[0].formatted_address;
    }
  });
}

function getCloudCoverage (lat, lon, time, hours) {
  return networkService
    .getHistoryWeather ({lat: lat, lon: lon, time: time})
    .then (res => {
      var fiveHoursUv = 0;
      var numOfHours = Math.max (hours - 5, 0);
      for (var i = hours; i > numOfHours; i--) {
        fiveHoursUv += res.data.hourly.data[i].uvIndex;
      }
      if (hours < 5) {
        return networkService
          .getHistoryWeather ({
            lat: lat,
            lon: lon,
            time: moment.unix (time).subtract (1, 'days').unix (),
          })
          .then (res2 => {
            for (var i = 23; i > 23 - Math.abs (hours - 5); i--) {
              fiveaHoursUv += res.data.hourly.data[i].uvIndex;
            }
            fiveHoursUv = fiveHoursUv / 5;
            return {
              lastFiveHours: fiveHoursUv,
              allDay: res.data.daily.data[0].uvIndex,
            };
          });
      } else {
        fiveHoursUv = fiveHoursUv / 5;
        return {
          lastFiveHours: fiveHoursUv,
          allDay: res.data.daily.data[0].uvIndex,
        };
      }
    });
}

module.exports = {
  getCloudCoverage: getCloudCoverage,
  getAddress: getAddress,
};
