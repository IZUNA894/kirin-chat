import React, { Component } from "react";
import { connect } from "react-redux";
import {
  showLoader,
  hideLoader,
  setSelectedContact,
  setMessage,
  setFetchedMessage,
} from "../../../redux/actions";
import UserService from "./../../../services/userApiService";
import MessageService from "./../../../services/messageApiService";
import toast from "./../../../utils/toast";
import { Redirect } from "react-router-dom";
import PokeImg from "./../../../images/poke-5.png";

class Contact extends Component {
  state = {
    contacts: undefined,
    number: 0,
    freinds: [],
  };

  componentDidMount() {
    this.props.showLoader();
    const user_id = this.props.user._id;
    UserService.getAllFriends({ user_id: user_id })
      .then((response) => {
        toast("Friends fetched successfully");
        this.setState({ friends: response }, this.props.hideLoader);
      })
      .catch((error) => {
        console.log(error.message);

        toast(error.message || error.errors[0]);

        this.props.hideLoader();
      });
  }
  setContact = (friend) => {
    //here we will set the contact which  user has selected.
    //also fetched the messages for that user.
    const username = this.props.user.username;
    const friendname = friend.username;
    const hasFetched = this.props.fetched_message[friendname];
    if (hasFetched) {
      return;
    }
    this.props.showLoader();
    MessageService.getAllMessages({ from: username, to: friendname })
      .then((response) => {
        toast("Messages Loaded Successfully");
        // this.setState()
        // setting messages to redux store.
        this.props.setMessage({ to: friendname, message: response });
        this.props.setFetchedMessage({ to: friendname });
        this.props.setSelectedContact(friend);
        this.props.hideLoader();
      })
      .catch((error) => {
        console.log(error.message);

        toast(error.message || error.errors[0]);

        this.props.hideLoader();
      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let friends = this.state.friends;
    let friendList =
      friends &&
      friends.map((friend) => {
        let avatar = friend.avatar_media_url;
        return (
          <li
            className={"contact"}
            onClick={() => {
              this.setContact(friend);
              // this.props.setSelectedContact(friend);
            }}
            key={friend._id}
          >
            <div className="wrap">
              <span className="contact-status online"></span>
              <img
                src={
                  avatar
                    ? "http://localhost:8080/api/v1/media/" + avatar
                    : PokeImg
                }
                alt=""
              />
              <div className="meta">
                <p className="name">{friend.username}</p>
                <p className="preview">
                  {friend.lastMsg ? friend.lastMsg : ""}
                </p>
              </div>
            </div>
          </li>
        );
      });
    return (
      <div id="contacts">
        <ul>{friendList}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    fetched_message: state.message.fetched_message,
  };
};
export default connect(mapStateToProps, {
  showLoader,
  hideLoader,
  setSelectedContact,
  setMessage,
  setFetchedMessage,
})(Contact);
