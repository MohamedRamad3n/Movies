import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import BigApp from "./BigApp";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <BigApp />
  </BrowserRouter>,
  document.getElementById("root")
);
