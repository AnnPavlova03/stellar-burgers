import { getOrdersBurger, postOrderBurger } from './actions';
import {
  userOrderSlice,
  updateStateOrder,
  initialStateUserOrder
} from './orderUser';
import { expect, test, describe } from '@jest/globals';

describe('test userOrderSlice', () => {
  describe('test reducers', () => {
    const state = {
      ...initialStateUserOrder,
      userOrder: {
        _id: '1',
        ingredients: ['2', '3'],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-09-11T11:42:10.326Z',
        updatedAt: '2024-09-11T11:42:10.781Z',
        number: 52655
      }
    };
    test('updateStateOrder', () => {
      const action = { type: updateStateOrder.type };
      const result = userOrderSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUserOrder,
        userOrder: null
      });
    });
  });
  describe('test extraReducers', () => {
    const state = {
      ...initialStateUserOrder
    };
    test('getOrdersBurger request', () => {
      const action = { type: getOrdersBurger.pending.type };
      const result = userOrderSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUserOrder,
        status: true
      });
    });
    test('getOrdersBurger success', () => {
      const orders = { _id: '1' };
      const action = { type: getOrdersBurger.fulfilled.type, payload: orders };
      const result = userOrderSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUserOrder,
        userOrders: orders
      });
    });
    test('getOrdersBurger reject', () => {
      const expectedError = 'Failed to fetch orders user';
      const action = {
        type: getOrdersBurger.rejected.type,
        error: { message: expectedError }
      };
      const result = userOrderSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUserOrder,
        error: expectedError
      });
    });
    test('postOrderBurger request', () => {
      const action = { type: postOrderBurger.pending.type };
      const result = userOrderSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUserOrder,
        status: true
      });
    });
    test('postOrderBurger success', () => {
      const listOrder = ['1', '2', '3'];
      const action = {
        type: postOrderBurger.fulfilled.type,
        payload: { order: listOrder }
      };
      const result = userOrderSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUserOrder,
        userOrder: listOrder
      });
    });
    test('postOrderBurger reject', () => {
      const expectedError = 'Failed to post order user';
      const action = {
        type: postOrderBurger.rejected.type,
        error: { message: expectedError }
      };
      const result = userOrderSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUserOrder,
        error: expectedError
      });
    });
  });
});
