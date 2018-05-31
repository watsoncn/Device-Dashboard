"use strict";

module.exports = function(axios) {
  // Returns an array of device objects.
  this.getDeviceList = resp => {
    return axios.get("/devices");
  };

  // Get a single device object
  // This method returns a single device object matching the passed deviceId
  this.getDevice = deviceId => {
    return axios.get(`/devices/${deviceId}`);
  };

  // Get all Readings for a single device
  // This method returns a single device array of readings
  this.getSingleDeviceReadings = deviceId => {
    return axios.get(`/devices/${deviceId}/readings`);
  };

  // Create a new device
  // Pass a device object to populate device values
  // Returns a new device object containing an id property to use for future
  // lookup
  this.createDevice = device => {
    return axios.post("/devices", device);
  };

  // Update an existing device
  // Pass the id as deviceId of the device you wish to update
  // and the device object. All present fields will be updated
  // Returns a promise object
  // promiseObject.data will be the updated object
  this.updateDevice = (deviceId, device) => {
    return axios.put(`/devices/${deviceId}`, device);
  };

  // Delete an existing device
  // Deletes the device matching the deviceId passed.
  // Returns promise object with 204 status on success
  this.deleteDevice = deviceId => {
    return axios.delete(`/devices/${deviceId}`);
  };
};
