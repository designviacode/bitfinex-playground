import { combineReducers } from "redux";
// STORE - REDUCERS
import global from "./global";
import ui from "./ui";

/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
const rootReducer = combineReducers({
  global,
  ui
});

export default rootReducer;
