import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import dataLayer from "./../../data";
const connection = new dataLayer();

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createDevice: true
    };
  }

  // Begin Handlers
  handleCreateDeviceOrReading = () => {
    if (this.state.createDevice)
      connection.devices
        .createDevice()
        .then(() => {
          this.props.handleCreateDeviceSuccess();
        })
        .catch(error =>
          this.setState({
            failedRequest: "Unable to create device. Try again soon."
          })
        );
  };

  render() {
    return (
      <Row>
        <Col sm="2" />
        <Col sm="8">
          <h4>Create Device</h4>
        </Col>
        <Col sm="2" />
      </Row>
    );
  }
}

export default Dashboard;
