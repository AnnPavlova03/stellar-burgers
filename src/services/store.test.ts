import {
  burgerConstructorSlice,
  initialStateBurger
} from './burgerConstructor/burger';
import { initialStateUser, userSlice } from './user/userSlice';
import { initialStateOrder, orderSlice } from './order/order';
import { initialStateUserOrder, userOrderSlice } from './orderUser/orderUser';
import { describe, expect, test } from '@jest/globals';

describe('teat rootReducer', () => {
  const testExpect = (sliceName: any, expectState: any) => {
    expect(sliceName.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      expectState
    );
  };
  test('Store initial state', () => {
    testExpect(userOrderSlice, initialStateUserOrder);
    testExpect(userSlice, initialStateUser);
    testExpect(orderSlice, initialStateOrder);
    testExpect(burgerConstructorSlice, initialStateBurger);
  });
});
