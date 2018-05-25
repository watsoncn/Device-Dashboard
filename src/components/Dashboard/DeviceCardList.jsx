import React, { Component } from "react";
import DeviceCard from "./DeviceCard";
import { Row, Col, Button } from "reactstrap";
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
        <h4 id="deviceList-header">Device List
          <button
            type="button"
            id="DeviceCard-add--button"
            className="close"
            aria-label="Add">
            <span aria-hidden="true">&#5161;</span>
          </button>
        </h4>

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
