const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/3c9973c5b7d8f213ec46f026e75da730/" +
    lat +
    "," +
    long +
    "?units=us";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unsbale to connect to weather service", undefined);
    } else if (response.body.error) {
      callback(response.body.error, undefined);
    } else {
      console.log("response.body.currently", response.body.currently);
      callback(undefined, {
        summary: response.body.currently.summary,
        time: response.body.currently.time,
        temperature: response.body.currently.temperature
      });
    }
  });
};

module.exports = forecast;
