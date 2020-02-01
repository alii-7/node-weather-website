const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYWx5LXNhYnJ5IiwiYSI6ImNrNWsyNmNsMDA4d2kza28waGRwazB1eWkifQ.ZrAwmQro66FGOsI328cACA";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
