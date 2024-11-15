import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const postOrder = createAsyncThunk('pizzaOrder/postOrder', async (order) => {
  const response = await axios.post('http://localhost:9009/api/pizza/order', order)
  return response.data
})

const pizzaFormSlice = createSlice({
  name: 'pizzaOrder',
  initialState: { fullName: '', size: '', toppings: [], status: 'idle', error: null },
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },
    resetForm: (state) => {
      state.fullName = ''
      state.size = ''
      state.toppings = []
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { updateFormField, resetForm } = pizzaFormSlice.actions
export default pizzaFormSlice.reducer
