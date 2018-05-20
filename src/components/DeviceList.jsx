import React, { Component } from "react";
import DeviceCard from "./DeviceCard";

class DeviceList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>DEVICE LIST</h1>
        <DeviceCard />
      </div>
    );
  }
}

export default DeviceList;
