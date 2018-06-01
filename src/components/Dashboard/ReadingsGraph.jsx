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
      showAvgChart: true
    };
  }

  handleGraphClose = () => {
    this.props.closeSelectedGraph();
  };

  render() {
    const { showAvgChart } = this.state;
    const { readingRanges, selectedDevice } = this.props;

    const graphType = {
      deviceAverages: (
        <div>
          <h4 id="chart-header">System Reading Range</h4>
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
          <h4 id="chart-header">
            Selected Device Readings
            <button
              onClick={this.handleGraphClose}
              id="closeGraphButton"
              type="button"
              className="close hideActiveOutline"
              aria-label="Delete">
              <span aria-hidden="true">&times;</span>
            </button>
          </h4>
          <LineChart
            xtitle="Time"
            ytitle="Avg Readings"
            colors={["rgb(151, 197, 179)", "black", "blue"]}
            data={selectedDevice}
          />
        </div>
      )
    };
    return (
      <div>
        <h4 />
        {selectedDevice.length > 0
          ? graphType.selectedDevice
          : graphType.deviceAverages}
      </div>
    );
  }
}

export default ReadingsGraph;
