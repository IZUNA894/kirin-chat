import React, { Component } from "react";
import Logo from "../../images/kirin.png";
import "../../css/chatpage.css";
import { showLoader, hideLoader } from "./../../redux/actions";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import toast from "./../../utils/toast";
import schemaValidator from "./../../models";
import UserService from "./../../services/userApiService";
import TelInput from "./../../services/telInput";
import LoginEmail from "./loginEmail";

class Signup extends Component {
  state = {
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    country_code: null,
    username: null,
    password: null,
    confirm_password: null,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePhone = (value) => {
    this.setState({ phone: value.slice(2), country_code: value.slice(0, 2) });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const userObj = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,

      email: this.state.email,
      phone: this.state.phone,
      country_code: this.state.country_code,
      username: this.state.username,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
    };

    this.props.showLoader();
    schemaValidator("addUser")
      .validate(userObj)
      .then((user) => {
        return UserService.signup(user);
      })
      .then((response) => {
        toast("You Sign Up Successfully");

        this.setState({ redirect: "/" }, () => this.props.hideLoader());
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
    return (
      <div>
        <img className="mb-4 logo-image" src={Logo} alt="" />

        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal text-center">Sign - Up</h1>
          <h3
            className="h3 mb-3 font-weight-normal text-danger"
            style={{ fontSize: ".9rem" }}
          >
            * field are required
          </h3>
          <div className="form-group ">
            <label htmlFor="first_name">
              First Name{" "}
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="form-control"
              onChange={this.handleChange}
              data-toggle="tooltip"
              data-placement="top"
              title="This name will be helpful for others to identify you"
              required
            />
          </div>
          <div className="form-group ">
            <label htmlFor="last_name">
              Last Name{" "}
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="form-control"
              onChange={this.handleChange}
              data-toggle="tooltip"
              data-placement="top"
              title="This name will be helpful for others to identify you"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email{" "}
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="email"
              onChange={this.handleChange}
              data-toggle="tooltip"
              data-placement="top"
              title="Your email.Email should be unique "
              required
            />
          </div>
          <div className="form-group">
            <TelInput handlePhone={this.handlePhone} />
          </div>

          <div className="form-group">
            <label htmlFor="username">
              Username{" "}
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="username"
              onChange={this.handleChange}
              data-toggle="tooltip"
              data-placement="top"
              title="username will be handle.it shouldn't contain any special char (#,$,%) or uppercase.can contain underscore(-)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password{" "}
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="password"
              onChange={this.handleChange}
              data-toggle="tooltip"
              data-placement="top"
              title="should be greater than 8 characters"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm password{" "}
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirmPassword"
              className="form-control"
              onChange={this.handleChange}
              data-toggle="tooltip"
              data-placement="top"
              title="should match with above password"
              required
            />
          </div>
          <button
            id="submitButton"
            className="btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Sign -Up
          </button>
        </form>
        <div className="new-user-text">
          <p>
            Already have an Account ? <Link to="/"> Login</Link>
          </p>
          <p className="errMsg"></p>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  showLoader,
  hideLoader,
})(Signup);
