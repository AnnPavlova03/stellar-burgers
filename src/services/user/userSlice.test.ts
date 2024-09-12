import { expect, test, describe } from '@jest/globals';
import { initialStateUser, setAuth, setUser, userSlice } from './userSlice';
import { loginUser, logoutUser, registerUser, updateUser } from './actions';

describe('test userSlice', () => {
  const state = {
    ...initialStateUser
  };
  describe('test reducers', () => {
    test('setAuth', () => {
      const status = false;
      const action = { type: setAuth.type, payload: status };
      const result = userSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUser
      });
    });
    test('setUser', () => {
      const userPayload = { email: 'example@mail.ru', name: 'Ann' };
      const action = { type: setUser.type, payload: userPayload };
      const result = userSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateUser,
        user: userPayload
      });
    });
  });
  describe('test extraReducers', () => {
    const expectStateUpdate = (action: any, expectedResult: object) => {
      const result = userSlice.reducer(state, action);
      expect(result).toEqual(expectedResult);
    };

    test('loginUser request', () => {
      const action = { type: loginUser.pending.type };
      expectStateUpdate(action, { ...initialStateUser, status: true });
    });

    test('loginUser success', () => {
      const userData = { email: 'example@mail.ru', password: '123' };
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: userData }
      };
      expectStateUpdate(action, {
        ...initialStateUser,
        user: userData,
        isAuthChecked: true
      });
    });

    test('loginUser rejected', () => {
      const expectedError = 'Failed to fetch user';
      const action = {
        type: loginUser.rejected.type,
        error: { message: expectedError }
      };
      expectStateUpdate(action, { ...initialStateUser, error: expectedError });
    });
    test('registerUser request', () => {
      const action = { type: registerUser.pending.type };
      expectStateUpdate(action, { ...initialStateUser, status: true });
    });

    test('registerUser success', () => {
      const userData = {
        email: 'example@mail.ru',
        password: '123',
        name: 'Ann'
      };
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: userData }
      };
      expectStateUpdate(action, {
        ...initialStateUser,
        user: userData
      });
    });

    test('registerUser rejected', () => {
      const expectedError = 'Failed to register user';
      const action = {
        type: registerUser.rejected.type,
        error: { message: expectedError }
      };
      expectStateUpdate(action, { ...initialStateUser, error: expectedError });
    });

    test('updateUser request', () => {
      const action = { type: updateUser.pending.type };
      expectStateUpdate(action, { ...initialStateUser, status: true });
    });

    test('updateUser success', () => {
      const state = {
        ...initialStateUser,
        user: {
          email: 'example@mail.ru',
          password: '123',
          name: 'Ann'
        }
      };
      const userData = {
        email: 'example@mail.ru',
        password: '1234',
        name: 'Anna'
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: userData }
      };
      const result = userSlice.reducer(state, action);
      expect(result).toEqual({ ...initialStateUser, user: userData });
    });

    test('updateUser rejected', () => {
      const expectedError = 'Failed to update user';
      const action = {
        type: updateUser.rejected.type,
        error: { message: expectedError }
      };
      expectStateUpdate(action, { ...initialStateUser, error: expectedError });
    });
    test('logoutUser request', () => {
      const action = { type: logoutUser.pending.type };
      expectStateUpdate(action, { ...initialStateUser, status: true });
    });

    test('logoutUser success', () => {
      const action = {
        type: logoutUser.fulfilled.type,
        payload: { user: null }
      };
      expectStateUpdate(action, {
        ...initialStateUser,
        user: null
      });
    });

    test('logoutUser rejected', () => {
      const expectedError = 'Failed to update user';
      const action = {
        type: logoutUser.rejected.type,
        error: { message: expectedError }
      };
      expectStateUpdate(action, { ...initialStateUser, error: expectedError });
    });
  });
});
