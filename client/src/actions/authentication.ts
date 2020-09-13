import {
  AuthenticationAction,
  AuthenticationActions,
  LoginCredentials,
  RegisterFormData,
} from "../model";
import { Dispatch } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

export function requestLogin(
  credentials: LoginCredentials
): AuthenticationAction {
  return {
    type: AuthenticationActions.REQUEST_LOGIN,
    payload: credentials,
  };
}

//TODO: Fix any
export function receiveLogin(result: any): AuthenticationAction {
  return {
    type: AuthenticationActions.RECEIVE_LOGIN,
    payload: result,
  };
}

export function requestRegister(
  formData: RegisterFormData
): AuthenticationAction {
  return {
    type: AuthenticationActions.REQUEST_REGISTER,
    payload: formData,
  };
}

//TODO: Fix any
export function receiveRegister(result: any): AuthenticationAction {
  return {
    type: AuthenticationActions.RECEIVE_REGISTER,
    payload: result,
  };
}

export function requestLogout(): AuthenticationAction {
  return {
    type: AuthenticationActions.REQUEST_LOGOUT,
    payload: null,
  };
}

export function fetchLogin(credentials: LoginCredentials) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return async function (dispatch: Dispatch<AuthenticationAction>) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestLogin(credentials));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    await axios(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(credentials),
    }).then((res: AxiosResponse) => {
      const json = res.data;
      Cookies.set("token", json.token.token);
      dispatch(receiveLogin(json));
    });
  };
}

export function fetchRegister(formData: RegisterFormData) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return async function (dispatch: Dispatch<AuthenticationAction>) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestRegister(formData));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    await axios(`/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formData),
    }).then((res: AxiosResponse) => {
      const json = res.data;
      Cookies.set("token", json.token.token);
      dispatch(receiveRegister(json));
    });
  };
}
