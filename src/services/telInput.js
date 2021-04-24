import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import "./telInput.css";
// my custom css changes ....

import React, { Component } from "react";

export default class TelInput extends Component {
  state = {
    phone: "",
  };
  handleChange = (e) => {
    this.setState({ phone: e });
    this.props.handlePhone(e);
  };
  render() {
    return (
      <PhoneInput
        country={"in"}
        value={this.state.phone}
        onChange={this.handleChange}
      />
    );
  }
}
