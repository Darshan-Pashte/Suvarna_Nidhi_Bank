import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
} from "./reducers/userReducers";


const reducer = combineReducers({
  user: userReducer,
});

// let initialState = {
//   cart: {
//     cartItems: sessionStorage.getItem("cartItems")
//       ? JSON.parse(sessionStorage.getItem("cartItems"))
//       : [],
//     shippingInfo: sessionStorage.getItem("shippingInfo")
//       ? JSON.parse(sessionStorage.getItem("shippingInfo"))
//       : {},
//   },
// };

const middleware = [thunk];

const store = createStore(
  reducer,
//   initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
