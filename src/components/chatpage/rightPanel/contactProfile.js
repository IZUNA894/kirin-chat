// this component is showing friend profile with whom usr is chatting ,on right side
// this component serves very  important role in fetching messags from server of selected contacted

import React, { Component } from "react";
import { connect } from "react-redux";
import "../../../css/chatpage.css";
import PokeImg from "./../../../images/poke-5.png";
import UserService from "./../../../services/userApiService";
import toast from "./../../../utils/toast";
import { showLoader, hideLoader, setUser } from "./../../../redux/actions";

class ContactProfile extends Component {
  removeFriend = (contact) => {
    // var {sender} = this.context;
    const { _id: user_id, username: from } = this.props.user;
    const { _id: friend_id, username: to } = contact;

    this.props.showLoader();
    UserService.removeFriend({ user_id, friend_id, to, from })
      .then((response) => {
        toast("Message deleted and \n Freind removed Successfully");

        this.props.setUser(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);

        toast(error.message || error.errors[0]);

        this.props.hideLoader();
      });
  };
  render() {
    let contact = this.props.selected_contact;
    let avatar = null;
    if (contact) {
      avatar = contact.avatar_media_url;
      return (
        <div id="contact-profile" className="contact-profile">
          <img src={avatar ? "/api/v1/media/" + avatar : PokeImg} alt="" />
          <p>{contact.username}</p>
          <div className="social-media">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-instagram"></i>
            <i
              className="fa fa-ellipsis-v"
              onClick={(e) => this.removeFriend(contact)}
            ></i>
          </div>
        </div>
      );
    } else {
      return (
        <div id="contact-profile" className="contact-profile">
          <p>{""}</p>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    selected_contact: state.user.selected_contact,
    user: state.user,
  };
};
export default connect(mapStateToProps, { showLoader, hideLoader, setUser })(
  ContactProfile
);
