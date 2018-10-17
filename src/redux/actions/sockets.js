import { types as typesForGlobal } from "../reducers/global";

// INIT_SOCKET: "GLOBAL/INIT_SOCKET",
// RESET_SOCKET: "GLOBAL/RESET_SOCKET",
// RECONNECT_ATTEMPT: "GLOBAL/RECONNECT_ATTEMPT",
// RECONNECT_FAILURE: "GLOBAL/RECONNECT_FAILURE",
// RECONNECT_SUCCESS: "GLOBAL/RECONNECT_SUCCESS"

const CONFIG = {
  prec: "P0",
  freq: "F0",
  len: 25
};

export const initiateSocket = () => {
  return (dispatch, getState) => {
    if (!getState().global.socket.connected) {
      dispatch({ type: typesForGlobal.INIT_SOCKET });
    } else {
      dispatch({ type: typesForGlobal.RESET_SOCKET });
    }
  };
};

export const successfulSocket = connection => {
  console.log(JSON.stringify(connection));
  return dispatch =>
    dispatch({ type: typesForGlobal.SUCCESS_SOCKET, payload: connection });
};

export const subscribeToTrades = (prec, symbol) => {
  return (dispatch, getState) => {
    const subscriptionRequest = JSON.stringify({
      event: "subscribe",
      channel: "trades",
      symbol
    });

    // getState().global.socket.connection.
  };
};

const subscribe = (socket, config) => {
  return (dispatch, getState) => {
    if (socket) {
      if (config === null) {
        dispatch(subscribeToDefault(socket));
      } else {
      }
    } else {
      return console.error("No Web-Socket connection provided");
    }
  };
};

export const subscribeToDefault = () => {};
