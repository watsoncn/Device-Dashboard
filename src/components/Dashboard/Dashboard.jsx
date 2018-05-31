import React, { Component } from "react";
import DeviceCardList from "./DeviceCardList";
import ReadingsGraph from "./ReadingsGraph";
import CreateForm from "./CreateForm";
import { Container, Row, Col } from "reactstrap";
import dataLayer from "./../../data";
const connection = new dataLayer();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      createForm: false
    };
  }

  // Lifecycle Methods
  componentDidMount() {
    this.handleGetDeviceList();
  }

  // Handler Methods
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
  handleGetDeviceList = () => {
    connection.devices
      .getDeviceList()
      .then(resp => {
        this.setState({ deviceList: resp.data }, () => {
          this.calculateDeviceReadingRanges();
        });
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve devices. Try again soon."
        })
      );
  };
  handleGetSingleDeviceReadings = deviceId => {
    connection.devices
      .getSingleDeviceReadings(deviceId)
      .then(resp => {
        const sortedReadings = resp.data
          .sort((a, b) => parseFloat(a.updatedAt) - parseFloat(b.updatedAt))
          .slice(0, 10);
        this.setState({ sortedReadings });
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve device readings. Try again soon."
        })
      );
  };

  // Math Methods
  getListAverage(list) {
    return list.reduce((a, b) => a + b, 0) / list.length;
  }
  calculateDeviceReadingRanges() {
    const { deviceList } = this.state;
    // Temp Arrays for finding ranges
    const temperatureList = [];
    const humidityList = [];
    const airQualityList = [];
    const readingRanges = [];

    deviceList.forEach(device => {
      if (!isNaN(device.value)) {
        if (device.type === "temperature") {
          temperatureList.push(device.value);
        } else if (device.type === "humidity") {
          humidityList.push(device.value);
        } else if (device.type === "airquality") {
          airQualityList.push(device.value);
        }
      }
    });

    // Average Readings
    temperatureList.length
      ? readingRanges.push([
          "Avg-Temp",
          this.getListAverage(temperatureList).toFixed(2)
        ])
      : readingRanges.push(["Avg-Temp", 0]);
    humidityList.length
      ? readingRanges.push([
          "Avg-Humid",
          this.getListAverage(humidityList).toFixed(2)
        ])
      : readingRanges.push(["Avg-Humid", 0]);
    airQualityList.length
      ? readingRanges.push([
          "Avg-Air",
          this.getListAverage(airQualityList).toFixed(2)
        ])
      : readingRanges.push(["Avg-Air", 0]);

    // Minimum Readings
    temperatureList.length
      ? readingRanges.push([
          "Min-Temp",
          Math.min(...temperatureList).toFixed(2)
        ])
      : readingRanges.push(["Min-Temp", 0]);

    humidityList.length
      ? readingRanges.push(["Min-Humid", Math.min(...humidityList).toFixed(2)])
      : readingRanges.push(["Min-Humid", 0]);

    airQualityList.length
      ? readingRanges.push(["Min-Air", Math.min(...airQualityList).toFixed(2)])
      : readingRanges.push(["Min-Air", 0]);

    // Maximum Readings
    temperatureList.length
      ? readingRanges.push([
          "Max-Temp",
          Math.max(...temperatureList).toFixed(2)
        ])
      : readingRanges.push(["Max-Temp", 0]);

    humidityList.length
      ? readingRanges.push(["Max-Humid", Math.max(...humidityList).toFixed(2)])
      : readingRanges.push(["Max-Humid", 0]);

    airQualityList.length
      ? readingRanges.push(["Max-Air", Math.max(...airQualityList).toFixed(2)])
      : readingRanges.push(["Max-Air", 0]);

    this.setState({ readingRanges });
  }

  render() {
    const { sortedReadings, deviceList, readingRanges } = this.state;

    // If user clicks to create a new device/reading, load create view
    if (this.state.createForm) {
      return (
        <Container>
          <Row>
            <h1>CREATE FORM</h1>
          </Row>
        </Container>
      );
    }
    // Load dashboard
    return (
      <Container>
        <Row>
          <Col sm="12" id="dashboard-header">
            <h1>Device Dashboard</h1>
          </Col>
        </Row>
        <Row id="Dashboard-body">
          <Col sm="6" id="readingsGraph">
            <ReadingsGraph
              readingRanges={readingRanges}
              selectedDeviceReadings={sortedReadings}
            />
          </Col>
          <Col sm="1" />
          <Col sm="4">
            <DeviceCardList
              handleGetSingleDeviceReadings={this.handleGetSingleDeviceReadings}
              deviceList={deviceList}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
