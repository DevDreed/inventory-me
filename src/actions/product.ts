import { ProductAction, ProductActions, Product } from "../model";
import { Dispatch } from "react";
import Cookies from "js-cookie";

export function addProduct(product: Product): ProductAction {
  return {
    type: ProductActions.ADD_PRODUCT,
    payload: product,
  };
}

// Async Function expample with redux-thunk
// export function completeProduct(productId: number) {
// 	// here you could do API eg

// 	return (dispatch: Function, getState: Function) => {
// 		dispatch({ type: ProductActions.COMPLETE_PRODUCT, payload: productId });
// 	};
// }

// export function uncompleteProduct(productId: number): ProductAction {
// 	return {
// 		type: ProductActions.UNCOMPLETE_PRODUCT,
// 		payload: productId,
// 	};
// }

export function deleteProduct(productId: number): ProductAction {
  return {
    type: ProductActions.DELETE_PRODUCT,
    payload: productId,
  };
}

export function requestProducts(): ProductAction {
  return {
    type: ProductActions.REQUEST_PRODUCTS,
    payload: null,
  };
}

export function receiveProducts(products: Product[]): ProductAction {
  return {
    type: ProductActions.RECEIVE_PRODUCTS,
    payload: products,
  };
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchProducts('reactjs'))

export function fetchProducts() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch: Dispatch<ProductAction>) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestProducts());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`http://localhost:5000/products`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Authorization: Cookies.get("token") || "",
        // "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
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

        dispatch(receiveProducts(json))
      );
  };
}
