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
        const sortedReadings = resp.data
          .sort((a, b) => parseFloat(a.updatedAt) - parseFloat(b.updatedAt))
          .slice(0, 10);
        this.formatDeviceReadingsChart(sortedReadings);
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to retrieve device readings. Try again soon."
        })
      );
  };

  formatDeviceReadingsChart = readings => {
    // BUILD CHART DATA
    const chartArray = {};
    console.log(readings);
  };

  // {
  //   name: "Temperature",
  //   data: {
  //     "2017-01-01 00:00:00 -0800": 20,
  //     "2017-01-01 00:01:00 -0800": 50,
  //     "2017-01-01 00:02:00 -0800": 20
  //   }
  // }

  handleSubmitDeviceOrReading = (deviceOrReading, createDevice) => {
    if (deviceOrReading === "cancel") {
      this.setState({ createForm: false });
    } else {
      createDevice
        ? this.createDevice(deviceOrReading)
        : this.createReading(deviceOrReading);
    }
  };

  createDevice(device) {
    connection.devices
      .createDevice(device)
      .then(resp => {
        this.setState({ createForm: false }, () => this.handleGetDeviceList());
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to create device. Try again soon."
        })
      );
  }
  createReading(reading) {
    connection.readings
      .createReading(reading)
      .then(resp => {
        this.setState({ createForm: false }, () => this.handleGetDeviceList());
      })
      .catch(error =>
        this.setState({
          failedRequest: "Unable to create reading. Try again soon."
        })
      );
  }

  handleShowHideCreateForm = showForm => {
    this.setState({ createForm: showForm });
  };

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
  // {
  // createdAt:"2016-11-10T17:46:36.905Z"
  // deviceId:"SkooZDXo"
  // id:"SkCRFA6KG-x"
  // type:"temperature"
  // updatedAt:"2016-11-11T00:16:17.037Z"
  // value: 81
  // }

  // {
  //   name: "Temperature",
  //   data: {
  //     "2017-01-01 00:00:00 -0800": 20,
  //     "2017-01-01 00:01:00 -0800": 50,
  //     "2017-01-01 00:02:00 -0800": 20
  //   }
  // }

  render() {
    const { deviceList, readingRanges } = this.state;

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
            <ReadingsGraph readingRanges={readingRanges} />
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
