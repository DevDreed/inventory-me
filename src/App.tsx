import * as React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "./configureStore";
import { HomePage, ProductPage } from "./pages";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { connect } from "react-redux";
import { AuthenticationState } from "./reducers/authentication";
import "bootstrap";
import "./assets/index.scss";
import { Header } from "./components";

interface Props {
  authenticationState: AuthenticationState;
}

function Routes(props: Props) {
  return (
    <div>
      <Header />
      <Route
        exact={true}
        path="/"
        component={() => (
          <HomePage authenticationState={props.authenticationState} />
        )}
      />
      <Route
        exact={true}
        path="/login"
        component={() => (
          <HomePage authenticationState={props.authenticationState} />
        )}
      />
      <Route
        exact={true}
        path="/register"
        component={() => (
          <HomePage authenticationState={props.authenticationState} />
        )}
      />
      <PrivateRoute exact={true} path="/product" component={ProductPage} />
    </div>
  );
}

function App(props: Props) {
  return (
    <Router history={history}>
      <Routes {...props} />
    </Router>
  );
}

export default connect((state: any) => ({
  authenticationState: state.authenticationState,
}))(App);
