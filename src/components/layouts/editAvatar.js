import React, { Component } from "react";
import Logo from "../../images/kirin.png";
import "../../css/chatpage.css";
import { showLoader, hideLoader, clearUser } from "./../../redux/actions";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import toast from "./../../utils/toast";
import UserService from "./../../services/userApiService";
import ImageUpload from "./imageUploader";
import { FormGroup } from "react-bootstrap";

class EditAvatar extends Component {
  state = {
    media: undefined,
  };

  handleMedia = (file) => {
    console.log(file);
    this.setState({ media: file[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const { _id: user_id } = this.props.user;

    this.props.showLoader();

    let formData = new FormData();
    formData.append("user_id", user_id);
    if (this.state.media) formData.append("media", this.state.media);

    UserService.uploadAvatar(formData)
      .then((response) => {
        toast("Avatar Saved Successfully");
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
          {/* <h1 className="h3 mb-3 font-weight-normal text-center">
            Upload New Avatar
          </h1> */}

          <FormGroup>
            <label className="text-center w-100">Avatar</label>
            <ImageUpload
              withIcon={true}
              buttonText="Choose images"
              onChange={this.handleMedia}
              imgExtension={[".jpg", ".png", "jpeg"]}
              maxFileSize={5242880}
              withPreview={true}
              singleImage={true}
            />
          </FormGroup>

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
})(EditAvatar);
