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
    this.readingsGraph = React.createRef();
    this.state = {
      deviceList: [],
      selectedDeviceReadings: [],
      createForm: false
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
  handleGetSingleDeviceReadings = device => {
    connection.devices
      .getSingleDeviceReadings(device.id)
      .then(resp => {
        return resp.data;
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve device readings. Try again soon."
        })
      );
  };
  handleDashboadUpdate() {
    this.handleGetDeviceList();
    this.handleGetAllDeviceReadings();
  }
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

  // MATH METHODS
  getListAverage(list) {
    return list.reduce((a, b) => a + b, 0) / list.length;
  }

  calculateDeviceReadingRanges() {
    const { deviceList } = this.state;
    let temperatureList = [];
    let humidityList = [];
    let airQualityList = [];
    let readingRanges = {};

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
    readingRanges.avgTemperature = temperatureList.length
      ? this.getListAverage(temperatureList)
      : "NA";
    readingRanges.avgHumidity = humidityList.length
      ? this.getListAverage(humidityList)
      : "NA";
    readingRanges.avgAirQuality = airQualityList.length
      ? this.getListAverage(airQualityList)
      : "NA";

    // Minimum Readings
    readingRanges.minTemperature = temperatureList.length
      ? Math.min(...temperatureList)
      : "NA";
    readingRanges.minHumidity = humidityList.length
      ? Math.min(...humidityList)
      : "NA";
    readingRanges.minAirQuality = airQualityList.length
      ? Math.min(...airQualityList)
      : "NA";

    // Maximum Readings
    readingRanges.maxTemperature = temperatureList.length
      ? Math.max(...temperatureList)
      : "NA";
    readingRanges.maxHumidity = humidityList.length
      ? Math.max(...humidityList)
      : "NA";
    readingRanges.maxAirQuality = airQualityList.length
      ? Math.max(...airQualityList)
      : "NA";
  }

  render() {
    const { selectedDeviceReadings, deviceList } = this.state;

    // If user clicks to create a new device/reading, load create view
    if (this.state.createForm) {
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
                deviceList={deviceList}
                selectedDeviceReadings={selectedDeviceReadings}
              />
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
    // Load standard dashboard
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
