export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_date: string;
  last_login?: string;
}

export enum AuthenticationActions {
  REQUEST_LOGIN = "REQUEST_LOGIN",
  RECEIVE_LOGIN = "RECEIVE_LOGIN",
  FAIL_LOGIN = "FAIL_LOGIN",
  REQUEST_REGISTER = "REQUEST_REGISTER",
  RECEIVE_REGISTER = "RECEIVE_REGISTER",
  FAIL_REGISTER = "FAIL_REGISTER",
  REQUEST_LOGOUT = "REQUEST_LOGOUT",
  RECEIVE_LOGOUT = "RECEIVE_LOGOUT",
  FAIL_LOGOUT = "FAIL_LOGOUT",
  SET_HAS_SESSION_TRUE = "SET_HAS_SESSION_TRUE",
  SET_HAS_SESSION_FALSE = "SET_HAS_SESSION_FALSE",
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  passwordMatch: string;
}

interface AuthenticationActionType<T, P> {
  type: T;
  payload: P;
}

export type AuthenticationAction =
  | AuthenticationActionType<
      typeof AuthenticationActions.REQUEST_LOGIN,
      LoginCredentials
    >
  | AuthenticationActionType<typeof AuthenticationActions.RECEIVE_LOGIN, any>
  | AuthenticationActionType<typeof AuthenticationActions.FAIL_LOGIN, any>
  | AuthenticationActionType<
      typeof AuthenticationActions.REQUEST_REGISTER,
      RegisterFormData
    >
  | AuthenticationActionType<typeof AuthenticationActions.RECEIVE_REGISTER, any>
  | AuthenticationActionType<typeof AuthenticationActions.FAIL_REGISTER, any>
  | AuthenticationActionType<
      typeof AuthenticationActions.SET_HAS_SESSION_TRUE,
      any
    >
  | AuthenticationActionType<
      typeof AuthenticationActions.SET_HAS_SESSION_FALSE,
      any
    >
  | AuthenticationActionType<typeof AuthenticationActions.REQUEST_LOGOUT, any>
  | AuthenticationActionType<typeof AuthenticationActions.RECEIVE_LOGOUT, any>
  | AuthenticationActionType<typeof AuthenticationActions.FAIL_LOGOUT, any>;
