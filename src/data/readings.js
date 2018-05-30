"use strict";

module.exports = function(axios) {
  // Return all reading data
  this.getAllReadings = () => {
    return axios.get("/readings");
  };

  // Return specific reading matching readingId
  this.getSingleDeviceReadings = readingId => {
    return axios.get(`/readings/${readingId}`);
  };
};
