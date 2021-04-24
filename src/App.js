import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/layouts/login.js";
import Signup from "./components/layouts/signup.js";
import MainParent from "./components/layouts/main";
// import crossed from "./components/layouts/crossed.js";
import peopleList from "./components/layouts/peopleList.js";
import MainContextProvider from "./context/mainContext";
import AuthContextProvider from "./context/authContext";
import ContactListContextProvider from "./context/contactList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader";

// we using both context and redux in our app....
//although redux is not playing any role in our app working...its for future versions...
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        {this.props.loader.showLoader && <Loader />}

        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
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
