import React, { Component } from "react";
import { connect } from "react-redux";
import toast from "./../../../utils/toast";

import { sendMessage } from "../../../js/socketUtil";
import { setMessage } from "./../../../redux/actions";

class MsgInput extends Component {
  state = {
    message: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let message = this.state.message;
    this.setState({ message: "" });

    const user = this.props.user;
    const friend = this.props.selected_contact;

    const newMessage = {
      from: user.username,
      from_id: user._id,
      to: friend.username,
      friend_id: friend._id,
      value: message,
      type: "TEXT",
    };
    sendMessage(newMessage);
    //send the msg to lacal state..
    let messageArr = this.props.messageArr[friend.username]
      ? this.props.messageArr[friend.username]
      : [];
    messageArr.push(newMessage);

    this.props.setMessage({ to: friend.username, message: messageArr });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  sendGeoLocatiuon = () => {
    const user = this.props.user;
    const friend = this.props.selected_contact;
    let position = {};
    if (!navigator.geolocation) {
      toast("Geolocation is not supported by your browser");
      return;
    } else {
      position = navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // let link = `http://maps.google.com/maps?q=loc:${latitude},${longitude}`;

        const newMessage = {
          from: user.username,
          from_id: user._id,
          to: friend.username,
          friend_id: friend._id,
          type: "LOCATION",
          latitude,
          longitude,
        };
        sendMessage(newMessage);
        //send the msg to lacal state..
        let messageArr = this.props.messageArr[friend.username]
          ? this.props.messageArr[friend.username]
          : [];
        messageArr.push(newMessage);

        this.props.setMessage({ to: friend.username, message: messageArr });
      });
    }
  };
  sendMedia = (e) => {
    const user = this.props.user;
    const friend = this.props.selected_contact;
    const type = e.target.files[0].type;
    if (type !== "image/png" && type !== "image/jpg" && type !== "image/jpeg") {
      toast("Only jpg png formats are allowed!");
      return;
    }

    let file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64 = reader.result;
        this.setState({ media: base64 });

        const newMessage = {
          from: user.username,
          from_id: user._id,
          to: friend.username,
          friend_id: friend._id,
          base64_string: base64,
          type: "MEDIA",
        };
        sendMessage(newMessage);
        //send the msg to lacal state..
        let messageArr = this.props.messageArr[friend.username]
          ? this.props.messageArr[friend.username]
          : [];
        messageArr.push(newMessage);

        this.props.setMessage({ to: friend.username, message: messageArr });
      };
      reader.onError = (error) => {
        console.log(error);
      };
    }
  };
  render() {
    if (this.props.selected_contact) {
      return (
        <div className="message-input" style={{ position: "relative" }}>
          <div className="wrap">
            <form
              className="form-inline"
              id="msgForm"
              onSubmit={this.handleSubmit}
            >
              <input
                type="text"
                name="message"
                placeholder="Write your message..."
                id="msgData"
                onChange={this.handleChange}
                value={this.state.message}
              />
              <button
                className="submit"
                id="submit-button"
                style={{ height: "45px" }}
              >
                <i className="fa fa-paper-plane"></i>
              </button>
              {/* locatio icon */}
              <span
                className="submit"
                id="find-me"
                style={{ height: "45px", width: "50px" }}
                onClick={this.sendGeoLocatiuon}
              >
                <i class="far fa-compass" style={{ fontSize: "3rem" }}></i>
              </span>
              {/* image upload icon */}
              <span
                className="submit"
                style={{ height: "45px", width: "50px" }}
              >
                <input type="file" onChange={this.sendMedia} />
              </span>
            </form>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    selected_contact: state.user.selected_contact,
    messageArr: state.message,
  };
};
export default connect(mapStateToProps, { setMessage })(MsgInput);
