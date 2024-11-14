import { configureStore } from '@reduxjs/toolkit'
import orderHistoryReducer from './orderHistorySlice'
import sizeFilterReducer from './sizeFilterSlice'
import pizzaOrderFormReducer from './pizzaFormSlice'

const store = configureStore({
  reducer: {
    orderHistory: orderHistoryReducer,
    sizeFilter: sizeFilterReducer,
    pizzaOrderForm: pizzaOrderFormReducer,
  },
})

export default store

