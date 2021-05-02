import React, { Component } from "react";
import { connect } from "react-redux";
import toast from "./../../../utils/toast";

import { sendMessage } from "../../../js/socketUtil";
import { setMessage } from "./../../../redux/actions";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { decrypt, encrypt } from "./../../../utils/encryption";
class MsgInput extends Component {
  state = {
    message: null,
    inputMediaRef: null,
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
      to_id: friend._id,
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

  sendMessageEncrypted = (e) => {
    e.preventDefault();
    let message = this.state.message;
    this.setState({ message: "" });

    const user = this.props.user;
    const friend = this.props.selected_contact;
    const cipher_key = Uint8Array.from(Object.values(friend.cipher_key));
    const value = encrypt(cipher_key, message);
    const newMessage = {
      from: user.username,
      from_id: user._id,
      to: friend.username,
      to_id: friend._id,
      value,
      raw: message,
      type: "E2E",
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
          to_id: friend._id,
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
          to_id: friend._id,
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

  handleMediaClick = (e) => {
    this.inputMediaRef.click();
  };
  render() {
    if (this.props.selected_contact) {
      return (
        <Container fluid>
          <Row>
            <Col lg={10} className="p-0">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="message">
                  <Form.Control
                    type="text"
                    placeholder="Write Your Message here..."
                    name="message"
                    onChange={this.handleChange}
                    value={this.state.message}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col lg={2}>
              <Row>
                <Col lg={3} className="p-0 text-center">
                  <span
                    className="fas fa-paper-plane"
                    style={{ fontSize: "1.7rem" }}
                    onClick={this.handleSubmit}
                  ></span>
                </Col>
                <Col lg={3} className="p-0 text-center">
                  <span
                    className="fas fa-user-lock"
                    style={{ fontSize: "1.7rem" }}
                    onClick={this.sendMessageEncrypted}
                  ></span>
                </Col>
                <Col lg={3} className="p-0 text-center">
                  <span
                    className="fas fa-compass"
                    style={{ fontSize: "1.7rem" }}
                    onClick={this.sendGeoLocatiuon}
                  ></span>
                </Col>
                <Col lg={3} className="p-0 text-center">
                  <span
                    className="fas fa-photo-video"
                    style={{ fontSize: "1.7rem" }}
                    onClick={this.handleMediaClick}
                  >
                    <input
                      type="file"
                      ref={(e) => {
                        this.inputMediaRef = e;
                      }}
                      style={{ display: "none" }}
                      onChange={this.sendMedia}
                    />
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
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
