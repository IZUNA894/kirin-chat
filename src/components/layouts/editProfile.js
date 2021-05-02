import React, { Component } from "react";
import Logo from "../../images/kirin.png";
import "../../css/chatpage.css";
import { showLoader, hideLoader, clearUser } from "../../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import toast from "../../utils/toast";
import schemaValidator from "../../models";
import UserService from "../../services/userApiService";
import TelInput from "../../services/telInput";

class EditUser extends Component {
  state = {
    first_name: null,
    last_name: null,
    country: null,
    city: null,
    phone: null,
    country_code: null,
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
    const { _id: user_id } = this.props.user;
    let userObj = {
      user_id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      country: this.state.country,
      city: this.state.city,
      phone: this.state.phone,
      country_code: this.state.country_code,
    };
    Object.keys(userObj).map((item) => {
      if (!userObj[item]) {
        delete userObj[item];
      }
    });

    this.props.showLoader();
    schemaValidator("editUser")
      .validate(userObj)
      .then((user) => {
        return UserService.updateUser(user);
      })
      .then((response) => {
        toast("Changes Saved Successfully");
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
            Edit Profile
          </h1>

          <div className="form-group ">
            <label htmlFor="first_name">First Name </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="last_name">Last Name </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>

          {/* country */}
          <div className="form-group ">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>

          {/* city */}
          <div className="form-group ">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <TelInput handlePhone={this.handlePhone} />
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
})(EditUser);
