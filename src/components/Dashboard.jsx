import React, { Component } from "react";
import DeviceCardList from "./DeviceCardList";
import ReadingsGraph from "./ReadingsGraph";
import { Container, Row, Col } from "reactstrap";
import dataLayer from "./../data";
const connection = new dataLayer();

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="2" />
          <Col xs="8">
            <h1>Canary Device Admin Dashboard</h1>
            <hr />
          </Col>
          <Col xs="2" />
        </Row>
        <Row>
          <Col xs="4">
            <DeviceCardList />
          </Col>
          <Col xs="6">
            <ReadingsGraph />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
