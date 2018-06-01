"use strict";

module.exports = function(axios) {
  // Return all reading data
  this.getAllReadings = () => {
    return axios.get("/readings");
  };

  // Create new reading data
  this.createReading = reading => {
    return axios.post("/readings", reading);
  };
};
