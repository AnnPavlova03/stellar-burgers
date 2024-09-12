import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'burgerConstructor/getIngredients',
  async function () {
    return await getIngredientsApi();
  }
);
