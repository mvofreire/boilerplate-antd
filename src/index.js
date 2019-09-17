import React from "react";
import ReactDOM from "react-dom";
import App from "./application";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import history from "./util/history";
import "antd/dist/antd.css";

const root = document.getElementById("root");
// ReactDOM.render(<App />, root);

const render = Component => {
  return ReactDOM.render(
    <Router history={history}>
      <Component />
    </Router>,
    root
  );
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept("./application", () => {
    const NextApp = require("./application").default;
    render(NextApp);
  });
}
