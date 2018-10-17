// CONSTANTS
import { types as typesForData } from "../reducers/data";

export const requestAll = () => {
  return dispatch => {
    dispatch({ type: typesForData.REQUEST_TRADES });
    dispatch({ type: typesForData.REQUEST_TICKER });
    dispatch({ type: typesForData.REQUEST_ORDER_BOOK });
  };
};

export const successTrades = payload => ({
  type: typesForData.SUCCESS_TRADES,
  payload
});
export const successTicker = payload => ({
  type: typesForData.SUCCESS_TICKER,
  payload
});
export const successOrderBook = payload => ({
  type: typesForData.SUCCESS_ORDER_BOOK,
  payload
});

export const failureTrades = (errorStatus, errorMessage) => ({
  type: typesForData.FAILURE_TRADES,
  payload: { errorStatus, errorMessage }
});
