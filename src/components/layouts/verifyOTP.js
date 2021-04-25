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
    otp: null,
    redirect: null,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      phone: this.state.phone,
      otp: this.state.otp,
    };

    this.props.showLoader();

    schemaValidator("verifyOTP")
      .validate(userObj)
      .then((user) => {
        return UserService.verifyOTP(user);
      })
      .then((response) => {
        toast(" You Logged In succesfully");
        this.props.setUser(response);
        this.setState({ redirect: "/main" }, () => this.props.hideLoader());
      })
      .catch((error) => {
        console.log(error.message);

        toast(error.message || error.errors[0]);

        this.props.hideLoader();
      });
  };

  componentDidMount() {
    const user = this.props.user;
    let phone = user.phone;
    this.setState({ phone });
  }
  resendOTP = () => {
    const user = this.props.user;
    let phone = user.phone;
    UserService.resendOTP({ phone, country_code: "91" })
      .then((response) => {
        toast(" OTP resend succesfully");

        this.props.hideLoader();
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
          <h1 className="h3 mb-3 font-weight-normal text-center">Enter OTP </h1>

          <div className="form-group">
            <TelInput handlePhone={this.handlePhone} />
          </div>

          {/* otp */}
          <div className="form-group">
            <label htmlFor="otp">
              OTP
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              className="form-control"
              placeholder="otp"
              onChange={this.handleChange}
              required
            />
          </div>
          <button
            id="submitButton"
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={this.disabled}
          >
            Log In
          </button>
        </form>
        <div className="new-user-text">
          <p>
            <Link to="#!" onClick={this.resendOTP}>
              Resend OTP
            </Link>
            /<Link to="/signup"> Sign Up</Link>/
            <Link to="/"> Login With Email</Link>
          </p>
          <p className="errMsg"></p>
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
export default connect(mapStateToProps, {
  setUser,
  showLoader,
  hideLoader,
})(Login);
