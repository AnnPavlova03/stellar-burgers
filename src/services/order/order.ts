import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds, getOrderByNumber } from './actions';
import { TFeedsResponse } from '@api';

interface IOrder {
  order: TOrder | null;
  orderList: TFeedsResponse | null;
  status: boolean;
  error: null | string;
}
export const initialStateOrder: IOrder = {
  order: null,
  orderList: null,
  status: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateOrder,
  reducers: {},
  selectors: {
    getFeedsInfo: (state) => state.orderList,
    getOrder: (state) => state.order
  },
  extraReducers: (builder) =>
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.status = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message ?? 'error message getOrderByNumber';
      })
      .addCase(getFeeds.pending, (state) => {
        state.status = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orderList = action.payload;
        state.status = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message ?? 'error message getFeeds';
      })
});

export const { getOrder, getFeedsInfo } = orderSlice.selectors;
