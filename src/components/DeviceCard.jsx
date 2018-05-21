import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Button,
  Row
} from "reactstrap";

class DeviceCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, createdAt, updatedAt, type, value } = this.props.deviceData;
    return (
      <Card>
        <CardBody>
          <button type="button" className="close" aria-label="Delete">
            <span aria-hidden="true">&times;</span>
          </button>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>
            <small>{updatedAt}</small>
          </CardSubtitle>
          <CardText />
        </CardBody>
      </Card>
    );
  }
}

export default DeviceCard;
