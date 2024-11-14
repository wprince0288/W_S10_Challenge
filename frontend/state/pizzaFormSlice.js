import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fullName: '',
    size: '',
    toppings: {},
    loading: false,
    success: false,
    error: null,
  };
  
  const pizzaFormSlice = createSlice({
    name: 'pizzaForm',
    initialState,
    reducers: {
      updateFormField: (state, action) => {
        const { field, value } = action.payload;
        state[field] = value;
      },
      postOrderRequest: (state) => {
        state.loading = true;
      },
      postOrderSuccess: (state) => {
        state.loading = false;
        state.success = true;
      },
      postOrderFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      resetForm: () => initialState,
    },
  });
  
  export const {
    updateFormField,
    postOrderRequest,
    postOrderSuccess,
    postOrderFailure,
    resetForm,
  } = pizzaFormSlice.actions;
  
  export default pizzaFormSlice.reducer;