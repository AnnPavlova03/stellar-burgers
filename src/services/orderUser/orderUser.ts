import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersBurger, postOrderBurger } from './actions';

interface IUserOrder {
  userOrders: TOrder[];
  userOrder: TOrder | null;
  status: boolean;
  error: null | string;
}
export const initialStateUserOrder: IUserOrder = {
  userOrders: [],
  userOrder: null,
  status: false,
  error: null
};

export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState: initialStateUserOrder,
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
      .addCase(postOrderBurger.pending, (state) => {
        state.status = true;
      })
      .addCase(postOrderBurger.fulfilled, (state, action) => {
        state.userOrder = action.payload.order;
        state.status = false;
      })
      .addCase(postOrderBurger.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message ?? 'error message postOrderBurger';
      })
      .addCase(getOrdersBurger.pending, (state) => {
        state.status = true;
      })
      .addCase(getOrdersBurger.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.status = false;
      })
      .addCase(getOrdersBurger.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message ?? 'error message getOrdersBurger';
      })
});
export const { updateStateOrder } = userOrderSlice.actions;
export const { getStatusOrder, getUserOrders, getUserOrder } =
  userOrderSlice.selectors;
