import React, { Component } from "react";
import DeviceCardList from "./DeviceCardList";
import ReadingsGraph from "./ReadingsGraph";
import { Container, Row, Col } from "reactstrap";
import dataLayer from "./../../data";
const connection = new dataLayer();

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceList: [],
      selectedDeviceReadings: []
    };
  }

  componentDidMount() {
    this.handleGetDeviceList();
  }

  // Begin Handlers
  handleGetDeviceList = () => {
    connection.devices
      .getDeviceList()
      .then(resp => {
        this.setState({ deviceList: resp.data });
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve devices. Try again soon."
        })
      );
  };
  handleDeleteDevice = () => {
    connection.devices
      .deleteDevice()
      .then(resp => {
        // Likely case for websocket, for now re-GET list
        // in case of unexpected external changes
        // (multiple users, system triggered changes, time related updates)
        this.handleGetDeviceList();
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to delete device. Try again soon."
        })
      );
  };
  handleCreateDevice = () => {
    // TRIGGER MODAL OPEN
  };
  handleAverageAllDevicesByType = () => {};
  handleDeviceCardSelection = selectedDeviceCard => {
    connection.devices
      .getDeviceReadings()
      .then(resp => {
        this.setState({ selectedDeviceReadings: resp.data });
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve device readings. Try again soon."
        })
      );
  };

  render() {
    const { selectedDeviceReadings, deviceList } = this.state;

    return (
      <Container>
        <Row>
          <Col sm="12" id="dashboard-header">
            <h1>Device Dashboard</h1>
          </Col>
        </Row>
        <Row id="Dashboard-body">
          <Col sm="6" id="readingsGraph">
            <ReadingsGraph selectedDeviceReadings={selectedDeviceReadings} />
          </Col>
          <Col sm="1" />
          <Col sm="4">
            <DeviceCardList
              handleDeviceCardSelection={this.handleDeviceCardSelection}
              deviceList={deviceList}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
