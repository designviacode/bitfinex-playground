// import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
// import { routerMiddleware } from "react-router-redux";
// import { history } from "../index";

// REDUCERS & SAGAS
import rootReducer from "./reducers";
// import rootSaga from "./sagas";

const configureStore = browserHistory => {
  let middlewares = [thunk];

  // create the saga & router middleware

  // const routeMiddleware = routerMiddleware(browserHistory);
  if (process.env.NODE_ENV === "development") {
    // const { logger } = require("redux-logger");
    // middlewares.push(logger);
  }

  // push initialized middlewares
  // middlewares.push(sagaMiddleware, routeMiddleware);

  const devToolLoader = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = devToolLoader(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);

  // initiate saga-listeners
  // sagaMiddleware.run(rootSaga);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./reducers/index").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
