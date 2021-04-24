import UserStorage from "./../../services/userSessionStorage";

const placeholder = {
  ...UserStorage.getUser(),
  selected_contact: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = placeholder, action) {
  switch (action.type) {
    case "SET_USER":
      return (state = { ...state, ...action.payload });
    case "CLEAR_USER":
      return (state = {});
    case "SET_SELECTED_CONTACT":
      return (state = { ...state, selected_contact: { ...action.payload } });
    default:
      return state;
  }
}
