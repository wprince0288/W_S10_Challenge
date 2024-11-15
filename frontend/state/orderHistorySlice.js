import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchOrders = createAsyncThunk(
  'orderHistory/fetchOrders',
  async () => {
    const response = await axios.get('http://localhost:9009/api/pizza/history')
    return response.data
  })

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: { orders: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = 'failed'
      })
  },
})
export default orderHistorySlice.reducer;


