import { expect, test, describe } from '@jest/globals';
import { getFeeds, getOrderByNumber } from './actions';
import { initialStateOrder, orderSlice } from './order';

describe('test extraReducers order', () => {
  const state = {
    ...initialStateOrder
  };

  test('getOrderByNumber request', () => {
    const action = { type: getOrderByNumber.pending.type };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialStateOrder,
      status: true
    });
  });
  test('getOrderByNumber success', () => {
    const order = {
      _id: '1',
      ingredients: ['2', '3'],
      name: 'Краторный люминесцентный бургер',
      number: 52655
    };
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [order] }
    };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialStateOrder,
      order: order
    });
  });

  test('getOrderByNumber reject', () => {
    const expectedError = 'Failed to fetch order by number';
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: expectedError }
    };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual({ ...initialStateOrder, error: expectedError });
  });

  test('getFeeds request', () => {
    const action = { type: getFeeds.pending.type };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual({
      ...state,
      status: true
    });
  });
  test('getFeeds success', () => {
    const feeds = { _id: '1' };
    const action = { type: getFeeds.fulfilled.type, payload: feeds };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual({
      ...state,
      orderList: feeds
    });
  });
  test('getFeeds reject', () => {
    const expectedError = 'Failed to fetch orders';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: expectedError }
    };
    const result = orderSlice.reducer(state, action);
    expect(result).toEqual({
      ...state,
      error: expectedError
    });
  });
});
