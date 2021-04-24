import React, { Component } from "react";
import "./loader.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export default class loader extends Component {
  render() {
    return (
      <div id="myNav" class="overlay">
        <div class="overlay-content">
          <Loader type="Bars" color="#00BFFF" height={80} width={80} />{" "}
        </div>
      </div>
    );
  }
}
