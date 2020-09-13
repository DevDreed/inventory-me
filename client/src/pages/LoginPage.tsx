import React from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import { useActions } from "../actions";
import * as AuthenticationActions from "../actions/authentication";
import { LoginCredentials } from "../model";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
interface IFormInputs {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onBlur",
  });
  const authenticationActions = useActions(AuthenticationActions);
  const onSubmit = (credentials: LoginCredentials) => {
    authenticationActions.fetchLogin(credentials);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                ref={register({
                  required: "Email is required",
                  validate: (input) =>
                    isEmail(input) || "not a valid email address",
                })}
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <ErrorMessage errors={errors} name="email" />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                ref={register({
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password needs to be at least 6 characters long", // <p>error message</p>
                  },
                })}
                placeholder="Password"
              />
              <ErrorMessage errors={errors} name="password" />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formState.isSubmitting}
            >
              Submit
            </button>
          </form>

          <div className="mt-4">
            <div>Not Registered?</div>
            <Link to={"/register"}>Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
