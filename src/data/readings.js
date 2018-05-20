"use strict";

module.exports = function(axios) {
  // Return all reading data
  this.getReadingList = () => {
    return axios.get("/readings");
  };

  // Return specific reading matching readingId
  this.getReading = readingId => {
    return axios.get(`/readings/${readingId}`);
  };
};
