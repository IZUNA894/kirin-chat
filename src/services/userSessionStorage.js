class SessionStorageValues {
  //   constructor() {
  //     var user = JSON.parse(window.sessionStorage.getItem("user"));
  //     //   if (user) {
  //     //     window.sessionStorage.setItem("user", JSON.stringify(user));
  //     //   }
  //   }
  setUser(user) {
    window.sessionStorage.setItem("user", JSON.stringify(user));
    //   if (local) {
    //     window.localStorage.setItem("user", JSON.stringify(user));
    //   }
  }

  getUser() {
    return JSON.parse(window.sessionStorage.getItem("user"));
  }

  logOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}

export default new SessionStorageValues();
