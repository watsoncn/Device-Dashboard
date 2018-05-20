import React, { Component } from "react";
import DeviceList from "./DeviceList";
import dataLayer from "./../data";
const connection = new dataLayer();

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>TEST</h1>
        <DeviceList />
      </div>
    );
  }
}

export default Dashboard;
