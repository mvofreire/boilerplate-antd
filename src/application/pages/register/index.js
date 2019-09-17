import React from "react";
import { AppContext } from "contexts/app";
import Register from "./Register";

export default props => (
  <AppContext.Consumer>
    {ctxProps => <Register {...props} {...ctxProps} />}
  </AppContext.Consumer>
);
