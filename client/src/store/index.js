import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { initApp, refreshDeployments } from "./actions";
import reducer from "./reducer";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(initApp());

setInterval(() => {
  store.dispatch(refreshDeployments());
}, 5000);

export default store;
