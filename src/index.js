import React from "react";
import ReactDOM from "react-dom";
// STORE - REDUX
import { Provider } from "react-redux";
import configureStore from "./redux/store";
// CONTAINER
import App from "./containers/App";
// STYLES
import "./styles/index.scss";

const MOUNT_NODE = document.getElementById("root");
const GLOBAL_STORE = configureStore();

ReactDOM.render(
  <Provider store={GLOBAL_STORE}>
    <App />
  </Provider>,
  MOUNT_NODE
);
