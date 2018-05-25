import React, { Component } from "react";
import DeviceCard from "./DeviceCard";
import { Row, Col } from "reactstrap";
import dataLayer from "./../../data";
const connection = new dataLayer();

class DeviceCardList extends Component {
  constructor(props) {
    super(props);
  }

  // Begin Handlers

  render() {
    const { devices } = this.props;
    return (
      <div>
        <h4 id="deviceList-header">Device List</h4>
      <div id="deviceCardList-scroll">
        {devices.map(device => (
          <DeviceCard
            handleDeviceCardSelection={ this.props.handleDeviceCardSelection}
            className="deviceCard"
            key={device.id}
            deviceData={device}
          />
        ))}
      </div>
      </div>
    );
  }
}

export default DeviceCardList;
