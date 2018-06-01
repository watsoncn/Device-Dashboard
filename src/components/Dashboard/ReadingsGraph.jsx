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

  render() {
    const { readingRanges } = this.props;

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
            data={null}
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
