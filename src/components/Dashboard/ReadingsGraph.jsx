import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
ReactChartkick.addAdapter(Chart);

class ReadingsGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { readings } = this.props;
    return (
      <div>
        <LineChart
          xtitle="Time"
          ytitle="Avg Readings"
          colors={["black"]}
          data={{
            "2017-01-01 00:00:00 -0800": 20,
            "2017-01-01 00:01:00 -0800": 50,
            "2017-01-01 00:02:00 -0800": 20,
            "2017-01-01 00:03:00 -0800": 70,
            "2017-01-01 00:04:00 -0800": 90,
            "2017-01-01 00:05:00 -0800": 20,
            "2017-01-01 00:06:00 -0800": 60,
            "2017-01-01 00:07:00 -0800": 60,
            "2017-01-01 00:08:00 -0800": 40,
            "2017-01-01 00:09:00 -0800": 102
          }}
        />
      </div>
    );
  }
}

export default ReadingsGraph;
