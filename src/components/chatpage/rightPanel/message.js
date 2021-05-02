import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { decrypt } from "./../../../utils/encryption";

class Message extends Component {
  render() {
    const message = this.props.message;
    const friend = this.props.selected_contact;

    if (message.type === "TEXT") {
      return (
        <p>
          {message.value}
          <br />
          <span style={{ float: "right", color: "grey", fontSize: 15 + "px" }}>
            {moment(message.date_added).format("hh:mm a")}
          </span>
        </p>
      );
    } else if (message.type === "LOCATION") {
      return (
        <p>
          <a
            href={`http://maps.google.com/maps?q=loc:${message.latitude},${message.longitude}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            LOCATION
          </a>

          <br />
          <span style={{ float: "right", color: "grey", fontSize: 15 + "px" }}>
            {moment(message.date_added).format("hh:mm a")}
          </span>
        </p>
      );
    } else if (message.type === "MEDIA") {
      return (
        <p>
          <img
            src={message.base64_string}
            alt=""
            style={{
              height: "15vw",
              width: "15vw",
              borderRadius: "3px",
            }}
          />

          <br />
          <span style={{ float: "right", color: "grey", fontSize: 15 + "px" }}>
            {moment(message.date_added).format("hh:mm a")}
          </span>
        </p>
      );
    } else if (message.type === "E2E") {
      if (message.from === friend.username) {
        if (
          !/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(
            message.value
          )
        ) {
          return (
            <p>
              {message.value}
              <br />
              <span
                style={{ float: "right", color: "grey", fontSize: 15 + "px" }}
              >
                {moment(message.date_added).format("hh:mm a")}
              </span>
            </p>
          );
        }
        const cipher_key = Uint8Array.from(Object.values(friend.cipher_key));
        message.value = decrypt(cipher_key, message.value);
        return (
          <p>
            {message.value}
            <br />
            <span
              style={{ float: "right", color: "grey", fontSize: 15 + "px" }}
            >
              {moment(message.date_added).format("hh:mm a")}
            </span>
          </p>
        );
      } else {
        return (
          <p>
            {message.raw}
            <br />
            <span
              style={{ float: "right", color: "grey", fontSize: 15 + "px" }}
            >
              {moment(message.date_added).format("hh:mm a")}
            </span>
          </p>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selected_contact: state.user.selected_contact,
  };
};
export default connect(mapStateToProps)(Message);
