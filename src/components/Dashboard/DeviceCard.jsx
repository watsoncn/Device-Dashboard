import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faThermometerEmpty,
  faTint,
  faLeaf
} from "@fortawesome/fontawesome-free-solid";
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

    this.state = {};
  }

  render() {
    const {
      name,
      createdAt,
      updatedAt,
      type,
      value,
      id
    } = this.props.deviceData;
    return (
      <Card id="deviceCard">
        <CardBody>
          <button
            type="button"
            className="close hideActiveOutline"
            aria-label="Delete">
            <span aria-hidden="true">&times;</span>
          </button>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>
            <small>{updatedAt}</small>
          </CardSubtitle>
          <CardText>
            {type}: {value}
            <span>{/* <FontAwesomeIcon icon={faThermometerEmpty} /> */}</span>
            <span>{/* <FontAwesomeIcon icon={faTint} />*/}</span>
            <span>{/* <FontAwesomeIcon icon={faLeaf} />*/}</span>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default DeviceCard;
