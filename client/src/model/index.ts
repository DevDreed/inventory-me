import { ProductAction } from "./product";
import { AuthenticationAction } from "./authentication";

export * from "./product";
export * from "./authentication";

export type Action = ProductAction | AuthenticationAction;
