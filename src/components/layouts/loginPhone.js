import React, { Component } from "react";
import { setUser, showLoader, hideLoader } from "../../redux/actions";
import { Link, Redirect } from "react-router-dom";
import "../../css/chatpage.css";
import Logo from "../../images/kirin.png";
import toast from "../../utils/toast";
import UserService from "../../services/userApiService";
import schemaValidator from "../../models";
import { connect } from "react-redux";
import TelInput from "./../../services/telInput";

class Login extends Component {
  state = {
    phone: null,
    country_code: null,
    redirect: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      phone: this.state.phone,
    };

    this.props.showLoader();

    schemaValidator("loginPhone")
      .validate(userObj)
      .then((user) => {
        return UserService.loginByPhone(user);
      })
      .then((response) => {
        toast(" OTP sent to your phone successfully");
        this.props.setUser({ phone: this.state.phone });
        this.setState({ redirect: "/verify/phone" }, () =>
          this.props.hideLoader()
        );
      })
      .catch((error) => {
        console.log(error.message);

        toast(error.message || error.errors[0]);

        this.props.hideLoader();
      });
  };

  handlePhone = (value) => {
    this.setState({ phone: value.slice(2), country_code: value.slice(0, 2) });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <img className="mb-4 logo-image" src={Logo} alt="" />

        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Please Log in
          </h1>

          <div className="form-group">
            <TelInput handlePhone={this.handlePhone} />
          </div>
          <button
            id="submitButton"
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={this.disabled}
          >
            Send OTP
          </button>
        </form>
        <div className="new-user-text">
          <p>
            New User ? <a href="/signup"> Sign Up</a>
          </p>
          <p className="errMsg"></p>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  setUser,
  showLoader,
  hideLoader,
})(Login);
