import { AuthenticationAction, AuthenticationActions, User } from "../model";
import createReducer from "./createReducer";
import { assign as _assign } from "lodash";

export interface AuthenticationState {
  hasSession: boolean;
  user: any;
  updating: boolean;
}

const initialUser: User = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  created_date: "",
  last_login: "",
};

const initialState: AuthenticationState = {
  hasSession: false,
  user: initialUser,
  updating: false,
};

export const authenticationState = createReducer<AuthenticationState>(
  initialState,
  {
    [AuthenticationActions.REQUEST_LOGIN](
      state: AuthenticationState,
      action: AuthenticationAction
    ) {
      return _assign({}, state, {
        updating: true,
      });
    },

    [AuthenticationActions.RECEIVE_LOGIN](
      state: AuthenticationState,
      action: AuthenticationAction
    ) {
      return _assign({}, state, {
        user: action.payload.user,
        hasSession: true,
        updating: false,
      });
    },
    [AuthenticationActions.FAIL_LOGIN](state: AuthenticationState) {
      return _assign({}, state, {
        hasSession: false,
        updating: false,
      });
    },
    [AuthenticationActions.REQUEST_REGISTER](
      state: AuthenticationState,
      action: AuthenticationAction
    ) {
      return _assign({}, state, {
        updating: true,
      });
    },

    [AuthenticationActions.RECEIVE_REGISTER](
      state: AuthenticationState,
      action: AuthenticationAction
    ) {
      return _assign({}, state, {
        user: action.payload.user,
        hasSession: true,
        updating: false,
      });
    },
    [AuthenticationActions.FAIL_REGISTER](state: AuthenticationState) {
      return _assign({}, state, {
        hasSession: false,
        updating: false,
      });
    },
    [AuthenticationActions.REQUEST_LOGOUT](state: AuthenticationState) {
      return _assign({}, state, {
        user: initialUser,
        hasSession: false,
        updating: false,
      });
    },
    [AuthenticationActions.SET_HAS_SESSION_TRUE](state: AuthenticationState) {
      return _assign({}, state, {
        hasSession: true,
      });
    },
    [AuthenticationActions.SET_HAS_SESSION_FALSE](state: AuthenticationState) {
      return _assign({}, state, {
        hasSession: false,
      });
    },
  }
);
