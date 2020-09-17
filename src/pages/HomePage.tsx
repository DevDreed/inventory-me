import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { AuthenticationState } from "../reducers/authentication";
import { RegisterPage } from "./RegisterPage";

interface ComponentProps {
  authenticationState: AuthenticationState;
}

export function HomePage(props: ComponentProps) {
  if (props.authenticationState && props.authenticationState.hasSession) {
    return <Redirect to={"/product"} />;
  }

  return (
    <div>
      <Route exact={true} path={["/", "/login"]} render={() => <LoginPage />} />
      <Route exact={true} path={"/register"} render={() => <RegisterPage />} />
    </div>
  );
}
