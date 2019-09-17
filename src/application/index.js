import React, { Component } from "react";
import { AppContext } from "contexts/app";
import { Route, Redirect, Switch } from "react-router-dom";
import PublicPage from "./containers/public";
import AuthenticatedPage from "./containers/authenticated";
import Identity from "util/identity";

class Application extends Component {
  constructor(p) {
    super(p);
    this.state = {
      session: Identity.loadFromLocal()
    };
  }

  setUserSession = user => {
    const session = this.state.session.setSession(user);
    this.setState({ session });
  };

  logout = () => {
    const { session } = this.state;
    session.deleteSession();
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setUserSession: this.setUserSession,
          logout: this.logout
        }}
      >
        <Switch>
          <Route
            path="/(home|login|register|how-it-works)"
            exact
            component={PublicPage}
          />
          <Route path="/admin" component={AuthenticatedPage} />
          <Redirect to="/home" />
        </Switch>
      </AppContext.Provider>
    );
  }
}

export default Application;
