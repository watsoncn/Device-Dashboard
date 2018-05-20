/*
DATA LAYER
*/

"use strict";

import axios from "axios";

const devices = require("./devices"),
  readings = require("./readings"),
  config = require("./config"),
  connection = axios.create(config.axios);

module.exports = function(configuredAxios) {
  this.axios = configuredAxios || connection;
  this.devices = new devices(this.axios);
  this.readings = new readings(this.axios);
};
