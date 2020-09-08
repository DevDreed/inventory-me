import { History } from "history";
import { combineReducers } from "redux";
import { Product } from "../model";
import * as productReducer from "./product";

export interface RootState {
  productList: Product[];
}

export default (history: History) =>
  combineReducers({
    ...productReducer,
  });
