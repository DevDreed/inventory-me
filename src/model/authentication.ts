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
  REQUEST_LOGOUT = "REQUEST_LOGOUT",
  RECEIVE_LOGOUT = "RECEIVE_LOGOUT",
  FAIL_LOGOUT = "FAIL_LOGOUT",
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthenticationActionType<T, P> {
  type: T;
  payload: P;
}

export type AuthenticationAction =
  | AuthenticationActionType<
      typeof AuthenticationActions.REQUEST_LOGIN,
      { email: string; password: string }
    >
  | AuthenticationActionType<typeof AuthenticationActions.RECEIVE_LOGIN, any>
  | AuthenticationActionType<typeof AuthenticationActions.FAIL_LOGIN, any>
  | AuthenticationActionType<typeof AuthenticationActions.REQUEST_LOGOUT, any>
  | AuthenticationActionType<typeof AuthenticationActions.RECEIVE_LOGOUT, any>
  | AuthenticationActionType<typeof AuthenticationActions.FAIL_LOGOUT, any>;
