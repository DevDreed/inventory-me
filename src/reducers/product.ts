import { ProductAction, ProductActions, Product } from "../model";
import createReducer from "./createReducer";

export const productList = createReducer<Product[]>([], {
  [ProductActions.ADD_PRODUCT](state: Product[], action: ProductAction) {
    return [...state, action.payload];
  },
  //   [ProductActions.COMPLETE_PRODUCT](state: Product[], action: ProductAction) {
  //     // search after product item with the given id and set completed to true
  //     return state.map((t) =>
  //       t.id === action.payload ? { ...t, completed: true } : t
  //     );
  //   },
  //   [ProductActions.UNCOMPLETE_PRODUCT](state: Product[], action: ProductAction) {
  //     // search after product item with the given id and set completed to false
  //     return state.map((t) =>
  //       t.id === action.payload ? { ...t, completed: false } : t
  //     );
  //   },
  [ProductActions.DELETE_PRODUCT](state: Product[], action: ProductAction) {
    // remove all products with the given id
    // return state.filter((t) => t.id !== action.payload);
  },
  // [ProductActions.RECEIVE_DELETE_PRODUCT](
  //   state: Product[],
  //   action: ProductAction
  // ) {
  //   // remove all products with the given id
  //   // return state.filter((t) => t.id !== action.payload);
  // },
});
