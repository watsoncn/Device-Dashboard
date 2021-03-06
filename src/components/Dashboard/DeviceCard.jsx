import React, { Component } from "react";
import _ from "lodash";
import Moment from "react-moment";
import "moment-timezone";
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

  handleDeviceCardClick = deviceId => {
    this.props.passIdToParent(deviceId);
  };
  handleDeviceDeleteClick(deviceId) {
    this.props.handleDeleteDevice(deviceId);
  }

  render() {
    const { name, updatedAt, type, value, id } = this.props.deviceData;
    let readingIcon;
    if (type === "temperature") {
      readingIcon = <FontAwesomeIcon icon={faThermometerEmpty} />;
    } else if (type === "humidity") {
      readingIcon = <FontAwesomeIcon icon={faTint} />;
    } else if (type === "airquality") {
      readingIcon = <FontAwesomeIcon icon={faLeaf} />;
    }

    const dataQuality =
      type && value ? (
        type === "temperature" ? (
          <small>
            {_.startCase(_.toLower(type))}: {readingIcon} {value}°f
          </small>
        ) : (
          <small>
            {" "}
            {_.startCase(_.toLower(type))}: {readingIcon} {value}%
          </small>
        )
      ) : (
        <small>No Readings</small>
      );

    return (
      <Card onClick={() => this.handleDeviceCardClick(id)} id="deviceCard">
        <CardBody>
          <button
            onClick={() => this.handleDeviceDeleteClick(id)}
            type="button"
            className="close hideActiveOutline"
            aria-label="Delete">
            <span aria-hidden="true">&times;</span>
          </button>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>{dataQuality}</CardSubtitle>
          <CardText className="deviceCard-body">
            <small>
              Last updated <Moment fromNow>{updatedAt}</Moment>
            </small>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default DeviceCard;
