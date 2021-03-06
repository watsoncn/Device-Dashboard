import React, { Component } from "react";
import DeviceCard from "./DeviceCard";
import { Row, Col, Button } from "reactstrap";
import dataLayer from "./../../data";
const connection = new dataLayer();

class DeviceCardList extends Component {
  constructor(props) {
    super(props);
  }

  handleShowCreateForm = () => {
    this.props.handleShowCreateForm(true);
  };

  passIdToParent = deviceId => {
    this.props.handleGetDeviceReadings(deviceId);
  };

  handleDeleteDevice = deviceId => {
    this.props.handleDeviceDelete(deviceId);
  };

  render() {
    const { deviceList } = this.props;
    return (
      <div>
        <h4 id="deviceList-header">
          Device List
          <button
            onClick={this.handleShowCreateForm}
            type="button"
            id="DeviceCard-add--button"
            className="close hideActiveOutline"
            aria-label="Add">
            <span aria-hidden="true">&#5161;</span>
          </button>
        </h4>

        <div id="deviceCardList-scroll">
          {deviceList.map(device => (
            <DeviceCard
              testValue
              handleDeleteDevice={this.handleDeleteDevice}
              passIdToParent={this.passIdToParent}
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
