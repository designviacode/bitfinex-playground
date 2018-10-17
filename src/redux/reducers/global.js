/*
 * globalReducer
 *
 * The reducer handles global-changes for the platform,
 * like: navigation-global components,
 */

// global action-types
export const types = {
  INIT_SOCKET: "GLOBAL/INIT_SOCKET",
  SUCCESS_SOCKET: "GLOBAL/SUCCESS_SOCKET",
  RESET_SOCKET: "GLOBAL/RESET_SOCKET",

  RECONNECT_ATTEMPT: "GLOBAL/RECONNECT_ATTEMPT",
  RECONNECT_FAILURE: "GLOBAL/RECONNECT_FAILURE",
  RECONNECT_SUCCESS: "GLOBAL/RECONNECT_SUCCESS"
};

// Initial global state
const initialState = {
  socket: {
    reconnect: 3,
    connected: false,
    connection: null
  }
};

const global = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.INIT_SOCKET:
      return { ...state, socket: { ...state.socket, connected: false } };
    case types.SUCCESS_SOCKET:
      // alert(JSON.stringify(payload));
      return {
        ...state,
        socket: { ...state.socket, connected: true, connection: payload }
      };
    case types.RESET_SOCKET:
      return {
        ...state,
        socket: {
          ...state.socket,
          connected: false,
          connection: null,
          error: payload
        }
      };

    default:
      return state;
  }
};

export default global;
