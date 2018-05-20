import React from "react";
import Dashboard from "./components/Dashboard";

import "normalize.css";

import "styles/base/_main.sass"; // Global styles
import "styles/base/_common.sass"; // Global styles
import styles from "./app.sass"; // Css-module styles

const App = () => (
  <div className="App">
    <Dashboard />
  </div>
);

export default App;
