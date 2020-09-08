export interface Product {
  id: string;
  description: string;
  size: string;
  quantity: number;
  percent_markup: number;
  price: number;
  backordered: boolean;
  tags: Tag[];
  created_date: Date;
  updated_date: Date;
}

export interface Tag {
  id: string;
  description: string;
}

export enum ProductActions {
  ADD_PRODUCT = "ADD_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  REQUEST_PRODUCTS = "REQUEST_PRODUCTS",
  RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS",
  FAIL_PRODUCTS = "FAIL_PRODUCTS",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
}

interface ProductActionType<T, P> {
  type: T;
  payload: P;
}

export type ProductAction =
  | ProductActionType<typeof ProductActions.ADD_PRODUCT, Product>
  | ProductActionType<typeof ProductActions.REQUEST_PRODUCTS, null>
  | ProductActionType<typeof ProductActions.RECEIVE_PRODUCTS, Product[]>
  | ProductActionType<typeof ProductActions.UPDATE_PRODUCT, number>
  | ProductActionType<typeof ProductActions.DELETE_PRODUCT, number>;
