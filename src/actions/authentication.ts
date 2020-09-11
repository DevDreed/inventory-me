import {
  AuthenticationAction,
  AuthenticationActions,
  LoginCredentials,
} from "../model";
import { Dispatch } from "react";
import Cookies from "js-cookie";

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

export function requestLogout(): AuthenticationAction {
  return {
    type: AuthenticationActions.REQUEST_LOGOUT,
    payload: null,
  };
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchLogin('reactjs'))

export function fetchLogin(credentials: LoginCredentials) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch: Dispatch<AuthenticationAction>) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestLogin(credentials));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://localhost:5000/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(credentials), // body data type must match "Content-Type" header
    })
      .then(
        (response) => response.json()
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then((json) =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        {
          console.log("json", json);
          Cookies.set("token", json.token.token);

          dispatch(receiveLogin(json));
        }
      );
  };
}
