import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds, getOrderByNumber } from './actions';
import { TFeedsResponse } from '@api';

interface IOrder {
  order: TOrder | null;
  orderList: TFeedsResponse | null;
}
const initialState: IOrder = {
  order: null,
  orderList: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getFeedsInfo: (state) => state.orderList,
    getOrder: (state) => state.order
  },
  extraReducers: (builder) =>
    builder

      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        const [order] = action.payload.orders;
        state.order = order;
        console.log('getOrderByNumber', action.payload);
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orderList = action.payload;
        console.log('getFeeds', action.payload);
      })
});

export const {
  getOrder,

  getFeedsInfo
} = orderSlice.selectors;
