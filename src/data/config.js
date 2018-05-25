"use strict";

module.exports = {
  axios: {
    baseURL:
      process.env.AXIOS_BASE_URL ||
      "https://fullstack-challenge-api.herokuapp.com/",
    timeout: process.env.AXIOS_TIMEOUT || 5000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      withCredentials: false
    }
  }
};
