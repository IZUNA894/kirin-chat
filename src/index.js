import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import { MainReducer } from "./data/mainReducer";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

// const reducer = combineReducers({
//     localData:MainReducer
// })
// const store= createStore(reducer);
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
