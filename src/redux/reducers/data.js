/*
 * dataReducer
 *
 * The reducer handles data-changes for the platform,
 * like: navigation-data components,
 */

// data action-types
export const types = {
  REQUEST_ORDER_BOOK: "DATA/REQUEST_TICKER",
  REQUEST_TRADES: "DATA/REQUEST_TRADES",
  REQUEST_TICKER: "DATA/REQUEST_TICKER",

  SUCCESS_ORDER_BOOK: "DATA/SUCCESS_TICKER",
  SUCCESS_TRADES: "DATA/SUCCESS_TRADES",
  SUCCESS_TICKER: "DATA/SUCCESS_TICKER",

  FAILURE_ORDER_BOOK: "DATA/FAILURE_TICKER",
  FAILURE_TRADES: "DATA/FAILURE_TRADES",
  FAILURE_TICKER: "DATA/FAILURE_TICKER"
};

// Initial data state
const initialState = {
  ticker: {
    isLoading: false,
    error: false,
    results: []
  },
  orderBook: {
    isLoading: false,
    error: false,
    results: []
  },
  trades: {
    isLoading: false,
    error: false,
    results: []
  }
};

const data = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.REQUEST_TICKER:
      return {
        ...state,
        ticker: { ...state.ticker, isLoading: true }
      };
    case types.SUCCESS_TICKER:
      return {
        ...state,
        ticker: {
          ...state.ticker,
          isLoading: false,
          results: [
            ...state.ticker.results,
            {
              id: payload[0],
              tmstp: payload[1],
              amount: payload[2],
              price: payload[3]
            }
          ]
        }
      };
    case types.FAILURE_TICKER:
      return {
        ...state,
        ticker: {
          ...state.ticker,
          isLoading: false,
          error: true,
          errorMessage: payload.errorMessage,
          errorStatus: payload.errorStatus
        }
      };

    case types.REQUEST_TRADES:
      return {
        ...state,
        trades: { ...state.trades, isLoading: true }
      };
    case types.SUCCESS_TRADES:
      return {
        ...state,
        trades: {
          ...state.trades,
          isLoading: false,
          results: [
            ...state.trades.results,
            {
              id: payload[0],
              tmstp: payload[1],
              amount: payload[2],
              price: payload[3]
            }
          ]
        }
      };
    case types.FAILURE_TRADES:
      return {
        ...state,
        orderBook: {
          ...state.orderBook,
          isLoading: false,
          error: true,
          errorMessage: payload.errorMessage,
          errorStatus: payload.errorStatus
        }
      };

    case types.REQUEST_ORDER_BOOK:
      return {
        ...state,
        orderBook: { ...state.orderBook, isLoading: true }
      };
    case types.SUCCESS_ORDER_BOOK:
      return {
        ...state,
        orderBook: {
          ...state.orderBook,
          isLoading: false,
          results: [
            ...state.orderBook.results,
            {
              id: payload[0],
              tmstp: payload[1],
              amount: payload[2],
              price: payload[3]
            }
          ]
        }
      };
    case types.FAILURE_ORDER_BOOK:
      return {
        ...state,
        orderBook: {
          ...state.orderBook,
          isLoading: false,
          error: true,
          errorMessage: payload.errorMessage,
          errorStatus: payload.errorStatus
        }
      };

    default:
      return state;
  }
};

export default data;
