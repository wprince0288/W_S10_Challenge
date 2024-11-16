import { configureStore } from '@reduxjs/toolkit'
import orderHistoryReducer from './orderHistorySlice'
// import { postOrder } from './pizzaApie'

export const store = configureStore({
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