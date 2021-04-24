// this component is rendering our msg board
import React, { Component } from "react";
import { recieveMessage } from "../../../js/socketUtil";
import { connect } from "react-redux";
import moment from "moment";
import { setMessage } from "./../../../redux/actions";
import PokeImg from "../../../images/poke-5.png";
import $ from "jquery";
// import { MainContext } from "../../../context/mainContext";

class Messages extends Component {
  state = {
    key: null,
  };
  //   static contextType = MainContext;

  componentDidMount() {
    // here we are listening for incoming msg...through socket io..and adding them to state...
    let user = this.props.user;
    let messageArr = this.props.message[user.username]
      ? this.props.message[user.username]
      : [];

    recieveMessage((message) => {
      console.log("inside cl");
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
    // var {sender,openedContact} =  this.context;
    // var user = localStorage.getItem('user');
    // user = JSON.parse(user);
    // var reciever = openedContact && openedContact.username;
    // var tokenId = "";
    // var recieverId = openedContact && openedContact._id;

    // var contact = openedContact;
    // var route = "";
    // var sentLink = "";
    // var repliesLink = "";
    let friend = this.props.selected_contact;
    let user = this.props.user;

    if (friend) {
      //if  a contact is choosen...

      // tokenId = sender < reciever ? sender + reciever : reciever + sender;

      //   var msgArray =
      //     this.props.messages &&
      //     this.props.messages[tokenId] &&
      //     this.props.messages[tokenId].data;
      // console.log(msgArray);
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
              <p>
                {msg.value}
                <br />
                <span
                  style={{ float: "right", color: "grey", fontSize: 15 + "px" }}
                >
                  {moment(msg.date_added).format("hh:mm a")}
                </span>
              </p>
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
            style={{ height: 100 + "vh", backgroundColor: "black" }}
          >
            <ul id="msgBoardUl">
              {
                "No messages in this chat ...\n.Start conversion by saying hello"
              }
            </ul>
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
