import { configureStore } from '@reduxjs/toolkit'
import orderHistoryReducer from './orderHistorySlice'
import sizeFilterReducer from './sizeFilterSlice'
import pizzaFormReducer from './pizzaFormSlice'


const store = configureStore({
  reducer: {
    orderHistory: orderHistoryReducer,
    sizeFilter: sizeFilterReducer,
    pizzaOrder: pizzaFormReducer,
  },
})


export const resetStore = () => {
return configureStore({
    reducer: {
      orderHistory: orderHistoryReducer,
      sizeFilter: sizeFilterReducer,
      pizzaOrder: pizzaFormReducer,
    },
  })
}


export default store