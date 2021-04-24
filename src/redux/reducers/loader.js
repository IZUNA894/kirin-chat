import { createStore } from "redux";

const placeholder = {
  showLoader: false,
};
export default function(state = placeholder, action) {
  switch (action.type) {
    case "SHOW_LOADER":
      return (state = { ...state, showLoader: true });
    case "HIDE_LOADER":
      return (state = { ...state, showLoader: false });

    default:
      return state;
  }
}
