import React, { Component } from "react";
import Logo from "../../images/kirin.png";
import "../../css/chatpage.css";
import { showLoader, hideLoader, clearUser } from "../../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import toast from "../../utils/toast";
import schemaValidator from "../../models";
import UserService from "../../services/userApiService";

class EditPassword extends Component {
  state = {
    password: null,
    new_password: null,
    confirm_new_password: null,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const { _id: user_id } = this.props.user;
    let userObj = {
      user_id,
      password: this.state.password,
      new_password: this.state.new_password,
      confirm_new_password: this.state.confirm_new_password,
    };
    Object.keys(userObj).map((item) => {
      if (!userObj[item]) {
        delete userObj[item];
      }
    });

    this.props.showLoader();
    schemaValidator("changePassword")
      .validate(userObj)
      .then((user) => {
        return UserService.changePassword(user);
      })
      .then((response) => {
        toast("Password Updated Successfully");
        this.props.clearUser(response);
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
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Change Password
          </h1>
          <h3
            className="h3 mb-3 font-weight-normal text-danger"
            style={{ fontSize: ".9rem" }}
          >
            * field are required
          </h3>
          <div className="form-group ">
            <label htmlFor="password">
              Current Password
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group ">
            <label htmlFor="new_password">
              New Password
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              className="form-control"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group ">
            <label htmlFor="confirm_new_password">
              Confirm New Password
              <span className="errMsg" id="addon">
                *
              </span>
            </label>
            <input
              type="password"
              name="confirm_new_password"
              id="confirm_new_password"
              className="form-control"
              onChange={this.handleChange}
              required
            />
          </div>

          <button
            id="submitButton"
            className="btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Change
          </button>
        </form>
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
  showLoader,
  hideLoader,
  clearUser,
})(EditPassword);
