import React, { Component } from "react";
import { setUser, showLoader, hideLoader } from "../../redux/actions";
import { Link, Redirect } from "react-router-dom";
import "../../css/chatpage.css";
import Logo from "../../images/kirin.png";
import toast from "../../utils/toast";
import UserService from "../../services/userApiService";
import schemaValidator from "../../models";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    email: null,
    password: null,
    redirect: null,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.showLoader();

    schemaValidator("loginEmailUser")
      .validate(userObj)
      .then((user) => {
        return UserService.loginByEmail(user);
      })
      .then((response) => {
        toast("You Logged in Successfully");

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
    if (user && user.first_name) {
      this.setState({ redirect: "/main" });
    }
  }
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
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              name="email"
              id="inputEmail"
              className="form-control"
              placeholder="email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              name="password"
              id="inputPassword"
              className="form-control"
              placeholder="password"
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
            Log in
          </button>
        </form>
        <div className="new-user-text">
          <Link to="/signup">Sign Up</Link> /
          <Link to="/login/phone"> Login With Phone </Link>
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
