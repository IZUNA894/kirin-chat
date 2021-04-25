import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
