import React from "react";
import { AppContext } from "contexts/app";
import Login from "./Login";

export default props => (
  <AppContext.Consumer>
    {ctxProps => <Login {...props} {...ctxProps} />}
  </AppContext.Consumer>
);
