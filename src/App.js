import React, { Component } from "react";

import "./App.css";

import Home from "./Pages/Home";
import Callback from "./Pages/Callback";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Auth from "./Auth/Auth";
import history from "./history";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  render() {
    return (
      <Router history={history} component={App}>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            exact
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
