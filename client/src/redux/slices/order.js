import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  shippingAddress: null,
  order: null,
};
export const orderSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    shippingAddressAdd: (state, { payload }) => {
      state.shippingAddress = payload;
      state.loading = false;
    },
    clearOrder: (state) => {
      state = initialState;
    },
    setServerResponseMsg: (state, {payload}) => { 
      state.serverMsg = payload; 
    }, 
  },
});

export const { setLoading, setError, shippingAddressAdd, clearOrder,setServerResponseMsg } = orderSlice.actions;
export default orderSlice.reducer;

export const orderSelector = (state) => state.order;
