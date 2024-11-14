import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchOrders = createAsyncThunk(
  'orderHistory/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      dispatch(fetchOrdersRequest())
      const response = await axios.get('http://localhost:9009/api/pizza/history')
      return response.data
    } catch (error) {
      return rejectWithValue(error.Message)
    }
  }
);

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: { orders: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderHistorySlice.reducer;


