import React, { Component } from "react";
// import { MainContext } from "../../../context/mainContext";
// import { showLoader } from "./../../../redux/actions";
import { connect } from "react-redux";
import PokeImg from "./../../../images/poke-5.png";

class Profile extends Component {
  //   static contextType = MainContext;
  state = {
    id: null,
    first_name: null,
    last_name: null,
    avatar_media_url: null,
    name: null,
    email: null,
    username: null,
  };
  componentWillMount() {
    // before rendering a comp. fetch the data from browser storage and store it
    const user = this.props.user;
    this.setState(user);
  }

  render() {
    // var { sender } = this.context;
    const avatar = this.state.avatar_media_url;
    return (
      <div id="profile">
        <div className="wrap">
          <img
            id="profile-img"
            src={
              avatar ? "http://localhost:8080/api/v1/media/" + avatar : PokeImg
            }
            className="online"
            alt=""
          />
          <p>{this.state.username}</p>
          <i
            className="fa fa-chevron-down expand-button"
            aria-hidden="true"
          ></i>
          <div id="status-options">
            <ul>
              <li id="status-online" className="active">
                <span className="status-circle"></span>
                <p>Online</p>
              </li>
              <li id="status-away">
                <span className="status-circle"></span>
                <p>Away</p>
              </li>
              <li id="status-busy">
                <span className="status-circle"></span>
                <p>Busy</p>
              </li>
              <li id="status-offline">
                <span className="status-circle"></span>
                <p>Offline</p>
              </li>
            </ul>
          </div>
          <div id="expanded">
            <label htmlFor="twitter">Name</label>
            <input name="twitter" type="text" value={this.state.name} />
            <label htmlFor="twitter">Email</label>
            <input name="twitter" type="text" value={this.state.email} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Profile);
