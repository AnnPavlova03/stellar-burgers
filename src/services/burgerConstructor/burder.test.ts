import { expect, test, describe } from '@jest/globals';
import { getIngredients } from './actions';
import {
  removeIngredient,
  burgerConstructorSlice,
  BurgerState,
  addIngredient,
  handleMoveElement,
  setListIngredients,
  clearListIngredients,
  initialStateBurger
} from './burger';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

describe('test burgerConstructorSlice', () => {
  describe('action with ingredient add, remove, move', () => {
    const initialState: BurgerState = {
      ...initialStateBurger,
      constructorItems: {
        bun: null,
        ingredients: [
          { id: '1' },
          { id: '2' },
          { id: '3' },
          { id: '4' }
        ] as TConstructorIngredient[]
      }
    };
    test('add main', () => {
      const newIngredient = {
        id: '5',
        type: 'main'
      } as TConstructorIngredient;
      const newState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(newIngredient)
      );
      const { constructorItems } = newState;
      expect(constructorItems.ingredients).toEqual([
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        expect.objectContaining({ id: expect.any(String) })
      ]);
      expect(constructorItems.ingredients.length).toBe(5);
    });

    test('add bun', () => {
      const newBun = { id: nanoid(), type: 'bun' } as TConstructorIngredient;
      const newState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(newBun)
      );
      const { constructorItems } = newState;
      expect(constructorItems.bun).toEqual(
        expect.objectContaining({ id: expect.any(String) })
      );
    });
    test('delete ingredient', () => {
      const newState = burgerConstructorSlice.reducer(
        initialState,
        removeIngredient({ id: '2' })
      );

      const { constructorItems } = newState;
      expect(constructorItems.ingredients).toEqual([
        { id: '1' },
        { id: '3' },
        { id: '4' }
      ]);
    });
    test('handleMoveElement', () => {
      const newState = burgerConstructorSlice.reducer(
        initialState,
        handleMoveElement({ fromIndex: 0, toIndex: 1 })
      );
      const { constructorItems } = newState;
      expect(constructorItems.ingredients).toEqual([
        { id: '2' },
        { id: '1' },
        { id: '3' },
        { id: '4' }
      ]);
    });
  });
  describe('change list ingredient', () => {
    const listInitialState: BurgerState = {
      ...initialStateBurger,
      constructorItems: {
        bun: { _id: '6' } as TIngredient,
        ingredients: [
          { _id: '1' },
          { _id: '2' },
          { _id: '3' },
          { _id: '4' }
        ] as TConstructorIngredient[]
      }
    };
    test('setListIngredients', () => {
      const newState = burgerConstructorSlice.reducer(
        listInitialState,
        setListIngredients()
      );
      const { listIngredients } = newState;
      expect(listIngredients).toEqual(['6', '1', '2', '3', '4', '6']);
    });
    test('clearListIngredients', () => {
      const newState = burgerConstructorSlice.reducer(
        listInitialState,
        clearListIngredients()
      );
      const { listIngredients } = newState;
      expect(listIngredients).toHaveLength(0);
    });
  });
  describe('test extraReducers constructorBurger', () => {
    const state = {
      ...initialStateBurger
    };

    test('loading ingredient request', () => {
      const action = { type: getIngredients.pending.type };
      const result = burgerConstructorSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateBurger,
        status: true
      });
    });

    test('loading ingredient success', () => {
      const burger = [{ _id: '1' }];
      const action = { type: getIngredients.fulfilled.type, payload: burger };
      const result = burgerConstructorSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateBurger,
        burger,
        status: false
      });
    });
    test('loading ingredient rejected', () => {
      const errorMessage = 'Failed to fetch ingredients';
      const action = {
        type: getIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const result = burgerConstructorSlice.reducer(state, action);
      expect(result).toEqual({
        ...initialStateBurger,
        error: errorMessage,
        status: false
      });
    });
  });
});
