import React, { Component } from "react";
import { recieveMessage } from "../../../js/socketUtil";
import { connect } from "react-redux";
// import moment from "moment";
import { setMessage } from "./../../../redux/actions";
import PokeImg from "../../../images/poke-5.png";
import $ from "jquery";
import Message from "./message";
class Messages extends Component {
  state = {
    key: null,
  };

  componentDidMount() {
    // here we are listening for incoming msg...through socket io..and adding them to state...
    let user = this.props.user;

    recieveMessage((message) => {
      let { from, to } = message;
      let toKey = from !== user.username ? from : to;
      let messageArr = this.props.message[toKey]
        ? this.props.message[toKey]
        : [];
      messageArr.push(message);
      this.props.setMessage({ to: message.from, message: messageArr });
    });
  }

  componentDidUpdate() {
    //for automatically scrolling the msg board down...
    $("#msgBoard").animate(
      {
        scrollTop: $(document).height() * 1000,
      },
      "fast",
      "swing"
    );
  }
  render() {
    let friend = this.props.selected_contact;
    let user = this.props.user;

    if (friend) {
      //if  a contact is choosen...

      let messages = this.props.message[friend.username]
        ? this.props.message[friend.username]
        : [];

      let friendAvatar = friend.avatar_media_url
        ? `api/v1/media/${friend.avatar_media_url}`
        : PokeImg;
      let userAvatar = user.avatar_media_url
        ? `api/v1/media/${user.avatar_media_url}`
        : PokeImg;
      if (messages.length > 0) {
        // if a contact is choosen and
        //if participants have past msg...
        const messageList = messages.map((msg) => {
          return (
            <li
              className={msg.from === user.username ? "sent" : "replies"}
              key={Math.random()}
            >
              <img
                src={msg.from === user.username ? userAvatar : friendAvatar}
                alt=""
              />

              <Message message={msg} />
            </li>
          );
        });
        return (
          <div
            className="messages"
            id="msgBoard"
            style={{ height: "100vh", backgroundColor: "black" }}
          >
            <ul id="msgBoardUl">{messageList}</ul>
          </div>
        );
      } else {
        // if a contact is choosen and
        //but  they dont have any msg...i.e new to conservation...
        return (
          <div
            className="messages"
            id="msgBoard"
            style={{
              height: 100 + "vh",
              backgroundColor: "black",
              display: "flex",
              alignContent: "center",

              justifyContent: "center",
              alignItems: "center",
              fontSize: "10rem",
              flexDirection: "column",
            }}
          >
            <p className="inner-text text-center">Say Hello ... !</p>
            <i className="far fa-hand-spock " style={{ color: "magenta" }}></i>
          </div>
        );
      }
    } else {
      // if a contact is not choosen...
      return (
        <div className="messages-no-contact" style={{ height: 100 + "vh" }}>
          <div className="inner-messages-no-contact">
            <p className="inner-text">Choose contact to chat</p>
          </div>
          <div className="inner-messages-no-contact">
            <i className="fa fa-user-plus fa-fw addContact-icon"></i>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    selected_contact: state.user.selected_contact,
    message: state.message,
  };
};
export default connect(mapStateToProps, { setMessage })(Messages);
