import React from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { Button, TextField } from "@material-ui/core";
import { useActions } from "../actions";
import * as AuthenticationActions from "../actions/authentication";
import { LoginCredentials } from "../model";

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  input: {
    width: "100%",
  },
};

interface ComponentProps {
  hasSession: boolean;
}

export function LoginPage(props: ComponentProps) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });
  const authenticationActions = useActions(AuthenticationActions);

  function onSubmit(credentials: LoginCredentials) {
    authenticationActions.fetchLogin(credentials);
  }

  return (
    <div style={styles.container}>
      <h4>Login</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            name="email"
            inputRef={register({
              required: true,
              validate: (input) => isEmail(input),
            })}
            style={{ ...styles.input, borderColor: errors.email && "red" }}
            placeholder="Email"
          />
        </div>
        <div>
          <TextField
            name="password"
            type="password"
            inputRef={register({
              required: true,
              minLength: 6,
            })}
            style={{ ...styles.input, borderColor: errors.password && "red" }}
            placeholder="Password"
          />
        </div>
        <div>
          <Button type="submit" disabled={formState.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
