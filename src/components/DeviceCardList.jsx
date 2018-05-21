import React, { Component } from "react";
import DeviceCard from "./DeviceCard";
import { Row, Col } from "reactstrap";

class DeviceCardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [
        {
          name: "Krieger's Van",
          createdAt: "2016-08-30T19:36:55.000Z",
          updatedAt: "2016-08-31T00:37:00.156Z",
          type: "temperature",
          value: 75,
          id: "SyjObPQo"
        },
        {
          name: "Archer's Bedroom",
          createdAt: "2016-08-30T12:56:56.000Z",
          updatedAt: "2016-08-31T00:37:00.251Z",
          type: "temperature",
          value: 73,
          id: "Skk9Wvmi"
        },
        {
          name: "Malory's Office",
          createdAt: "2016-08-30T12:56:56.000Z",
          updatedAt: "2016-08-31T00:37:00.414Z",
          type: "temperature",
          value: 76,
          id: "B105ZP7s"
        },
        {
          name: "Barry's House",
          createdAt: "2016-08-30T20:01:56.000Z",
          updatedAt: "2016-08-31T00:37:00.579Z",
          type: "temperature",
          value: 76,
          id: "SkooZDXo"
        },
        {
          name: "Other Barry's House",
          createdAt: "2016-08-30T13:26:56.000Z",
          updatedAt: "2016-08-31T00:37:00.671Z",
          type: "temperature",
          value: 82,
          id: "rJInWP7j"
        },
        {
          name: "Lana's Nursery",
          createdAt: "2016-08-30T13:36:56.000Z",
          updatedAt: "2016-08-31T00:37:00.849Z",
          type: "temperature",
          value: 102,
          id: "HyN6Zw7j"
        },
        {
          name: "Figgis Agency Front Door",
          createdAt: "2016-08-30T13:01:56.000Z",
          updatedAt: "2016-08-31T00:37:01.025Z",
          type: "temperature",
          value: 105,
          id: "S1xRbDQj"
        },
        {
          name: "Ray's Wheelchair",
          createdAt: "2016-08-30T13:36:56.000Z",
          updatedAt: "2016-08-31T00:37:01.181Z",
          type: "temperature",
          value: 95,
          id: "SyA0ZDXo"
        },
        {
          name: "Babou's Cage",
          createdAt: "2016-08-30T14:31:56.000Z",
          updatedAt: "2016-08-31T00:37:01.208Z",
          type: "temperature",
          value: 70,
          id: "S1iJMDQj"
        },
        {
          name: "James' Shed",
          type: "temperature",
          value: "78",
          createdAt: "2016-11-29T20:43:46.887Z",
          updatedAt: "2016-11-29T20:43:46.887Z",
          id: "rJitOPizg"
        },
        {
          name: "Tom's barn",
          type: "airquality",
          value: "67",
          createdAt: "2016-11-29T22:06:47.750Z",
          updatedAt: "2016-11-29T22:06:47.751Z",
          id: "Skxb3ujMg"
        },
        {
          name: "Sarah's Workshop",
          type: "humidity",
          value: "55",
          createdAt: "2016-11-30T00:35:09.553Z",
          updatedAt: "2016-11-30T00:35:09.563Z",
          id: "HJ8pR9jfg"
        },
        {
          name: "Andrew's Yard",
          type: "humidity",
          value: "65",
          createdAt: "2016-11-30T01:28:13.989Z",
          updatedAt: "2016-11-30T01:28:13.989Z",
          id: "S18EjijMe"
        }
      ]
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

  render() {
    return (
      <div>
        {this.state.devices.map(device => (
          <DeviceCard key={device.id} deviceData={device} />
        ))}
      </div>
    );
  }
}

export default DeviceCardList;
