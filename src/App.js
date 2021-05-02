import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginEmail from "./components/layouts/loginEmail";
import LoginPhone from "./components/layouts/loginPhone";
import VerifyOTP from "./components/layouts/verifyOTP";
import Signup from "./components/layouts/signup.js";
import MainParent from "./components/layouts/main";
import peopleList from "./components/layouts/peopleList.js";
import EditUser from "./components/layouts/editProfile";
import EditAvatar from "./components/layouts/editAvatar";
import EditPassword from "./components/layouts/editPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        {this.props.loader.showLoader && <Loader />}

        <Switch>
          <Route exact path="/" component={LoginEmail} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login/phone" component={LoginPhone} />
          <Route exact path="/verify/phone" component={VerifyOTP} />
          <Route exact path="/users/edit" component={EditUser} />
          <Route exact path="/users/avatar/change" component={EditAvatar} />
          <Route exact path="/users/password/change" component={EditPassword} />
          <Route
            path="/main"
            socket={this.props.socket}
            component={MainParent}
          />
          <Route path="/peopleList" component={peopleList} />

          <Redirect from="/" to="/" />
          {/* <Route  path="*" component={ crossed} /> */}
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.loader,
  };
}
export default connect(mapStateToProps)(App);
