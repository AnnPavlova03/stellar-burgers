import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async function (number: number) {
    return await getOrderByNumberApi(number);
  }
);
// все заказы
export const getFeeds = createAsyncThunk('order/getFeeds', async function () {
  return await getFeedsApi();
});
