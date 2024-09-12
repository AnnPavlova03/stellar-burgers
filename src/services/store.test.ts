import store from './store';
import { initialStateBurger } from './burgerConstructor/burger';
import { initialStateUser } from './user/userSlice';
import { initialStateOrder } from './order/order';
import { initialStateUserOrder } from './orderUser/orderUser';
import { describe, expect, test } from '@jest/globals';

const currentState = store.getState();
const currentBurgerConstructorState = currentState.burgerConstructor;
const currentUserState = currentState.user;
const currentOrderState = currentState.order;
const currentUserOrderState = currentState.userOrder;

describe('teat rootReducer', () => {
  test('Store initial state', () => {
    expect(currentBurgerConstructorState).toEqual(initialStateBurger);
    expect(currentUserState).toEqual(initialStateUser);
    expect(currentOrderState).toEqual(initialStateOrder);
    expect(currentUserOrderState).toEqual(initialStateUserOrder);
  });
});
