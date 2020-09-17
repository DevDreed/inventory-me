import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { checkToken } from "../../actions/authentication";
import { AuthenticationState } from "../../reducers/authentication";

interface PrivateRouteContainerProps {
  component: any;
  exact: boolean;
  path: string;
  authenticationState: AuthenticationState;
}

class PrivateRouteContainer extends React.Component<
  PrivateRouteContainerProps
> {
  componentDidMount() {
    console.log("FUCK");
    checkToken();
  }
  render() {
    const { authenticationState, component: Component, ...props } = this.props;
    const hasSession = authenticationState.hasSession;
    return (
      <Route
        {...props}
        render={(renderProps) =>
          hasSession ? (
            <Component {...renderProps} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: renderProps.location },
              }}
            />
          )
        }
      />
    );
  }
}

export const PrivateRoute = connect((state: any) => ({
  authenticationState: state.authenticationState,
}))(PrivateRouteContainer);
