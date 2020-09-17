import { History } from "history";
import { combineReducers } from "redux";
import { Product } from "../model";
import * as productReducer from "./product";
import * as authenticationReducer from "./authentication";
import { AuthenticationState } from "./authentication";

export interface RootState {
  productList: Product[];
  authenticationState: AuthenticationState;
}

export default (history: History) =>
  combineReducers({
    ...productReducer,
    ...authenticationReducer,
  });
