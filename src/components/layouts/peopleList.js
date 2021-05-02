import React, { Component } from "react";
import "../../css/chatpage.css";
import styles from "../../css/peopleList.module.css";
import SearchBox from "../peopleList/searchBar";
import { showLoader, hideLoader } from "../../redux/actions";
import { connect } from "react-redux";
import UserService from "./../../services/userApiService";
import toast from "./../../utils/toast";
import { Redirect } from "react-router-dom";
import PokeImg from "./../../images/poke-5.png";

class PeopleList extends Component {
  state = {
    users: [],
    redirect: null,
  };
  userCard = (usr) => {
    let divClass = ["mr-3", styles.avatar];
    divClass = divClass.join(" ");
    return (
      <div className="col-md-12">
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <div className="media align-items-center">
              <span
                style={{
                  backgroundImage: `url(${
                    usr.avatar_media_url
                      ? "/api/v1/media/" + usr.avatar_media_url
                      : PokeImg
                  })`,
                }}
                className={divClass}
              ></span>
              <div
                className="media-body overflow-hidden"
                style={{ paddingLeft: "20px" }}
              >
                <h5 className="card-text mb-0">
                  {usr.first_name + " " + usr.last_name}
                </h5>
                <p className="card-text text-muted">{"@" + usr.username}</p>
                <p className="card-text">{usr.email}</p>
                <p className="card-text">{usr.city ? usr.city : "New Delhi"}</p>
                <p className="card-text">
                  {usr.country ? usr.country : "India"}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.cardBody} style={{ paddingTop: "0rem" }}>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.target.innerHTML = "User Reported";
              }}
            >
              Report User
            </button>
            <button
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={() => this.addFriend(usr)}
            >
              Add friend
            </button>
          </div>
        </div>
      </div>
    );
  };
  componentDidMount() {
    const user = this.props.user;
    this.props.showLoader();
    UserService.getAllPeople({ user_id: user._id })
      .then((response) => {
        toast("You Logged in Successfully");

        this.setState({ users: response }, this.props.hideLoader);
      })
      .catch((error) => {
        console.log(error.message);

        toast(error.message || error.errors[0]);

        this.props.hideLoader();
      });
  }
  addFriend(friend) {
    const user = this.props.user;
    this.props.showLoader();
    UserService.addFriend({ user_id: user._id, friend_id: friend._id })
      .then((response) => {
        toast(" Friend Added Successfully");

        this.setState({ redirect: "/main" }, this.props.hideLoader);
      })
      .catch((error) => {
        console.log(error.message);

        toast(error.message || error.errors[0]);

        this.props.hideLoader();
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const suggesstions = this.state.users.suggesstions || [];
    const people = this.state.users.people || [];
    // console.log(users);

    let suggestionList = suggesstions.map(this.userCard);
    let peopleList = people.map(this.userCard);
    return (
      <div className={styles.body}>
        <div className="container" style={{ height: "100vh" }}>
          <div className="jumbotron">
            <div className="row justify-content-center">
              <div className={styles.headBox}>
                <h1
                  className={styles.h1}
                  style={{ fontFamily: "comic sans ms", fontWeight: "bold" }}
                >
                  Find New Friend
                </h1>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <SearchBox />
          </div>
          <div className="row">
            <h3 className="text-center">Suggestions</h3>

            {suggestionList}
          </div>
          <div className="row">
            <h3 className="text-center">All Users</h3>
            {peopleList}
          </div>
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

export default connect(mapStateToProps, { showLoader, hideLoader })(PeopleList);
