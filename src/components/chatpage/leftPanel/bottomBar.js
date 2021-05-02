import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../../css/chatpage.css";
import { clearUser } from "./../../../redux/actions";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
class BottomBar extends Component {
  state = {
    redirect: null,
  };
  logOut = () => {
    this.props.clearUser();
    this.setState({ redirect: "/" });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div id="bottom-bar" className="bottom-bar dropup">
        <button id="addcontact" className="addcontact">
          {" "}
          <Link to="/peopleList">
            <i className="fa fa-user-plus fa-fw"></i>
            <span>Add Contact</span>
          </Link>
        </button>
        {/* <button
          id="settings"
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <i className="fa fa-cog fa-fw"></i> <span>Settings</span>
        </button>

        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#!">
              Menu item
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#!">
              Menu item
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#!">
              Menu item
            </a>
          </li>
        </ul> */}
        <DropdownButton
          as={ButtonGroup}
          key="up"
          id={`dropdown-button-drop-up`}
          drop="up"
          variant="secondary"
          title={` Options `}
          style={{ width: "50%" }}
        >
          {/* <LinkContainer to="/users/avatar/change"> */}
          <Dropdown.Item eventKey="1" as={Link} to="/users/avatar/change">
            Change Avatar
          </Dropdown.Item>
          {/* </LinkContainer> */}

          {/* <LinkContainer to = "/" */}
          <Dropdown.Item eventKey="2" as={Link} to="/users/edit">
            Edit Profile
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" as={Link} to="/users/password/change">
            Change Password
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4" onClick={this.logOut}>
            Log Out
          </Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

export default connect(null, { clearUser })(BottomBar);
