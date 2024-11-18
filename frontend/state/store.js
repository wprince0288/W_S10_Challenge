import { configureStore } from '@reduxjs/toolkit'
import orderHistoryReducer from './orderHistorySlice'

export const store = configureStore({
  reducer: {
    orderHistory: orderHistoryReducer,
  },
});

export const resetStore = () => {
  return configureStore({
    reducer: {
      orderHistory: orderHistoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {},
        },
      }),
  });
};