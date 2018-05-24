import React, { Component } from "react";
import DeviceCardList from "./DeviceCardList";
import ReadingsGraph from "./ReadingsGraph";
import { Container, Row, Col, Button } from "reactstrap";
import dataLayer from "./../../data";
const connection = new dataLayer();
import { devices, readings } from "./../../data/mock/.mock";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: devices,
      readings: readings
    };

    // this.handleGetDeviceList();
  }

  // Begin Handlers
  handleGetDeviceList = () => {
    connection.devices
      .getDeviceList()
      .then(resp => {
        this.setState({ devices: resp.data }, () => {
          console.log("devices:", this.state.devices);
        });
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve devices. Try again later."
        })
      );
  };
  handleDeleteDevice = () => {
    connection.devices
      .deleteDevice()
      .then(resp => {
        console.log("Delete:", resp);
        // Likely case for websocket, for now re-GET list
        // in case of unexpected external changes
        // (multiple users, system triggered changes, time related updates)
        this.handleGetDeviceList();
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve devices. Try again later."
        })
      );
  };
  handleCreateDevice = () => {
    // TRIGGER MODAL OPEN
  };

  render() {
    const { readings, devices } = this.state;
    console.log("consts:", devices);
    return (
      <Container>
        <Row>
          <Col xs="2" />
          <Col xs="8" id="dashboard-header">
            <h1>Device Dashboard</h1>
          </Col>
          <Col xs="2">
            <button
              type="button"
              id="add-deviceCard"
              className="close"
              aria-label="Add">
              <span aria-hidden="true">&#5161;</span>
            </button>
          </Col>
        </Row>
        <Row id="Dashboard-body">
          <Col xs="6" id="readingsGraph">
            <ReadingsGraph readings={readings} />
          </Col>
          <Col xs="1" />
          <Col xs="4">
            <DeviceCardList devices={devices} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
