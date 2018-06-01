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
      selectedDevice: [],
      createForm: false
    };
  }

  // Lifecycle Methods
  componentDidMount() {
    this.handleGetDeviceList();
  }

  // Handler Methods
  handleDeleteDevice = deviceId => {
    connection.devices
      .deleteDevice(deviceId)
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
  handleGetDeviceReadings = deviceId => {
    connection.devices
      .getSingleDeviceReadings(deviceId)
      .then(resp => {
        const tempReadings = resp.data
          .filter(reading => reading.type === "temperature")
          .sort((a, b) => parseFloat(a.updatedAt) - parseFloat(b.updatedAt))
          .slice(0, 5);
        const humidReadings = resp.data
          .filter(reading => reading.type === "humidity")
          .sort((a, b) => parseFloat(a.updatedAt) - parseFloat(b.updatedAt))
          .slice(0, 5);
        const airReadings = resp.data
          .filter(reading => reading.type === "airquality")
          .sort((a, b) => parseFloat(a.updatedAt) - parseFloat(b.updatedAt))
          .slice(0, 5);

        this.formatDeviceReadingsChart([
          ...tempReadings,
          ...humidReadings,
          ...airReadings
        ]);
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve device readings. Try again soon."
        })
      );
  };

  formatDeviceReadingsChart = readings => {
    // BUILD CHART DATA
    const selectedDevice = [];
    const tempData = {
      name: "Temperature",
      data: {}
    };
    const humidData = {
      name: "Humidity",
      data: {}
    };
    const airData = {
      name: "Air Quality",
      data: {}
    };
    readings.forEach(reading => {
      if (reading.type === "temperature") {
        tempData.data[reading.updatedAt] = reading.value;
      } else if (reading.type === "humidity") {
        humidData.data[reading.updatedAt] = reading.value;
      } else if (reading.type === "airquality") {
        airData.data[reading.updatedAt] = reading.value;
      }
    });
    selectedDevice.push(tempData, humidData, airData);
    this.setState({ selectedDevice });
  };

  closeSelectedGraph = () => {
    this.setState({ selectedDevice: [] });
  };

  handleSubmitDeviceOrReading = (deviceOrReading, createDevice) => {
    if (deviceOrReading === "cancel") {
      this.setState({ createForm: false });
    } else {
      this.setState(
        { createForm: false },
        () =>
          createDevice
            ? this.createDevice(deviceOrReading)
            : this.createReading(deviceOrReading)
      );
    }
  };

  handleShowHideCreateForm = showForm => {
    this.setState({ createForm: showForm });
  };

  createDevice(device) {
    connection.devices
      .createDevice(device)
      .then(resp => this.handleGetDeviceList())
      .catch(error =>
        this.setState({
          failedRequest: "Unable to create device. Try again soon."
        })
      );
  }
  createReading(reading) {
    connection.readings
      .createReading(reading)
      .then(resp => this.handleGetDeviceList())
      .catch(error =>
        this.setState({
          failedRequest: "Unable to create reading. Try again soon."
        })
      );
  }

  // Math Methods
  getListAverage(list) {
    return list.reduce((a, b) => a + b, 0) / list.length;
  }

  // Builder Methods
  calculateDeviceReadingRanges() {
    const { deviceList } = this.state;
    // Temp Arrays for finding ranges
    const temperatureList = [];
    const humidityList = [];
    const airQualityList = [];
    const readingRanges = [];

    deviceList.forEach(device => {
      if (!isNaN(+device.value)) {
        if (device.type === "temperature") {
          temperatureList.push(+device.value);
        } else if (device.type === "humidity") {
          humidityList.push(+device.value);
        } else if (device.type === "airquality") {
          airQualityList.push(+device.value);
        }
      }
    });

    // Temperature Readings
    temperatureList.length
      ? readingRanges.push([
          "Temp-Min",
          Math.min(...temperatureList).toFixed(2)
        ])
      : readingRanges.push(["Temp-Min", 0]);
    temperatureList.length
      ? readingRanges.push([
          "Temp-Avg",
          this.getListAverage(temperatureList).toFixed(2)
        ])
      : readingRanges.push(["Temp-Avg", 0]);
    temperatureList.length
      ? readingRanges.push([
          "Temp-Max",
          Math.max(...temperatureList).toFixed(2)
        ])
      : readingRanges.push(["Temp-Max", 0]);

    // Humidity Readings
    humidityList.length
      ? readingRanges.push(["Humid-Min", Math.min(...humidityList).toFixed(2)])
      : readingRanges.push(["Humid-Min", 0]);
    humidityList.length
      ? readingRanges.push([
          "Humid-Avg",
          this.getListAverage(humidityList).toFixed(2)
        ])
      : readingRanges.push(["Humid-Avg", 0]);

    humidityList.length
      ? readingRanges.push(["Humid-Max", Math.max(...humidityList).toFixed(2)])
      : readingRanges.push(["Humid-Max", 0]);

    // Air Quality Readings
    airQualityList.length
      ? readingRanges.push(["Air-Min", Math.min(...airQualityList).toFixed(2)])
      : readingRanges.push(["Air-Min", 0]);
    airQualityList.length
      ? readingRanges.push([
          "Air-Avg",
          this.getListAverage(airQualityList).toFixed(2)
        ])
      : readingRanges.push(["Air-Avg", 0]);
    airQualityList.length
      ? readingRanges.push(["Air-Max", Math.max(...airQualityList).toFixed(2)])
      : readingRanges.push(["Air-Max", 0]);

    this.setState({ readingRanges });
  }

  render() {
    const { deviceList, readingRanges, selectedDevice } = this.state;

    // If user clicks to create a new device/reading, load create view
    if (this.state.createForm) {
      return (
        <CreateForm
          deviceList={deviceList}
          handleSubmitDevice={this.handleSubmitDeviceOrReading}
          cancelForm={this.handleShowHideCreateForm}
        />
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
              closeSelectedGraph={this.closeSelectedGraph}
              selectedDevice={selectedDevice}
              readingRanges={readingRanges}
            />
          </Col>
          <Col sm="1" />
          <Col sm="4">
            <DeviceCardList
              handleShowCreateForm={this.handleShowHideCreateForm}
              handleDeviceDelete={this.handleDeleteDevice}
              handleGetDeviceReadings={this.handleGetDeviceReadings}
              deviceList={deviceList}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
