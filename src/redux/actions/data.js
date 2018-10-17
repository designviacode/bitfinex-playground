// CONSTANTS
import { types as typesForData } from "../reducers/data";

const requestTrades = () => ({ type: typesForData.REQUEST_TRADES });
export const successTrades = payload => ({
  type: typesForData.SUCCESS_TRADES,
  payload
});
export const failureTrades = (errorStatus, errorMessage) => ({
  type: typesForData.FAILURE_TRADES,
  payload: { errorStatus, errorMessage }
});
