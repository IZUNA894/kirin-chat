import UserStorage from "../services/userSessionStorage";

export const setUser = (data) => {
  UserStorage.setUser(data);
  return {
    type: "SET_USER",
    payload: data,
  };
};
export const clearUser = (data) => {
  UserStorage.logOut();
  return {
    type: "CLEAR_USER",
  };
};

export const setSelectedContact = (data) => {
  // UserStorage.setUser(data);
  return {
    type: "SET_SELECTED_CONTACT",
    payload: data,
  };
};
///
export const showLoader = () => {
  return {
    type: "SHOW_LOADER",
  };
};

export const hideLoader = () => {
  return {
    type: "HIDE_LOADER",
  };
};

export const setSearchVal = (data) => {
  return {
    type: "SET_SEARCH_VAL",
    payload: data,
  };
};

//messae

export const setMessage = (data) => {
  return {
    type: "SET_MESSAGE",
    payload: data,
  };
};

export const setFetchedMessage = (data) => {
  return {
    type: "SET_FETCHED_MESSAGE",
    payload: data,
  };
};
