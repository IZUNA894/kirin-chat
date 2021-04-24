import { createStore } from "redux";

const placeholder = {
  searchVal: "",
};
export default function(state = placeholder, action) {
  switch (action.type) {
    case "SET_SEARCH_VAL":
      return (state = { ...state, searchVal: action.payload });
    default:
      return state;
  }
}
