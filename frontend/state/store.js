import { configureStore, createSlice } from '@reduxjs/toolkit'

const exampleReducer = (state = { count: 0 }) => state;

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    fetchOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure } = orderHistorySlice.actions;

export const fetchOrderHistory = () => async (dispatch) => {
  dispatch(fetchOrdersRequest())
  try {
    const response = await fetch('http://localhost:9009/api/pizza/history')
    if(!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    const data = await response.json();
    dispatch(fetchOrdersSuccess(data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

const pizzaOrderSlice = createSlice({
  name: 'pizzaOrder',
  initialState: { loading: false, error: null, success: null },
  reducers: {
    postOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postOrderSuccess: (state) => {
      state.loading = false;
      state.success = 'Order placed successfully!'
    },
    postOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    }
  }
});

export const { postOrderRequest, postOrderSuccess, postOrderFailure, resetOrderState} = pizzaOrderSlice.actions;

export const postPizzaOrder = (orderData) => async (dispatch) => {
  dispatch(postOrderRequest());
  try {
    const response = await fetch('http://localhost:9009/api/pizza/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}`);
    }
    dispatch(postOrderSuccess());
  } catch (error) {
    dispatch(postOrderFailure(error.message));
  }
};

const sizeFilterSlice = createSlice({
  name: 'sizeFilter',
  initialState: 'All',
  reducers: {
    setSizeFilter: (state, action) => action.payload
  }
});
export const { setSizeFilter } = sizeFilterSlice.actions;

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    orderHistory: orderHistorySlice.reducer,
    sizeFilter: sizeFilterSlice.reducer,
    pizzaOrder: pizzaOrderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  // middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  
});

export const store = resetStore();
export default store;
