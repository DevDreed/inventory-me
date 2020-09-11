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
        user: action.payload.data,
        hasSession: true,
        updating: false,
      });
    },
    [AuthenticationActions.REQUEST_LOGOUT](
      state: AuthenticationState,
      action: AuthenticationAction
    ) {
      return _assign({}, state, {
        user: initialUser,
        hasSession: false,
        updating: false,
      });
    },
  }
);
