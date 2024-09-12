import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postOrderBurger = createAsyncThunk(
  'userOrder/postOrderBurger',
  async function (IdList: string[]) {
    return await orderBurgerApi(IdList);
  }
);
// заказы пользователя
export const getOrdersBurger = createAsyncThunk(
  'userOrder/getOrdersBurger',
  async function () {
    return await getOrdersApi();
  }
);
