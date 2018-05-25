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
      readings: readings,
      selectedDeviceReadings: []
     };

    // this.handleGetDeviceList();
  }

  // Begin Handlers
  handleGetDeviceList = () => {
    connection.devices
      .getDeviceList()
      .then(resp => {
        this.setState({ liveDevices: resp.data }, () => {
          console.log("devices:", resp);
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
  handleAverageAllDevicesByType = () => {
  };
  handleDeviceCardSelection = (selectedDeviceCard) => {
    const fakeData = [ {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T05:38:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.285Z",
        "id": "SJb1xiRRlNj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T05:08:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.300Z",
        "id": "rJq1lsC0gNj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 81,
        "createdAt": "2016-08-31T04:38:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.302Z",
        "id": "Hyi1go0CgEj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T04:28:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.303Z",
        "id": "ry3ylo0ReVs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T04:33:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.304Z",
        "id": "Syp1eoCRlEi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 84,
        "createdAt": "2016-08-31T04:53:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.306Z",
        "id": "BJCkxoA0gNj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 84,
        "createdAt": "2016-08-31T05:03:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.307Z",
        "id": "H1yxgjRAgVo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T04:48:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.308Z",
        "id": "rklxgs0CgNj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 86,
        "createdAt": "2016-08-31T05:18:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.310Z",
        "id": "SJWllsRCxNi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 80,
        "createdAt": "2016-08-31T04:43:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.312Z",
        "id": "ryzxlj0RxVi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 84,
        "createdAt": "2016-08-31T05:13:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.314Z",
        "id": "Sy7lgsARgNs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 80,
        "createdAt": "2016-08-31T05:33:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.316Z",
        "id": "Hy4xejACg4i"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 84,
        "createdAt": "2016-08-31T04:58:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.318Z",
        "id": "B1BgxoCAlEj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 84,
        "createdAt": "2016-08-31T05:23:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.338Z",
        "id": "rJilgsARxNo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T05:28:05.000Z",
        "updatedAt": "2016-08-31T06:53:07.352Z",
        "id": "rJTlxi00eNo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 85,
        "createdAt": "2016-08-31T06:03:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.154Z",
        "id": "S1o8g3C0xNj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 84,
        "createdAt": "2016-08-31T05:43:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.156Z",
        "id": "By2Le3AAeVj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 84,
        "createdAt": "2016-08-31T05:58:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.157Z",
        "id": "HJ68xn0CxEs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 86,
        "createdAt": "2016-08-31T05:48:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.158Z",
        "id": "HkALlhC0xVo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 85,
        "createdAt": "2016-08-31T05:53:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.159Z",
        "id": "SkJDehA0lVi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 74,
        "createdAt": "2016-08-30T19:18:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.570Z",
        "id": "rJzbpRAe4i"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 71,
        "createdAt": "2016-08-30T19:03:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.572Z",
        "id": "BJmbTACl4j"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 73,
        "createdAt": "2016-08-30T19:13:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.585Z",
        "id": "H1uW6CAgNi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 71,
        "createdAt": "2016-08-30T19:08:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.595Z",
        "id": "Hypb6CCeNi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 73,
        "createdAt": "2016-08-30T19:38:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.598Z",
        "id": "rJlG6CCx4s"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 71,
        "createdAt": "2016-08-30T19:33:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.600Z",
        "id": "rkWMT0Cg4i"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 69,
        "createdAt": "2016-08-30T18:58:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.605Z",
        "id": "SyHG600xVi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T02:08:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.871Z",
        "id": "SJnjpR0gVi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T02:18:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.874Z",
        "id": "BypoTRAe4i"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T03:08:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.875Z",
        "id": "H1AiT00gNj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 80,
        "createdAt": "2016-08-31T03:23:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.876Z",
        "id": "Hyy26RCgVs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 83,
        "createdAt": "2016-08-31T04:23:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.879Z",
        "id": "r1Z360CeVs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 86,
        "createdAt": "2016-08-31T04:08:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.880Z",
        "id": "HkMnTCRe4i"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 85,
        "createdAt": "2016-08-31T02:53:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.882Z",
        "id": "H172a0Ce4s"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 81,
        "createdAt": "2016-08-31T01:53:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.893Z",
        "id": "H1EnaR0lNi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 86,
        "createdAt": "2016-08-31T03:38:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.895Z",
        "id": "H1ShaAAgNs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T03:03:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.896Z",
        "id": "H1Inp0CgVi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 88,
        "createdAt": "2016-08-31T04:03:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.897Z",
        "id": "HJv36ACeEs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 81,
        "createdAt": "2016-08-31T01:58:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.899Z",
        "id": "r1Oh6CAl4o"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 87,
        "createdAt": "2016-08-31T03:43:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.900Z",
        "id": "BJKn60Rl4o"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 81,
        "createdAt": "2016-08-31T03:13:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.901Z",
        "id": "By526C0eVj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 86,
        "createdAt": "2016-08-31T04:13:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.903Z",
        "id": "SJshTACe4o"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 88,
        "createdAt": "2016-08-31T03:53:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.904Z",
        "id": "S1h2TRRgNj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 86,
        "createdAt": "2016-08-31T03:58:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.905Z",
        "id": "rkTnaAAe4i"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 83,
        "createdAt": "2016-08-31T02:58:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.907Z",
        "id": "r1RhaRCgVs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 80,
        "createdAt": "2016-08-31T03:18:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.908Z",
        "id": "rykpaCCl4j"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 89,
        "createdAt": "2016-08-31T03:48:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.909Z",
        "id": "SylTTR0gNi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 83,
        "createdAt": "2016-08-31T01:18:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.911Z",
        "id": "rJWTpCRlNj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 88,
        "createdAt": "2016-08-31T00:53:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.912Z",
        "id": "r1GTTCCgEj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 93,
        "createdAt": "2016-08-31T00:13:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.913Z",
        "id": "H1mTTR0xVo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 81,
        "createdAt": "2016-08-31T02:03:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.915Z",
        "id": "HyNapARxVo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-31T03:28:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.916Z",
        "id": "rJBTT0RlEj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 89,
        "createdAt": "2016-08-31T00:03:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.919Z",
        "id": "rkLTTC0gEi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 82,
        "createdAt": "2016-08-30T22:48:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.921Z",
        "id": "r1vTaC0eVo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 91,
        "createdAt": "2016-08-31T00:18:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.922Z",
        "id": "H1OapRClVo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 90,
        "createdAt": "2016-08-30T23:13:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.924Z",
        "id": "ryK6aRAgEi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 85,
        "createdAt": "2016-08-30T21:43:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.925Z",
        "id": "ByqT6CAeNs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 95,
        "createdAt": "2016-08-30T23:43:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.926Z",
        "id": "rJsTaARxEo"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 80,
        "createdAt": "2016-08-31T01:48:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.928Z",
        "id": "B12paAAxVi"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 92,
        "createdAt": "2016-08-30T23:28:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.929Z",
        "id": "HJp6pCAl4i"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 92,
        "createdAt": "2016-08-30T23:18:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.930Z",
        "id": "B1AaTCCe4s"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 88,
        "createdAt": "2016-08-31T00:58:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.932Z",
        "id": "ryyRaCClVj"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 84,
        "createdAt": "2016-08-31T03:33:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.933Z",
        "id": "BJgAaA0lNs"
    },
    {
        "deviceId": "SyA0ZDXo",
        "type": "temperature",
        "value": 87,
        "createdAt": "2016-08-30T21:58:05.000Z",
        "updatedAt": "2016-08-31T06:53:08.935Z",
        "id": "ryZApARxNi"
    }  ];

    this.setState({ selectedDeviceReadings: fakeData})
    // connection.devices
    //   .getDeviceReadings()
    //   .then(resp => {
    //     this.setState({ selectedDeviceReadings: resp.data })
    //   .catch(error =>
    //     this.setState({
    //       failedRequest: "Unable to retrieve devices. Try again later."
    //     })
    //   );
  }


  render() {
    const { readings, devices, selectedDeviceReadings } = this.state;

    return (
      <Container>
        <Row>
          <Col sm="2" />
          <Col sm="8" id="dashboard-header">
            <h1>Device Dashboard</h1>
          </Col>
          <Col sm="2">
            <button
              type="button"
              id="DeviceCard-add--button"
              className="close"
              aria-label="Add">
              <span aria-hidden="true">&#5161;</span>
            </button>
          </Col>
        </Row>
        <Row id="Dashboard-body">
          <Col sm="6" id="readingsGraph">
            <ReadingsGraph selectedDeviceReadings={selectedDeviceReadings} readings={readings.slice(0, 10)} />
          </Col>
          <Col sm="1" />
          <Col sm="4">
            <DeviceCardList
              handleDeviceCardSelection={this.handleDeviceCardSelection}
              devices={devices} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
