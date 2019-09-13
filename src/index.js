import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./theme/assets/vendor/nucleo/css/nucleo.css";
import "./theme/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./theme/assets/scss/argon-dashboard-react.scss";

import "./index.css";

import Firebase, { FirebaseContext } from "./components/Firebase/";
import App from "./components/App";

ReactDOM.render(
  <FirebaseContext.Provider value={Firebase}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
