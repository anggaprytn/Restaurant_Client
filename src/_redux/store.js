import { createStore, combineReducers, applyMiddleware } from "redux";

import {promise} from "./middleware";
// reducers
import transaction from "../_reducers/transaction";
import menus from "../_reducers/menus";
import orders from "../_reducers/orders";
import timer from "../_reducers/timer";

const reducers = combineReducers({
  transaction,
  menus,
  orders,
  timer
});

const middlewares = applyMiddleware(promise);

const store = createStore(reducers, middlewares);

export default store;
