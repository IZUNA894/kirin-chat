// this is search bar for people list..
// again this is just for show not doing anything...
import React, { Component } from "react";
import styles from "../../css/peopleList.module.css";

class SearchBox extends Component {
  render() {
    return (
      <div id="search" className={styles.search}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search contacts..."
        />
        <a href="!#" className={styles.search_icon}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
      </div>
    );
  }
}

export default SearchBox;
