import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ReactChartkick, { LineChart, ColumnChart } from "react-chartkick";
import Chart from "chart.js";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faThermometerEmpty,
  faTint,
  faLeaf
} from "@fortawesome/fontawesome-free-solid";
ReactChartkick.addAdapter(Chart);

class ReadingsGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleGraph: false
    };
  }

  toggleGraphType = () => {
    this.setState({ toggleGraph: !this.state.toggleGraph });
  };

  formatDeviceChartData = () => {};

  render() {
    const { selectedDeviceReadings, readingRanges } = this.props;
    const fakeData = [
      {
        name: "Temperature",
        data: {
          "2017-01-01 00:00:00 -0800": 20,
          "2017-01-01 00:01:00 -0800": 50,
          "2017-01-01 00:02:00 -0800": 20
        }
      },
      {
        name: "Humidity",
        data: {
          "2017-01-01 00:05:00 -0800": 30,
          "2017-01-01 00:06:00 -0800": 70,
          "2017-01-01 00:07:00 -0800": 70,
          "2017-01-01 00:08:00 -0800": 50,
          "2017-01-01 00:09:00 -0800": 112,
          "2017-01-01 00:00:00 -0800": 30,
          "2017-01-01 00:01:00 -0800": 60,
          "2017-01-01 00:02:00 -0800": 30,
          "2017-01-01 00:03:00 -0800": 80,
          "2017-01-01 00:04:00 -0800": 100
        }
      },
      {
        name: "Air Quality",
        data: {
          "2017-01-01 00:04:00 -0800": 12,
          "2017-01-01 00:05:00 -0800": 37,
          "2017-01-01 00:06:00 -0800": 67,
          "2017-01-01 00:07:00 -0800": 45,
          "2017-01-01 00:08:00 -0800": 52,
          "2017-01-01 00:09:00 -0800": 100
        }
      }
    ];

    const graphType = {
      deviceAverages: (
        <div>
          <h4 onClick={() => this.toggleGraphType()} id="chart-header">
            System Reading Range
          </h4>
          <ColumnChart
            xtitle="Readings Type"
            ytitle="Value Ranges"
            colors={["rgb(151, 197, 179)"]}
            data={readingRanges}
          />
        </div>
      ),
      selectedDevice: (
        <div>
          <h4 onClick={() => this.toggleGraphType()} id="chart-header">
            Selected Device Readings
          </h4>
          <LineChart
            xtitle="Time"
            ytitle="Avg Readings"
            colors={["rgb(151, 197, 179)", "black", "blue"]}
            data={fakeData}
          />
        </div>
      )
    };
    return (
      <div>
        <h4 />
        {this.state.toggleGraph
          ? graphType.selectedDevice
          : graphType.deviceAverages}
      </div>
    );
  }
}

export default ReadingsGraph;
