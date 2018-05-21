import React, { Component } from "react";
import DeviceCardList from "./DeviceCardList";
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
          <Col>
            <h1>Canary Device Admin Dashboard</h1>
            <hr />
          </Col>
        </Row>
        <DeviceCardList />
      </Container>
    );
  }
}

export default Dashboard;
