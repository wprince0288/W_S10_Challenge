import { configureStore } from '@reduxjs/toolkit'
import orderHistoryReducer from './orderHistorySlice'
import { postOrder } from './pizzaApie'

middleware: getDefault => getDefault().concat(
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat()
)

export const store = resetStore()