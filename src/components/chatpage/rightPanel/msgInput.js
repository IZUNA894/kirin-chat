//msg input box...
// when a user types and hit enter...
// a msg obj is form snd send to socketUtil.js from where it is sent to server...
import React, { Component } from "react";
import { connect } from "react-redux";
// import date from "date-and-time";
// import 'date-and-time/plugin/meridiem';
import { sendMessage } from "../../../js/socketUtil";
// import {MainContext} from "../../../context/mainContext";
import { setMessage } from "./../../../redux/actions";
// class MsgInputParent extends Component{
//   // static contextType = MainContext;
//   render(){

//     var {sender,openedContact} = this.context;
//     var reciever = openedContact?openedContact.username:"";
//     return(
//     <MsgInput sender={sender} reciever={reciever} addMsgtostate={this.props.addMsgtostate}/>
//     )
//   }

// }
// Appling the plugin to "date-and-time".
//  date.plugin('meridiem');

class MsgInput extends Component {
  state = {
    message: null,
  };

  //  static getDerivedStateFromProps = (props, state)=>{

  //    var reciever = props.reciever;
  //    var sender = props.sender;
  //    return {...this.state,
  //           reciever:reciever,
  //           sender:sender};
  //  }
  handleSubmit = (e) => {
    e.preventDefault();
    let message = this.state.message;
    this.setState({ message: "" });

    //console.log(hello());
    // var inp = document.getElementById("msgData");
    // console.log(this.state);
    // inp.value = "";
    //send the msg to server...
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
  componentWillMount() {}
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
              <i className="submit" id="find-me" style={{ height: "45px" }}>
                <i className="fa fa-paper-plane"></i>
              </i>
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
