import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./app";
import Dashboard from "./components/Dashboard";
import DeviceCardList from "./components/DeviceCardList";
import DeviceCard from "./components/DeviceCard";

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/Dashboard" component={Dashboard} />
      <Route path="/DeviceCardList" component={DeviceCardList} />
      <Route path="/DeviceCard" component={DeviceCard} />
    </div>
  </Router>
);

export default Routes;
