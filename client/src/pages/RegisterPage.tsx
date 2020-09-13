import React from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import { useActions } from "../actions";
import * as AuthenticationActions from "../actions/authentication";
import { RegisterFormData } from "../model";
import { ErrorMessage } from "@hookform/error-message";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
interface IFormInputs {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  passwordMatch: string;
}

export const RegisterPage = () => {
  const { register, handleSubmit, errors, formState, watch } = useForm<
    IFormInputs
  >({
    mode: "onBlur",
  });
  const authenticationActions = useActions(AuthenticationActions);

  const onSubmit = (formData: RegisterFormData) => {
    authenticationActions.fetchRegister(formData);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="first_name">First name</label>
              <input
                id="first_name"
                name="first_name"
                type="first_name"
                className="form-control"
                ref={register({
                  required: "First name is required",
                })}
                placeholder="Enter first name"
              />
              <ErrorMessage errors={errors} name="first_name" />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last name</label>
              <input
                id="last_name"
                name="last_name"
                type="last_name"
                className="form-control"
                ref={register({
                  required: "Last name is required",
                })}
                placeholder="Enter last name"
              />
              <ErrorMessage errors={errors} name="last_name" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="username"
                className="form-control"
                ref={register({
                  required: "Username is required",
                })}
                placeholder="Enter a username"
              />
              <ErrorMessage errors={errors} name="username" />
            </div>
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
                    message: "Password needs to be at least 6 characters long",
                  },
                })}
                placeholder="Password"
              />
              <ErrorMessage errors={errors} name="password" />
            </div>
            <div className="form-group">
              <label htmlFor="passwordMatch">Confirm password</label>
              <input
                id="passwordMatch"
                name="passwordMatch"
                type="password"
                className="form-control"
                ref={register({
                  required: "Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords don't match.",
                })}
                placeholder="Confirm password"
              />
              <ErrorMessage errors={errors} name="passwordMatch" />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formState.isSubmitting || !isEmpty(errors)}
            >
              Submit
            </button>
          </form>
          <div className="mt-4">
            <div>
              Back to <Link to={"/login"}>Login</Link> page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
