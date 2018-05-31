"use strict";

module.exports = function(axios) {
  // Return all reading data
  this.getAllReadings = () => {
    return axios.get("/readings");
  };
};
