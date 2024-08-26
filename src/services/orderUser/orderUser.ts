import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersBurger, postOrderBurger } from './actions';

interface IUserOrder {
  userOrders: TOrder[];
  userOrder: TOrder | null;
  status: boolean;
}
const initialState: IUserOrder = {
  userOrders: [],
  userOrder: null,
  status: false
};

export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    updateStateOrder: (state) => {
      state.userOrder = null;
    }
  },
  selectors: {
    getStatusOrder: (state) => state.status,
    getUserOrders: (state) => state.userOrders,
    getUserOrder: (state) => state.userOrder
  },
  extraReducers: (builder) =>
    builder
      .addCase(postOrderBurger.fulfilled, (state, action) => {
        state.userOrder = action.payload.order;
        state.status = false;
      })
      .addCase(postOrderBurger.pending, (state) => {
        state.status = true;
      })
      .addCase(getOrdersBurger.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
});
export const { updateStateOrder } = userOrderSlice.actions;
export const { getStatusOrder, getUserOrders, getUserOrder } =
  userOrderSlice.selectors;
