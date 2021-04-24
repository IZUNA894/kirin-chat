import { combineReducers } from "redux";
import user from "./user";
import loader from "./loader";
import search from "./search";
import message from "./message";

export default combineReducers({ user, loader, search, message });
